# Backend proxy for OpenAI Chat

This lightweight Express server proxies chat requests to the OpenAI Chat Completions API and keeps the `OPENAI_API_KEY` secret on the server.

Setup

1. Copy `.env.example` to `.env` and set `OPENAI_API_KEY`.

```bash
cd backend
cp .env.example .env
# edit .env and paste your key into OPENAI_API_KEY
npm install
npm start
```

Server will run on port `3000` by default and expose `POST /api/chat`.
