import { FastifyPluginCallback, FastifyReply } from 'fastify';
import OpenAI from 'openai';

export interface ApiServiceOptions {
  openAiApiKey: string;
}

const apiService: FastifyPluginCallback<ApiServiceOptions> = (
  fastify,
  opts,
  next
) => {
  fastify.post('/message', async (request, reply) => {
    const userMessage = request.body as string;
    await chat(reply, userMessage);
  });
  fastify.setErrorHandler((error, request, reply) => {
    reply.code(500).send({ reason: error.message });
  });

  async function chat(reply: FastifyReply, userMessage: string) {
    const openai = opts.openAiApiKey;
    if (!openai) {
      throw new Error('OpenAI API key is required');
    }

    const client = new OpenAI({ apiKey: openai });
    reply.raw.setHeader('Content-Type', 'text/event-stream');
    reply.raw.setHeader('Cache-Control', 'no-cache');
    reply.raw.setHeader('Connection', 'keep-alive');

    const chatCompletion = await client.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: userMessage }
      ]
    });

    return reply.send(chatCompletion.choices[0].message.content.assistantMessage);
  }

  next();
};

export default apiService;
