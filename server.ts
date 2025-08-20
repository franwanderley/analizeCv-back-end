import { fastify } from 'fastify';
import { fastifyCors } from '@fastify/cors';
import multipart from '@fastify/multipart';
import 'dotenv/config';
import { routes } from './route';
import { AppError } from './lib/errors';

const server = fastify({ logger: true });

server.register(fastifyCors, { origin: '*' });
server.register(multipart);
server.register(routes);

server.setErrorHandler((error, request, reply) => {
  if (error instanceof AppError) {
    return reply.status(error.statusCode).send({
      status: "error",
      message: error.message,
    });
  }

  server.log.error(error);

  return reply.status(500).send({
    status: "error",
    message: "Internal server error.",
  });
});

const start = async () => {
  try {
    await server.listen({ port: 3333 });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();