import { useSupabaseClient } from "@supabase/auth-helpers-react";

import { ImageType } from "@/types";

const useLoadImage = (image: ImageType) => {
  const supabaseClient = useSupabaseClient();

  if (!image) {
    return null;
  }

  const { data: imageData } = supabaseClient.storage
    .from("images")
    .getPublicUrl(image.image_path);
  console.log("public url");
  console.log(imageData);

  return imageData.publicUrl;
};
``;
export default useLoadImage;
