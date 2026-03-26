const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Servir la página web
app.use(express.static('public'));

app.post('/generar', async (req, res) => {
    const { tipo, prompt, duration } = req.body;
    
    try {
        // GENERAR IMAGEN/LOGO (IA REAL GRATIS)
        if (tipo === 'logo' || tipo === '3d') {
            const encodedPrompt = encodeURIComponent(prompt + ", high quality, 4k");
            const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1024&height=1024&nologo=true`;
            return res.json({ resultado: imageUrl, tipo: 'imagen' });
        }
        
        // VIDEOS DE MUESTRA (ALEATORIOS)
        if (tipo === 'video') {
            // Lista de videos de muestra diferentes
            const videosMuestra = [
                "https://www.w3schools.com/html/mov_bbb.mp4",
                "https://www.w3schools.com/html/movie.mp4",
                "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
                "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
                "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
            ];
            
            // Elegir uno al azar
            const videoRandom = videosMuestra[Math.floor(Math.random() * videosMuestra.length)];
            
            return res.json({ resultado: videoRandom, tipo: 'video' });
        }

        if (tipo === 'music') {
            return res.json({ resultado: "https://www.w3schools.com/html/horse.mp3", tipo: 'audio' });
        }

    } catch (error) {
        res.status(500).json({ error: "Error: " + error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Servidor LUIS IA funcionando'));
