import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const generationConfig = {
  maxOutputTokens: 600,
  temperature: 0.9,
  topP: 0.1,
  topK: 16,
};
const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
  },
];

function formatResponse(response) {
  const sections = response.split('## ');
  let formattedText = '';

  sections.forEach(section => {
    if (section.trim()) {
      const lines = section.trim().split('\n');
      const title = lines.shift().trim();
      formattedText += `\n${title}\n\n`;
      lines.forEach(line => {
        formattedText += `${line.trim()}\n`;
      });
      formattedText += '\n';
    }
  });

  return formattedText;
}



async function generateContent(userDailyTasks) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash", generationConfig, safetySettings });
  const prompt = `
    Generate social media posts for LinkedIn, Facebook, and Twitter based on the following daily tasks:
    ${userDailyTasks.map(task => `- ${task}`).join('\n')}
    
    LinkedIn:
    LinkedIn posts should be professional and detailed, highlighting achievements and insights.

    Facebook:
    Facebook posts should be friendly and engaging, encouraging interaction from friends and followers.

    Twitter:
    Twitter posts should be short, concise, and include relevant hashtags.

    Create separate sections for LinkedIn, Facebook, and Twitter with appropriate content for each platform.

    Ensure the posts sound like they were written by a human, with a natural and authentic tone. Each platform's post style is described in the prompt to guide the AI in creating appropriate content. Create separate sections for LinkedIn, Facebook, and Twitter with appropriate content for each platform.

    And create one post for each plateform
  `;
  const result = await model.generateContent(prompt);
  console.log('result :', result);
  const response = await result.response;
  console.log('responce :', response);
  const text = await response.text(); // Ensure to await the text() method
  
  return result;
  // return text;
}

export default generateContent;
