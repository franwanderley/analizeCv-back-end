import { fastify } from 'fastify';
import { fastifyCors } from '@fastify/cors';
import multiparth from '@fastify/multipart';
import pdf from 'pdf-parse';
import { GoogleGenAI  } from '@google/genai';
import 'dotenv/config';

const server = fastify({ logger: true }).withTypeProvider();
server.register(fastifyCors, { origin: '*' });
server.register(multiparth);

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_API_KEY,
});


server.get('/hello', async () => {
  return { message: 'Hello, World!' };
});

server.route({ method: 'POST', url: '/', handler: async (request, reply) => {
   const data = await request.file();
    if (!data) {
      return reply.code(400).send({ error: 'Nenhum arquivo enviado.' });
    }
    try {
      const pdfBuffer = await data.toBuffer();
      const pdfData = await pdf(pdfBuffer);
      const contents = `
      Você é um especialista em recrutamento e análise de currículos. Analise o currículo a seguir e forneça um feedback construtivo.
      As dicas devem ser divididas em seções:
      1. Pontos Fortes: O que foi bem feito e deve ser mantido.
      2. Pontos a Melhorar: O que pode ser aprimorado para deixar o currículo mais forte.
      3. Sugestões de Formatação: Dicas sobre a estrutura, clareza e layout.
      O currículo a ser analisado é este:
      """
      ${pdfData.text}
      """
    `;
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents,
  });
      return reply.status(200).send(response);
    } catch (error) {
      console.log(error);
      return reply.code(500).send({ error: 'Erro ao processar o arquivo.' });
    }
}});


server.listen({ port: 3333 }).then(() => console.log('HTTP server Running!'));