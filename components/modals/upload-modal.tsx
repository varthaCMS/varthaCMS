"use client";
import useUploadModal from "@/hooks/use-upload-modal";
import Modal from "./modal";
import { Tab } from "@headlessui/react";
import GalleryTab from "./gallery-tab";
import AttachmentDetails from "./attachment-details";
import { useEffect, useState } from "react";
import supabase from "@/utils/supabase";
import { ImageType } from "@/types";
const UploadModal = ({ serverImages }: { serverImages: any }) => {
  const [images, setImages] = useState(serverImages);
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [newImages, setNewImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState<ImageType>();

  useEffect(() => {
    setImages(serverImages);
  }, [serverImages]);

  useEffect(() => {
    console.log("running insert update");
    const channel = supabase
      .channel("images")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "images" },
        (payload) => {
          console.log(`payload.new ${payload.new}`);
          setImages((images: ImageType[]) => [payload.new, ...images]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [serverImages, newImages, setImages]);

  const uploadModal = useUploadModal();

  const [allValues, setAllValues] = useState({
    images: null,
    imageSetter: null,
  });

  const featuredImageSetter = useUploadModal((state) => state.imageSetter);

  let bodyContent =
    images?.length == 0 ? (
      <div className="text-center space-y-5 m-5">
        <h2 className="text-2xl font-bold tracking-tight">Empty!</h2>
        <p className="text-muted-foreground">
          Upload some images to get started.
        </p>
      </div>
    ) : (
      <Tab.Group
        key={selectedTabIndex}
        defaultIndex={selectedTabIndex}
        onChange={(index) => setSelectedTabIndex(index)}
        as="div"
        className="flex max-h-[75vh] pb-3"
      >
        <div className="mx-auto mt-1 w-full max-w-2xl sm:block lg:max-w-none overflow-y-auto px-3 pt-3">
          <Tab.List className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-2">
            {images?.map((image: ImageType) => (
              <GalleryTab key={image.id} image={image} />
            ))}
          </Tab.List>
        </div>
        <Tab.Panels className="overflow-y-auto w-2/5 hidden md:block">
          {images?.map((image: ImageType) => (
            <Tab.Panel key={image.id}>
              <div>
                <AttachmentDetails image={image} />
              </div>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    );

  return (
    <Modal
      title="Featured image"
      isOpen={uploadModal.isOpen}
      onClose={uploadModal.onClose}
      onUpload={uploadModal.onClose}
      actionLabel="Submit"
      body={bodyContent}
      selectedImage={images[selectedTabIndex]}
      featuredImageSetter={featuredImageSetter}
      setNewImages={setNewImages}
    />
  );
};

export default UploadModal;
