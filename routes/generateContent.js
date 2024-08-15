import express from 'express';
import generateContent from '../config/GoogleGenerativeAI.js';

const router = express.Router();

const userDailyTasks = [
  "Completed a successful client meeting",
  "Worked on the new marketing strategy",
  "Reviewed the quarterly financial report",
  "Attended a team-building workshop",
  "Brainstormed ideas for the upcoming product launch"
];


router.post('/', async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).send('Prompt is required');
  }

  try {
    const generatedText = await generateContent(userDailyTasks);
    res.send({"Text":  generatedText });
  } catch (error) {
    console.error('Error generating content:', error);
    res.status(500).send('An error occurred while generating content');
  }
});

router.get('/', (req, res) => {
  res.json({'All is good' : "correct"})
})

export default router;
