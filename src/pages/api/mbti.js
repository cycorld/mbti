// pages/api/mbti.js
const { Configuration, OpenAIApi } = require("openai");

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { inputValue } = req.body;

    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
      });
    const openai = new OpenAIApi(configuration);

    try {
      // OpenAI API를 이용하여 MBTI 계산
      const prompt = `Please classify the following text into one of the 16 MBTI types: ${inputValue}\nType:`;

      const completions = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
      });

      console.log(completions.data)

      const mbti = completions.data.choices[0].text.trim();

      // 결과를 클라이언트로 반환
      res.status(200).json({ mbti });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'MBTI 계산에 실패했습니다.' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
