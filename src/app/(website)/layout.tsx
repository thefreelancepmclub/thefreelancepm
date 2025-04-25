import { auth } from "@/auth";
import { ReactNode } from "react";
import Navbar from "./_components/navbar";

const WebsiteLayoout = async ({ children }: { children: ReactNode }) => {
  const cu = await auth();
  return (
    <div>
      <Navbar isLoggedin={!!cu} />
      {children}
    </div>
  );
};

export default WebsiteLayoout;
