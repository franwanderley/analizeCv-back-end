import {
  FastifyBaseLogger,
  FastifyInstance,
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault,
} from "fastify";
import PdfParse from "pdf-parse";
import { GoogleGenAI } from "@google/genai";
import { pdfToText } from "./functions";

type fastifyTypeInstance = FastifyInstance<
  RawServerDefault,
  RawRequestDefaultExpression,
  RawReplyDefaultExpression,
  FastifyBaseLogger
>;

export const routes = async (server: fastifyTypeInstance) => {
  const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_API_KEY,
  });

  server.route({
    method: "POST",
    url: "/",
    handler: async (request, reply) => {
      const data = await request.file();
      if (!data) {
        return reply.code(400).send({ error: "Nenhum arquivo enviado." });
      }
      try {
        const curriculumText = await pdfToText(data);
        const contents = `
          Você é um especialista em recrutamento e análise de currículos. Analise o currículo a seguir e forneça um feedback construtivo.
          As dicas devem ser divididas em seções:
          1. Pontos Fortes: O que foi bem feito e deve ser mantido.
          2. Pontos a Melhorar: O que pode ser aprimorado para deixar o currículo mais forte.
          3. Sugestões de Formatação: Dicas sobre a estrutura, clareza e layout.
          O currículo a ser analisado é este:
          """
          ${curriculumText}
          """
        `;
        const response = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents
        });
        return reply.status(200).send(response);
      } catch (error) {
        console.log(error);
        return reply.code(500).send({ error: "Erro ao analisar o curriculo" });
      }
    },
  });
};
