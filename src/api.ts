import fastify from 'fastify';
import cors from '@fastify/cors';
import swagger from '@fastify/swagger';
import swaggerUI from '@fastify/swagger-ui';
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import { Static, Type } from '@sinclair/typebox';
import { FastifyPluginCallback } from 'fastify';
import apiService from './api_service';

import { OpenAI } from 'openai';
import dotenv from 'dotenv';
dotenv.config();

const HelloWorld = Type.String({
  description: 'The magical words!'
});

export interface HealthcheckOptions {
  title: string;
}

const healthcheck: FastifyPluginCallback<HealthcheckOptions> = (
  fastify,
  opts,
  next
) => {
  fastify.get<{ Reply: Static<typeof HelloWorld> }>(
    '/',
    {
      schema: {
        description: 'Say hello',
        response: {
          200: HelloWorld
        }
      }
    },
    async (_, reply) => {
      reply.send('Hello, world! I am ' + opts.title);
    }
  );
  next();
};
const aiMassage: FastifyPluginCallback = (fastify, opts, next) => {
  async function chat(reply: any, userMessage: string) {
    const openai = process.env.OPENAI_API_KEY as string;
    if (!openai) {
      throw new Error(
        'The OPENAI_API_KEY environment variable is missing or empty; either provide it, or instantiate the OpenAI client with an apiKey option, like new OpenAI({ apiKey: "My API Key" }).'
      );
    }
    const client = new OpenAI({ apiKey: openai });
    reply.raw.setHeader('Content-Type', 'text/event-stream');
    reply.raw.setHeader('Cache-Control', 'no-cache');
    reply.raw.setHeader('Connection', 'keep-alive');

    const chatCompletion = await client.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        {
          role: 'assistant',
          content: [{ type: 'text', text: "Who's there?" }]
        },
        { role: 'user', content: userMessage }
      ]
    });

    return reply.send(chatCompletion.choices[0].message.content);
  }
  fastify.get('/chat', async (_, reply) => {
    await chat(reply, 'Hello');
  });
  fastify.post('/send', async (request, reply) => {
    const userMessage = request.body as string;
    await chat(reply, userMessage);
  });
  next();
};
export interface ApiOptions {
  title: string;
}

export default (opts: ApiOptions) => {
  const api = fastify({
    ignoreTrailingSlash: true
  }).withTypeProvider<TypeBoxTypeProvider>();

  // register the cors plugin, configure it for better security
  api.register(cors);

  // register the swagger plugins, it will automagically do magic
  api.register(swagger, {
    swagger: {
      info: {
        title: opts.title,
        description: 'hello',
        version: 'v1'
      }
    }
  });
  api.register(swaggerUI, {
    routePrefix: '/api/docs'
  });

  api.register(healthcheck, { prefix: '/api', title: opts.title });
  // register other API routes here
  api.register(aiMassage);

  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY is required');
  }
  api.register(apiService, {
    prefix: '/api/v1',
    openAiApiKey: process.env.OPENAI_API_KEY
  });

  return api;
};
