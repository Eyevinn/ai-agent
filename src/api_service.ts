import { FastifyPluginCallback } from 'fastify';

export interface ApiServiceOptions {
  openAiApiKey: string;
}

const apiService: FastifyPluginCallback<ApiServiceOptions> = (
  fastify,
  opts,
  next
) => {
  fastify.setErrorHandler((error, request, reply) => {
    reply.code(500).send({ reason: error.message });
  });

  // Insert routes here

  next();
};

export default apiService;
