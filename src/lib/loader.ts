import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { JSONLoader } from "langchain/document_loaders/fs/json";
import { DocxLoader } from "@langchain/community/document_loaders/fs/docx";
import { CSVLoader } from "@langchain/community/document_loaders/fs/csv";
import { TextLoader } from "langchain/document_loaders/fs/text";

/**
 * 根据文件后缀名返回对应的 loader 函数
 * @param {string} filePath - 文件路径
 * @returns {() => BaseDocumentLoader} - 返回加载文件的对应 loader 函数
 * @throws {Error} 如果文件类型不支持，则抛出错误
 */
export async function getLoader(filePath: string) {
  // 提取文件后缀名
  const fileExtension = filePath.split('.').pop()?.toLowerCase();

  if (!fileExtension) {
    throw new Error('Invalid file path: Unable to determine file extension.');
  }

  switch (fileExtension) {
    case 'csv':
      return new CSVLoader(filePath);
    case 'json':
      return new JSONLoader(filePath);
    case 'txt':
      return new TextLoader(filePath);
    case 'pdf':
      return new PDFLoader(filePath);
    case 'doc':
      return new DocxLoader(
        filePath,
        {
          type: "doc",
        }
      );
    case 'docx':
      return new DocxLoader(filePath);
    default:
      throw new Error(`Unsupported file type: ${fileExtension}`);
  }
}