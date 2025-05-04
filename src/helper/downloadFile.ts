export function downloadFile(url: string, title: string) {
  // Create a temporary anchor element
  const a = document.createElement("a");
  a.href = url;
  a.download = title ?? ""; // You can set a default filename here if needed
  document.body.appendChild(a);
  a.target = "_blank"; // Open in a new tab if needed

  // Trigger the download
  a.click();

  // Clean up
  document.body.removeChild(a);
}
