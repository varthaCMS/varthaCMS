"use client";

import { ImageType } from "@/types";
import ImageItem from "./ui/ImageItem";

interface PageContentProps {
  images: ImageType[];
}

const PageContent: React.FC<PageContentProps> = ({ images }) => {
  if (images.length === 0) {
    return (
      <div className="text-lg font-medium text-center">wow, such empty</div>
    );
  }
  return (
    <div
      className="
  grid 
  grid-cols-2 
  sm:grid-cols-3 
  md:grid-cols-3 
  lg:grid-cols-4 
  xl:grid-cols-5 
  2xl:grid-cols-8 
  gap-4 
  mt-4
"
    >
      {images.map((image) => (
        <ImageItem key={image.id} onClick={() => {}} data={image} />
      ))}
    </div>
  );
};

export default PageContent;
