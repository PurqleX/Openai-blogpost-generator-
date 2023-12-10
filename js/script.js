const express = require('express');
const { Configuration, OpenAIApi } = require('openai');

const app = express();
app.use(express.json());

const openai = new OpenAIApi(new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
}));

app.post('/generate-post', async (req, res) => {
    try {
        const response = await openai.createCompletion("text-davinci-002", {
            prompt: `Write a blog post about: ${req.body.topic}`,
            max_tokens: 1024
        });
        res.json({ post: response.data.choices[0].text });
    } catch (error) {
        res.status(500).send('Error generating blog post');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
