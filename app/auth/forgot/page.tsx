"use client";

import Link from "next/link";
import AuthForm from "@/components/ui/auth-form";
import {
  useSessionContext,
  useSupabaseClient,
} from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types_db";
import { Command } from "@/node_modules/lucide-react";
import { ForgotPassForm } from "./components/forgot-pass-form";

export default function ForgotPasswordPage() {
  const supabaseClient = useSupabaseClient();
  // const router = useRouter();
  const session = useSessionContext();

  // useEffect(() => {
  //   if (session.session) {
  //     console.log(session);
  //     router.push("/");
  //     // toast.success("Logged in!");
  //   }
  // }, [session, router]);
  return (
    <>
      <div className="container relative hidden h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div
            className="absolute inset-0 bg-cover"
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1590069261209-f8e9b8642343?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1376&q=80)",
            }}
          />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <Command className="mr-2 h-6 w-6" /> varthaCMS
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                <p className="text-lg">
                  varthaCMS is still a work in progress.
                </p>
              </p>
              {/* <footer className="text-sm">Something</footer> */}
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Forgot Password
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your email to change password
              </p>
            </div>
            <ForgotPassForm />
            <p className="px-8 text-center text-sm text-muted-foreground">
              Go back to{" "}
              <Link
                href="/auth"
                className="underline underline-offset-4 hover:text-primary"
              >
                Login page
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
