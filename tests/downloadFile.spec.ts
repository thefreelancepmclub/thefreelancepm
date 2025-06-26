/**
 * @jest-environment jsdom
 */
import { downloadFile } from "../src/helper/downloadFile";

test("adds ?download param and preserves extension", () => {
  // spy on createElement – it receives the anchor *before* remove()
  const anchorSpy = jest.spyOn(document, "createElement");

  downloadFile("https://edge/key.txt", "NiceName.pdf");

  // first call creates the <a>
  const link = anchorSpy.mock.results[0].value as HTMLAnchorElement;

  expect(link.href).toMatch(/\?download=NiceName\.pdf$/);
  expect(link.download).toBe("");           // filename comes via header
});
