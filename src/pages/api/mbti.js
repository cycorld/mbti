// pages/api/mbti.js
const { Configuration, OpenAIApi } = require("openai");

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { inputValue } = req.body;

    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    try {
      // OpenAI API를 이용하여 MBTI 계산
      const prompt = `Personality: ${inputValue}
      Provide the MBTI type and related emoji based on my personality. Also, give me today's fortune based on the MBTI type.
      without any explanation, without no empty lines, only JSON format like {"mbti": "INPT", "emoji": "3 emoji", "fortune": "in Korean"}`;

      const completions = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        max_tokens: 200,
      });

      console.log(completions.data);
      const originalText = completions.data.choices[0].text
        .trim()
        .replace(/\n/g, "");
      console.log(originalText);

      const mbti = JSON.parse(originalText);

      // 결과를 클라이언트로 반환
      res.status(200).json({ ...mbti });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "MBTI 계산에 실패했습니다." });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
