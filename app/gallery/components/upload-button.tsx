import { Button } from "@/app/add-post/components/ui/button";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";

export default function UploadButton() {
  const supabase = useSupabaseClient();

  async function uploadImages(e: any) {
    let file = e.target.files[0];

    const { data, error } = await supabase.storage
      .from("images")
      .upload(
        file.name.split(".", -1)[0] +
          "-" +
          uuidv4() +
          "." +
          file.name.split(".", -1)[1],
        file
      );

    if (error) {
      console.log(error);
      toast.error("Upload unsuccessful");
    }
    if (data) {
      toast.success("Upload successful");
    }
  }

  return (
    <input
      className="text-sm"
      type="file"
      accept="image/jpg"
      onChange={(e) => uploadImages(e)}
    />
  );
}
