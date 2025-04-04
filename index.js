import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';
import { promises as fs } from 'fs';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  async function getPrompt(role) {
    const path = `./prompts/${role}.txt`;
    try {
      const content = await fs.readFile(path, 'utf-8');
      return content;
    } catch (err) {
      console.error(`프롬프트 파일 못 찾음 (${role}):`, err.message);
      return "You are an assistant.";
    }
  }
  
  app.post('/api/:role', async (req, res) => {
    const { role } = req.params;
    const { message } = req.body;
  
    try {
      const systemPrompt = await getPrompt(role);

      const completion = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: message },
        ],
      });
  
      res.json({ reply: completion.choices[0].message.content });
  } catch (err) {
    console.error("GPT 호출 실패:", err.response?.data || err.message);
    res.status(500).json({ error: "GPT 호출 실패" });
  }
});
  
  app.listen(4000, () => {
    console.log('💬 ChatClinic is now listening on port 4000');
  });