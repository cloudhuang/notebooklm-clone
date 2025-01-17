import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { JSONLoader } from "langchain/document_loaders/fs/json";
import { DocxLoader } from "@langchain/community/document_loaders/fs/docx";
import { CSVLoader } from "@langchain/community/document_loaders/fs/csv";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { PPTXLoader } from "@langchain/community/document_loaders/fs/pptx";
import { EPubLoader } from "@langchain/community/document_loaders/fs/epub";
import { BrowserbaseLoader } from "@langchain/community/document_loaders/web/browserbase";

/**
 * 根据文件后缀名返回对应的 loader 函数
 * @param {string} filePath - 文件路径
 * @returns {() => BaseDocumentLoader} - 返回加载文件的对应 loader 函数
 * @throws {Error} 如果文件类型不支持，则抛出错误
 */
export async function getLoader(filePathOrUrl: string) {
  if (
    filePathOrUrl.startsWith("http://") ||
    filePathOrUrl.startsWith("https://")
  ) {
    return new BrowserbaseLoader(["https://example.com"], {
      textContent: true,
    });
  }
  // 提取文件后缀名
  const fileExtension = filePathOrUrl.split(".").pop()?.toLowerCase();

  if (!fileExtension) {
    throw new Error("Invalid file path: Unable to determine file extension.");
  }

  switch (fileExtension) {
    case "csv":
      return new CSVLoader(filePathOrUrl);
    case "json":
      return new JSONLoader(filePathOrUrl);
    case "txt":
      return new TextLoader(filePathOrUrl);
    case "pdf":
      return new PDFLoader(filePathOrUrl);
    case "doc":
      return new DocxLoader(filePathOrUrl, {
        type: "doc",
      });
    case "docx":
      return new DocxLoader(filePathOrUrl);
    case "pptx":
      return new PPTXLoader(filePathOrUrl);
    case "epub":
      return new EPubLoader(filePathOrUrl);
    default:
      throw new Error(`Unsupported file type: ${fileExtension}`);
  }
}
