// helper/downloadFile.ts
import { getDownloadUrl } from "@edgestore/react/utils";

/**
 * Force-downloads any EdgeStore file.
 */
export function downloadFile(rawUrl: string, niceName?: string) {
  // add an extension if the caller forgot one
  if (niceName && !/\.\w+$/.test(niceName)) {
    const ext = rawUrl.split(".").pop()?.split("?")[0] ?? "pdf";
    niceName += `.${ext}`;
  }

  // ⬅️  this line makes the difference
  const url = getDownloadUrl(rawUrl, niceName);   // adds ?download=<niceName>

  const a = document.createElement("a");
  a.href = url;
  a.download = "";           // filename comes from header
  document.body.appendChild(a);
  a.click();
  a.remove();
}
