export const runtime = 'nodejs';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// export async function GET(req: NextRequest, res: NextResponse) {
//     const result = await prisma.product.findMany({include: {images: true}});
//     return NextResponse.json({
//         data: result
//     })
// }

export async function GET(req: NextRequest) {
  try {
    const data = await prisma.product.findMany({ include: { images: true } });
    return NextResponse.json({ data }, { status: 200 });
  } catch (err) {
    console.error('GET /api/product error:', err);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 },
    );
  }
}
