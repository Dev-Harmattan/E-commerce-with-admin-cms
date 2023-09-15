'use client';

import { ImagePlus, Trash } from 'lucide-react';
import { useEffect, useState } from 'react';
import { CldUploadWidget } from 'next-cloudinary';

import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface ImageUploadProps {
  disable: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[];
}
export const ImageUpload: React.FC<ImageUploadProps> = ({
  value,
  disable,
  onChange,
  onRemove,
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };

  if (!mounted) return null;

  return (
    <div>
      <div className="mb-4 flex gap-4 items-center">
        {value.map((url) => (
          <div
            key={url}
            className="relative w-[200px] h-[200px] overflow-hidden rounded-md"
          >
            <div className="z-10 absolute top-2 right-2">
              <Button
                variant="destructive"
                size="icon"
                type="button"
                onClick={() => onRemove(url)}
              >
                <Trash className="w-4 h-4" />
              </Button>
            </div>
            <Image fill className="object-cover" src={url} alt="image" />
          </div>
        ))}
      </div>
      <CldUploadWidget onUpload={onUpload} uploadPreset="znxtkejp">
        {({ open }) => {
          const onClick = () => {
            open();
          };

          return (
            <Button
              type="button"
              disabled={disable}
              onClick={onClick}
              variant="secondary"
            >
              <ImagePlus className="w-4 h-4 mr-3" />
              Upload an Image
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};
