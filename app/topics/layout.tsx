import { Metadata } from "next";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Settings",
  description: "Advanced form example using react-hook-form and Zod.",
};

interface TopicsLayoutProps {
  children: React.ReactNode;
}

export default function TopicsLayout({ children }: TopicsLayoutProps) {
  return (
    <>
      <div className=" space-y-6 p-10 pb-16 block">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Topics</h2>
          <p className="text-muted-foreground">
            Topics/Categories for tagging your posts.
          </p>
        </div>
        <Separator className="my-6" />
        <div>{children}</div>
      </div>
    </>
  );
}
