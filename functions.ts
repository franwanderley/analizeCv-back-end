import { MultipartFile } from "@fastify/multipart";
import PdfParse from "pdf-parse";
import { PdfParseError } from "./lib/errors";

export const pdfToText = async (file: MultipartFile): Promise<string> => {
  try {
    const pdfBuffer = await file.toBuffer();
    const pdfData = await PdfParse(pdfBuffer);
    return pdfData.text;
  } catch (error) {
    console.error("Error parsing PDF:", error);
    throw new PdfParseError("Erro ao processar o arquivo PDF.");
  }
};
