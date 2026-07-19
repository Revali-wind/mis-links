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
