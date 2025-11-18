import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import { mkdir, unlink, writeFile } from 'fs/promises';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get('file') as File;
  const productId = formData.get('productId') as string;
  if (!file || !productId) {
    return NextResponse.json(
      {
        error: 'Missing file or product id',
      },
      { status: 400 },
    );
  } else {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadDir = path.join(process.cwd(), 'public/assets', productId);
    await mkdir(uploadDir, { recursive: true });

    const filePath = path.join(uploadDir, file.name);
    await writeFile(filePath, buffer);

    const fileUrl = `/assets/${productId}/${file?.name}`;

    const updateProduct = await prisma.product.update({
      where: { id: productId },
      data: {
        images: {
          create: { image: fileUrl },
        },
      },
      include: { images: true },
    });
    return NextResponse.json({
      message: 'File update Successfully',
      data: updateProduct?.images,
    });
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const productId = searchParams.get('productId') as string;
  if (!productId) {
    return NextResponse.json(
      {
        error: 'Missing product id',
      },
      { status: 400 },
    );
  } else {
    const images = await prisma.image.findMany({ where: { productId } });
    return NextResponse.json({ images });
  }
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const imageId = searchParams.get('imageId') as string;
  if (!imageId) {
    return NextResponse.json(
      {
        error: 'Missing image id',
      },
      { status: 400 },
    );
  } else {
    const image = await prisma.image.findUnique({ where: { id: imageId } });
    if (!image) {
      return NextResponse.json(
        {
          error: 'invalid image id',
        },
        { status: 400 },
      );
    }
    const imagePath = path.join(process.cwd(), 'public', image.image);
    try {
      await unlink(imagePath);
      console.log('delete image', imagePath);
    } catch (fileError) {
      console.log('error delete image', imagePath, fileError);
      return NextResponse.json(
        { error: 'file delete failed' },
        { status: 500 },
      );
    }
    await prisma.image.delete({ where: { id: imageId } });
    return NextResponse.json(
      { message: 'delete image successfully', data: image.productId },
      { status: 200 },
    );
  }
}
