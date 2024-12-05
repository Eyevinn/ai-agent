import api from './api';

describe('api', () => {
  it('responds with hello, world!', async () => {
    const server = api({ title: 'my awesome service', openAiApiKey: 'dummy' });
    const response = await server.inject({
      method: 'GET',
      url: '/api'
    });
    expect(response.statusCode).toBe(200);
    expect(response.body).toBe('Hello, world! I am my awesome service');
  });
});
