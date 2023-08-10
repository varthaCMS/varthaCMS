"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { PlusCircle } from "@/node_modules/lucide-react";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const currentNav = usePathname();
  const router = useRouter();
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Button
        onClick={() => {
          router.push("/add-post");
        }}
      >
        <PlusCircle className="mr-2 h-4 w-4" />
        Add Post
      </Button>
      <Link
        href="/"
        className={`text-sm font-medium transition-colors hover:text-primary ${
          currentNav == "/" ? "" : "text-muted-foreground"
        }`}
      >
        Overview
      </Link>
      <Link
        href="/posts"
        className={`text-sm font-medium transition-colors hover:text-primary ${
          currentNav == "/posts" ? "" : "text-muted-foreground"
        }`}
      >
        Posts
      </Link>
      <Link
        href="/topics"
        className={`text-sm font-medium transition-colors hover:text-primary ${
          currentNav == "/topics" ? "" : "text-muted-foreground"
        }`}
      >
        Topics
      </Link>
      <Link
        href="/gallery"
        className={`text-sm font-medium transition-colors hover:text-primary ${
          currentNav == "/gallery" ? "" : "text-muted-foreground"
        }`}
      >
        Gallery
      </Link>
      <Link
        href="/settings"
        className={`text-sm font-medium transition-colors hover:text-primary ${
          currentNav == "/settings" ? "" : "text-muted-foreground"
        }`}
      >
        Settings
      </Link>
      <Link
        href="/support"
        className={`text-sm font-medium transition-colors hover:text-primary ${
          currentNav == "/support" ? "" : "text-muted-foreground"
        }`}
      >
        Support
      </Link>
    </nav>
  );
}
