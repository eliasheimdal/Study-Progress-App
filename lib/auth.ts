import { getServerSession } from "next-auth/next";
import { authOptions } from "@/auth";

export const currentUser = async () => {
  const session = await getServerSession(authOptions);
  return session?.user;
};

// export const currentRole = async () => {
//   const session = await getServerSession(authOptions);
//   return session?.user?.;
// };
