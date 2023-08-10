"use client";

import { useCallback, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { toast } from "react-hot-toast";
import { useUser } from "@/hooks/useUser";
import { v4 as uuidv4 } from "uuid";
import { ImageType } from "@/types";

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onUpload: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
  selectedImage?: ImageType;
  featuredImageSetter?: Function;
  setNewImages: Function;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onUpload,
  title,
  body,
  footer,
  actionLabel,
  disabled,
  secondaryAction,
  secondaryActionLabel,
  selectedImage,
  featuredImageSetter,
  setNewImages,
}) => {
  const supabaseClient = useSupabaseClient();
  const { user } = useUser();
  const [showModal, setShowModal] = useState(isOpen);
  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }

    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [disabled, onClose]);

  //handle next options etc
  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) {
      return;
    }

    secondaryAction();
  }, [disabled, secondaryAction]);

  if (!isOpen) {
    return null;
  }

  const uploadImages = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      let files = e.target.files;
      //checking if files or user session empty
      if (!files || !user) {
        toast.error("File not found/User session expired 😔");
        return;
      }
      for (let index = 0; index < files.length; index++) {
        const file = files[index];
        const filename = files[index].name;
        const tempFileName = filename.split(".", -1);
        const filenameMinusExt = tempFileName[0];
        const extension = tempFileName[1];
        const { data: imageData, error: imageError } =
          await supabaseClient.storage
            .from("images")
            .upload(
              file.name.split(".", -1)[0] +
                "-" +
                uuidv4() +
                "." +
                file.name.split(".", -1)[1],
              file,
              { cacheControl: "3600", upsert: false }
            );
        if (imageError) {
          console.log(imageError);
          return toast.error(filename + " upload unsuccessful 😔");
        }
        const { error: dbError } = await supabaseClient.from("images").insert({
          user_id: user.id,
          title: filenameMinusExt,
          author: "",
          image_path: imageData.path,
          alt: "",
          caption: "",
          description: "",
        });
        if (dbError) {
          console.log(dbError);
          toast.error(filename + " DB update failed 😔");
        }
        toast.success(filename + " uploaded! 😃");
        setNewImages(filename);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const changeFeaturedImage = () => {
    if (featuredImageSetter && selectedImage) {
      featuredImageSetter(selectedImage);
      onClose();
    } else {
      toast.error("Image not selected.");
    }
  };

  return (
    <>
      <div
        className="
          justify-center 
          items-center 
          flex 
          overflow-x-hidden 
          overflow-y-auto 
          fixed 
          inset-0 
          z-50 
          outline-none 
          focus:outline-none
          bg-neutral-800/70
        "
      >
        <div
          className="
          relative 
          w-full
          md:w-5/6
          my-6
          mx-auto 
          h-auto 
          lg:h-auto
          md:h-auto
          "
        >
          {/*content*/}
          <div
            className={`
            translate
            duration-300
            h-full
            ${showModal ? "translate-y-0" : "translate-y-full"}
            ${showModal ? "opacity-100" : "opacity-0"}
          `}
          >
            <div
              className="
              translate
              h-full
              lg:h-auto
              md:h-auto
              border-0 
              rounded-lg 
              shadow-lg 
              relative 
              flex 
              flex-col 
              w-full 
              bg-card
              outline-none 
              focus:outline-none
            "
            >
              {/*header*/}
              <div
                className="
                flex 
                items-center 
                p-6
                rounded-t
                justify-center
                relative
                "
              >
                <button
                  className="
                    p-1
                    border-0 
                    hover:opacity-70
                    transition
                    absolute
                    right-9
                  "
                  onClick={handleClose}
                >
                  <IoMdClose size={18} />
                </button>
                <div className="text-lg font-semibold">{title}</div>
                <input
                  className="text-sm absolute
              left-9"
                  type="file"
                  accept="image/*"
                  onChange={uploadImages}
                  multiple
                />
              </div>
              <Separator />
              {/*body*/}
              <div className="relative flex-auto">{body}</div>
              <Separator />
              {/*footer*/}
              <div className="flex flex-col gap-2 pb-3 px-6 pt-2">
                <div
                  className="
                    flex 
                    flex-row 
                    items-center 
                    gap-4 
                    w-full
                  "
                >
                  <Button
                    size="lg"
                    onClick={changeFeaturedImage}
                    className="w-full"
                  >
                    {actionLabel}
                  </Button>
                </div>
                {footer}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
