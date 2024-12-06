<h1 align="center">
  AI Agent
</h1>

<div align="center">
  White-label AI chat service ready to be embedded on your site
  <br />
  <br />
</div>

<div align="center">
<br />

[![PRs welcome](https://img.shields.io/badge/PRs-welcome-ff69b4.svg?style=flat-square)](https://github.com/Eyevinn/ai-agent/issues?q=is%3Aissue+is%3Aopen+label%3A%22help+wanted%22)
[![made with hearth by Eyevinn](https://img.shields.io/badge/made%20with%20%E2%99%A5%20by-Eyevinn-59cbe8.svg?style=flat-square)](https://github.com/Eyevinn)
[![Slack](http://slack.streamingtech.se/badge.svg)](http://slack.streamingtech.se)

</div>

White-label AI chat service ready to be embedded on your site. Connect to your Open AI assistant and embed the chat on your web site.

## Requirements

Open AI account

## Installation / Usage

```
% npm install
```

Start service

```
% OPENAI_API_KEY=<api-key> npm start
```

Service is available on http://localhost:8000

The default port 8000 can be overridden with the environment variable `PORT`

```
% PORT=8080 OPENAI_API_KEY=<api-key> npm start
```

## Development

Start backend as usual

```
% OPENAI_API_KEY=<api-key> npm start
```

Frontend in development mode on http://localhost:3000

```
% npm run dev:app
```

Build app

```
% npm run build:app
```

Output is placed in folder `out/` that is served by the API server.

### Project layout

```
src/
 +- server.ts  - server delivering web app in production build
 +- api.ts
 +- api_service.ts  - API service for web app. Service communicate with Open AI APIs
 +- app/*.tsx - Web app
 +- components/*.tsx
 +- hooks/*.tsx
```

## Contributing

See [CONTRIBUTING](CONTRIBUTING.md)

## License

This project is licensed under the MIT License, see [LICENSE](LICENSE).

# Support

Join our [community on Slack](http://slack.streamingtech.se) where you can post any questions regarding any of our open source projects. Eyevinn's consulting business can also offer you:

- Further development of this component
- Customization and integration of this component into your platform
- Support and maintenance agreement

Contact [sales@eyevinn.se](mailto:sales@eyevinn.se) if you are interested.

# About Eyevinn Technology

[Eyevinn Technology](https://www.eyevinntechnology.se) is an independent consultant firm specialized in video and streaming. Independent in a way that we are not commercially tied to any platform or technology vendor. As our way to innovate and push the industry forward we develop proof-of-concepts and tools. The things we learn and the code we write we share with the industry in [blogs](https://dev.to/video) and by open sourcing the code we have written.

Want to know more about Eyevinn and how it is to work here. Contact us at work@eyevinn.se!
