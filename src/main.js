const { WIDTH, HEIGHT, COLORS, LAYOUT, PAGE_AREAS, SCENE_LAYOUTS } = window.RosaritoLayouts;
const { AUDIO_FILES, AUDIO_SCRIPT } = window.RosaritoAudio;
const RosaritoData = window.RosaritoData;

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

const MINIGAME1_UPDATE_ASSETS = [
  "minigame1_update_03",
  "minigame1_update_04",
  "minigame1_update_05",
  "minigame1_update_07",
  "minigame1_update_10",
  "minigame1_update_15",
  "minigame1_update2_02",
  "minigame1_update2_03",
  "minigame1_update2_04",
  "minigame1_update2_05",
  "minigame1_update2_06",
  "minigame1_update2_07",
  "minigame1_update3_02",
  "minigame1_update3_03",
  "minigame1_update3_04",
  "minigame1_update3_05",
  "minigame1_update3_06",
  "minigame1_update4_01",
  "minigame1_update4_02",
  "minigame1_update4_03",
  "minigame1_update4_27",
  "minigame1_update4_28",
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

const gameState = {
  achievements: [false, false, false],
  quizPool: [],
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

function componentIconKey(label) {
  return RosaritoData.componentIconKey(label);
}

function shuffle(list) {
  return RosaritoData.shuffle(list);
}

function buildGiftPoolFromDones(data) {
  return RosaritoData.buildGiftPoolFromDones(data);
}

function buildQuizPool(data) {
  return RosaritoData.buildQuizPool(data);
}

function buildPuzzlePool(data) {
  return RosaritoData.buildPuzzlePool(data);
}

function buildHiddenObjectPool(data) {
  return RosaritoData.buildHiddenObjectPool(data);
}

function selectHiddenObjects(pool) {
  return RosaritoData.selectHiddenObjects(pool);
}

function loadPuzzleAssets(scene, puzzles, onComplete) {
  return RosaritoData.loadPuzzleAssets(scene, puzzles, onComplete);
}

function loadHiddenObjectAssets(scene, objects, onComplete) {
  return RosaritoData.loadHiddenObjectAssets(scene, objects, onComplete);
}

function resetRun() {
  return RosaritoData.resetRunState(gameState);
}

function directSceneFromUrl() {
  return RosaritoData.directSceneFromUrl();
}

function requestImmersiveMode() {
  const root = document.documentElement;
  if (!document.fullscreenElement && root.requestFullscreen) {
    root.requestFullscreen({ navigationUI: "hide" }).catch(() => {});
  }
  if (screen.orientation?.lock) {
    screen.orientation.lock("landscape").catch(() => {});
  }
}

function playTone(scene, type = "click") {
  return window.RosaritoAudio.playTone(scene, type);
}

function playAudioKey(scene, key) {
  return window.RosaritoAudio.playAudioKey(scene, key);
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
    this.load.image("ui-star_full", "assets/ui/generated/star_full.png");
    MINIGAME2_ASSETS.forEach((key) => this.load.image(`m2-${key}`, `assets/ui/minigame2/${key}.png`));
    MINIGAME1_UPDATE_ASSETS.forEach((key) => this.load.image(`m1-${key}`, `assets/ui/minigame1_update/${key}.png`));
    this.load.json("dones", "src/dones.json");
    this.load.json("questions", "src/questions.json");
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
    gameState.quizPool = buildQuizPool(this.cache.json.get("questions"));
    gameState.donPool = buildGiftPoolFromDones(this.cache.json.get("dones"));
    gameState.puzzlePool = buildPuzzlePool(this.cache.json.get("puzzles"));
    gameState.hiddenObjectPool = buildHiddenObjectPool(this.cache.json.get("hiddenObjects"));
    resetRun();
    loadPuzzleAssets(this, gameState.puzzlePool, () => {
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
        if (this.currentVoiceKey) playAudioKey(this, `voice.${this.currentVoiceKey}`);
      });
    if (title) {
      window.RosaritoUI.addFittedText(this, 112, 70, title, "title", {
        maxWidth: 450,
        maxHeight: 56,
        minFontSize: 26,
        style: {
          fontSize: "34px",
          color: "#3e2b22",
          stroke: "#f6e2ba",
          strokeThickness: 3,
        },
      }).setOrigin(0, 0.5);
    }
    if (subtitle) {
      window.RosaritoUI.addFittedText(this, 112, 128, subtitle, "body", {
        maxWidth: 430,
        maxHeight: 64,
        minFontSize: 16,
        style: {
          fontSize: "22px",
          color: "#5d4437",
          lineSpacing: 8,
          wordWrap: { width: 430 },
        },
      }).setOrigin(0, 0.5);
    }
    this.rosaritoSprite = this.add.sprite(LAYOUT.rosarito.x, LAYOUT.rosarito.y, ROSARITO_SPRITE.key, 0)
      .setScale(LAYOUT.rosarito.scale)
      .setDepth(3);
    if (progress) this.drawProgress();
  }

  drawProgress() {
    return window.RosaritoUI.drawProgress(this, gameState);
  }

  celebrateRosarito() {
    if (!this.rosaritoSprite) return;
    this.rosaritoSprite.play("rosarito-celebrate");
  }

  makeButton(x, y, label, onClick, width = 250) {
    return window.RosaritoUI.addPrimaryButton(this, x, y, label, onClick, { width });
  }

  makeNextButton(label, nextScene) {
    return window.RosaritoUI.addNextButton(this, 1098, 675, label, () => this.scene.start(nextScene), {
      enabled: true,
      labelX: -163,
      labelY: 13,
    });
  }

  makeCoverMissionCard(x, y, number, label, iconKey, onClick = null) {
    const card = this.add.container(x, y);
    const bg = this.add.image(0, 8, "ui-card_arch_filled").setDisplaySize(138, 164);
    const badge = this.add.image(-50, -70, "ui-icon_flower").setDisplaySize(52, 52);
    const num = this.add.text(-50, -72, String(number), {
      fontFamily: "Comic Sans MS, Trebuchet MS, Arial",
      fontSize: "22px",
      fontStyle: "bold",
      color: "#fff8e9",
    }).setOrigin(0.5);
    const icon = this.add.image(0, -24, iconKey).setDisplaySize(74, 64);
    const title = this.add.text(0, 50, label, {
      fontFamily: "Comic Sans MS, Trebuchet MS, Arial",
      fontSize: "15px",
      fontStyle: "bold",
      color: "#3e2b22",
      align: "center",
      wordWrap: { width: 112 },
      lineSpacing: 0,
    }).setOrigin(0.5);
    title.setY(42);
    card.add([bg, badge, num, icon, title]);
    card.setSize(138, 170).setInteractive({ useHandCursor: true });
    card.on("pointerover", () => {
      card.setScale(1.04);
      playTone(this, "hover");
    });
    card.on("pointerout", () => card.setScale(1));
    card.on("pointerdown", () => {
      playTone(this, "click");
      requestImmersiveMode();
      if (onClick) onClick();
    });
    return card;
  }

  drawStarCounter(x = 1048, y = 96, value = 0) {
    return window.RosaritoUI.drawStarCounter(this, x, y, value);
  }

  makeQuizAnswerCard(x, y, option, index, onClick, iconKey = "") {
    const cardKeys = ["m2-answer_card_green", "m2-answer_card_blue", "m2-answer_card_pink"];
    const iconKeys = ["ui-icon_home", "ui-icon_blackboard", "ui-icon_flower"];
    const cardWidth = 142;
    const card = this.add.container(x, y);
    const bg = this.add.image(0, 0, cardKeys[index % cardKeys.length]).setDisplaySize(cardWidth, 230);
    const icon = this.add.image(0, -52, iconKey || iconKeys[index % iconKeys.length]).setDisplaySize(76, 63);
    const text = window.RosaritoUI.addFittedText(this, 0, 58, option, "body", {
      maxWidth: 118,
      maxHeight: 72,
      minFontSize: 14,
      style: {
        fontSize: option.length > 18 ? "17px" : "19px",
        align: "center",
        wordWrap: { width: 118 },
        lineSpacing: 4,
      },
    });
    const heart = this.add.image(0, 110, "m2-heart").setDisplaySize(30, 28);
    card.add([bg, icon, text, heart]);
    card.setDepth(8);
    card.setSize(cardWidth, 230).setInteractive({ useHandCursor: true });
    card.on("pointerover", () => {
      card.setScale(1.04);
      playTone(this, "hover");
    });
    card.on("pointerout", () => card.setScale(1));
    card.on("pointerdown", () => {
      playTone(this, "click");
      requestImmersiveMode();
      playAudioKey(this, `voice.quiz.${index}`);
      onClick(card);
    });
    return card;
  }

  makeChoiceCard(x, y, label, onClick, width = 230, color = COLORS.violet, voiceText = "") {
    const card = this.add.container(x, y);
    const bg = this.add.image(0, 0, "ui-panel_task_floral").setDisplaySize(width, 86);
    const text = window.RosaritoUI.addFittedText(this, 0, 0, label, "button", {
      maxWidth: width - 22,
      maxHeight: 58,
      minFontSize: 12,
      style: {
        fontSize: "23px",
        color: "#4a3026",
        align: "center",
        wordWrap: { width: width - 22 },
      },
    }).setOrigin(0.5);
    card.add([bg, text]);
    card.setSize(width, 86).setInteractive({ useHandCursor: true });
    card.on("pointerdown", () => {
      playTone(this, "click");
      requestImmersiveMode();
      playAudioKey(this, `voice.object.${label}`);
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
    const cardKey = option.cardKey || "m1-minigame1_update2_04";
    const labelSize = labelText.length > 30 ? "17px" : labelText.length > 20 ? "19px" : "22px";
    const card = this.add.container(x, y).setDepth(8);
    const bg = this.add.image(0, 0, cardKey).setDisplaySize(230, 110);
    const icon = this.add.image(18, -26, componentIconKey(labelText)).setDisplaySize(44, 44);
    const label = window.RosaritoUI.addFittedText(this, 18, 27, labelText, "body", {
      maxWidth: 160,
      maxHeight: 44,
      minFontSize: 12,
      style: {
        fontSize: labelSize,
        fontStyle: "bold",
        color: "#3e2b22",
        align: "center",
        wordWrap: { width: 160 },
        lineSpacing: 0,
      },
    }).setOrigin(0.5);
    card.add([bg, icon, label]);
    card.setSize(230, 110).setInteractive({ useHandCursor: true });
    card.on("pointerdown", () => {
      playTone(this, "click");
      requestImmersiveMode();
      playAudioKey(this, `voice.object.${labelText}`);
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
    return window.RosaritoUI.createFeedback(this, message, good);
  }

  narrateScreen(key) {
    playAudioKey(this, `voice.${key}`);
  }
}

class CoverScene extends BaseScene {
  constructor() {
    super("Cover");
  }

  create() {
    this.createBook("", "", { progress: false });
    const leftPage = PAGE_AREAS.left;
    const rightPage = PAGE_AREAS.right;
    this.rosaritoSprite.setPosition(leftPage.x + 160, leftPage.y + 462).setScale(0.6).setDepth(8);
    this.narrateScreen("cover");
    this.add.ellipse(leftPage.x + 160, leftPage.y + 624, 190, 34, 0x5b3f2d, 0.18).setDepth(2);

    window.RosaritoUI.addScreenTitle(this, [
      { x: 205, y: 82, text: "La aventura de", fontSize: "38px", origin: 0 },
      { x: 205, y: 124, text: "Rosarito", fontSize: "78px", origin: 0, strokeThickness: 5 },
    ], {
      divider: { x: 344, y: 246, width: 230, height: 52, depth: 4 },
      flowers: [
        { x: 150, y: 160, key: "ui-flower_cluster_left", width: 120, height: 78, angle: -8, depth: 4 },
        { x: 407, y: 166, key: "ui-flower_cluster_bottom", width: 146, height: 96, angle: 5, depth: 4 },
      ],
    });

    window.RosaritoUI.addNarrativeBubble(this, 448, 356, "Ayuda a Rosarito a aprender, jugar y recordar su historia.", {
      key: "m2-speech_narrative",
      width: 324,
      height: 166,
      depth: 6,
      textOffsetX: 6,
      textOffsetY: -8,
      maxWidth: 226,
      maxHeight: 86,
      fontSize: "20px",
      minFontSize: 17,
    });

    window.RosaritoUI.addMouseHint(this, 452, 574, "Usa el mouse\npara explorar.", {
      key: "m2-speech_mouse",
      width: 246,
      height: 172,
      depth: 6,
      textOffsetY: -30,
      iconOffsetY: 50,
      iconSize: 50,
      maxWidth: 158,
      maxHeight: 60,
      fontSize: "19px",
      minFontSize: 16,
    });

    this.add.image(650, 666, "ui-flower_cluster_bottom").setDisplaySize(150, 96).setDepth(5);
    this.add.image(90, 450, "ui-flower_cluster_left").setDisplaySize(96, 58).setAngle(-18).setDepth(4);

    this.drawStarCounter(SCENE_LAYOUTS.cover.starCounter.x, SCENE_LAYOUTS.cover.starCounter.y, gameState.achievements.filter(Boolean).length);
    this.add.image(rightPage.x + 254, 112, "ui-speech_large_lilac").setDisplaySize(300, 98).setDepth(5);
    window.RosaritoUI.addFittedText(this, 860, 112, "Tu misión", "title", {
      maxWidth: 220,
      maxHeight: 52,
      minFontSize: 34,
      depth: 6,
      style: {
        fontSize: "42px",
        fontStyle: "bold",
        color: "#6a3d8f",
        align: "center",
      },
    });
    this.add.image(860, 232, "ui-speech_large_cream").setDisplaySize(440, 138).setAlpha(0.9).setDepth(4);
    window.RosaritoUI.addFittedText(this, 860, 226, "Completa las actividades para conocer la vida y el legado de Rosarito.", "body", {
      maxWidth: 340,
      maxHeight: 86,
      minFontSize: 18,
      depth: 5,
      style: {
        fontSize: "22px",
        wordWrap: { width: 340 },
      },
    });
    this.add.image(860, 298, "ui-icon_heart").setDisplaySize(34, 34).setDepth(5);

    const startTestScene = (sceneKey) => {
      resetRun();
      this.scene.start(sceneKey);
    };
    const cards = [
      ["Infancia", "ui-icon_question", "QuizGame"],
      ["Puzzle", "ui-icon_puzzle", "PuzzleGame"],
      ["Objetos", "ui-icon_ink", "ObjectsGame"],
    ];
    cards.forEach(([label, icon, sceneKey], i) => {
      this.makeCoverMissionCard(705 + i * 180, 430, i + 1, label, icon, () => startTestScene(sceneKey)).setDepth(6);
    });
    this.add.image(858, 605, "ui-notebook_panel").setDisplaySize(420, 144).setDepth(4);
    this.add.image(708, 606, "ui-icon_book").setDisplaySize(84, 72).setDepth(5);
    this.add.image(1014, 605, "ui-star_full").setDisplaySize(80, 80).setDepth(5);
    window.RosaritoUI.addFittedText(this, 846, 570, "Gran objetivo", "title", {
      maxWidth: 210,
      maxHeight: 48,
      minFontSize: 20,
      depth: 5,
      style: {
        fontSize: "26px",
        fontStyle: "bold",
        color: "#6a3d8f",
        align: "center",
      },
    });
    window.RosaritoUI.addFittedText(this, 848, 615, "Completa las actividades y gana el álbum de Rosarito.", "body", {
      maxWidth: 235,
      maxHeight: 54,
      minFontSize: 15,
      depth: 5,
      style: {
        fontSize: "17px",
        wordWrap: { width: 235 },
      },
    });

    const start = this.makeButton(SCENE_LAYOUTS.cover.startButton.x, SCENE_LAYOUTS.cover.startButton.y, "Comenzar", () => {
      resetRun();
      this.scene.start("QuizGame");
    }, SCENE_LAYOUTS.cover.startButton.width);
    start.setDepth(10);
    this.add.image(1120, 706, "ui-icon_arrow_right").setDisplaySize(48, 42).setDepth(11);
    this.add.image(1088, 685, "ui-flower_cluster_bottom").setDisplaySize(86, 58).setDepth(11);
    this.input.keyboard?.on("keydown-ONE", () => startTestScene("QuizGame"));
    this.input.keyboard?.on("keydown-TWO", () => startTestScene("PuzzleGame"));
    this.input.keyboard?.on("keydown-THREE", () => startTestScene("ObjectsGame"));
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
    window.RosaritoUI.addScreenTitle(this, [
      { x: 210, y: 72, text: "La infancia de", fontSize: "40px", origin: 0 },
      { x: 210, y: 124, text: "Rosario", fontSize: "82px", origin: 0, strokeThickness: 5 },
    ], {
      divider: { x: 345, y: 238, width: 230, height: 52 },
      flowers: [
        { x: 145, y: 145, key: "ui-flower_cluster_left", width: 105, height: 68, angle: -8 },
        { x: 465, y: 145, key: "ui-flower_cluster_bottom", width: 118, height: 78 },
      ],
    });

    window.RosaritoUI.addNarrativeBubble(this, 410, 338, "Cuando Rosarito era niña, vivió momentos especiales que la ayudaron a soñar en grande.", {
      key: "m2-speech_narrative",
      width: 244,
      height: 168,
      depth: 7,
      textOffsetX: 4,
      textOffsetY: -11,
      maxWidth: 178,
      maxHeight: 118,
      fontSize: "16px",
      minFontSize: 15,
      lineSpacing: 2,
    });
    this.add.image(414, 415, "m2-heart").setDisplaySize(28, 26).setDepth(8);

    window.RosaritoUI.addMouseHint(this, 355, 610, "Usa el mouse para elegir la respuesta correcta.", {
      key: "m2-speech_mouse",
      width: 205,
      height: 148,
      depth: 7,
      textOffsetY: -28,
      iconOffsetY: 40,
      iconSize: 48,
      maxWidth: 132,
      maxHeight: 72,
      fontSize: "16px",
      minFontSize: 15,
    });

    this.drawStarCounter(SCENE_LAYOUTS.quiz.starCounter.x, SCENE_LAYOUTS.quiz.starCounter.y, gameState.achievements.filter(Boolean).length);
    this.add.image(864, 92, "m2-header_responde").setDisplaySize(380, 74).setDepth(5);
    this.add.image(884, 188, "m2-instruction_banner").setDisplaySize(430, 62).setDepth(4);
    window.RosaritoUI.addFittedText(this, 884, 186, "Haz clic en la respuesta correcta.", "body", {
      maxWidth: 300,
      maxHeight: 58,
      minFontSize: 16,
      depth: 5,
      style: {
        fontSize: "22px",
        color: "#3e2b22",
        align: "center",
      },
    }).setOrigin(0.5);
    this.add.image(884, 225, "m2-heart").setDisplaySize(30, 28).setDepth(5);
    this.add.image(1142, 140, "m2-leaves").setDisplaySize(70, 48).setDepth(3).setAngle(16);
    this.add.image(1100, 646, "m2-plant_lavender").setDisplaySize(46, 96).setDepth(3);
    this.add.image(1150, 642, "m2-plant_pink").setDisplaySize(56, 98).setDepth(3);
    this.showQuestion();
  }

  showQuestion() {
    const q = gameState.quizSet[gameState.quizIndex];
    this.add.image(884, 310, "m2-question_panel").setDisplaySize(470, 78).setDepth(5);
    this.add.image(650, 310, "ui-icon_flower").setDisplaySize(74, 74).setDepth(6);
    window.RosaritoUI.addFittedText(this, 650, 302, String(gameState.quizIndex + 1), "button", {
      maxWidth: 72,
      maxHeight: 34,
      minFontSize: 18,
      depth: 7,
      style: {
        fontSize: "34px",
        fontStyle: "bold",
        color: "#fff8e9",
        stroke: "#6a3d8f",
        strokeThickness: 3,
      },
    }).setOrigin(0.5);
    this.add.graphics()
      .fillStyle(0x77559a, 0.94)
      .fillRoundedRect(1064, 260, 78, 48, 20)
      .lineStyle(3, 0xf3d36d, 0.95)
      .strokeRoundedRect(1064, 260, 78, 48, 20)
      .setDepth(6);
    window.RosaritoUI.addFittedText(this, 1103, 284, `${gameState.quizIndex + 1}/3`, "body", {
      maxWidth: 78,
      maxHeight: 34,
      minFontSize: 16,
      depth: 7,
      style: {
        fontSize: "22px",
        fontStyle: "bold",
        color: "#fff8e9",
      },
    }).setOrigin(0.5);
    window.RosaritoUI.addFittedText(this, 888, 310, q.question, "question", {
      maxWidth: 350,
      maxHeight: 64,
      minFontSize: 19,
      depth: 7,
      style: {
        fontSize: q.question.length > 42 ? "23px" : "25px",
        wordWrap: { width: 350 },
      },
    });
    this.add.image(884, 350, "m2-heart").setDisplaySize(30, 28).setDepth(7);
    q.options.forEach((option, i) => {
      this.makeQuizAnswerCard(SCENE_LAYOUTS.quiz.answerStart.x + i * SCENE_LAYOUTS.quiz.answerGap, SCENE_LAYOUTS.quiz.answerStart.y, option, i, (card) => {
        if (i === q.correct) {
          card.disableInteractive();
          card.add(this.add.image(58, -104, "ui-icon_check").setDisplaySize(42, 42));
          this.feedback("Respuesta correcta!", true);
          gameState.quizIndex += 1;
          if (gameState.quizIndex >= gameState.quizSet.length) {
            gameState.achievements[0] = true;
            this.celebrateRosarito();
            this.time.delayedCall(850, () => this.scene.start("PuzzleGame"));
          } else {
            this.time.delayedCall(650, () => this.scene.restart());
          }
        } else {
          this.feedback("Probemos otra vez", false);
        }
      }, q.optionIconKeys?.[i]);
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
      window.RosaritoUI.addFittedText(this, 590, 360, "Agrega imágenes en assets/puzzles/source para jugar.", "body", {
        maxWidth: 640,
        maxHeight: 100,
        minFontSize: 20,
        style: {
          fontSize: "28px",
          color: "#3e2b22",
          align: "center",
          wordWrap: { width: 640 },
        },
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
    window.RosaritoUI.addFittedText(this, 370, 94, "Juego 2", "button", {
      maxWidth: 130,
      maxHeight: 50,
      minFontSize: 18,
      depth: 5,
      style: {
        fontSize: "26px",
        fontStyle: "bold",
        color: "#fff8e9",
      },
    }).setOrigin(0.5);
    window.RosaritoUI.addScreenTitle(this, [
      { x: 352, y: 142, text: "El rompecabezas", fontSize: "43px" },
      { x: 365, y: 205, text: "de Rosario", fontSize: "48px" },
    ], {
      divider: { x: 402, y: 256, width: 235, height: 50 },
      flowers: [
        { x: 156, y: 154, key: "ui-flower_cluster_left", width: 76, height: 54, angle: -8 },
        { x: 505, y: 174, key: "ui-flower_cluster_bottom", width: 92, height: 58 },
      ],
    });

    window.RosaritoUI.addNarrativeBubble(this, 408, 340, "Vamos a armar la imagen de Rosario Vera Peñaloza!", {
      width: 300,
      height: 132,
      depth: 7,
      textOffsetX: 6,
      textOffsetY: -4,
      maxWidth: 220,
      maxHeight: 78,
      fontSize: "23px",
      minFontSize: 18,
    });

    window.RosaritoUI.addMouseHint(this, 430, 515, "Arrastra cada pieza al lugar correcto.", {
      width: 292,
      height: 166,
      depth: 8,
      textOffsetY: -23,
      iconOffsetY: 59,
      iconSize: 46,
      maxWidth: 176,
      maxHeight: 64,
      fontSize: "18px",
      minFontSize: 15,
    });

    this.add.image(275, 648, "ui-notebook_panel").setDisplaySize(360, 116).setDepth(5).setAlpha(0.96);
    this.add.image(174, 644, this.puzzle.previewKey).setDisplaySize(118, 82).setDepth(6).setAlpha(0.92);
    this.add.image(356, 606, "ui-label_long_cream").setDisplaySize(150, 46).setTint(0x8c63a8).setDepth(6);
    window.RosaritoUI.addFittedText(this, 356, 606, "De su vida real", "body", {
      maxWidth: 132,
      maxHeight: 36,
      minFontSize: 12,
      depth: 7,
      style: {
        fontSize: "16px",
        fontStyle: "bold",
        color: "#fff8e9",
      },
    }).setOrigin(0.5);
    window.RosaritoUI.addFittedText(this, 366, 656, this.puzzle.title || this.puzzle.description, "body", {
      maxWidth: 168,
      maxHeight: 56,
      minFontSize: 12,
      depth: 7,
      style: {
        fontSize: "15px",
        wordWrap: { width: 168 },
      },
    });
    this.add.image(510, 650, "ui-icon_flower").setDisplaySize(40, 40).setDepth(7);
  }

  drawPuzzleBoard(puzzle) {
    this.drawStarCounter(SCENE_LAYOUTS.puzzle.starCounter.x, SCENE_LAYOUTS.puzzle.starCounter.y, gameState.achievements.filter(Boolean).length);
    window.RosaritoUI.addSectionHeader(this, 884, 128, "Arma la imagen con las piezas.", {
      width: 410,
      height: 66,
      depth: 4,
      fontSize: "23px",
      color: "#3e2b22",
      maxWidth: 340,
      heartOffsetY: 38,
    });
    this.add.image(1140, 156, "m2-leaves").setDisplaySize(72, 52).setAngle(22).setDepth(4);

    const board = { ...SCENE_LAYOUTS.puzzle.board };
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
    const trayLayout = SCENE_LAYOUTS.puzzle.tray;
    const slotCount = trayLayout.slotCount || 4;
    const slotY = trayLayout.slotY;
    const slotSpacing = trayLayout.slotSpacing;
    const slotStartX = trayLayout.x + trayLayout.slotMargin;
    const slotYAbs = trayLayout.y + slotY;
    const tray = this.add.graphics().setDepth(4);
    tray.fillStyle(0xffeed0, 0.94);
    tray.fillRoundedRect(trayLayout.x, trayLayout.y, trayLayout.width, trayLayout.height, 20);
    tray.lineStyle(3, 0xd4a76d, 0.84);
    tray.strokeRoundedRect(trayLayout.x, trayLayout.y, trayLayout.width, trayLayout.height, 20);
    tray.lineStyle(2, 0xe7c18d, 0.6);
    tray.strokeRoundedRect(trayLayout.x + 12, trayLayout.y + 12, trayLayout.width - 24, trayLayout.height - 24, 14);
    this.add.image(trayLayout.x + 30, trayLayout.y + 16, "ui-icon_sparkles").setDisplaySize(34, 34).setDepth(5).setAlpha(0.8);
    this.add.image(trayLayout.x + trayLayout.width - 90, trayLayout.y + trayLayout.height - 26, "ui-flower_cluster_bottom").setDisplaySize(84, 48).setDepth(5);
    this.traySlots = shuffle([
      { x: slotStartX, y: slotYAbs },
      { x: slotStartX + slotSpacing, y: slotYAbs },
      { x: slotStartX + slotSpacing * 2, y: slotYAbs },
      { x: slotStartX + slotSpacing * 3, y: slotYAbs },
    ]);
    this.traySlots = this.traySlots.slice(0, slotCount);
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
      image.on("pointerdown", () => {
        requestImmersiveMode();
        playTone(this, "click");
      });
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
      const sparkle = this.add.image(data.targetX, data.targetY, "ui-icon_sparkles")
        .setDisplaySize(34, 34)
        .setDepth(31)
        .setAlpha(0.92);
      this.tweens.add({
        targets: sparkle,
        alpha: 0,
        y: data.targetY - 14,
        scale: 1.18,
        duration: 360,
        ease: "Cubic.easeOut",
        onComplete: () => sparkle.destroy(),
      });
      const boardPulse = this.add.image(board.x, board.y, "ui-icon_sparkles")
        .setDepth(6)
        .setDisplaySize(28, 28)
        .setAlpha(0.65);
      this.tweens.add({
        targets: boardPulse,
        scale: 3.6,
        alpha: 0,
        duration: 360,
        ease: "Cubic.easeOut",
        onComplete: () => boardPulse.destroy(),
      });
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
    this.nextButton = window.RosaritoUI.addNextButton(
      this,
      SCENE_LAYOUTS.puzzle.nextButton.x,
      SCENE_LAYOUTS.puzzle.nextButton.y,
      "Siguiente",
      () => {
        gameState.puzzleIndex += 1;
        if (gameState.puzzleIndex >= gameState.puzzleSet.length) {
          this.scene.start("ObjectsGame");
        } else {
          this.scene.start("PuzzleGame");
        }
      },
      { enabled: false },
    );
  }

  enableNextButton() {
    this.nextButton.setEnabled(true);
  }

  completePuzzle() {
    this.feedback("Imagen completa!", true);
    gameState.achievements[1] = true;
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
    this.hiddenObjectStates = new Map();
    this.objectHintIndex = 0;
    this.objectHintTimer = null;
    this.objectHintPulse = null;
    this.checkItems = new Map();
    this.drawObjectsStoryPage();
    this.drawSearchScene();
    this.createObjectsNextButton();
    this.activeObjects.forEach((obj, index) => this.drawChecklistItem(obj, index));
    this.activeObjects.forEach((obj) => this.drawHiddenObject(obj));
    this.startObjectHintLoop();
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      this.stopObjectHintLoop();
    });
  }

  drawObjectsStoryPage() {
    this.add.ellipse(170, 650, 142, 26, 0x5b3f2d, 0.18).setDepth(2);
    window.RosaritoUI.addScreenTitle(this, [
      { x: 330, y: 72, text: "Los objetos de", fontSize: "42px" },
      { x: 360, y: 138, text: "Rosario", fontSize: "76px", strokeThickness: 5 },
    ], {
      divider: { x: 385, y: 208, width: 230, height: 50 },
      flowers: [
        { x: 180, y: 105, key: "ui-flower_cluster_left", width: 82, height: 58, angle: -8 },
        { x: 520, y: 120, key: "ui-flower_cluster_bottom", width: 92, height: 60 },
      ],
    });

    window.RosaritoUI.addNarrativeBubble(this, 420, 294, "Encuentra los objetos que usaba Rosario en su misión de enseñar a muchos niños.", {
      width: 288,
      height: 150,
      depth: 7,
      textOffsetX: 2,
      textOffsetY: -8,
      maxWidth: 205,
      maxHeight: 94,
      fontSize: "19px",
      minFontSize: 16,
      lineSpacing: 3,
    });
    this.add.image(420, 372, "m2-heart").setDisplaySize(28, 26).setDepth(8);

    window.RosaritoUI.addMouseHint(this, 185, 590, "Toca\nlos objetos.", {
      width: 196,
      height: 124,
      depth: 10,
      textOffsetY: -20,
      iconOffsetY: 36,
      iconSize: 42,
      maxWidth: 122,
      maxHeight: 46,
      fontSize: "18px",
      minFontSize: 14,
    });

    window.RosaritoUI.addChecklistFrame(this, 452, 536, "Puedes encontrarlos?", {
      panelWidth: 300,
      panelHeight: 316,
      headerWidth: 314,
      headerHeight: 92,
      headerY: 383,
      titleY: 392,
    });
    this.add.image(560, 656, "ui-flower_cluster_bottom").setDisplaySize(86, 54).setDepth(6);
  }

  drawSearchScene() {
    this.drawStarCounter(SCENE_LAYOUTS.objects.starCounter.x, SCENE_LAYOUTS.objects.starCounter.y, gameState.achievements.filter(Boolean).length);
    window.RosaritoUI.addSectionHeader(this, 895, 92, "Encuentra los objetos", {
      width: 390,
      height: 70,
      depth: 5,
      tint: 0xb994d2,
      fontSize: "28px",
      color: "#5b3277",
      heartOffsetY: 45,
    });
    this.add.image(1140, 145, "m2-leaves").setDisplaySize(78, 56).setAngle(18).setDepth(4);

    this.sceneBounds = { ...SCENE_LAYOUTS.objects.sceneBounds };
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

    this.successPanel = this.add.container(896, 626).setAlpha(0).setDepth(850);
    this.successPanel.add(this.add.image(0, 0, "ui-label_long_cream").setDisplaySize(350, 80));
    this.successPanel.add(this.add.image(-152, -2, "m2-heart").setDisplaySize(28, 26));
    this.successPanel.add(window.RosaritoUI.addFittedText(this, 18, 0, "¡Qué bien! Rosario usaba estos objetos para enseñar con amor.", {
      maxWidth: 285,
      maxHeight: 66,
      minFontSize: 14,
      style: {
        fontSize: "18px",
        color: "#3e2b22",
        align: "center",
        wordWrap: { width: 285 },
        lineSpacing: 2,
      },
    }).setOrigin(0.5));
  }

  drawChecklistItem(obj, index) {
    const y = 456 + index * 48;
    const row = this.add.container(452, y).setDepth(8);
    row.add(this.add.image(0, 0, "hidden-ui-list_row").setDisplaySize(266, 50).setAlpha(0.48));
    row.add(this.add.image(-104, 0, obj.iconKey).setDisplaySize(38, 38));
    const label = window.RosaritoUI.addFittedText(this, -55, 0, obj.label, "body", {
      maxWidth: 148,
      maxHeight: 42,
      minFontSize: 12,
      style: {
        fontSize: "18px",
        color: "#3e2b22",
        wordWrap: { width: 148 },
        align: "left",
      },
    }).setOrigin(0, 0.5);
    const check = this.add.image(112, 0, "ui-icon_check")
      .setDisplaySize(30, 30)
      .setAlpha(0)
      .setTint(0x4f8553)
      .setOrigin(0.5);
    check.text = "";
    check.setData("checked", false);
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
    const sprite = this.add.image(0, 0, obj.spriteKey).setDisplaySize(objectWidth, objectHeight);
    target.add(sprite);
    const hitPadding = Math.max(obj.hitPadding || 0, 58);
    target.setSize(objectWidth + hitPadding * 2, objectHeight + hitPadding * 2);
    target.setInteractive(new Phaser.Geom.Rectangle(
      -target.width / 2,
      -target.height / 2,
      target.width,
      target.height,
    ), Phaser.Geom.Rectangle.Contains);
    target.setData("object", { ...obj, x: objectX, y: objectY, width: objectWidth, height: objectHeight });
    target.setData("found", false);
    target.on("pointerover", () => {
      if (target.getData("found")) return;
      playTone(this, "hover");
      target.setAlpha(0.92);
      this.tweens.add({ targets: target, scale: 1.035, duration: 130 });
    });
    target.on("pointerout", () => {
      if (target.getData("found")) return;
      this.tweens.add({ targets: target, scale: 1, duration: 130 });
      target.setAlpha(1);
    });
    target.on("pointerdown", () => {
      requestImmersiveMode();
      this.findHiddenObject(target);
    });
    target.disableInteractive();

    const generousHitPadding = Math.max(obj.hitPadding || 0, 58);
    const hitZone = this.add.zone(
      objectX,
      objectY,
      objectWidth + generousHitPadding * 2,
      objectHeight + generousHitPadding * 2,
    );
    const hitAreaSize = hitZone.width * hitZone.height;
    hitZone.setDepth(40 + Math.max(0, 100000 - hitAreaSize) / 10000).setInteractive({ useHandCursor: true });
    hitZone.setData("object", { ...obj, x: objectX, y: objectY, width: objectWidth, height: objectHeight });
    hitZone.setData("visual", target);
    hitZone.setData("found", false);
    hitZone.on("pointerover", () => {
      if (hitZone.getData("found")) return;
      playTone(this, "hover");
      target.setAlpha(0.92);
      this.tweens.add({ targets: target, scale: 1.035, duration: 130 });
    });
    hitZone.on("pointerout", () => {
      if (hitZone.getData("found")) return;
      this.tweens.add({ targets: target, scale: 1, duration: 130 });
      target.setAlpha(1);
    });
    hitZone.on("pointerdown", () => {
      requestImmersiveMode();
      this.findHiddenObject(hitZone);
    });
    this.hiddenObjectStates.set(obj.id, { target, hitZone, found: false });
  }

  findHiddenObject(target) {
    if (target.getData("found")) return;
    const obj = target.getData("object");
    const visual = target.getData("visual") || target;
    target.setData("found", true);
    const state = this.hiddenObjectStates.get(obj.id);
    if (state) {
      state.found = true;
      state.target.setData("found", true);
      state.hitZone.setData("found", true);
      state.hitZone.disableInteractive();
    }
    target.disableInteractive();
    playTone(this, "success");
    playAudioKey(this, `voice.object.${obj.label}`);
    this.found += 1;
    const item = this.checkItems.get(obj.id);
    if (item) {
      item.check.setData("checked", true);
      item.check.setAlpha(1).setScale(0.7);
      this.tweens.add({ targets: item.check, alpha: 1, scale: 0.9, duration: 140, yoyo: true });
      item.label.setAlpha(0.58);
      item.row.setAlpha(0.82);
    }
    this.tweens.add({ targets: visual, scale: 1.16, alpha: 0.54, yoyo: true, duration: 180, onComplete: () => visual.setAlpha(0.56) });
    const objectFeedback = this.add.image(obj.x + obj.width / 2, obj.y - obj.height / 2, "ui-icon_sparkles")
      .setDisplaySize(42, 42)
      .setDepth(25)
      .setAlpha(0.9);
    this.tweens.add({ targets: objectFeedback, alpha: 0, y: obj.y - obj.height / 2 - 8, scale: 1.12, duration: 360, ease: "Cubic.easeOut" });
    if (this.found >= this.activeObjects.length) {
      this.completeHiddenObjects();
    }
  }

  startObjectHintLoop() {
    this.stopObjectHintLoop();
    this.time.delayedCall(900, this.pulsePendingObjectHint, [], this);
    this.objectHintTimer = this.time.addEvent({
      delay: 2400,
      loop: true,
      callback: this.pulsePendingObjectHint,
      callbackScope: this,
    });
  }

  stopObjectHintLoop() {
    if (this.objectHintTimer) {
      this.objectHintTimer.remove(false);
      this.objectHintTimer = null;
    }
    if (this.objectHintPulse) {
      this.objectHintPulse.remove();
      this.objectHintPulse.destroy();
      this.objectHintPulse = null;
    }
  }

  pulsePendingObjectHint() {
    const pending = this.activeObjects
      .map((obj) => this.hiddenObjectStates.get(obj.id))
      .filter((entry) => entry && !entry.found);
    if (!pending.length || !this.scene.isActive("ObjectsGame")) return;
    const entry = pending[this.objectHintIndex % pending.length];
    this.objectHintIndex += 1;
    if (!entry?.target) return;
    const x = entry.target.x;
    const y = entry.target.y;
    this.objectHintPulse = this.add.image(x, y, "ui-icon_sparkles")
      .setDisplaySize(48, 48)
      .setDepth(24)
      .setAlpha(0)
      .setTint(0xf2cf6e);
    this.tweens.add({
      targets: this.objectHintPulse,
      alpha: 0.88,
      scale: 1.3,
      y: y - 9,
      duration: 700,
      ease: "Sine.easeInOut",
      yoyo: true,
      onComplete: () => {
        if (this.objectHintPulse) {
          this.objectHintPulse.destroy();
          this.objectHintPulse = null;
        }
      },
    });
  }

  createObjectsNextButton() {
    this.nextButton = window.RosaritoUI.addNextButton(
      this,
      SCENE_LAYOUTS.objects.nextButton.x,
      SCENE_LAYOUTS.objects.nextButton.y,
      "Siguiente",
      () => this.scene.start("Final"),
      { enabled: false },
    );
  }

  enableObjectsNextButton() {
    this.nextButton.setEnabled(true);
  }

  completeHiddenObjects() {
    this.stopObjectHintLoop();
    gameState.achievements[2] = true;
    this.celebrateRosarito();
    this.feedback("Encontraste todos los objetos!", true);
    this.tweens.add({ targets: this.successPanel, alpha: 1, y: 610, duration: 280, ease: "Back.easeOut" });
    this.enableObjectsNextButton();
  }
}

class FinalScene extends BaseScene {
  constructor() {
    super("Final");
  }

  create() {
    this.createBook("", "");
    this.rosaritoSprite.setPosition(1030, 468).setScale(0.34).setDepth(8);
    this.celebrateRosarito();
    this.narrateScreen("final");
    this.add.image(330, 106, "ui-flower_cluster_left").setDisplaySize(96, 62).setDepth(4).setAngle(-8);
    this.add.image(465, 136, "ui-flower_cluster_bottom").setDisplaySize(94, 58).setDepth(4);
    this.add.image(310, 132, "ui-speech_large_lilac").setDisplaySize(430, 136).setDepth(5);
    window.RosaritoUI.addFittedText(this, 310, 132, "Objetivos cumplidos", "title", {
      maxWidth: 360,
      maxHeight: 52,
      minFontSize: 24,
      depth: 6,
      style: {
        fontSize: "34px",
        fontStyle: "bold",
        color: "#6a3d8f",
      },
    }).setOrigin(0.5);
    this.add.image(315, 332, "ui-speech_large_cream").setDisplaySize(420, 216).setAlpha(0.95).setDepth(4);
    window.RosaritoUI.addFittedText(this, 315, 322, "Las tres estrellas están encendidas. Rosarito ya completó sus recuerdos, su rompecabezas y sus objetos de enseñanza.", "body", {
      maxWidth: 330,
      maxHeight: 140,
      minFontSize: 21,
      depth: 5,
      style: {
        fontSize: "27px",
        wordWrap: { width: 330 },
        lineSpacing: 7,
      },
    });
    this.add.image(315, 456, "ui-divider_heart_purple").setDisplaySize(200, 46).setDepth(5);

    this.add.image(794, 354, "ui-star_full").setDisplaySize(236, 236).setDepth(5);
    window.RosaritoUI.addFittedText(this, 794, 354, "3/3", "title", {
      maxWidth: 124,
      maxHeight: 68,
      minFontSize: 38,
      depth: 6,
      style: {
        fontSize: "62px",
        fontStyle: "bold",
        color: "#3e2b22",
      },
    }).setOrigin(0.5);

    this.add.image(778, 590, "ui-notebook_panel").setDisplaySize(360, 132).setDepth(4).setAlpha(0.98);
    this.add.image(642, 590, "ui-icon_book").setDisplaySize(84, 72).setDepth(5);
    window.RosaritoUI.addFittedText(this, 792, 558, "Álbum de Rosarito", "title", {
      maxWidth: 260,
      maxHeight: 48,
      minFontSize: 18,
      depth: 5,
      style: {
        fontSize: "25px",
        fontStyle: "bold",
        color: "#6a3d8f",
      },
    }).setOrigin(0.5);
    window.RosaritoUI.addFittedText(this, 800, 604, "Gracias por ayudar a recordar su historia.", "body", {
      maxWidth: 220,
      maxHeight: 48,
      minFontSize: 16,
      depth: 5,
      style: {
        fontSize: "19px",
        wordWrap: { width: 220 },
      },
    });
    this.add.image(1090, 598, "ui-flower_cluster_bottom").setDisplaySize(94, 58).setDepth(9);
    this.add.image(1000, 510, "ui-icon_sparkles").setDisplaySize(42, 42).setDepth(9);

    this.makeButton(975, 710, "Jugar de nuevo", () => {
      resetRun();
      this.scene.start("Cover");
    }, 270).setDepth(10);
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
  scene: [BootScene, CoverScene, QuizGameScene, PuzzleGameScene, ObjectsGameScene, FinalScene],
};

window.addEventListener("load", () => {
  if (!window.Phaser) {
    document.getElementById("game").innerHTML = '<div style="padding:32px;color:white;font-family:Arial">No se pudo cargar Phaser desde CDN. Con conexion a internet, recarga la pagina.</div>';
    return;
  }
  window.game = new Phaser.Game(config);
});

