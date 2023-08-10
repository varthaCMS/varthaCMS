import getImages from "@/actions/getImages";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ScrollArea, ScrollBar } from "../add-post/components/ui/scroll-area";
import PageContent from "./components/PageContent";
import { madeForYouAlbums } from "./data/albums";

// data should not be cached, always up to date
export const revalidate = 0;

export default async function GalleryPage() {
  const images = await getImages();
  const isImage = [".gif", ".jpg", ".jpeg", ".png"];
  // const data = await getImages();
  return <PageContent images={images} />;
}
