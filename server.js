const express = require('express');
const OpenAI = require('openai');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Configuración de OpenAI (Lee la clave secreta que pusiste en Render)
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

// Servir la página web (carpeta public)
app.use(express.static('public'));

// Ruta para generar contenido
app.post('/generar', async (req, res) => {
    const { tipo, prompt } = req.body;
    
    try {
        // Generar Imagen/Logo Real con OpenAI
        if (tipo === 'logo' || tipo === '3d') {
            const response = await openai.images.generate({
                model: "dall-e-3",
                prompt: prompt,
                n: 1,
                size: "1024x1024",
            });
            return res.json({ resultado: response.data[0].url, tipo: 'imagen' });
        }
        
        // Simulación de Video y Música (Requiere APIs de pago extras para ser real)
        if (tipo === 'video') {
            return res.json({ resultado: "https://www.w3schools.com/html/mov_bbb.mp4", tipo: 'video' });
        }
        if (tipo === 'music') {
            return res.json({ resultado: "https://www.w3schools.com/html/horse.mp3", tipo: 'audio' });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al conectar con la IA: " + error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Servidor LUIS IA funcionando en puerto ' + PORT));
