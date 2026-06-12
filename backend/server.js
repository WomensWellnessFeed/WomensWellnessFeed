const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/chat', async (req, res) => {
  if (!OPENAI_API_KEY) {
    return res.status(500).json({ error: 'OPENAI_API_KEY is not configured on the server.' });
  }

  const { messages, model = 'gpt-4o-mini', max_tokens = 1000, temperature = 0.7 } = req.body || {};

  if (!Array.isArray(messages)) {
    return res.status(400).json({ error: 'Request must include `messages` array in the body.' });
  }

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model,
        messages,
        max_tokens,
        temperature,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
        timeout: 60_000,
      }
    );

    return res.json(response.data);
  } catch (err) {
    console.error('OpenAI request failed:', err?.response?.data || err.message || err);
    const status = err?.response?.status || 500;
    return res.status(status).json({ error: err?.response?.data || 'OpenAI request failed' });
  }
});

app.get('/health', (_req, res) => res.json({ status: 'ok' }));

app.listen(PORT, () => console.log(`Chat proxy listening on http://localhost:${PORT}`));
