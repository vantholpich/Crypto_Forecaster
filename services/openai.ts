import OpenAI from 'openai';

const apiKey = process.env.EXPO_PUBLIC_OPENAI_API_KEY;

const openai = new OpenAI({
  apiKey: apiKey,
  dangerouslyAllowBrowser: true, // Required for running in Expo/React Native
});

export const analyzeChart = async (base64Image: string) => {
  if (!apiKey || apiKey === 'your_openai_api_key_here') {
    throw new Error('Please set your OpenAI API Key in .env file');
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-5",
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: "You are a crypto trading expert. Analyze this chart and provide a price forecast. Be concise. Give a BUY/SELL/HOLD recommendation and a target price." },
            {
              type: "image_url",
              image_url: {
                "url": `data:image/jpeg;base64,${base64Image}`,
              },
            },
          ],
        },
      ],
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error analyzing chart:", error);
    throw error;
  }
};
