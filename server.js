const express = require('express');
const OpenAI = require('openai');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

app.use(express.static('public'));

app.post('/generar', async (req, res) => {
    const { tipo, prompt } = req.body;
    try {
        if (tipo === 'logo' || tipo === '3d') {
            const response = await openai.images.generate({
                model: "dall-e-3",
                prompt: prompt,
                n: 1,
                size: "1024x1024",
            });
            return res.json({ resultado: response.data[0].url, tipo: 'imagen' });
        }
        if (tipo === 'video') return res.json({ resultado: "https://www.w3schools.com/html/mov_bbb.mp4", tipo: 'video' });
        if (tipo === 'music') return res.json({ resultado: "https://www.w3schools.com/html/horse.mp3", tipo: 'audio' });
    } catch (error) {
        res.status(500).json({ error: "Error: " + error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Servidor LUIS IA funcionando'));
