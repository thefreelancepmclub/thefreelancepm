"use client";

import { Button } from "@/components/ui/button";
import { downloadFile } from "@/helper/downloadFile";
import { Download } from "lucide-react";

interface Props {
  file: string;
  title: string;
}
const TemplateDownloadbutton = ({ file, title }: Props) => {
  const onDownload = () => {
    downloadFile(file, title);
  };
  return (
    <Button
      className="w-full bg-blue-600 hover:bg-blue-700"
      onClick={onDownload}
    >
      <Download className="mr-2 h-4 w-4" />
      Download Now
    </Button>
  );
};

export default TemplateDownloadbutton;
