
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const app = express();

app.use(cors());
app.use(express.json());

// Servir la página web
app.use(express.static('public'));

// --- FUNCIÓN PARA GENERAR IMAGEN REAL (IA) ---
async function generarImagen(prompt) {
    // Usamos Pollinations.ai (Gratis, sin API Key)
    const encodedPrompt = encodeURIComponent(prompt + ", high quality, 4k, professional");
    const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1024&height=1024&nologo=true`;
    return imageUrl;
}

// --- FUNCIÓN PARA GENERAR MÚSICA (Placeholder) ---
async function generarMusica(prompt) {
    // NOTA: Esto devuelve un archivo de audio de prueba.
    // Para música real, necesitas una API Key de Suno AI, Udio, etc.
    return "https://www.w3schools.com/html/horse.mp3";
}

// --- FUNCIÓN PARA GENERAR VIDEO (Clips aleatorios) ---
function generarVideo() {
    // Lista de clips de video cortos y gratuitos (No son IA, pero son variados)
    const videosMuestra = [
        "https://www.w3schools.com/html/mov_bbb.mp4",
        "https://www.w3schools.com/html/movie.mp4",
        "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4"
    ];
    
    // Elegir uno al azar
    return videosMuestra[Math.floor(Math.random() * videosMuestra.length)];
}

// --- RUTA PRINCIPAL ---
app.post('/generar', async (req, res) => {
    const { tipo, prompt } = req.body;
    
    let resultado = '';
    let tipoResultado = '';

    try {
        if (tipo === 'logo' || tipo === '3d' || tipo === 'imagen') {
            resultado = await generarImagen(prompt);
            tipoResultado = 'imagen';
        } else if (tipo === 'music' || tipo === 'musica') {
            resultado = await generarMusica(prompt);
            tipoResultado = 'audio';
        } else if (tipo === 'video') {
            resultado = generarVideo(); // Llamamos a la función de video
            tipoResultado = 'video';
        } else {
            return res.status(400).json({ error: "Tipo no soportado" });
        }

        res.json({ resultado: resultado, tipo: tipoResultado });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al generar: " + error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Servidor LUIS IA funcionando'));
