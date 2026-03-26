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
    
    // Verificar si la imagen existe
    try {
        const response = await fetch(imageUrl);
        if (response.ok) {
            return imageUrl;
        } else {
            // Si falla, usar imagen de prueba
            return "https://www.w3schools.com/html/pic_trulli.jpg";
        }
    } catch (error) {
        return "https://www.w3schools.com/html/pic_trulli.jpg";
    }
}

// --- FUNCIÓN PARA GENERAR MÚSICA REAL (IA) ---
async function generarMusica(prompt) {
    // Usamos un servicio de música con IA (algunos requieren API Key, otros son gratuitos)
    // Opción 1: Usar un API de música gratuita (como MusicGen o similares)
    // Opción 2: Usar un API de música de pago (como Suno AI o Udio)
    // Para este ejemplo, usaremos un placeholder de música
    // Puedes reemplazar esto con tu propio API de música
    
    // Usaremos una API de música gratuita (MusicGen)
    const encodedPrompt = encodeURIComponent(prompt);
    const musicUrl = `https://api.musicgen.com/generate?prompt=${encodedPrompt}`; // API FICTICIA - REEMPLAZA CON TU API REAL
    
    // Por ahora, devolvemos un audio de prueba
    // Para implementar música real, necesitas:
    // 1. Una cuenta en Suno AI (https://suno.ai) o Udio (https://www.udio.com)
    // 2. Obtener una API Key
    // 3. Reemplazar la línea de arriba con tu código de API
    
    return "https://www.w3schools.com/html/horse.mp3";
}

// --- FUNCIÓN PARA GENERAR VIDEO (IA) ---
async function generarVideo(prompt) {
    // Las APIs de video (Runway, Pika, Sora) son de pago y no generan videos largos gratis.
    // Lo máximo que podemos hacer gratis son clips de 2-5 segundos.
    
    // Opción 1: Usar un API de video gratuita (como ModelScope o similares)
    // Opción 2: Usar un API de video de pago (como Runway o Pika)
    
    // Para este ejemplo, usaremos videos de muestra variados
    const videosMuestra = [
        "https://www.w3schools.com/html/mov_bbb.mp4",
        "https://www.w3schools.com/html/movie.mp4",
        "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
        "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
        "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
        "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4"
    ];
    
    // Elegir uno al azar
    const videoRandom = videosMuestra[Math.floor(Math.random() * videosMuestra.length)];
    
    return videoRandom;
}

// --- RUTA PRINCIPAL ---
app.post('/generar', async (req, res) => {
    const { tipo, prompt, duration } = req.body;
    
    try {
        let resultado;
        let tipoResultado;

        switch (tipo) {
            case 'logo':
            resultado = await generarImagen(prompt + " logo 3d professional");
                tipoResultado = 'imagen';
                break;
            case '3d':
                resultado = await generarImagen(prompt + " 3d render high quality");
                tipoResultado = 'imagen';
                break;
            case 'video':
                resultado = await generarVideo(prompt);
                tipoResultado = 'video';
                break;
            case 'music':
                resultado = await generarMusica(prompt);
                tipoResultado = 'audio';
                break;
            default:
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
