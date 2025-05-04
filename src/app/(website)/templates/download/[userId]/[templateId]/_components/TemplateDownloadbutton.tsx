"use client";

import { incrementDownloads } from "@/action/templates/downloadReq";
import { Button } from "@/components/ui/button";
import { downloadFile } from "@/helper/downloadFile";
import { Download } from "lucide-react";

interface Props {
  file: string;
  title: string;
  templateId: string;
}
const TemplateDownloadbutton = ({ file, title, templateId }: Props) => {
  const onDownload = async () => {
    await incrementDownloads(templateId);
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
