import useUploadModal from "@/hooks/use-upload-modal";
import { ImageType } from "@/types";
import Image from "next/image";
import { useCallback, useState } from "react";

interface FeaturedImageProps {
  featuredImage?: ImageType;
  setFeaturedImage: Function;
}

const FeaturedImage: React.FC<FeaturedImageProps> = ({
  featuredImage,
  setFeaturedImage,
}) => {
  const uploadModal = useUploadModal();

  const onClickUpload = useCallback(() => {
    console.log("opening modal");
    //you may add security check here based on use case
    uploadModal.onOpen(setFeaturedImage);
  }, [uploadModal]);

  return (
    <>
      <div
        onClick={() => onClickUpload()}
        className="
      relative
      cursor-pointer
      hover:opacity-70
      transition
      border-dashed 
      border-2 
      p-20 
      border-neutral-300
      flex
      flex-col
      justify-center
      items-center
      gap-4
      text-neutral-600
      mb-5
      h-16
    "
      >
        {!featuredImage ? (
          <div className="font-semibold text-lg">Click to upload</div>
        ) : (
          <Image
            src={
              process.env.NEXT_PUBLIC_SUPABASE_URL +
              "/storage/v1/object/public/images/" +
              featuredImage.image_path
            }
            alt="featured image"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}
      </div>
      {!featuredImage ? (
        <></>
      ) : (
        <div
          onClick={() => setFeaturedImage(undefined)}
          className="mr-1 text-sm text-red-500 hover:text-red-600 cursor-pointer"
        >
          Remove image
        </div>
      )}
    </>
  );
};

export default FeaturedImage;
