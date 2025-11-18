'use client';
import { Button, Input, Label } from '@/components/ui';
import { CircleX } from 'lucide-react';
import Image from 'next/image';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { PrismaType } from '@/lib/prisma';
import {
  deleteImage,
  fetchImages,
  uploadImage,
} from '@/modules/products/services/image';
import Spinner from '@/components/ui/spinner';

function UploadImages(props: { productId: string }) {
  const { productId } = props;
  const [loading, setLoading] = useState<boolean>(true);
  const [file, setFile] = useState<File | null>(null);
  const [images, setImages] = useState<PrismaType.Image[] | null>(null);

  const handelChangeFile = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e?.target?.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    } else {
      setFile(null);
    }
  }, []);

  const handelUpload = useCallback(async () => {
    if (!file || !productId) {
      alert('Please upload a file');
    } else {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('productId', productId);
      const { data } = await uploadImage(formData);
      setImages(data);
      setFile(null);
    }
  }, [file, productId]);

  const updateImageList = (imageId: string) => {
    setImages(
      (prevState) => prevState?.filter((img) => img.id !== imageId) || null,
    );
  };

  const handelDeleteImage = useCallback(async (imageId: string) => {
    await deleteImage(imageId);
    updateImageList(imageId);
  }, []);

  const getImages = useCallback(async () => {
    const data = await fetchImages(productId);
    setImages(data?.images);
    setLoading(false);
  }, [productId]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getImages();
  }, [getImages]);

  return (
    <div className="w-full mt-4">
      <Label className="mb-2" htmlFor="picture">
        Product Image
      </Label>
      <div className="flex gap-2 justify-between w-full">
        <Input
          type="file"
          id="picture"
          accept="image/*"
          onChange={handelChangeFile}
        />
        <Button onClick={handelUpload}>Upload Image</Button>
      </div>
      <div className="flex gap-2 mt-4 flex-wrap justify-between items-center">
        {loading ? (
          <Spinner />
        ) : (
          images?.map((item: PrismaType.Image) => (
            <div className="relative group" key={item.id}>
              <CircleX
                onClick={() => handelDeleteImage(item?.id)}
                className="absolute top-1 right-1 text-red-500 p-1 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
              />
              <Image
                src={item?.image}
                alt="product image"
                width={100}
                height={100}
                className="mt-4 mx-auto rounded-md"
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default UploadImages;
