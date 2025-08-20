import { FastifyPluginAsync } from "fastify";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { pdfToText } from "./functions";
import { createCvAnalysisPrompt } from "./lib/prompt";
import { BadRequestError } from "./lib/errors";

export const routes: FastifyPluginAsync = async (server) => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not set in environment variables.");
  }

  const genAI = new GoogleGenerativeAI(apiKey);

  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  server.post("/analize-curriculum", async (request, reply) => {
    const data = await request.file();

    if (!data) {
      throw new BadRequestError("Nenhum arquivo enviado. Por favor, envie um PDF.");
    }

    const curriculumText = await pdfToText(data);

    const prompt = createCvAnalysisPrompt(curriculumText);

    const result = await model.generateContent(prompt);
    const analysis = result.response.text();

    return reply.status(200).send(analysis);
  });
};
