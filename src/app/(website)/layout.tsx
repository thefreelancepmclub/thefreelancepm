import { auth } from "@/auth";
import Footer from "@/components/footer";
import { ReactNode } from "react";
import Navbar from "./_components/navbar";

const WebsiteLayoout = async ({ children }: { children: ReactNode }) => {
  const cu = await auth();
  return (
    <div className="min-h-screen flex flex-col ">
      <Navbar isLoggedin={!!cu} />
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  );
};

export default WebsiteLayoout;
