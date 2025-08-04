import { fastify } from 'fastify';
import { fastifyCors } from '@fastify/cors';
import multiparth from '@fastify/multipart';
import 'dotenv/config';
import { routes } from './route';

const server = fastify({ logger: true }).withTypeProvider();
server.register(fastifyCors, { origin: '*' });
server.register(multiparth);
server.register(routes);


server.listen({ port: 3333 }).then(() => console.log('HTTP server Running!'));