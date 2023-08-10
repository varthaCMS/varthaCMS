"use client";
import { Metadata } from "next";
import Image from "next/image";

import { Separator } from "@/components/ui/separator";
import { Button } from "../add-post/components/ui/button";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { getImageSize } from "next/dist/server/image-optimizer";
import { useState } from "react";
import UploadButton from "./components/upload-button";
import { toast } from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@/hooks/useUser";

interface GalleryLayoutProps {
  children: React.ReactNode;
}

export default function GalleryLayout({ children }: GalleryLayoutProps) {
  const { user } = useUser();
  const supabaseClient = useSupabaseClient();
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
      }
    } catch (error) {
      toast.error("Something went wrong. 😔");
    }
  };
  return (
    <>
      <div className=" space-y-6 p-10 pb-16 block">
        <div className="space-y-0.5">
          <div className="flex space-x-3 items-center">
            <h2 className="text-2xl font-bold tracking-tight">Gallery</h2>
            <input
              className="text-sm"
              type="file"
              accept="image/jpg"
              onChange={(e) => uploadImages(e)}
            />
          </div>
          <p className="text-muted-foreground">All your images at one place.</p>
        </div>
        <Separator className="my-6" />
        <div>{children}</div>
      </div>
    </>
  );
}
