import React from "react";

const Header: React.FC<{ children: React.ReactNode; subtitile: string }> = ({
  children,
  subtitile,
}) => {
  return (
    <div>
      <div className="bg-[#004AAD] py-[50px] px-4 mt-20 text-center text-white">
        <h1 className="text-2xl font-semibold">{children}</h1>
        <p className="mt-2 text-sm">{subtitile}</p>
      </div>
    </div>
  );
};

export default Header;
