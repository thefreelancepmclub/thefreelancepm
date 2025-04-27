import { auth } from "@/auth";
import { ReactNode } from "react";
import Navbar from "./_components/navbar";
import Footer from "@/components/footer";

const WebsiteLayoout = async ({ children }: { children: ReactNode }) => {
  const cu = await auth();
  return (
    <div>
      <Navbar isLoggedin={!!cu} />
      {children}
      <Footer/>
    </div>
  );
};

export default WebsiteLayoout;
