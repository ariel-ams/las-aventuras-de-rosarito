const WIDTH = 1180;
const HEIGHT = 760;

const COLORS = {
  ink: 0x3e2b22,
  paper: 0xfff4dc,
  violet: 0x77559a,
  berry: 0xa54762,
  green: 0x6c9b77,
  teal: 0x3f817a,
  gold: 0xf0bd4e,
  clay: 0xb8784a,
  cream: 0xfff8e9,
  softBlue: 0x8ab7c6,
};

const LAYOUT = {
  book: { x: WIDTH / 2, y: HEIGHT / 2, width: WIDTH, height: HEIGHT },
  pageTurn: { x: WIDTH / 2 + 20, y: 378, scale: 2.04, frameDelay: 105 },
  rosarito: { x: 1010, y: 458, scale: 0.38 },
};

const UI_ASSETS = [
  "button_arrow_right",
  "button_audio",
  "button_long_purple",
  "card_arch_filled",
  "divider_heart_purple",
  "flower_cluster_bottom",
  "flower_cluster_left",
  "panel_task_floral",
  "panel_floral_wide",
  "notebook_panel",
  "speech_bottom_cream",
  "speech_large_cream",
  "speech_large_lilac",
  "label_long_cream",
  "score_star_panel",
  "icon_arrow_right",
  "icon_bag",
  "icon_bell",
  "icon_blackboard",
  "icon_book",
  "icon_chalk",
  "icon_check",
  "icon_exclaim",
  "icon_flower",
  "icon_heart",
  "icon_home",
  "icon_ink",
  "icon_mouse",
  "icon_puzzle",
  "icon_question",
  "icon_quill",
  "icon_restart",
  "icon_sparkles",
  "icon_star",
  "icon_tap",
  "icon_x",
  "grass_large",
  "title_tu_mision",
];

const MINIGAME2_ASSETS = [
  "answer_card_blue",
  "answer_card_green",
  "answer_card_pink",
  "flower_purple",
  "flower_red",
  "flower_yellow",
  "header_responde",
  "heart",
  "instruction_banner",
  "leaves",
  "plant_lavender",
  "plant_pink",
  "plant_yellow",
  "progress_badge",
  "question_badge",
  "question_panel",
  "speech_mouse",
  "speech_narrative",
];

const ROSARITO_SPRITE = {
  key: "rosarito-festejando",
  path: "assets/characters/rosarito_festejando.png",
  frameWidth: 362,
  frameHeight: 724,
  margin: 0,
  spacing: 0,
  frames: 6,
};

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

const gameState = {
  achievements: [false, false, false, false],
  quizSet: [],
  quizIndex: 0,
  donPool: [],
  giftSet: [],
  giftIndex: 0,
  puzzlePool: [],
  puzzleSet: [],
  puzzleIndex: 0,
  hiddenObjectPool: [],
  hiddenObjectSet: [],
};

const quizPool = [
  { question: "Donde nacio Rosario Vera Penaloza?", options: ["La Rioja", "Buenos Aires", "Mendoza"], correct: 0 },
  { question: "Que impulso con mucho amor?", options: ["El jardin de infantes", "Los trenes", "La pintura de casas"], correct: 0 },
  { question: "Como aprendian mejor los ninos segun Rosarito?", options: ["Jugando y explorando", "Quedandose quietos", "Copiando muchas veces"], correct: 0 },
  { question: "Que usaba para ensenar?", options: ["Objetos y materiales", "Sombreros magicos", "Autos de carrera"], correct: 0 },
  { question: "Como recordamos a Rosario?", options: ["Como educadora", "Como marinera", "Como doctora de plantas"], correct: 0 },
  { question: "Que lugar ayudo a valorar?", options: ["La escuela y el jardin", "El estadio", "El aeropuerto"], correct: 0 },
  { question: "Que actitud acompana a aprender?", options: ["Curiosidad", "Enojo", "Apuro"], correct: 0 },
];

const giftPool = [
  { name: "Don de formas", prompt: "Elige las formas que ayudan a explorar.", correct: ["Cubo", "Esfera"], options: ["Cubo", "Esfera", "Zapato", "Peine"] },
  { name: "Don de colores", prompt: "Elige objetos para mirar y comparar colores.", correct: ["Tarjetas", "Flores"], options: ["Tarjetas", "Flores", "Llave", "Reloj"] },
  { name: "Don de conteo", prompt: "Elige materiales para contar.", correct: ["Semillas", "Fichas"], options: ["Semillas", "Fichas", "Tetera", "Bufanda"] },
  { name: "Don de construccion", prompt: "Elige piezas para construir.", correct: ["Bloques", "Palitos"], options: ["Bloques", "Palitos", "Sombrero", "Cuchara"] },
  { name: "Don de trazos", prompt: "Elige objetos para dibujar y trazar.", correct: ["Tiza", "Pizarra"], options: ["Tiza", "Pizarra", "Campana", "Florero"] },
  { name: "Don de lectura", prompt: "Elige objetos para contar historias.", correct: ["Libro", "Lamina"], options: ["Libro", "Lamina", "Pelota", "Boton"] },
  { name: "Don de ritmo", prompt: "Elige objetos para escuchar y repetir ritmos.", correct: ["Campana", "Palmas"], options: ["Campana", "Palmas", "Lentes", "Escoba"] },
];

const OBJECT_ICON_KEYS = {
  Tiza: "ui-icon_chalk",
  Pizarra: "ui-icon_blackboard",
  Campana: "ui-icon_bell",
  Libro: "ui-icon_book",
  Lamina: "ui-icon_book",
  Bloques: "ui-icon_puzzle",
  Fichas: "ui-icon_star",
  Semillas: "ui-icon_flower",
  Flores: "ui-icon_flower",
  Tarjetas: "ui-panel_task_floral",
  Cubo: "ui-icon_puzzle",
  Esfera: "ui-icon_sparkles",
  Palitos: "ui-icon_quill",
  Palmas: "ui-icon_tap",
  Llave: "ui-icon_home",
  Reloj: "ui-icon_restart",
  Zapato: "ui-icon_x",
  Peine: "ui-icon_x",
  Tetera: "ui-icon_x",
  Bufanda: "ui-icon_x",
  Sombrero: "ui-icon_x",
  Cuchara: "ui-icon_x",
  Florero: "ui-icon_flower",
  Pelota: "ui-icon_sparkles",
  Boton: "ui-icon_heart",
  Lentes: "ui-icon_question",
  Escoba: "ui-icon_x",
};

const COMPONENT_ICON_RULES = [
  ["pelota", "ui-icon_sparkles"],
  ["lana", "ui-icon_sparkles"],
  ["esfera", "ui-icon_sparkles"],
  ["cubo", "ui-icon_puzzle"],
  ["cubito", "ui-icon_puzzle"],
  ["bloque", "ui-icon_puzzle"],
  ["prisma", "ui-icon_puzzle"],
  ["tablita", "ui-icon_puzzle"],
  ["cilindro", "ui-icon_restart"],
  ["aro", "ui-icon_restart"],
  ["anillo", "ui-icon_restart"],
  ["circulo", "ui-icon_restart"],
  ["palito", "ui-icon_quill"],
  ["liston", "ui-icon_quill"],
  ["varilla", "ui-icon_quill"],
  ["linea", "ui-icon_quill"],
  ["puntito", "ui-icon_star"],
  ["fichita", "ui-icon_star"],
  ["cuenta", "ui-icon_star"],
  ["semilla", "ui-icon_flower"],
  ["piedrita", "ui-icon_star"],
  ["cuadrado", "ui-icon_blackboard"],
  ["triangulo", "ui-icon_exclaim"],
  ["rectangulo", "ui-icon_blackboard"],
  ["semicirculo", "ui-icon_restart"],
  ["campana", "ui-icon_bell"],
  ["pluma", "ui-icon_quill"],
  ["libro", "ui-icon_book"],
  ["regla", "ui-icon_chalk"],
  ["taza", "ui-icon_x"],
  ["corazon", "ui-icon_heart"],
  ["estrella", "ui-icon_star"],
  ["flor", "ui-icon_flower"],
  ["tintero", "ui-icon_ink"],
  ["tiza", "ui-icon_chalk"],
  ["pizarra", "ui-icon_blackboard"],
];

function componentIconKey(label) {
  if (OBJECT_ICON_KEYS[label]) return OBJECT_ICON_KEYS[label];
  const key = normalizeKey(label);
  const match = COMPONENT_ICON_RULES.find(([term]) => key.includes(term));
  return match ? match[1] : "ui-icon_sparkles";
}

const puzzleShapes = [
  [
    [0, 0], [145, 0], [132, 72], [150, 150], [0, 150], [15, 82],
  ],
  [
    [0, 0], [150, 0], [150, 150], [4, 150], [18, 76],
  ],
  [
    [0, 0], [150, 0], [132, 72], [146, 150], [0, 150],
  ],
  [
    [18, 0], [150, 0], [150, 150], [0, 150], [8, 78],
  ],
];

function shuffle(list) {
  return [...list].sort(() => Math.random() - 0.5);
}

function sample(list, count) {
  return shuffle(list).slice(0, count);
}

function uniqueList(list) {
  return [...new Set(list.filter(Boolean))];
}

