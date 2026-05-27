(function () {
const AUDIO_FILES = [
  // Add real recordings here when available:
  // { key: "voice.cover", path: "assets/audio/voice/cover.mp3" },
  // { key: "sfx.success", path: "assets/audio/sfx/success.mp3" },
];

const AUDIO_SCRIPT = {
  voice: {
    cover: "Rosarito nos invita a jugar en su libro magico.",
    mission: "Vamos a completar cuatro actividades para encender todas las estrellas.",
    prep: "Hoy vamos a ayudar a Rosarito a prepararse con sus dones. Mira el don y elige los objetos correctos.",
    quiz: "Escucha la pregunta y elige una respuesta.",
    puzzle: "Arma la imagen colocando cada pieza en su lugar.",
    objects: "Busca los objetos de ensenanza en la mesa.",
    confirm: "Muy bien. Ganaste una estrella. Toca siguiente para pasar la pagina.",
    final: "Completaste todas las actividades. Las cuatro estrellas estan encendidas.",
    transition: "Pasemos la pagina.",
  },
  feedback: {
    success: "Muy bien.",
    error: "Intentalo nuevamente.",
    complete: "Actividad completa.",
  },
  objects: {
    Cubo: "Esto es un cubo.",
    Esfera: "Esto es una esfera.",
    Zapato: "Esto es un zapato.",
    Peine: "Esto es un peine.",
    Tarjetas: "Estas son tarjetas de colores.",
    Flores: "Estas son flores de colores.",
    Llave: "Esto es una llave.",
    Reloj: "Esto es un reloj.",
    Semillas: "Estas son semillas para contar.",
    Fichas: "Estas son fichas para contar.",
    Tetera: "Esto es una tetera.",
    Bufanda: "Esto es una bufanda.",
    Bloques: "Estos son bloques para construir.",
    Palitos: "Estos son palitos para construir.",
    Sombrero: "Esto es un sombrero.",
    Cuchara: "Esto es una cuchara.",
    Tiza: "Esto es una tiza.",
    Pizarra: "Esto es una pizarra.",
    Campana: "Esto es una campana.",
    Florero: "Esto es un florero.",
    Libro: "Esto es un libro.",
    Lamina: "Esto es una lamina.",
    Pelota: "Esto es una pelota.",
    Boton: "Esto es un boton.",
    Palmas: "Estas son palmas para marcar el ritmo.",
    Lentes: "Estos son lentes.",
    Escoba: "Esto es una escoba.",
  },
};

function playTone(scene, type = "click") {
  const sfxKey = `sfx.${type}`;
  if (scene.cache.audio.exists(sfxKey)) {
    scene.sound.play(sfxKey);
    return;
  }
  if (!scene.sound || !scene.sound.context) return;
  const context = scene.sound.context;
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  const settings = {
    click: { frequency: 520, duration: 0.05, volume: 0.035, type: "sine" },
    hover: { frequency: 720, duration: 0.035, volume: 0.022, type: "triangle" },
    success: { frequency: 880, duration: 0.13, volume: 0.055, type: "sine" },
    error: { frequency: 180, duration: 0.16, volume: 0.045, type: "sawtooth" },
    page: { frequency: 330, duration: 0.22, volume: 0.035, type: "triangle" },
  }[type] || { frequency: 440, duration: 0.07, volume: 0.03, type: "sine" };
  oscillator.type = settings.type;
  oscillator.frequency.setValueAtTime(settings.frequency, context.currentTime);
  if (type === "success") oscillator.frequency.exponentialRampToValueAtTime(1174, context.currentTime + settings.duration);
  gain.gain.setValueAtTime(settings.volume, context.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + settings.duration);
  oscillator.connect(gain);
  gain.connect(context.destination);
  oscillator.start();
  oscillator.stop(context.currentTime + settings.duration);
}

function playAudioKey(scene, key) {
  if (key && scene.cache.audio.exists(key)) {
    scene.sound.play(key);
  }
}

window.RosaritoAudio = { AUDIO_FILES, AUDIO_SCRIPT, playTone, playAudioKey };
}());
