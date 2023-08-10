"use client";

import { Button } from "@/components/ui/button";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { ModelSelector } from "./components/model-selector";
import { PresetActions } from "./components/preset-actions";
import { models, types } from "./data/models";
import "./styles.css";
import { useRef, useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useUser } from "@supabase/auth-helpers-react";
import slugify from "slugify";
import { ScrollArea } from "./components/ui/scroll-area";
import { CategoryForm } from "./components/categories-form";
import FeaturedImage from "./components/featured-image";
import { Editor } from "@tinymce/tinymce-react";
import { ImageType } from "@/types";

export default function PlaygroundPage() {
  if (typeof window !== "undefined") {
    require("tinymce/tinymce");
    require("tinymce/models/dom/model");
    require("tinymce/icons/default");
    require("tinymce/themes/silver");
    require("tinymce/plugins/link");
    require("tinymce/plugins/image");
    require("tinymce/plugins/table");
    require("tinymce/plugins/wordcount");
    require("tinymce/skins/ui/oxide/skin.min.css");
    require("tinymce/skins/ui/oxide/content.min.css");
    require("tinymce/skins/content/default/content.min.css");
  }
  const supabaseClient = useSupabaseClient();
  const user = useUser();

  const [featuredImage, setFeaturedImage] = useState<ImageType>();

  const [title, setTitle] = useState("");
  const handleTitleChange = async (event: any) => {
    console.log("Title just updated", event.target.value);
    setTitle(event.target.value);
  };

  const [contentEditor, setContentEditor] = useState("");
  const handleEditorChange = (content: any, editor: any) => {
    console.log("Content was updated:", content);
    setContentEditor(content);
  };

  const publishPost = async () => {
    try {
      const { data, error } = await supabaseClient
        .from("posts")
        .insert([
          {
            featured_image: featuredImage?.image_path,
            title: title,
            content: contentEditor,
            user_id: user?.id,
            slug: slugify(title).toLowerCase(),
            authors: [
              {
                uid: user?.id,
              },
            ],
            // featured_image: ""
            // authors which is a jsonb
            // topics jsonb
            status: "published",
          },
        ])
        .single();
      if (error) throw error;
      // router.push("/");
    } catch (error: any) {
      alert(error.message);
    }
  };

  // const handleChange = (type: string) => (e: any) => {
  //   setArticleData({ ...articleData, [type]: e.target.value });
  //   console.log(articleData);
  // };

  const editorRef = useRef<any>(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };
  const [categories, setCategories] = useState([]);
  console.log("from main page");
  console.log(categories);
  return (
    <>
      <script src="/tinymce/tinymce.min.js" async />
      <div className="h-full flex-col flex">
        <div className="container flex flex-col items-start justify-between space-y-2 py-4 sm:flex-row sm:items-center sm:space-y-0 md:h-16">
          <h2 className="text-lg font-semibold">Add Post</h2>
          <div className="ml-auto flex w-max space-x-2 sm:justify-end">
            <ModelSelector types={types} models={models} />
            <Button onClick={publishPost} variant="secondary">
              Submit
            </Button>
            <PresetActions />
          </div>
        </div>
        <Separator />
        <div className="flex-1">
          <div className="container h-full py-6">
            <div className="grid h-full items-stretch gap-6 md:grid-cols-[1fr_200px]">
              <div className="hidden flex-col space-y-5 sm:flex md:order-2">
                <div className="space-y-2">
                  <HoverCard openDelay={200}>
                    <HoverCardTrigger asChild>
                      <span className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Topics
                      </span>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-[320px] text-sm" side="left">
                      Choose what topic(s) this post belongs to.
                    </HoverCardContent>
                  </HoverCard>
                  <ScrollArea className="h-[200px] px-1">
                    <CategoryForm onChange={setCategories} />
                  </ScrollArea>
                </div>
                <div className="space-y-2 flex flex-col">
                  <HoverCard openDelay={200}>
                    <HoverCardTrigger asChild>
                      <span className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Featured Image
                      </span>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-[320px] text-sm" side="left">
                      Choose the image that best represents the post. This is
                      the image that often appears at the top of a post or in
                      social media shares.
                    </HoverCardContent>
                  </HoverCard>
                  {/* <Image
                    alt="featured image"
                    width={150}
                    height={100}
                    src={
                      featuredImage === undefined
                        ? ""
                        : process.env.NEXT_PUBLIC_SUPABASE_URL +
                          "/storage/v1/object/public/images/" +
                          featuredImage.image_path
                    }
                  /> */}

                  <FeaturedImage
                    featuredImage={featuredImage}
                    setFeaturedImage={setFeaturedImage}
                  />
                </div>
              </div>
              <div className="md:order-1">
                <div className="mt-0 border-0 p-0">
                  <div className="flex h-full flex-col space-y-4">
                    <Textarea
                      onChange={handleTitleChange}
                      name="title"
                      aria-label="title"
                      placeholder="Add a title"
                      className="min-h-[50px] p-4 text-lg"
                    />
                    {/* <Textarea
                      placeholder="Body content goes here"
                      className="min-h-[400px] flex-1 p-4 md:min-h-[700px] lg:min-h-[700px]"
                    /> */}
                    <Editor
                      id="editor"
                      tinymceScriptSrc="/tinymce/tinymce.min.js"
                      // initialValue="<p>This is the initial content of the editor</p>"
                      init={{
                        branding: false,

                        skin: false,
                        content_css: false,
                        height: 500,
                        menubar: false,
                        plugins: ["wordcount"],
                        toolbar:
                          "undo redo | formatselect | bold italic backcolor | \
             alignleft aligncenter alignright alignjustify | \
             bullist numlist outdent indent | removeformat | help",
                      }}
                      value={contentEditor}
                      onEditorChange={handleEditorChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
