// CONFIGURACIÓN DE LAST.FM
const API_KEY = 'b8c139b1aa9525ba43a450e7414ec5d3'; 
const USER = 'ManHombre'; 
const url = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${USER}&api_key=${API_KEY}&format=json&limit=1`;

// FUNCIÓN PARA OBTENER MÚSICA ACTUAL
async function getNowPlaying() {
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        const track = data.recenttracks.track[0];
        const songInfo = document.getElementById('song-info');
        const musicBtn = document.getElementById('music-btn');

        if (track['@attr'] && track['@attr'].nowplaying) {
            songInfo.textContent = `${track.artist['#text']} - ${track.name}`;
            musicBtn.href = track.url;
            musicBtn.style.color = "#fa243c";
        } else {
            songInfo.textContent = 'En silencio...';
            musicBtn.style.color = "#ffffff";
            musicBtn.href = "#";
        }
    } catch (error) {
        console.error("Error obteniendo datos:", error);
        document.getElementById('song-info').textContent = 'Error al cargar';
    }
}

getNowPlaying();
setInterval(getNowPlaying, 15000);

// EASTER EGG DE ZELDA :D
let clickCount = 0;
const secretIcon = document.getElementById('zelda-secret');
const profileImage = document.querySelector('.image-wrapper'); 

secretIcon.addEventListener('click', () => {
    clickCount++;
    
    secretIcon.style.transform = `scale(${1 + (clickCount * 0.1)})`;
    setTimeout(() => { secretIcon.style.transform = 'scale(1)'; }, 100);

    if (clickCount === 5) {
        const audio = new Audio('zelda_secret.mp3');
        audio.play();
        
        profileImage.style.boxShadow = '0 0 30px #2ecc71, inset 0 0 15px #2ecc71';
        profileImage.style.transition = 'box-shadow 0.5s ease';
        
        clickCount = 0; 
        
        setTimeout(() => {
            profileImage.style.boxShadow = '5px 5px 15px rgba(0, 0, 0, 0.6), -3px -3px 10px rgba(255, 255, 255, 0.05)';
        }, 4000);
    }
});

// ==========================================
// MINI REPRODUCTOR DE MÚSICA
// ==========================================
// REPRODUCTOR ALEATORIO
const playlist = [
    { name: "Zelda: BOTW - Life in the Ruins", src: "./musica 1.mp3" },
    { name: "Deltarune - Dark Sanctuary", src: "./musica 2.mp3" },
    { name: "Zelda: The Wind Waker - Fairy Spring", src: "./musica 3.mp3" },
    { name: "Zelda: TOTK - Sidon Theme", src: "./musica 4.mp3" }
];

// VARIABLES
const audio = document.getElementById('bg-audio');
const playPauseBtn = document.getElementById('play-pause-btn');
const playIcon = document.getElementById('play-icon');
const trackStatus = document.querySelector('.track-status');
const trackName = document.getElementById('track-name');

// FUNCIÓN PARA CARGAR CANCIÓN
function cargarNuevaCancion() {
    const cancionAleatoria = playlist[Math.floor(Math.random() * playlist.length)];
    audio.src = cancionAleatoria.src;
    trackName.textContent = cancionAleatoria.name;

    // Reiniciar animación por si la canción anterior era larga
    trackName.classList.remove('scrolling-text');

    // Revisar tamaño con un pequeño retraso para que mida bien el nuevo texto
    setTimeout(() => {
        const contenedorTexto = document.querySelector('.marquee-container');
        if (trackName.scrollWidth > contenedorTexto.clientWidth) {
            trackName.classList.add('scrolling-text');
        }
    }, 50);
}

// CARGA INICIAL
cargarNuevaCancion();

// AUTO-PLAY AL HACER CLIC
let isPlaying = false;
let primerClic = false;

document.addEventListener('click', () => {
    if (!primerClic) {
        audio.play();
        playIcon.classList.remove('fa-play');
        playIcon.classList.add('fa-pause');
        trackStatus.textContent = 'Reproduciendo...';
        isPlaying = true;
        primerClic = true;
    }
});

// BOTÓN ESPECÍFICO PLAY/PAUSE
playPauseBtn.addEventListener('click', (evento) => {
    evento.stopPropagation(); 
    
    if (isPlaying) {
        audio.pause();
        playIcon.classList.remove('fa-pause');
        playIcon.classList.add('fa-play');
        trackStatus.textContent = 'Pausado';
    } else {
        audio.play();
        playIcon.classList.remove('fa-play');
        playIcon.classList.add('fa-pause');
        trackStatus.textContent = 'Reproduciendo...';
    }
    
    isPlaying = !isPlaying;
    primerClic = true; 
});

// PASAR A LA SIGUIENTE AL TERMINAR LA CANCIÓN
audio.addEventListener('ended', () => {
    cargarNuevaCancion();
    audio.play(); // Como ya hubo interacción, el navegador permite reproducir solita
});
