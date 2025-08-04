import { MultipartFile } from "@fastify/multipart";
import PdfParse from "pdf-parse";

export const pdfToText = async (file: MultipartFile): Promise<string> => {
  try {
    const pdfBuffer = await file.toBuffer();
    const pdfData = await PdfParse(pdfBuffer);
    return pdfData.text;
  } catch (error) {
    console.error("Error parsing PDF:", error);
    throw new Error("Failed to parse PDF");
  }
};
