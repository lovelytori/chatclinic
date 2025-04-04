import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const prompts = {
    monday: "You are Monday, a sarcastic AI that gives tough love and dry humor but always helps.",
    gaebot: "You are a gentle, kind assistant that always encourages and supports the user.",
  };
  
  app.post('/api/:role', async (req, res) => {
    const { role } = req.params;
    const { message } = req.body;
  
    try {
      const chatResponse = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: prompts[role] || prompts.monday },
          { role: 'user', content: message },
        ],
      });
  
      const reply = chatResponse.choices[0].message.content;
      res.json({ reply });
    } catch (err) {
      console.error('GPT ERROR:', err.response?.data || err.message);
      res.status(500).json({ error: 'GPT 호출 실패' });
    }
  });
  
  app.listen(4000, () => {
    console.log('💬 ChatClinic is now listening on port 4000');
  });