function repairText(value) {
  const text = String(value || "");
  if (!/[ÃÂ]/.test(text)) return text;
  try {
    return decodeURIComponent([...text].map((char) => {
      const code = char.charCodeAt(0);
      return code <= 255 ? `%${code.toString(16).padStart(2, "0")}` : encodeURIComponent(char);
    }).join(""));
  } catch {
    return text.replace(/Â/g, "");
  }
}

function normalizeKey(value) {
  return repairText(value)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function titleCase(value) {
  return repairText(value)
    .split(" ")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function buildGiftPoolFromDones(dones) {
  if (!Array.isArray(dones) || dones.length === 0) return giftPool;
  const parsed = dones.map((don) => {
    const correctPool = uniqueList((don.componentes_correctos || []).map(titleCase));
    const incorrectPool = uniqueList((don.componentes_incorrectos || []).map(titleCase));
    if (correctPool.length < 2 || incorrectPool.length < 2) return null;
    const correct = sample(correctPool, 2).map((label, index) => ({
      id: `${don.id || "don"}-correct-${index}-${normalizeKey(label)}`,
      label,
      correct: true,
    }));
    const incorrect = sample(incorrectPool, 2).map((label, index) => ({
      id: `${don.id || "don"}-wrong-${index}-${normalizeKey(label)}`,
      label,
      correct: false,
    }));
    return {
      id: don.id,
      name: repairText(don.titulo_para_ninos || don.nombre),
      subtitle: repairText(don.nombre || ""),
      prompt: repairText(don.concepto || ""),
      correct: correct.map((option) => option.id),
      options: shuffle([...correct, ...incorrect]).slice(0, 4),
      feedbackCorrect: repairText(don.feedback_correcto || AUDIO_SCRIPT.feedback.success),
      feedbackIncorrect: repairText(don.feedback_incorrecto || AUDIO_SCRIPT.feedback.error),
    };
  }).filter(Boolean);
  return parsed.length ? parsed : giftPool;
}

function buildPuzzlePool(data) {
  const list = Array.isArray(data?.puzzles) ? data.puzzles : [];
  return list
    .filter((puzzle) => puzzle?.previewKey && puzzle?.preview && Array.isArray(puzzle.pieces) && puzzle.pieces.length === 4)
    .map((puzzle) => ({
      ...puzzle,
      title: repairText(puzzle.title || "Rompecabezas de Rosario"),
      description: repairText(puzzle.description || "Arma la imagen con sus piezas."),
      pieces: puzzle.pieces.map((piece) => ({
        ...piece,
        id: Number(piece.id),
        centerX: Number(piece.centerX),
        centerY: Number(piece.centerY),
      })),
    }));
}

function buildHiddenObjectPool(data) {
  const list = Array.isArray(data?.objects) ? data.objects : [];
  return list
    .filter((obj) => obj?.id && obj?.label && obj?.iconKey && obj?.spriteKey)
    .map((obj) => ({
      ...obj,
      label: repairText(obj.label),
      x: Number(obj.x),
      y: Number(obj.y),
      xRatio: Number(obj.xRatio),
      yRatio: Number(obj.yRatio),
      widthRatio: Number(obj.widthRatio),
      heightRatio: Number(obj.heightRatio),
      width: Number(obj.width),
      height: Number(obj.height),
      hitPadding: Number(obj.hitPadding || 15),
      required: Boolean(obj.required),
    }));
}

function selectHiddenObjects(pool) {
  const required = pool.filter((obj) => obj.required);
  const optional = pool.filter((obj) => !obj.required);
  const selected = [...required, ...sample(optional, Math.max(0, 4 - required.length))];
  return selected.slice(0, 4);
}

function loadPuzzleAssets(scene, puzzles, onComplete) {
  let queued = false;
  puzzles.forEach((puzzle) => {
    if (!scene.textures.exists(puzzle.previewKey)) {
      scene.load.image(puzzle.previewKey, puzzle.preview);
      queued = true;
    }
    puzzle.pieces.forEach((piece) => {
      if (!scene.textures.exists(piece.key)) {
        scene.load.image(piece.key, piece.path);
        queued = true;
      }
    });
  });
  if (!queued) {
    onComplete();
    return;
  }
  scene.load.once("complete", onComplete);
  scene.load.start();
}

function loadHiddenObjectAssets(scene, objects, onComplete) {
  let queued = false;
  const data = scene.cache.json.get("hiddenObjects") || {};
  const background = data.background || {};
  if (background.key && background.path && !scene.textures.exists(background.key)) {
    scene.load.image(background.key, background.path);
    queued = true;
  }
  if (!scene.textures.exists("hidden-glow")) {
    scene.load.image("hidden-glow", "assets/hiddenObjects/highlights/soft_ring.png");
    queued = true;
  }
  Object.values(data.ui || {}).forEach((asset) => {
    if (asset.key && asset.path && !scene.textures.exists(asset.key)) {
      scene.load.image(asset.key, asset.path);
      queued = true;
    }
  });
  objects.forEach((obj) => {
    if (!scene.textures.exists(obj.iconKey)) {
      scene.load.image(obj.iconKey, obj.icon);
      queued = true;
    }
    if (!scene.textures.exists(obj.spriteKey)) {
      scene.load.image(obj.spriteKey, obj.sprite);
      queued = true;
    }
  });
  if (!queued) {
    onComplete();
    return;
  }
  scene.load.once("complete", onComplete);
  scene.load.start();
}

function resetRun() {
  gameState.achievements = [false, false, false, false];
  gameState.quizSet = sample(quizPool, 3);
  gameState.quizIndex = 0;
  gameState.giftSet = sample(gameState.donPool.length ? gameState.donPool : giftPool, 3);
  gameState.giftIndex = 0;
  gameState.puzzleSet = gameState.puzzlePool.slice(0, Math.min(3, gameState.puzzlePool.length));
  gameState.puzzleIndex = 0;
  gameState.hiddenObjectSet = selectHiddenObjects(gameState.hiddenObjectPool);
}

function directSceneFromUrl() {
  const value = new URLSearchParams(window.location.search).get("scene");
  const key = normalizeKey(value || "");
  return {
    cover: "Cover",
    inicio: "Cover",
    dones: "PrepGame",
    prep: "PrepGame",
    regalos: "PrepGame",
    preguntas: "QuizGame",
    quiz: "QuizGame",
    infancia: "QuizGame",
    puzzle: "PuzzleGame",
    rompecabezas: "PuzzleGame",
    objetos: "ObjectsGame",
    objects: "ObjectsGame",
    final: "Final",
  }[key] || "Cover";
}

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

function playAudioKey(scene, key, fallbackText = "") {
  if (key && scene.cache.audio.exists(key)) {
    scene.sound.play(key);
    return;
  }
  if (!fallbackText || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(fallbackText);
  utterance.lang = "es-AR";
  utterance.rate = 0.88;
  utterance.pitch = 1.08;
  window.speechSynthesis.speak(utterance);
}

class BootScene extends Phaser.Scene {
  constructor() {
    super("Boot");
  }

  preload() {
    this.load.image("book-bg", "assets/book/background.png");
    this.load.image("minigame2-left-bg", "assets/sprites/minigame2_left_background.png");
    for (let i = 1; i <= 6; i += 1) {
      this.load.image(`page-turn-${i}`, `assets/page_turn/page_turn_${i}.png`);
    }
    UI_ASSETS.forEach((key) => this.load.image(`ui-${key}`, `assets/ui/selected/${key}.png`));
    MINIGAME2_ASSETS.forEach((key) => this.load.image(`m2-${key}`, `assets/ui/minigame2/${key}.png`));
    this.load.json("dones", "src/dones.json");
    this.load.json("puzzles", "assets/puzzles/puzzles.json");
    this.load.json("hiddenObjects", "assets/hiddenObjects/objects.json");
    this.load.spritesheet(ROSARITO_SPRITE.key, ROSARITO_SPRITE.path, {
      frameWidth: ROSARITO_SPRITE.frameWidth,
      frameHeight: ROSARITO_SPRITE.frameHeight,
      margin: ROSARITO_SPRITE.margin,
      spacing: ROSARITO_SPRITE.spacing,
    });
    AUDIO_FILES.forEach((audio) => this.load.audio(audio.key, audio.path));
  }

  create() {
    this.anims.create({
      key: "rosarito-celebrate",
      frames: this.anims.generateFrameNumbers(ROSARITO_SPRITE.key, { start: 0, end: ROSARITO_SPRITE.frames - 1 }),
      frameRate: 7,
      repeat: 0,
    });
    gameState.donPool = buildGiftPoolFromDones(this.cache.json.get("dones"));
    gameState.puzzlePool = buildPuzzlePool(this.cache.json.get("puzzles"));
    gameState.hiddenObjectPool = buildHiddenObjectPool(this.cache.json.get("hiddenObjects"));
    resetRun();
    loadPuzzleAssets(this, gameState.puzzleSet, () => {
      loadHiddenObjectAssets(this, gameState.hiddenObjectPool, () => this.scene.start(directSceneFromUrl()));
    });
  }
}

class BaseScene extends Phaser.Scene {
  createBook(title, subtitle = "", options = {}) {
    const { progress = true } = options;
    document.body.dataset.scene = this.scene.key;
    this.cameras.main.setBackgroundColor("#557b72");
    this.add.image(LAYOUT.book.x, LAYOUT.book.y, "book-bg").setDisplaySize(LAYOUT.book.width, LAYOUT.book.height);
    this.add.image(52, 690, "ui-grass_large").setScale(0.64).setAlpha(0.92);
    this.add.image(56, 86, "ui-button_audio").setDisplaySize(82, 82).setInteractive({ useHandCursor: true })
      .on("pointerover", () => playTone(this, "hover"))
      .on("pointerdown", () => {
        playTone(this, "click");
        if (this.currentVoiceKey) playAudioKey(this, `voice.${this.currentVoiceKey}`, AUDIO_SCRIPT.voice[this.currentVoiceKey]);
      });
    this.add.text(112, 70, title, {
      fontFamily: "Comic Sans MS, Trebuchet MS, Arial",
      fontSize: "34px",
      fontStyle: "bold",
      color: "#3e2b22",
      wordWrap: { width: 450 },
    });
    if (subtitle) {
      this.add.text(112, 128, subtitle, {
        fontFamily: "Comic Sans MS, Trebuchet MS, Arial",
        fontSize: "22px",
        color: "#5d4437",
        lineSpacing: 8,
        wordWrap: { width: 430 },
      });
    }
    this.rosaritoSprite = this.add.sprite(LAYOUT.rosarito.x, LAYOUT.rosarito.y, ROSARITO_SPRITE.key, 0)
      .setScale(LAYOUT.rosarito.scale)
      .setDepth(3);
    if (progress) this.drawProgress();
  }

  drawProgress() {
    for (let i = 0; i < 4; i += 1) {
      const x = 770 + i * 76;
      const star = this.add.image(x, 96, "ui-icon_star").setDisplaySize(50, 50);
      if (!gameState.achievements[i]) star.setTint(0xd0c2b0).setAlpha(0.65);
      this.add.text(x, 94, String(i + 1), {
        fontFamily: "Comic Sans MS, Trebuchet MS, Arial",
        fontSize: "18px",
        fontStyle: "bold",
        color: "#3e2b22",
      }).setOrigin(0.5);
    }
  }

  celebrateRosarito() {
    if (!this.rosaritoSprite) return;
    this.rosaritoSprite.play("rosarito-celebrate");
  }

  makeButton(x, y, label, onClick, width = 250) {
    const button = this.add.container(x, y);
    const bg = this.add.image(0, 0, "ui-button_long_purple").setDisplaySize(width, 82);
    const text = this.add.text(0, 0, label, {
      fontFamily: "Comic Sans MS, Trebuchet MS, Arial",
      fontSize: "24px",
      fontStyle: "bold",
      color: "#fff8e9",
    }).setOrigin(0.5);
    button.add([bg, text]);
    button.setSize(width, 82).setInteractive({ useHandCursor: true });
    button.on("pointerover", () => {
      button.setScale(1.03);
      playTone(this, "hover");
    });
    button.on("pointerout", () => button.setScale(1));
    button.on("pointerdown", () => {
      playTone(this, "click");
      onClick();
    });
    return button;
  }

  makeNextButton(label, nextScene) {
    const button = this.add.image(1098, 675, "ui-button_arrow_right").setDisplaySize(126, 126).setInteractive({ useHandCursor: true });
    this.add.text(935, 688, label, {
      fontFamily: "Comic Sans MS, Trebuchet MS, Arial",
      fontSize: "23px",
      fontStyle: "bold",
      color: "#fff8e9",
    }).setOrigin(0.5);
    button.on("pointerover", () => {
      button.setDisplaySize(138, 138);
      playTone(this, "hover");
    });
    button.on("pointerout", () => button.setDisplaySize(126, 126));
    button.on("pointerdown", () => {
      playTone(this, "click");
      this.scene.start("PageTransition", { next: nextScene });
    });
    return button;
  }

  makeCoverMissionCard(x, y, number, label, iconKey, onClick = null) {
    const card = this.add.container(x, y);
    const bg = this.add.image(0, 8, "ui-card_arch_filled").setDisplaySize(126, 150);
    const badge = this.add.image(-46, -64, "ui-icon_flower").setDisplaySize(50, 50);
    const num = this.add.text(-46, -66, String(number), {
      fontFamily: "Comic Sans MS, Trebuchet MS, Arial",
      fontSize: "22px",
      fontStyle: "bold",
      color: "#fff8e9",
    }).setOrigin(0.5);
    const icon = this.add.image(0, -18, iconKey).setDisplaySize(68, 58);
    const title = this.add.text(0, 58, label, {
      fontFamily: "Comic Sans MS, Trebuchet MS, Arial",
      fontSize: "14px",
      fontStyle: "bold",
      color: "#3e2b22",
      align: "center",
      wordWrap: { width: 102 },
      lineSpacing: 2,
    }).setOrigin(0.5);
    card.add([bg, badge, num, icon, title]);
    card.setSize(126, 156).setInteractive({ useHandCursor: true });
    card.on("pointerover", () => {
      card.setScale(1.04);
      playTone(this, "hover");
    });
    card.on("pointerout", () => card.setScale(1));
    card.on("pointerdown", () => {
      playTone(this, "click");
      if (onClick) onClick();
    });
    return card;
  }

  drawStarCounter(x = 1048, y = 96, value = 0) {
    this.add.image(x, y, "ui-score_star_panel").setDisplaySize(118, 88).setDepth(5);
    this.add.text(x + 13, y, String(value), {
      fontFamily: "Comic Sans MS, Trebuchet MS, Arial",
      fontSize: "30px",
      fontStyle: "bold",
      color: "#3e2b22",
    }).setOrigin(0.5).setDepth(6);
  }

  makeQuizAnswerCard(x, y, option, index, onClick) {
    const cardKeys = ["m2-answer_card_green", "m2-answer_card_blue", "m2-answer_card_pink"];
    const iconKeys = ["ui-icon_home", "ui-icon_blackboard", "ui-icon_flower"];
    const card = this.add.container(x, y);
    const bg = this.add.image(0, 0, cardKeys[index % cardKeys.length]).setDisplaySize(175, 240);
    const icon = this.add.image(0, -52, iconKeys[index % iconKeys.length]).setDisplaySize(92, 76);
    const text = this.add.text(0, 63, option, {
      fontFamily: "Comic Sans MS, Trebuchet MS, Arial",
      fontSize: "18px",
      color: "#3e2b22",
      align: "center",
      wordWrap: { width: 135 },
      lineSpacing: 4,
    }).setOrigin(0.5);
    const heart = this.add.image(0, 117, "m2-heart").setDisplaySize(32, 30);
    card.add([bg, icon, text, heart]);
    card.setDepth(8);
    card.setSize(175, 240).setInteractive({ useHandCursor: true });
    card.on("pointerover", () => {
      card.setScale(1.04);
      playTone(this, "hover");
    });
    card.on("pointerout", () => card.setScale(1));
    card.on("pointerdown", () => {
      playTone(this, "click");
      playAudioKey(this, `voice.quiz.${index}`, option);
      onClick(card);
    });
    return card;
  }

  makeChoiceCard(x, y, label, onClick, width = 230, color = COLORS.violet, voiceText = "") {
    const card = this.add.container(x, y);
    const bg = this.add.image(0, 0, "ui-panel_task_floral").setDisplaySize(width, 86);
    const text = this.add.text(0, 0, label, {
      fontFamily: "Comic Sans MS, Trebuchet MS, Arial",
      fontSize: "23px",
      fontStyle: "bold",
      color: "#4a3026",
      align: "center",
      wordWrap: { width: width - 22 },
    }).setOrigin(0.5);
    card.add([bg, text]);
    card.setSize(width, 86).setInteractive({ useHandCursor: true });
    card.on("pointerdown", () => {
      playTone(this, "click");
      if (voiceText) playAudioKey(this, `voice.object.${label}`, voiceText);
      onClick();
    });
    card.on("pointerover", () => {
      card.setScale(1.03);
      playTone(this, "hover");
    });
    card.on("pointerout", () => card.setScale(1));
    return card;
  }

  makeComponentOption(x, y, option, onClick, voiceText = "") {
    const labelText = typeof option === "string" ? option : option.label;
    const card = this.add.container(x, y);
    const bg = this.add.image(0, -8, "ui-panel_task_floral").setDisplaySize(150, 126);
    const icon = this.add.image(0, -25, componentIconKey(labelText)).setDisplaySize(64, 64);
    const label = this.add.text(0, 66, labelText, {
      fontFamily: "Comic Sans MS, Trebuchet MS, Arial",
      fontSize: "17px",
      fontStyle: "bold",
      color: "#3e2b22",
      align: "center",
      wordWrap: { width: 135 },
    }).setOrigin(0.5);
    card.add([bg, icon, label]);
    card.setSize(150, 156).setInteractive({ useHandCursor: true });
    card.on("pointerdown", () => {
      playTone(this, "click");
      if (voiceText) playAudioKey(this, `voice.object.${labelText}`, voiceText);
      onClick(card);
    });
    card.on("pointerover", () => {
      card.setScale(1.04);
      playTone(this, "hover");
    });
    card.on("pointerout", () => card.setScale(1));
    return card;
  }

  feedback(message, good = true) {
    playTone(this, good ? "success" : "error");
    playAudioKey(this, good ? "voice.feedback.success" : "voice.feedback.error", good ? AUDIO_SCRIPT.feedback.success : AUDIO_SCRIPT.feedback.error);
    const panel = this.add.container(WIDTH / 2, 145);
    panel.add(this.add.image(0, 0, good ? "ui-speech_large_lilac" : "ui-speech_large_cream").setDisplaySize(690, 126));
    panel.add(this.add.image(-292, -2, good ? "ui-icon_check" : "ui-icon_x").setDisplaySize(54, 54));
    panel.add(this.add.text(35, 0, message, {
      fontFamily: "Comic Sans MS, Trebuchet MS, Arial",
      fontSize: "22px",
      fontStyle: "bold",
      color: "#3e2b22",
      align: "center",
      wordWrap: { width: 565 },
    }).setOrigin(0.5));
    this.tweens.add({ targets: panel, y: 120, alpha: 0, delay: 850, duration: 500, onComplete: () => panel.destroy() });
  }

  narrateScreen(key) {
    playAudioKey(this, `voice.${key}`, AUDIO_SCRIPT.voice[key]);
  }
}

class PageTransitionScene extends Phaser.Scene {
  constructor() {
    super("PageTransition");
  }

  create(data) {
    document.body.dataset.scene = "PageTransition";
    this.cameras.main.setBackgroundColor("#557b72");
    playTone(this, "page");
    playAudioKey(this, "voice.transition", AUDIO_SCRIPT.voice.transition);
    this.add.image(LAYOUT.book.x, LAYOUT.book.y, "book-bg").setDisplaySize(LAYOUT.book.width, LAYOUT.book.height);
    const page = this.add.image(LAYOUT.pageTurn.x, LAYOUT.pageTurn.y, "page-turn-1").setScale(LAYOUT.pageTurn.scale).setAlpha(0.98);
    const keys = [1, 2, 3, 4, 5, 6].map((i) => `page-turn-${i}`);
    let frame = 1;
    this.time.addEvent({
      delay: LAYOUT.pageTurn.frameDelay,
      repeat: keys.length - 2,
      callback: () => {
        page.setTexture(keys[frame]);
        frame += 1;
      },
    });
    this.tweens.add({ targets: page, alpha: 1, duration: 520, ease: "Sine.easeInOut" });
    this.time.delayedCall(760, () => this.scene.start(data.next));
  }
}

class CoverScene extends BaseScene {
  constructor() {
    super("Cover");
  }

  create() {
    this.createBook("", "", { progress: false });
    this.rosaritoSprite.setPosition(220, 500).setScale(0.54).setDepth(8);
    this.narrateScreen("cover");
    this.add.ellipse(220, 666, 170, 32, 0x5b3f2d, 0.18).setDepth(2);

    this.add.image(150, 160, "ui-flower_cluster_left").setDisplaySize(120, 78).setAngle(-8).setDepth(4);
    this.add.image(407, 166, "ui-flower_cluster_bottom").setDisplaySize(146, 96).setAngle(5).setDepth(4);
    this.add.image(344, 246, "ui-divider_heart_purple").setDisplaySize(230, 52).setDepth(4);

    this.add.text(205, 82, "La aventura de", {
      fontFamily: "Comic Sans MS, Trebuchet MS, Arial",
      fontSize: "38px",
      fontStyle: "bold",
      color: "#6a3d8f",
      stroke: "#f6e2ba",
      strokeThickness: 4,
    }).setDepth(5);
    this.add.text(205, 124, "Rosarito", {
      fontFamily: "Comic Sans MS, Trebuchet MS, Arial",
      fontSize: "78px",
      fontStyle: "bold",
      color: "#6a3d8f",
      stroke: "#f6e2ba",
      strokeThickness: 5,
    }).setDepth(5);

    this.add.image(438, 360, "ui-speech_bottom_cream").setDisplaySize(302, 142).setDepth(6);
    this.add.text(443, 353, "Ayuda a Rosarito a aprender, jugar y recordar su historia.", {
      fontFamily: "Comic Sans MS, Trebuchet MS, Arial",
      fontSize: "22px",
      color: "#3e2b22",
      lineSpacing: 5,
      wordWrap: { width: 218 },
      align: "center",
    }).setOrigin(0.5).setDepth(7);

    this.add.image(440, 568, "ui-speech_large_lilac").setDisplaySize(250, 134).setDepth(6);
    this.add.text(440, 555, "Usa el mouse para explorar.", {
      fontFamily: "Comic Sans MS, Trebuchet MS, Arial",
      fontSize: "20px",
      color: "#3e2b22",
      lineSpacing: 4,
      wordWrap: { width: 170 },
      align: "center",
    }).setOrigin(0.5).setDepth(7);
    this.add.image(440, 616, "ui-icon_mouse").setDisplaySize(58, 58).setDepth(7);

    this.add.image(650, 666, "ui-flower_cluster_bottom").setDisplaySize(150, 96).setDepth(5);
    this.add.image(90, 450, "ui-flower_cluster_left").setDisplaySize(96, 58).setAngle(-18).setDepth(4);

    this.drawStarCounter(1044, 96, gameState.achievements.filter(Boolean).length);
    this.add.image(860, 112, "ui-speech_large_lilac").setDisplaySize(300, 98).setDepth(5);
    this.add.text(860, 112, "Tu mision", {
      fontFamily: "Comic Sans MS, Trebuchet MS, Arial",
      fontSize: "42px",
      fontStyle: "bold",
      color: "#6a3d8f",
    }).setOrigin(0.5).setDepth(6);
    this.add.image(860, 232, "ui-speech_large_cream").setDisplaySize(440, 138).setAlpha(0.9).setDepth(4);
    this.add.text(860, 226, "Completa las actividades para conocer la vida y el legado de Rosarito.", {
      fontFamily: "Comic Sans MS, Trebuchet MS, Arial",
      fontSize: "22px",
      color: "#3e2b22",
      align: "center",
      wordWrap: { width: 340 },
      lineSpacing: 4,
    }).setOrigin(0.5).setDepth(5);
    this.add.image(860, 298, "ui-icon_heart").setDisplaySize(34, 34).setDepth(5);

    const startTestScene = (sceneKey) => {
      resetRun();
      this.scene.start(sceneKey);
    };
    const cards = [
      ["Dones", "ui-icon_bag", "PrepGame"],
      ["Infancia", "ui-icon_question", "QuizGame"],
      ["Puzzle", "ui-icon_puzzle", "PuzzleGame"],
      ["Objetos", "ui-icon_ink", "ObjectsGame"],
    ];
    cards.forEach(([label, icon, sceneKey], i) => {
      this.makeCoverMissionCard(700 + i * 118, 435, i + 1, label, icon, () => startTestScene(sceneKey)).setDepth(6);
    });
    this.add.text(895, 505, "Toca una tarjeta para probar una actividad.", {
      fontFamily: "Comic Sans MS, Trebuchet MS, Arial",
      fontSize: "14px",
      color: "#6a3d8f",
      fontStyle: "bold",
    }).setOrigin(0.5).setDepth(6);

    this.add.image(858, 605, "ui-notebook_panel").setDisplaySize(420, 144).setDepth(4);
    this.add.image(708, 606, "ui-icon_book").setDisplaySize(84, 72).setDepth(5);
    this.add.image(1014, 605, "ui-icon_star").setDisplaySize(84, 84).setDepth(5);
    this.add.text(846, 570, "Gran objetivo", {
      fontFamily: "Comic Sans MS, Trebuchet MS, Arial",
      fontSize: "26px",
      fontStyle: "bold",
      color: "#6a3d8f",
    }).setOrigin(0.5).setDepth(5);
    this.add.text(848, 615, "Completa las actividades y gana el album de Rosarito.", {
      fontFamily: "Comic Sans MS, Trebuchet MS, Arial",
      fontSize: "17px",
      color: "#3e2b22",
      align: "center",
      wordWrap: { width: 235 },
      lineSpacing: 2,
    }).setOrigin(0.5).setDepth(5);

    const start = this.makeButton(1010, 706, "Comenzar", () => {
      resetRun();
      this.scene.start("PrepGame");
    }, 280);
    start.setDepth(10);
    this.add.image(1120, 706, "ui-icon_arrow_right").setDisplaySize(48, 42).setDepth(11);
    this.add.image(1088, 685, "ui-flower_cluster_bottom").setDisplaySize(86, 58).setDepth(11);
    this.input.keyboard?.on("keydown-ONE", () => startTestScene("PrepGame"));
    this.input.keyboard?.on("keydown-TWO", () => startTestScene("QuizGame"));
    this.input.keyboard?.on("keydown-THREE", () => startTestScene("PuzzleGame"));
    this.input.keyboard?.on("keydown-FOUR", () => startTestScene("ObjectsGame"));
  }
}

class PrepGameScene extends BaseScene {
  constructor() {
    super("PrepGame");
  }

  create() {
    this.createBook("Los dones de Rosarito", "Observa el don y toca solo los componentes correctos.");
    this.rosaritoSprite.setPosition(1082, 595).setScale(0.19);
    this.narrateScreen("prep");
    this.selected = new Set();
    this.showGift();
  }

  showGift() {
    const gift = gameState.giftSet[gameState.giftIndex];
    this.add.image(218, 236, "ui-label_long_cream").setDisplaySize(270, 70);
    this.add.text(218, 236, `Don ${gameState.giftIndex + 1} de 3`, {
      fontFamily: "Comic Sans MS, Trebuchet MS, Arial",
      fontSize: "27px",
      fontStyle: "bold",
      color: "#3e2b22",
    }).setOrigin(0.5);
    this.add.image(305, 400, "ui-speech_large_lilac").setDisplaySize(435, 250);
    this.add.image(305, 266, "ui-icon_sparkles").setDisplaySize(54, 54);
    this.add.text(305, 348, gift.name, { fontFamily: "Comic Sans MS, Trebuchet MS, Arial", fontSize: "29px", fontStyle: "bold", color: "#5b3277", wordWrap: { width: 330 }, align: "center" }).setOrigin(0.5);
    this.add.text(305, 418, gift.prompt, { fontFamily: "Comic Sans MS, Trebuchet MS, Arial", fontSize: "19px", color: "#3e2b22", wordWrap: { width: 330 }, align: "center", lineSpacing: 4 }).setOrigin(0.5);
    this.add.image(305, 525, "ui-label_long_cream").setDisplaySize(280, 62).setAlpha(0.95);
    this.add.text(305, 525, "Imagen del don", {
      fontFamily: "Comic Sans MS, Trebuchet MS, Arial",
      fontSize: "20px",
      color: "#6a3d8f",
    }).setOrigin(0.5);
    this.add.image(855, 344, "ui-speech_large_cream").setDisplaySize(510, 286).setAlpha(0.86);
    this.add.text(855, 205, "Componentes del don", {
      fontFamily: "Comic Sans MS, Trebuchet MS, Arial",
      fontSize: "24px",
      fontStyle: "bold",
      color: "#6a3d8f",
      align: "center",
      wordWrap: { width: 410 },
    }).setOrigin(0.5);
    gift.options.forEach((option, i) => {
      const x = 745 + (i % 2) * 220;
      const y = 330 + Math.floor(i / 2) * 132;
      this.makeComponentOption(x, y, option, (card) => this.pickGiftObject(option, gift, card), AUDIO_SCRIPT.objects[option.label]);
    });
    this.add.image(865, 572, "ui-label_long_cream").setDisplaySize(360, 70);
    this.add.image(690, 572, "ui-icon_star").setDisplaySize(62, 62);
    this.add.text(885, 572, "Elige 2 objetos correctos.", { fontFamily: "Comic Sans MS, Trebuchet MS, Arial", fontSize: "23px", color: "#3e2b22", wordWrap: { width: 255 }, align: "center" }).setOrigin(0.5);
  }

  pickGiftObject(option, gift, card) {
    const optionId = typeof option === "string" ? option : option.id;
    if (this.selected.has(optionId)) return;
    if (!gift.correct.includes(optionId)) {
      this.feedback(gift.feedbackIncorrect || "Ese objeto no va con este don", false);
      return;
    }
    this.selected.add(optionId);
    if (card) {
      card.disableInteractive();
      card.setAlpha(0.78);
      card.add(this.add.image(54, -62, "ui-icon_check").setDisplaySize(42, 42));
    }
    this.feedback(gift.feedbackCorrect || "Muy bien!", true);
    this.add.star(660 + this.selected.size * 42, 590, 5, 12, 24, COLORS.gold).setStrokeStyle(3, 0x8a6534);
    if (this.selected.size === gift.correct.length) {
      gameState.giftIndex += 1;
      if (gameState.giftIndex >= gameState.giftSet.length) {
        gameState.achievements[0] = true;
        this.celebrateRosarito();
        this.time.delayedCall(1450, () => this.scene.start("Confirm", { index: 0, next: "QuizGame" }));
      } else {
        this.time.delayedCall(850, () => {
          this.selected.clear();
          this.scene.restart();
        });
      }
    }
  }
}

class QuizGameScene extends BaseScene {
  constructor() {
    super("QuizGame");
  }

  create() {
    this.createBook("", "", { progress: false });
    this.rosaritoSprite.setPosition(190, 465).setScale(0.48).setDepth(8);
    this.narrateScreen("quiz");
    this.add.ellipse(190, 650, 150, 28, 0x5b3f2d, 0.18).setDepth(2);

    this.add.image(355, 462, "minigame2-left-bg").setDisplaySize(440, 350).setDepth(3).setAlpha(0.94);
    this.add.text(210, 72, "La infancia de", {
      fontFamily: "Comic Sans MS, Trebuchet MS, Arial",
      fontSize: "40px",
      fontStyle: "bold",
      color: "#6a3d8f",
      stroke: "#f6e2ba",
      strokeThickness: 4,
    }).setDepth(5);
    this.add.text(210, 124, "Rosario", {
      fontFamily: "Comic Sans MS, Trebuchet MS, Arial",
      fontSize: "82px",
      fontStyle: "bold",
      color: "#6a3d8f",
      stroke: "#f6e2ba",
      strokeThickness: 5,
    }).setDepth(5);
    this.add.image(345, 238, "ui-divider_heart_purple").setDisplaySize(230, 52).setDepth(5);
    this.add.image(145, 145, "ui-flower_cluster_left").setDisplaySize(105, 68).setDepth(5).setAngle(-8);
    this.add.image(465, 145, "ui-flower_cluster_bottom").setDisplaySize(118, 78).setDepth(5);

    this.add.image(410, 338, "m2-speech_narrative").setDisplaySize(244, 168).setDepth(7);
    this.add.text(414, 327, "Cuando Rosarito era nina, vivio momentos especiales que la ayudaron a sonar en grande.", {
      fontFamily: "Comic Sans MS, Trebuchet MS, Arial",
      fontSize: "16px",
      color: "#3e2b22",
      align: "center",
      wordWrap: { width: 168 },
      lineSpacing: 2,
    }).setOrigin(0.5).setDepth(8);
    this.add.image(414, 415, "m2-heart").setDisplaySize(28, 26).setDepth(8);

    this.add.image(355, 610, "m2-speech_mouse").setDisplaySize(205, 148).setDepth(7);
    this.add.text(355, 582, "Usa el mouse para elegir la respuesta correcta.", {
      fontFamily: "Comic Sans MS, Trebuchet MS, Arial",
      fontSize: "16px",
      color: "#3e2b22",
      align: "center",
      wordWrap: { width: 132 },
      lineSpacing: 2,
    }).setOrigin(0.5).setDepth(8);
    this.add.image(355, 650, "ui-icon_mouse").setDisplaySize(48, 48).setDepth(8);

    this.drawStarCounter(1126, 82, gameState.achievements.filter(Boolean).length);
    this.add.image(864, 92, "m2-header_responde").setDisplaySize(380, 74).setDepth(5);
    this.add.image(884, 188, "m2-instruction_banner").setDisplaySize(430, 62).setDepth(4);
    this.add.text(884, 186, "Haz clic en la respuesta correcta.", {
      fontFamily: "Comic Sans MS, Trebuchet MS, Arial",
      fontSize: "22px",
      color: "#3e2b22",
      align: "center",
    }).setOrigin(0.5).setDepth(5);
    this.add.image(884, 225, "m2-heart").setDisplaySize(30, 28).setDepth(5);
    this.add.image(1142, 140, "m2-leaves").setDisplaySize(70, 48).setDepth(3).setAngle(16);
    this.add.image(1100, 646, "m2-plant_lavender").setDisplaySize(46, 96).setDepth(3);
    this.add.image(1150, 642, "m2-plant_pink").setDisplaySize(56, 98).setDepth(3);
    this.showQuestion();
  }

  showQuestion() {
    const q = gameState.quizSet[gameState.quizIndex];
    this.add.image(884, 310, "m2-question_panel").setDisplaySize(470, 78).setDepth(5);
    this.add.image(650, 310, "m2-question_badge").setDisplaySize(66, 86).setDepth(6);
    this.add.text(650, 311, String(gameState.quizIndex + 1), {
      fontFamily: "Comic Sans MS, Trebuchet MS, Arial",
      fontSize: "36px",
      fontStyle: "bold",
      color: "#fff8e9",
    }).setOrigin(0.5).setDepth(7);
    this.add.image(1103, 286, "m2-progress_badge").setDisplaySize(68, 70).setDepth(6);
    this.add.text(1103, 286, `${gameState.quizIndex + 1}/3`, {
      fontFamily: "Comic Sans MS, Trebuchet MS, Arial",
      fontSize: "22px",
      fontStyle: "bold",
      color: "#fff8e9",
    }).setOrigin(0.5).setDepth(7);
    this.add.text(888, 310, q.question, {
      fontFamily: "Comic Sans MS, Trebuchet MS, Arial",
      fontSize: "27px",
      color: "#3e2b22",
      align: "center",
      wordWrap: { width: 360 },
      lineSpacing: 4,
    }).setOrigin(0.5).setDepth(7);
    this.add.image(884, 350, "m2-heart").setDisplaySize(30, 28).setDepth(7);
    q.options.forEach((option, i) => {
      this.makeQuizAnswerCard(720 + i * 170, 526, option, i, (card) => {
        if (i === q.correct) {
          card.disableInteractive();
          card.add(this.add.image(58, -104, "ui-icon_check").setDisplaySize(42, 42));
          this.feedback("Respuesta correcta!", true);
          gameState.quizIndex += 1;
          if (gameState.quizIndex >= gameState.quizSet.length) {
            gameState.achievements[1] = true;
            this.celebrateRosarito();
            this.time.delayedCall(1450, () => this.scene.start("Confirm", { index: 1, next: "PuzzleGame" }));
          } else {
            this.time.delayedCall(650, () => this.scene.restart());
          }
        } else {
          this.feedback("Probemos otra vez", false);
        }
      });
    });
  }
}

class PuzzleGameScene extends BaseScene {
  constructor() {
    super("PuzzleGame");
  }

  create() {
    this.createBook("", "", { progress: false });
    this.rosaritoSprite.setPosition(170, 480).setScale(0.48).setDepth(8);
    this.narrateScreen("puzzle");
    this.done = 0;
    this.puzzle = gameState.puzzleSet[gameState.puzzleIndex] || gameState.puzzlePool[0];
    if (!this.puzzle) {
      this.add.text(590, 360, "Agrega imagenes en assets/puzzles/source para jugar.", {
        fontFamily: "Comic Sans MS, Trebuchet MS, Arial",
        fontSize: "28px",
        color: "#3e2b22",
        align: "center",
        wordWrap: { width: 640 },
      }).setOrigin(0.5);
      return;
    }
    this.drawPuzzleStoryPage();
    const board = this.drawPuzzleBoard(this.puzzle);
    this.drawPuzzleTray(board);
    this.createLockedNextButton();
    this.spawnPuzzlePieces(board);
    this.input.on("dragstart", (pointer, gameObject) => this.startPieceDrag(gameObject, board));
    this.input.on("drag", (pointer, gameObject, dragX, dragY) => {
      if (!gameObject.getData("locked")) {
        gameObject.setPosition(dragX, dragY);
      }
    });
    this.input.on("dragend", (pointer, gameObject) => this.finishPieceDrag(gameObject, board));
  }

  drawPuzzleStoryPage() {
    this.add.ellipse(170, 650, 142, 26, 0x5b3f2d, 0.18).setDepth(2);
    this.add.image(370, 94, "ui-label_long_cream").setDisplaySize(164, 52).setTint(0x8c63a8).setAlpha(0.86).setDepth(4);
    this.add.text(370, 94, "Juego 3", {
      fontFamily: "Comic Sans MS, Trebuchet MS, Arial",
      fontSize: "26px",
      fontStyle: "bold",
      color: "#fff8e9",
    }).setOrigin(0.5).setDepth(5);
    this.add.text(352, 142, "El rompecabezas", {
      fontFamily: "Comic Sans MS, Trebuchet MS, Arial",
      fontSize: "43px",
      fontStyle: "bold",
      color: "#6a3d8f",
      stroke: "#f6e2ba",
      strokeThickness: 4,
    }).setOrigin(0.5).setDepth(5);
    this.add.text(365, 205, "de Rosario", {
      fontFamily: "Comic Sans MS, Trebuchet MS, Arial",
      fontSize: "48px",
      fontStyle: "bold",
      color: "#6a3d8f",
      stroke: "#f6e2ba",
      strokeThickness: 4,
    }).setOrigin(0.5).setDepth(5);
    this.add.image(402, 256, "ui-divider_heart_purple").setDisplaySize(235, 50).setDepth(5);
    this.add.image(156, 154, "ui-flower_cluster_left").setDisplaySize(76, 54).setDepth(4).setAngle(-8);
    this.add.image(505, 174, "ui-flower_cluster_bottom").setDisplaySize(92, 58).setDepth(4);

    this.add.image(408, 340, "ui-speech_large_cream").setDisplaySize(300, 132).setDepth(7);
    this.add.text(414, 336, "Vamos a armar la imagen de Rosario Vera Penaloza!", {
      fontFamily: "Comic Sans MS, Trebuchet MS, Arial",
      fontSize: "23px",
      color: "#3e2b22",
      align: "center",
      wordWrap: { width: 220 },
      lineSpacing: 4,
    }).setOrigin(0.5).setDepth(8);

    this.add.image(430, 520, "ui-speech_large_lilac").setDisplaySize(280, 170).setDepth(7);
    this.add.text(430, 510, "Arrastra cada pieza al lugar correcto para completar la imagen.", {
      fontFamily: "Comic Sans MS, Trebuchet MS, Arial",
      fontSize: "17px",
      color: "#3e2b22",
      align: "center",
      wordWrap: { width: 170 },
      lineSpacing: 2,
    }).setOrigin(0.5).setDepth(8);
    this.add.image(430, 580, "ui-icon_mouse").setDisplaySize(48, 48).setDepth(8);

    this.add.image(275, 654, "ui-notebook_panel").setDisplaySize(360, 116).setDepth(5).setAlpha(0.96);
    this.add.image(174, 650, this.puzzle.previewKey).setDisplaySize(118, 82).setDepth(6).setAlpha(0.92);
    this.add.image(356, 613, "ui-label_long_cream").setDisplaySize(150, 46).setTint(0x8c63a8).setDepth(6);
    this.add.text(356, 613, "De su vida real", {
      fontFamily: "Comic Sans MS, Trebuchet MS, Arial",
      fontSize: "16px",
      fontStyle: "bold",
      color: "#fff8e9",
    }).setOrigin(0.5).setDepth(7);
    this.add.text(366, 663, this.puzzle.description, {
      fontFamily: "Comic Sans MS, Trebuchet MS, Arial",
      fontSize: "15px",
      color: "#3e2b22",
      align: "center",
      wordWrap: { width: 172 },
      lineSpacing: 2,
    }).setOrigin(0.5).setDepth(7);
    this.add.image(510, 656, "ui-icon_flower").setDisplaySize(42, 42).setDepth(7);
  }

  drawPuzzleBoard(puzzle) {
    this.drawStarCounter(1110, 84, gameState.achievements.filter(Boolean).length);
    this.add.image(884, 128, "ui-label_long_cream").setDisplaySize(410, 66).setDepth(4);
    this.add.text(884, 126, "Arma la imagen con las piezas.", {
      fontFamily: "Comic Sans MS, Trebuchet MS, Arial",
      fontSize: "23px",
      color: "#3e2b22",
    }).setOrigin(0.5).setDepth(5);
    this.add.image(884, 166, "m2-heart").setDisplaySize(30, 28).setDepth(5);
    this.add.image(1140, 156, "m2-leaves").setDisplaySize(72, 52).setAngle(22).setDepth(4);

    const board = { x: 885, y: 365, size: 390 };
    board.scale = board.size / 512;
    const frame = this.add.graphics().setDepth(4);
    frame.fillStyle(0xb992d6, 0.78);
    frame.fillRoundedRect(board.x - board.size / 2 - 14, board.y - board.size / 2 - 14, board.size + 28, board.size + 28, 22);
    frame.lineStyle(4, 0x7c529a, 0.95);
    frame.strokeRoundedRect(board.x - board.size / 2 - 14, board.y - board.size / 2 - 14, board.size + 28, board.size + 28, 22);
    frame.lineStyle(2, 0xf0d1ff, 0.76);
    frame.strokeRoundedRect(board.x - board.size / 2 - 5, board.y - board.size / 2 - 5, board.size + 10, board.size + 10, 16);
    this.add.rectangle(board.x, board.y, board.size, board.size, 0xf7e5c4, 0.62).setDepth(4);
    this.add.image(board.x, board.y, puzzle.previewKey).setDisplaySize(board.size, board.size).setAlpha(0.22).setDepth(5);
    this.drawPuzzleSlotLines(board);
    return board;
  }

  drawPuzzleSlotLines(board) {
    const g = this.add.graphics().setDepth(6);
    const left = board.x - board.size / 2;
    const top = board.y - board.size / 2;
    const midX = board.x;
    const midY = board.y;
    g.lineStyle(3, 0xc99d68, 0.72);
    g.beginPath();
    g.moveTo(midX, top);
    g.lineTo(midX, board.y - 54);
    g.strokeCircle(midX + 26, board.y - 28, 25);
    g.moveTo(midX, board.y - 2);
    g.lineTo(midX, top + board.size);
    g.moveTo(left, midY);
    g.lineTo(board.x - 62, midY);
    g.strokeCircle(board.x - 35, midY - 23, 24);
    g.moveTo(board.x - 8, midY);
    g.lineTo(left + board.size, midY);
    g.strokePath();
    g.lineStyle(2, 0xffffff, 0.48);
    g.strokeRoundedRect(left, top, board.size, board.size, 14);
  }

  drawPuzzleTray(board) {
    const tray = this.add.graphics().setDepth(4);
    tray.fillStyle(0xffeed0, 0.9);
    tray.fillRoundedRect(660, 590, 470, 108, 20);
    tray.lineStyle(3, 0xd4a76d, 0.8);
    tray.strokeRoundedRect(660, 590, 470, 108, 20);
    tray.lineStyle(2, 0xe7c18d, 0.58);
    tray.strokeRoundedRect(672, 602, 446, 84, 14);
    this.add.image(690, 606, "ui-icon_sparkles").setDisplaySize(32, 32).setDepth(5).setAlpha(0.78);
    this.add.image(1090, 682, "ui-flower_cluster_bottom").setDisplaySize(84, 48).setDepth(5);
    this.traySlots = shuffle([
      { x: 704, y: 644 }, { x: 806, y: 644 }, { x: 908, y: 644 }, { x: 1010, y: 644 },
    ]);
    this.trayScale = board.scale * 0.4;
  }

  spawnPuzzlePieces(board) {
    const pieces = shuffle(this.puzzle.pieces);
    pieces.forEach((piece, index) => {
      const tray = this.traySlots[index];
      const targetX = board.x - board.size / 2 + piece.centerX * board.scale;
      const targetY = board.y - board.size / 2 + piece.centerY * board.scale;
      const image = this.add.image(tray.x, tray.y, piece.key)
        .setScale(this.trayScale)
        .setDepth(12)
        .setInteractive({ useHandCursor: true });
      image.setData("piece", {
        id: piece.id,
        targetX,
        targetY,
        trayX: tray.x,
        trayY: tray.y,
      });
      image.setData("locked", false);
      image.on("pointerover", () => {
        if (image.getData("locked")) return;
        playTone(this, "hover");
        this.tweens.add({ targets: image, scale: this.trayScale * 1.07, duration: 120 });
      });
      image.on("pointerout", () => {
        if (image.getData("locked")) return;
        this.tweens.add({ targets: image, scale: this.trayScale, duration: 120 });
      });
      image.on("pointerdown", () => playTone(this, "click"));
      this.input.setDraggable(image);
    });
  }

  startPieceDrag(piece, board) {
    if (piece.getData("locked")) return;
    piece.setDepth(30);
    this.tweens.killTweensOf(piece);
    this.tweens.add({ targets: piece, scale: board.scale * 1.04, duration: 120 });
  }

  finishPieceDrag(piece, board) {
    if (piece.getData("locked")) return;
    const data = piece.getData("piece");
    const distance = Phaser.Math.Distance.Between(piece.x, piece.y, data.targetX, data.targetY);
    if (distance < 78) {
      piece.setData("locked", true);
      piece.disableInteractive();
      this.tweens.add({
        targets: piece,
        x: data.targetX,
        y: data.targetY,
        scale: board.scale,
        duration: 220,
        ease: "Back.easeOut",
      });
      this.add.star(data.targetX + 36, data.targetY - 34, 5, 7, 15, COLORS.gold).setStrokeStyle(2, 0x8a6534).setDepth(31);
      this.done += 1;
      playTone(this, "success");
      if (this.done === 4) this.completePuzzle();
    } else {
      this.feedback("Casi! Mira la guia y prueba otra vez.", false);
      this.tweens.add({
        targets: piece,
        x: data.trayX,
        y: data.trayY,
        scale: this.trayScale,
        duration: 280,
        ease: "Sine.easeOut",
      });
    }
  }

  createLockedNextButton() {
    this.nextButton = this.add.container(1095, 675).setAlpha(0.42).setDepth(20);
    this.nextButton.add(this.add.image(0, 0, "ui-button_arrow_right").setDisplaySize(126, 126));
    this.nextButton.add(this.add.text(-118, 12, "Siguiente", {
      fontFamily: "Comic Sans MS, Trebuchet MS, Arial",
      fontSize: "22px",
      fontStyle: "bold",
      color: "#fff8e9",
    }).setOrigin(0.5));
  }

  enableNextButton() {
    this.nextButton.setAlpha(1).setInteractive(new Phaser.Geom.Rectangle(-168, -63, 230, 126), Phaser.Geom.Rectangle.Contains);
    this.nextButton.on("pointerover", () => {
      this.nextButton.setScale(1.04);
      playTone(this, "hover");
    });
    this.nextButton.on("pointerout", () => this.nextButton.setScale(1));
    this.nextButton.on("pointerdown", () => {
      playTone(this, "click");
      gameState.puzzleIndex += 1;
      if (gameState.puzzleIndex >= gameState.puzzleSet.length) {
        this.scene.start("PageTransition", { next: "ObjectsGame" });
      } else {
        this.scene.start("PageTransition", { next: "PuzzleGame" });
      }
    });
  }

  completePuzzle() {
    this.feedback("Imagen completa!", true);
    gameState.achievements[2] = true;
    this.celebrateRosarito();
    this.enableNextButton();
  }
}

class ObjectsGameScene extends BaseScene {
  constructor() {
    super("ObjectsGame");
  }

  create() {
    this.createBook("", "", { progress: false });
    this.rosaritoSprite.setPosition(150, 485).setScale(0.45).setDepth(8);
    this.narrateScreen("objects");
    this.found = 0;
    this.activeObjects = gameState.hiddenObjectSet.length ? gameState.hiddenObjectSet : selectHiddenObjects(gameState.hiddenObjectPool);
    this.checkItems = new Map();
    this.drawObjectsStoryPage();
    this.drawSearchScene();
    this.createObjectsNextButton();
    this.activeObjects.forEach((obj, index) => this.drawChecklistItem(obj, index));
    this.activeObjects.forEach((obj) => this.drawHiddenObject(obj));
  }

  drawObjectsStoryPage() {
    this.add.ellipse(170, 650, 142, 26, 0x5b3f2d, 0.18).setDepth(2);
    this.add.text(330, 72, "Los objetos de", {
      fontFamily: "Comic Sans MS, Trebuchet MS, Arial",
      fontSize: "42px",
      fontStyle: "bold",
      color: "#6a3d8f",
      stroke: "#f6e2ba",
      strokeThickness: 4,
    }).setOrigin(0.5).setDepth(5);
    this.add.text(360, 138, "Rosario", {
      fontFamily: "Comic Sans MS, Trebuchet MS, Arial",
      fontSize: "76px",
      fontStyle: "bold",
      color: "#6a3d8f",
      stroke: "#f6e2ba",
      strokeThickness: 5,
    }).setOrigin(0.5).setDepth(5);
    this.add.image(385, 208, "ui-divider_heart_purple").setDisplaySize(230, 50).setDepth(5);
    this.add.image(180, 105, "ui-flower_cluster_left").setDisplaySize(82, 58).setDepth(4).setAngle(-8);
    this.add.image(520, 120, "ui-flower_cluster_bottom").setDisplaySize(92, 60).setDepth(4);

    this.add.image(420, 294, "ui-speech_large_cream").setDisplaySize(288, 150).setDepth(7);
    this.add.text(422, 286, "Encuentra los objetos que usaba Rosario en su mision de ensenar a muchos ninos.", {
      fontFamily: "Comic Sans MS, Trebuchet MS, Arial",
      fontSize: "19px",
      color: "#3e2b22",
      align: "center",
      wordWrap: { width: 205 },
      lineSpacing: 3,
    }).setOrigin(0.5).setDepth(8);
    this.add.image(420, 372, "m2-heart").setDisplaySize(28, 26).setDepth(8);

    this.add.image(185, 632, "ui-speech_large_lilac").setDisplaySize(185, 120).setDepth(9);
    this.add.text(185, 612, "Haz clic cuando los veas.", {
      fontFamily: "Comic Sans MS, Trebuchet MS, Arial",
      fontSize: "18px",
      color: "#3e2b22",
      align: "center",
      wordWrap: { width: 115 },
      lineSpacing: 3,
    }).setOrigin(0.5).setDepth(10);
    this.add.image(185, 662, "ui-icon_mouse").setDisplaySize(42, 42).setDepth(10);

    this.add.image(452, 536, "hidden-ui-list_panel").setDisplaySize(300, 316).setDepth(5);
    this.add.image(452, 383, "hidden-ui-list_header").setDisplaySize(314, 92).setDepth(6);
    this.add.text(452, 383, "Puedes encontrarlos?", {
      fontFamily: "Comic Sans MS, Trebuchet MS, Arial",
      fontSize: "22px",
      fontStyle: "bold",
      color: "#fff8e9",
    }).setOrigin(0.5).setDepth(7);
    this.add.image(560, 656, "ui-flower_cluster_bottom").setDisplaySize(86, 54).setDepth(6);
  }

  drawSearchScene() {
    this.drawStarCounter(1110, 84, gameState.achievements.filter(Boolean).length);
    this.add.image(895, 92, "ui-label_long_cream").setDisplaySize(390, 70).setTint(0xb994d2).setDepth(5);
    this.add.text(895, 92, "Encuentra los objetos", {
      fontFamily: "Comic Sans MS, Trebuchet MS, Arial",
      fontSize: "28px",
      fontStyle: "bold",
      color: "#5b3277",
    }).setOrigin(0.5).setDepth(6);
    this.add.image(895, 137, "m2-heart").setDisplaySize(30, 28).setDepth(6);
    this.add.image(1140, 145, "m2-leaves").setDisplaySize(78, 56).setAngle(18).setDepth(4);

    this.sceneBounds = { x: 902, y: 378, width: 520, height: 430 };
    const frame = this.add.graphics().setDepth(4);
    frame.fillStyle(0xf6dfb6, 0.95);
    frame.fillRoundedRect(630, 136, 544, 484, 24);
    frame.lineStyle(5, 0xb990c7, 0.95);
    frame.strokeRoundedRect(630, 136, 544, 484, 24);
    frame.lineStyle(2, 0xf0d1ff, 0.76);
    frame.strokeRoundedRect(642, 148, 520, 460, 18);
    this.add.image(this.sceneBounds.x, this.sceneBounds.y, "hidden-classroom")
      .setDisplaySize(this.sceneBounds.width, this.sceneBounds.height)
      .setDepth(5);
    this.add.image(675, 588, "ui-flower_cluster_bottom").setDisplaySize(92, 58).setDepth(6);
    this.add.image(1138, 584, "ui-flower_cluster_left").setDisplaySize(74, 62).setAngle(14).setDepth(6);

    this.successPanel = this.add.container(896, 626).setAlpha(0).setDepth(14);
    this.successPanel.add(this.add.image(0, 0, "ui-label_long_cream").setDisplaySize(350, 80));
    this.successPanel.add(this.add.image(-152, -2, "m2-heart").setDisplaySize(28, 26));
    this.successPanel.add(this.add.text(18, 0, "Que bien! Rosario usaba estos objetos para ensenar con amor.", {
      fontFamily: "Comic Sans MS, Trebuchet MS, Arial",
      fontSize: "18px",
      color: "#3e2b22",
      align: "center",
      wordWrap: { width: 285 },
      lineSpacing: 2,
    }).setOrigin(0.5));
  }

  drawChecklistItem(obj, index) {
    const y = 456 + index * 48;
    const row = this.add.container(452, y).setDepth(8);
    row.add(this.add.image(0, 0, "hidden-ui-list_row").setDisplaySize(266, 50).setAlpha(0.48));
    row.add(this.add.image(-104, 0, obj.iconKey).setDisplaySize(38, 38));
    const label = this.add.text(-55, 0, obj.label, {
      fontFamily: "Comic Sans MS, Trebuchet MS, Arial",
      fontSize: "18px",
      color: "#3e2b22",
      wordWrap: { width: 148 },
    }).setOrigin(0, 0.5);
    const check = this.add.text(112, 0, "○", {
      fontFamily: "Comic Sans MS, Trebuchet MS, Arial",
      fontSize: "28px",
      fontStyle: "bold",
      color: "#b4864c",
    }).setOrigin(0.5);
    row.add([label, check]);
    this.checkItems.set(obj.id, { row, label, check });
  }

  drawHiddenObject(obj) {
    const bounds = this.sceneBounds;
    const objectX = Number.isFinite(obj.xRatio) ? bounds.x - bounds.width / 2 + bounds.width * obj.xRatio : obj.x;
    const objectY = Number.isFinite(obj.yRatio) ? bounds.y - bounds.height / 2 + bounds.height * obj.yRatio : obj.y;
    const objectWidth = Number.isFinite(obj.widthRatio) ? bounds.width * obj.widthRatio : obj.width;
    const objectHeight = Number.isFinite(obj.heightRatio) ? bounds.height * obj.heightRatio : obj.height;
    const target = this.add.container(objectX, objectY).setDepth(12);
    const displayMax = Math.max(objectWidth, objectHeight);
    const glow = this.add.image(0, 0, "hidden-glow").setDisplaySize(displayMax + 58, displayMax + 58).setAlpha(0.52);
    const sprite = this.add.image(0, 0, obj.spriteKey).setDisplaySize(objectWidth, objectHeight);
    target.add([glow, sprite]);
    const hitPadding = Math.max(obj.hitPadding, 34);
    target.setSize(objectWidth + hitPadding * 2, objectHeight + hitPadding * 2);
    target.setInteractive(new Phaser.Geom.Rectangle(
      -target.width / 2,
      -target.height / 2,
      target.width,
      target.height,
    ), Phaser.Geom.Rectangle.Contains);
    target.setData("object", { ...obj, x: objectX, y: objectY, width: objectWidth, height: objectHeight });
    target.setData("found", false);
    this.tweens.add({ targets: glow, alpha: 0.18, scale: 1.08, yoyo: true, repeat: -1, duration: 1200, ease: "Sine.easeInOut" });
    target.on("pointerover", () => {
      if (target.getData("found")) return;
      playTone(this, "hover");
      this.tweens.add({ targets: target, scale: 1.05, duration: 130 });
      glow.setAlpha(0.78);
    });
    target.on("pointerout", () => {
      if (target.getData("found")) return;
      this.tweens.add({ targets: target, scale: 1, duration: 130 });
      glow.setAlpha(0.52);
    });
    target.on("pointerdown", () => this.findHiddenObject(target));
  }

  findHiddenObject(target) {
    if (target.getData("found")) return;
    const obj = target.getData("object");
    target.setData("found", true);
    target.disableInteractive();
    playTone(this, "success");
    playAudioKey(this, `voice.object.${obj.label}`, AUDIO_SCRIPT.objects[obj.label] || obj.label);
    this.found += 1;
    const item = this.checkItems.get(obj.id);
    if (item) {
      item.check.setText("✓").setColor("#5d8f55");
      item.label.setAlpha(0.58);
      item.row.setAlpha(0.82);
    }
    this.tweens.add({ targets: target, scale: 1.16, alpha: 0.54, yoyo: true, duration: 180, onComplete: () => target.setAlpha(0.56) });
    this.add.star(obj.x + obj.width / 2, obj.y - obj.height / 2, 5, 8, 18, COLORS.gold).setStrokeStyle(2, 0x8a6534).setDepth(20);
    if (this.found >= this.activeObjects.length) {
      this.completeHiddenObjects();
    }
  }

  createObjectsNextButton() {
    this.nextButton = this.add.container(1095, 675).setAlpha(0.42).setDepth(20);
    this.nextButton.add(this.add.image(0, 0, "ui-button_arrow_right").setDisplaySize(126, 126));
    this.nextButton.add(this.add.text(-118, 12, "Siguiente", {
      fontFamily: "Comic Sans MS, Trebuchet MS, Arial",
      fontSize: "22px",
      fontStyle: "bold",
      color: "#fff8e9",
    }).setOrigin(0.5));
  }

  enableObjectsNextButton() {
    this.nextButton.setAlpha(1).setInteractive(new Phaser.Geom.Rectangle(-168, -63, 230, 126), Phaser.Geom.Rectangle.Contains);
    this.nextButton.on("pointerover", () => {
      this.nextButton.setScale(1.04);
      playTone(this, "hover");
    });
    this.nextButton.on("pointerout", () => this.nextButton.setScale(1));
    this.nextButton.on("pointerdown", () => {
      playTone(this, "click");
      this.scene.start("PageTransition", { next: "Final" });
    });
  }

  completeHiddenObjects() {
    gameState.achievements[3] = true;
    this.celebrateRosarito();
    this.feedback("Encontraste todos los objetos!", true);
    this.tweens.add({ targets: this.successPanel, alpha: 1, y: 610, duration: 280, ease: "Back.easeOut" });
    this.enableObjectsNextButton();
  }
}

class ConfirmScene extends BaseScene {
  constructor() {
    super("Confirm");
  }

  create(data) {
    const labels = ["Dones completos", "Preguntas completas", "Rompecabezas completo", "Objetos encontrados"];
    this.createBook("", "");
    this.rosaritoSprite.setPosition(965, 485).setScale(0.38);
    this.celebrateRosarito();
    this.narrateScreen("confirm");
    this.add.image(315, 365, "ui-icon_star").setDisplaySize(250, 250);
    this.add.text(315, 365, "OK", { fontSize: "60px", fontStyle: "bold", color: "#3e2b22" }).setOrigin(0.5);
    this.add.image(705, 220, "ui-panel_floral_wide").setDisplaySize(380, 125);
    this.add.text(705, 220, labels[data.index], { fontFamily: "Comic Sans MS, Trebuchet MS, Arial", fontSize: "31px", fontStyle: "bold", color: "#5b3277" }).setOrigin(0.5);
    this.add.text(610, 315, "Rosarito festeja contigo. Sigamos a la proxima pagina.", {
      fontFamily: "Comic Sans MS, Trebuchet MS, Arial",
      fontSize: "28px",
      color: "#3e2b22",
      lineSpacing: 10,
      wordWrap: { width: 260 },
    });
    this.makeNextButton("Siguiente", data.next);
  }
}

class FinalScene extends BaseScene {
  constructor() {
    super("Final");
  }

  create() {
    this.createBook("", "");
    this.rosaritoSprite.setPosition(975, 470).setScale(0.36);
    this.celebrateRosarito();
    this.narrateScreen("final");
    this.add.image(310, 140, "ui-speech_large_lilac").setDisplaySize(370, 132);
    this.add.text(310, 140, "Objetivos cumplidos", {
      fontFamily: "Comic Sans MS, Trebuchet MS, Arial",
      fontSize: "38px",
      fontStyle: "bold",
      color: "#6a3d8f",
    }).setOrigin(0.5);
    this.add.text(110, 245, "Las cuatro estrellas estan encendidas. Rosarito ya tiene sus dones, sus recuerdos y sus objetos de ensenanza.", {
      fontFamily: "Comic Sans MS, Trebuchet MS, Arial",
      fontSize: "30px",
      color: "#3e2b22",
      lineSpacing: 10,
      wordWrap: { width: 430 },
    });
    this.add.image(825, 360, "ui-icon_star").setDisplaySize(260, 260);
    this.add.text(825, 360, "4/4", { fontSize: "72px", fontStyle: "bold", color: "#3e2b22" }).setOrigin(0.5);
    this.makeButton(975, 710, "Jugar de nuevo", () => {
      resetRun();
      this.scene.start("Cover");
    }, 270);
  }
}

const config = {
  type: Phaser.AUTO,
  parent: "game",
  width: WIDTH,
  height: HEIGHT,
  backgroundColor: "#557b72",
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  scene: [BootScene, PageTransitionScene, CoverScene, PrepGameScene, QuizGameScene, PuzzleGameScene, ObjectsGameScene, ConfirmScene, FinalScene],
};

window.addEventListener("load", () => {
  if (!window.Phaser) {
    document.getElementById("game").innerHTML = '<div style="padding:32px;color:white;font-family:Arial">No se pudo cargar Phaser desde CDN. Con conexion a internet, recarga la pagina.</div>';
    return;
  }
  window.game = new Phaser.Game(config);
});
