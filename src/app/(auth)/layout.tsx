import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

const Authlayout = async ({ children }: { children: ReactNode }) => {
  const cu = await auth();

  if (cu) redirect("/");

  return <div>{children}</div>;
};

export default Authlayout;
