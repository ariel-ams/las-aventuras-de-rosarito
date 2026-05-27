(function () {
const quizPool = [
  { question: "En donde nacio Rosario Vera Peñaloza?", options: ["La Rioja", "Buenos Aires", "Mendoza"], correct: 0 },
  { question: "Que fecha importante coincide con su cumpleaños?", options: ["Pascuas", "Navidad", "Dia de la primavera"], correct: 1 },
  { question: "Donde se encuentra la casa natal de Rosarito?", options: ["Carrizal", "Malanzan", "Atiles"], correct: 2 },
  { question: "Rosario era la menor de cuantas hermanas?", options: ["4", "2", "3"], correct: 0 },
  { question: "Que lugar ayudo a valorar?", options: ["La escuela y el jardin", "El estadio", "El aeropuerto"], correct: 0 },
];

const giftPool = [
  { name: "Las pelotitas de colores", prompt: "Elegí solo las pelotitas de lana.", correct: ["Pelota roja", "Pelota azul"], options: ["Pelota roja", "Pelota azul", "Cubo de madera", "Aro"] },
  { name: "Las tres formas colgantes", prompt: "Elegí la esfera, el cilindro y el cubo.", correct: ["Esfera de madera", "Cilindro de madera"], options: ["Esfera de madera", "Cilindro de madera", "Pelota de lana", "Aro"] },
  { name: "El cubo de ocho cubitos", prompt: "Elegí los cubitos iguales.", correct: ["Cubito de madera", "Cajita de cubitos"], options: ["Cubito de madera", "Cajita de cubitos", "Cilindro", "Palito"] },
  { name: "Los ladrillitos de madera", prompt: "Elegí las piezas largas como ladrillos.", correct: ["Ladrillito de madera", "Cajita de ladrillitos"], options: ["Ladrillito de madera", "Cajita de ladrillitos", "Cubito de madera", "Esfera"] },
  { name: "El cubo con triángulos", prompt: "Elegí cubos y piezas con forma de triángulo.", correct: ["Cubo entero", "Prisma triangular"], options: ["Cubo entero", "Prisma triangular", "Aro", "Pelota de lana"] },
  { name: "La caja de proporciones", prompt: "Elegí ladrillos, medios ladrillos y columnas.", correct: ["Ladrillo entero", "Medio ladrillo"], options: ["Ladrillo entero", "Medio ladrillo", "Cubito de madera", "Pelota de lana"] },
  { name: "Las figuras planas", prompt: "Elegí las figuras planas.", correct: ["Cuadrado plano", "Triángulo"], options: ["Cuadrado plano", "Triángulo", "Cubo", "Esfera"] },
  { name: "Las tablillas articuladas", prompt: "Elegí las tablillas que se pueden articular.", correct: ["Tablilla articulada", "Unión articulada"], options: ["Tablilla articulada", "Unión articulada", "Palito suelto", "Aro"] },
  { name: "Las maderitas flexibles", prompt: "Elegí las maderitas que se pueden doblar un poquito.", correct: ["Maderita flexible", "Maderita de color"], options: ["Maderita flexible", "Maderita de color", "Cubo", "Aro"] },
  { name: "Los palitos rectos", prompt: "Elegí los palitos rectos.", correct: ["Palito recto corto", "Palito recto largo"], options: ["Palito recto corto", "Palito recto largo", "Aro", "Pelota de lana"] },
  { name: "Los aros y curvas", prompt: "Elegí los aros, medios aros y cuartos de aro.", correct: ["Aro completo", "Medio aro"], options: ["Aro completo", "Medio aro", "Palito recto", "Cubo"] },
  { name: "Las lanitas para dibujar", prompt: "Elegí las lanitas de colores.", correct: ["Hebra de lana", "Pizarra"], options: ["Hebra de lana", "Pizarra", "Cubo", "Cilindro"] },
  { name: "Los puntitos de colores", prompt: "Elegí semillas, piedritas o lentejas de colores.", correct: ["Semillas de colores", "Lentejas de colores"], options: ["Semillas de colores", "Lentejas de colores", "Aro", "Hebra de lana"] },
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
  ["ladrillo", "ui-icon_puzzle"],
  ["columna", "ui-icon_puzzle"],
  ["madera", "ui-icon_puzzle"],
  ["tablilla", "ui-icon_puzzle"],
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
  if (!/[\u00c3\u00c2]/.test(text)) return text;
  try {
    return decodeURIComponent([...text].map((char) => {
      const code = char.charCodeAt(0);
      return code <= 255 ? `%${code.toString(16).padStart(2, "0")}` : encodeURIComponent(char);
    }).join(""));
  } catch {
    return text.replace(/\u00c2/g, "").replace(/\u00c3/g, "");
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

function slugKey(value) {
  return normalizeKey(value).replace(/\s+/g, "_");
}

function titleCase(value) {
  return repairText(value)
    .replace(/_/g, " ")
    .split(" ")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function sentenceLabel(value) {
  const replacements = {
    cuadricula: "cuadr\u00edcula",
    triangulo: "tri\u00e1ngulo",
    equilatero: "equil\u00e1tero",
    escaleno: "escaleno",
    isosceles: "is\u00f3sceles",
    rectangulo: "rect\u00e1ngulo",
    pequeno: "peque\u00f1o",
    rigido: "r\u00edgido",
    linea: "l\u00ednea",
    lineas: "l\u00edneas",
    circulo: "c\u00edrculo",
    circulos: "c\u00edrculos",
  };
  let label = repairText(value)
    .replace(/_/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
  Object.entries(replacements).forEach(([from, to]) => {
    label = label.replace(new RegExp(`\\b${from}\\b`, "g"), to);
  });
  label = label
    .replace(/\bmadera o papel\b/g, "madera")
    .replace(/\bhebra lana\b/g, "hebra de lana")
    .replace(/\bpelota lana\b/g, "pelota de lana")
    .replace(/\baro alambre\b/g, "aro")
    .replace(/\bpalito recto rigido\b/g, "palito recto")
    .replace(/\bcuadr\u00edcula de madera papel\b/g, "cuadr\u00edcula de madera");
  return label ? label.charAt(0).toUpperCase() + label.slice(1) : "";
}

function shortGiftLabel(value) {
  return sentenceLabel(value)
    .replace(" de lana", "")
    .replace("Tri\u00e1ngulo equil\u00e1tero", "Tri\u00e1ngulo")
    .replace("Tri\u00e1ngulo rect\u00e1ngulo", "Tri\u00e1ngulo")
    .replace("Tri\u00e1ngulo escaleno", "Tri\u00e1ngulo")
    .replace("Tri\u00e1ngulo is\u00f3sceles obtuso", "Tri\u00e1ngulo")
    .replace("Pelota multicolor", "Pelota")
    .replace("Cuadr\u00edcula de madera o papel", "Cuadr\u00edcula de madera")
    .replace("Pizarra para formar figuras", "Pizarra")
    .replace("Prisma triangular peque\u00f1o", "Prisma triangular")
    .replace("Anillo de otro tama\u00f1o", "Anillo")
    .replace("Figura hecha con bordes", "Figura con bordes")
    .replace("Conjunto de maderitas", "Maderitas")
    .replace("Hebra corta", "Hebra de lana")
    .replace("Hebra larga", "Hebra de lana")
    .replace("Hebra de color", "Hebra de lana");
}

function giftComponentSourceId(item) {
  if (typeof item === "string") return slugKey(item);
  return slugKey(item?.id || item?.label || item?.nombre || "");
}

function donOptionAssetKey(donId, sourceId) {
  const direct = {
    don_1: {
      pelota_roja: "don_1_pelota_roja",
      pelota_azul: "don_1_pelota_azul",
      pelota_amarilla: "don_1_pelota_amarilla",
      pelota_verde: "don_1_pelota_verde",
      pelota_violeta: "don_1_pelota_violeta",
      pelota_naranja: "don_1_pelota_naranja",
      cubo_de_madera: "don_1_cubo_de_madera",
      campana: "don_1_campana",
      pluma: "don_1_pluma",
      libro: "don_1_libro",
      regla: "don_1_regla",
      taza: "don_1_taza",
    },
    don_3: {
      cubito_madera: "don_3_cubito_madera",
      caja_cubitos: "don_3_caja_cubitos",
      esfera: "don_3_esfera",
      cilindro: "don_3_cilindro",
      aro: "don_3_aro",
      pluma: "don_3_pluma",
      pelota_lana: "don_3_pelota_lana",
      campana: "don_3_campana",
    },
    don_7: {
      cuadrado_plano: "don_7_cuadrado_plano",
      rectangulo_plano: "don_7_rectangulo_plano",
      triangulo_equilatero: "don_7_triangulo_plano",
      triangulo_rectangulo: "don_7_triangulo_plano",
      triangulo_escaleno: "don_7_triangulo_plano",
      triangulo_isosceles_obtuso: "don_7_triangulo_plano",
      triangulo_plano: "don_7_triangulo_plano",
      circulo_plano: "don_7_circulo_plano",
      semicirculo_plano: "don_7_semicirculo_plano",
      cubo: "don_7_cubo",
      esfera: "don_7_esfera",
      cilindro: "don_7_cilindro",
      campana: "don_7_campana",
      pluma: "don_7_pluma",
      tintero: "don_7_tintero",
    },
  };
  const key = direct[donId]?.[sourceId];
  return key ? `don-sprite-${key}` : "";
}


function componentIconKey(label) {
  if (OBJECT_ICON_KEYS[label]) return OBJECT_ICON_KEYS[label];
  const key = normalizeKey(label);
  const match = COMPONENT_ICON_RULES.find(([term]) => key.includes(term));
  return match ? match[1] : "ui-icon_sparkles";
}

function giftComponentLabel(item) {
  if (typeof item === "string") return shortGiftLabel(item);
  return shortGiftLabel(item?.label || item?.nombre || item?.id || "");
}

function buildGiftPoolFromDones(data) {
  const dones = Array.isArray(data) ? data : data?.dones;
  if (!Array.isArray(dones) || dones.length === 0) return giftPool;
  const parsed = dones.map((don) => {
    const correctPool = uniqueList((don.componentes_correctos || []).map((item) => ({
      sourceId: giftComponentSourceId(item),
      label: giftComponentLabel(item),
    })));
    const incorrectPool = uniqueList((don.componentes_incorrectos || don.distractores_recomendados || []).map((item) => ({
      sourceId: giftComponentSourceId(item),
      label: giftComponentLabel(item),
    })));
    if (correctPool.length < 2 || incorrectPool.length < 2) return null;
    const correct = sample(correctPool, 2).map((item, index) => ({
      id: `${don.id || "don"}-correct-${index}-${normalizeKey(item.label)}`,
      label: item.label,
      assetKey: donOptionAssetKey(don.id, item.sourceId),
      correct: true,
    }));
    const incorrect = sample(incorrectPool, 2).map((item, index) => ({
      id: `${don.id || "don"}-wrong-${index}-${normalizeKey(item.label)}`,
      label: item.label,
      assetKey: donOptionAssetKey(don.id, item.sourceId),
      correct: false,
    }));
    const imageKey = ["don_1", "don_3", "don_7"].includes(don.id) ? `don-sprite-${don.id}_main` : "";
    return {
      id: don.id,
      name: repairText(don.titulo_para_ninos || don.nombre || don.nombre_pdf || "Don de Rosarito"),
      imageKey,
      subtitle: repairText(don.nombre_pdf || don.nombre || ""),
      prompt: repairText(don.consigna_para_ninos || don.pregunta_principal || don.concepto || don.descripcion_docente || "Elegi los componentes correctos."),
      correct: correct.map((option) => option.id),
      options: shuffle([...correct, ...incorrect]).slice(0, 4),
      feedbackCorrect: repairText(don.feedback_correcto || "Muy bien."),
      feedbackIncorrect: repairText(don.feedback_incorrecto || "Intentalo nuevamente."),
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

function resetRunState(gameState) {
  gameState.achievements = [false, false, false];
  gameState.quizSet = sample(quizPool, 3);
  gameState.quizIndex = 0;
  gameState.giftSet = [];
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

window.RosaritoData = {
  quizPool,
  giftPool,
  componentIconKey,
  shuffle,
  sample,
  repairText,
  normalizeKey,
  titleCase,
  buildGiftPoolFromDones,
  buildPuzzlePool,
  buildHiddenObjectPool,
  selectHiddenObjects,
  loadPuzzleAssets,
  loadHiddenObjectAssets,
  resetRunState,
  directSceneFromUrl,
};
}());
