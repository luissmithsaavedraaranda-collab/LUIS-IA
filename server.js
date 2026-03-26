        // VIDEOS DE MUESTRA ALEATORIOS
        if (tipo === 'video') {
            const videosMuestra = [
                "https://www.w3schools.com/html/mov_bbb.mp4",
                "https://www.w3schools.com/html/movie.mp4",
                "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
                "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
            ];
            const videoRandom = videosMuestra[Math.floor(Math.random() * videosMuestra.length)];
            return res.json({ resultado: videoRandom, tipo: 'video' });
        }
