import fastifyStatic from '@fastify/static';
import path from 'path';
import api from './api';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
if (!OPENAI_API_KEY) {
  throw new Error('OPENAI_API_KEY is required');
}
const server = api({
  title: 'White Label AI chat service',
  openAiApiKey: OPENAI_API_KEY
});

server.register(fastifyStatic, {
  root: path.join(__dirname, '../out'),
  prefix: '/'
});

const PORT = process.env.PORT ? Number(process.env.PORT) : 8000;

server.listen({ port: PORT, host: '0.0.0.0' }, (err, address) => {
  if (err) {
    throw err;
  }
  console.log(`Server listening on ${address}`);
});

export default server;
