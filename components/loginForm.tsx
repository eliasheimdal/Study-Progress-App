"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import {Button} from "@heroui/react";
import { FcGoogle } from "react-icons/fc"; 
import { FaGithub } from "react-icons/fa"; 
import { useTheme } from "next-themes"; 
import { useEffect } from "react";
import { useRouter } from "next/navigation";


export default function LoginForm() {
  const { data: session } = useSession();
  const { theme } = useTheme(); 
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session]);

  return (
    <div className="flex flex-col items-center space-y-4">
      {session ? (
        <div className="flex flex-col items-center space-y-4">
        </div>
      ) : (
        <div className="space-x-4">
          <Button
            onPress={() => signIn("google")}
            color="secondary"
            className="px-4 py-2 text-black bg-white rounded shadow-md border border-black hover:bg-gray-200"
          >
            <FcGoogle className="w-5 h-5" />

            Login with Google
          </Button>
          <Button
            onPress={() => signIn("github")}
            color="secondary"
            className={`px-4 py-2 rounded shadow-md transition
              ${theme === "dark" ? "bg-white text-black hover:bg-gray-200" : "bg-gray-900 text-white hover:bg-gray-800"}
            `}
          >
            <FaGithub className="w-5 h-5" />
            Login with Github
          </Button>
        </div>
      )}
    </div>
  );
}
