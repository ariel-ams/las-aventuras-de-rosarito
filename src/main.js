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
    const baseLayout = LAYOUT.base || {};
    document.body.dataset.scene = this.scene.key;
    this.cameras.main.setBackgroundColor("#557b72");
    this.add.image(LAYOUT.book.x, LAYOUT.book.y, "book-bg").setDisplaySize(LAYOUT.book.width, LAYOUT.book.height);
    const grass = baseLayout.grass || {};
    const audioButton = baseLayout.audioButton || {};
    const titleLayout = baseLayout.title || {};
    const subtitleLayout = baseLayout.subtitle || {};
    if (grass.key) {
      this.add.image(grass.x, grass.y, grass.key).setScale(grass.scale || 1).setAlpha(grass.alpha || 1).setDepth(grass.depth || 2);
    }
    this.add.image(audioButton.x, audioButton.y, audioButton.key || "ui-button_audio")
      .setDisplaySize(audioButton.width || 82, audioButton.height || 82)
      .setInteractive({ useHandCursor: true })
      .setDepth(audioButton.depth || 10)
      .on("pointerover", () => playTone(this, "hover"))
      .on("pointerdown", () => {
        playTone(this, "click");
        if (this.currentVoiceKey) playAudioKey(this, `voice.${this.currentVoiceKey}`);
      });
    if (title) {
      window.RosaritoUI.addFittedText(this, titleLayout.x, titleLayout.y, title, "title", {
        maxWidth: titleLayout.maxWidth,
        maxHeight: titleLayout.maxHeight,
        minFontSize: titleLayout.minFontSize || 26,
        style: {
          fontSize: titleLayout.fontSize || "34px",
          color: titleLayout.color || "#3e2b22",
          stroke: titleLayout.stroke || "#f6e2ba",
          strokeThickness: titleLayout.strokeThickness || 3,
        },
      }).setOrigin(0, 0.5);
    }
    if (subtitle) {
      window.RosaritoUI.addFittedText(this, subtitleLayout.x, subtitleLayout.y, subtitle, "body", {
        maxWidth: subtitleLayout.maxWidth,
        maxHeight: subtitleLayout.maxHeight,
        minFontSize: subtitleLayout.minFontSize || 16,
        style: {
          fontSize: subtitleLayout.fontSize || "22px",
          color: subtitleLayout.color || "#5d4437",
          lineSpacing: subtitleLayout.lineSpacing || 8,
          wordWrap: { width: subtitleLayout.wordWrap || 430 },
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
    const button = LAYOUT.base.nextButton || {};
    return window.RosaritoUI.addNextButton(this, button.x || 1098, button.y || 675, label, () => this.scene.start(nextScene), {
      enabled: button.enabled !== false,
      labelX: button.labelX || -163,
      labelY: button.labelY || 13,
      width: button.width || 250,
    });
  }

  makeCoverMissionCard(x, y, number, label, iconKey, onClick = null) {
    const coverLayout = SCENE_LAYOUTS.cover;
    const cardLayout = coverLayout.missionCard || {};
    const card = this.add.container(x, y);
    const cardBg = (cardLayout.bg || {});
    const badgeLayout = cardLayout.badge || {};
    const iconLayout = cardLayout.icon || {};
    const numberLayout = cardLayout.numberText || {};
    const labelLayout = cardLayout.labelText || {};
    const typography = window.RosaritoUI.TEXT_STYLES || {};
    const numberOffsetY = numberLayout.offsetY || 0;
    const defaultNumberStyle = typography.badge || {};
    const defaultLabelStyle = typography.body || {};

    const bg = this.add.image(0, cardLayout.baseOffsetY || 8, cardBg.key || "ui-card_arch_filled")
      .setDisplaySize(cardBg.width || 138, cardBg.height || 164);
    const badge = this.add.image(badgeLayout.x || -50, badgeLayout.y || -70, badgeLayout.key || "ui-icon_flower")
      .setDisplaySize(badgeLayout.width || 52, badgeLayout.height || 52);
    const showNumber = numberLayout.show !== false;
    const num = showNumber ? this.add.text(numberLayout.x || -50, (numberLayout.y || -72) + numberOffsetY, String(number), {
      ...defaultNumberStyle,
      fontSize: numberLayout.fontSize || "22px",
      fontStyle: numberLayout.fontStyle || "bold",
      color: numberLayout.color || "#fff8e9",
      align: numberLayout.align || "center",
    }).setOrigin(numberLayout.origin || 0.5) : null;
    const icon = this.add.image(iconLayout.x || 0, iconLayout.y || -24, iconKey).setDisplaySize(iconLayout.width || 74, iconLayout.height || 64);
    const title = window.RosaritoUI.addFittedText(
      this,
      labelLayout.x || 0,
      labelLayout.y || 40,
      label,
      "body",
      {
        maxWidth: labelLayout.maxWidth || 112,
        maxHeight: labelLayout.maxHeight || 52,
        minFontSize: labelLayout.minFontSize || 13,
        style: {
          ...defaultLabelStyle,
          fontSize: labelLayout.fontSize || "15px",
          fontStyle: labelLayout.fontStyle || "bold",
          color: labelLayout.color || "#3e2b22",
          align: labelLayout.align || "center",
          wordWrap: { width: labelLayout.wordWrap || 112 },
          lineSpacing: labelLayout.lineSpacing || 0,
        },
      },
    );
    title.setOrigin(0.5);
    card.add([bg, badge]);
    if (num) card.add(num);
    card.add(icon);
    card.add(title);
    card.setSize(cardLayout.interactiveWidth || 138, cardLayout.interactiveHeight || 170).setInteractive({ useHandCursor: true });
    card.on("pointerover", () => {
      card.setScale(cardLayout.hoverScale || 1.04);
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

  drawStarCounter(x = 1048, y = 96, value = 0, maxValue = 3) {
    const count = Number.isFinite(maxValue) ? maxValue : (Array.isArray(gameState.achievements) ? gameState.achievements.length : 3);
    return window.RosaritoUI.drawStarCounter(this, x, y, value, count);
  }

  makeQuizAnswerCard(x, y, option, index, onClick, iconKey = "") {
    const quizLayout = SCENE_LAYOUTS.quiz;
    const cardConfig = quizLayout.answerCard || {};
    const cardKeys = cardConfig.cardKeys || ["m2-answer_card_green", "m2-answer_card_blue", "m2-answer_card_pink"];
    const iconKeys = cardConfig.iconFallbackKeys || ["ui-icon_home", "ui-icon_blackboard", "ui-icon_flower"];
    const cardWidth = cardConfig.cardWidth || 118;
    const cardHeight = cardConfig.cardHeight || 224;
    const iconCfg = cardConfig.iconSize || { x: 0, y: -52, width: 70, height: 58 };
    const textCfg = cardConfig.textPos || { x: 0, y: 58, maxWidth: 96, maxHeight: 70 };
    const textStyle = cardConfig.textStyle || {};
    const heartCfg = cardConfig.heart || { x: 0, y: 110, width: 30, height: 28 };
    const threshold = cardConfig.fontSizeThreshold || 18;
    const hoverScale = cardConfig.hoverScale || 1.04;
    const card = this.add.container(x, y);
    const bg = this.add.image(0, 0, cardKeys[index % cardKeys.length]).setDisplaySize(cardWidth, cardHeight);
    const icon = this.add.image(iconCfg.x || 0, iconCfg.y || -52, iconKey || iconKeys[index % iconKeys.length]).setDisplaySize(iconCfg.width || 70, iconCfg.height || 58);
    const text = window.RosaritoUI.addFittedText(this, textCfg.x || 0, textCfg.y || 58, option, "body", {
      maxWidth: textCfg.maxWidth || 96,
      maxHeight: textCfg.maxHeight || 70,
      minFontSize: 13,
      style: {
        fontSize: option.length > threshold ? textStyle.fontSizeSmall || "16px" : textStyle.fontSizeLarge || "17px",
        align: "center",
        wordWrap: { width: textCfg.width || 104 },
        lineSpacing: textStyle.lineSpacing || 4,
        color: textStyle.color || "#4a3026",
      },
    });
    const heart = this.add.image(heartCfg.x || 0, heartCfg.y || 110, "m2-heart").setDisplaySize(heartCfg.width || 30, heartCfg.height || 28);
    card.add([bg, icon, text, heart]);
    card.setDepth(8);
    card.setSize(cardWidth, cardHeight).setInteractive({ useHandCursor: true });
    card.on("pointerover", () => {
      card.setScale(hoverScale);
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
    const choiceLayout = SCENE_LAYOUTS.dones && SCENE_LAYOUTS.dones.choiceCard ? SCENE_LAYOUTS.dones.choiceCard : {};
    const cardWidth = choiceLayout.width || width;
    const cardHeight = choiceLayout.height || 86;
    const card = this.add.container(x, y);
    const bg = this.add.image(0, 0, choiceLayout.bgKey || "ui-panel_task_floral").setDisplaySize(cardWidth, cardHeight);
    const textPadding = choiceLayout.padding || 22;
    const text = window.RosaritoUI.addFittedText(this, 0, 0, label, "button", {
      maxWidth: cardWidth - textPadding,
      maxHeight: 58,
      minFontSize: choiceLayout.minFontSize || 12,
      style: {
        ...(choiceLayout.textStyle || {}),
        wordWrap: choiceLayout.textStyle?.wordWrap || { width: cardWidth - textPadding },
      },
    }).setOrigin(0.5);
    card.add([bg, text]);
    card.setSize(choiceLayout.interactiveWidth || cardWidth, choiceLayout.interactiveHeight || cardHeight).setInteractive({ useHandCursor: true });
    card.on("pointerdown", () => {
      playTone(this, "click");
      requestImmersiveMode();
      playAudioKey(this, `voice.object.${label}`);
      onClick();
    });
    card.on("pointerover", () => {
      card.setScale(choiceLayout.hoverScale || 1.03);
      playTone(this, "hover");
    });
    card.on("pointerout", () => card.setScale(1));
    return card;
  }

  makeComponentOption(x, y, option, onClick, voiceText = "") {
    const componentLayout = SCENE_LAYOUTS.dones && SCENE_LAYOUTS.dones.componentCard ? SCENE_LAYOUTS.dones.componentCard : {};
    const labelText = typeof option === "string" ? option : option.label;
    const labelCfg = componentLayout.label || {};
    const cardKey = option.cardKey || componentLayout.bgKey || "m1-minigame1_update2_04";
    const breakpoints = labelCfg.breakpoints || [30, 20];
    const labelSize = labelText.length > breakpoints[0] ? labelCfg.fontSizeLong || "17px" : labelText.length > breakpoints[1] ? labelCfg.fontSizeMedium || "19px" : labelCfg.fontSizeShort || "22px";
    const card = this.add.container(x, y).setDepth(8);
    const bg = this.add.image(0, 0, cardKey).setDisplaySize(componentLayout.width || 230, componentLayout.height || 110);
    const icon = this.add.image(componentLayout.iconX || 18, componentLayout.iconY || -26, componentIconKey(labelText))
      .setDisplaySize(componentLayout.iconWidth || 44, componentLayout.iconHeight || 44);
    const label = window.RosaritoUI.addFittedText(this, labelCfg.x || 18, labelCfg.y || 27, labelText, "body", {
      maxWidth: labelCfg.maxWidth || 160,
      maxHeight: labelCfg.maxHeight || 44,
      minFontSize: labelCfg.minFontSize || 12,
      style: {
        fontSize: labelSize,
        fontStyle: "bold",
        color: labelCfg.color || "#3e2b22",
        align: labelCfg.align || "center",
        wordWrap: { width: labelCfg.wordWrap?.width || 160 },
        lineSpacing: 0,
      },
    }).setOrigin(0.5);
    card.add([bg, icon, label]);
    card.setSize(componentLayout.interactiveWidth || componentLayout.width || 230, componentLayout.interactiveHeight || componentLayout.height || 110).setInteractive({ useHandCursor: true });
    card.on("pointerdown", () => {
      playTone(this, "click");
      requestImmersiveMode();
      playAudioKey(this, `voice.object.${labelText}`);
      onClick(card);
    });
    card.on("pointerover", () => {
      card.setScale(componentLayout.hoverScale || 1.04);
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
    const coverLayout = SCENE_LAYOUTS.cover;
    this.createBook("", "", { progress: false });
    this.rosaritoSprite.setPosition(coverLayout.rosarito.x, coverLayout.rosarito.y).setScale(coverLayout.rosarito.scale).setDepth(coverLayout.rosarito.depth);
    this.narrateScreen("cover");
    this.add.ellipse(coverLayout.shadow.x, coverLayout.shadow.y, coverLayout.shadow.width, coverLayout.shadow.height, coverLayout.shadow.color, coverLayout.shadow.alpha).setDepth(coverLayout.shadow.depth);

    window.RosaritoUI.addScreenTitle(this, coverLayout.title, {
      divider: coverLayout.titleDivider,
      flowers: coverLayout.titleFlowers,
    });

    window.RosaritoUI.addNarrativeBubble(this, coverLayout.narrative.x, coverLayout.narrative.y, coverLayout.narrative.text, {
      key: coverLayout.narrative.options.key,
      width: coverLayout.narrative.options.width,
      height: coverLayout.narrative.options.height,
      depth: coverLayout.narrative.options.depth,
      textOffsetX: coverLayout.narrative.options.textOffsetX,
      textOffsetY: coverLayout.narrative.options.textOffsetY,
      maxWidth: coverLayout.narrative.options.maxWidth,
      maxHeight: coverLayout.narrative.options.maxHeight,
      fontSize: coverLayout.narrative.options.fontSize,
      minFontSize: coverLayout.narrative.options.minFontSize,
    });

    window.RosaritoUI.addMouseHint(this, coverLayout.mouseHint.x, coverLayout.mouseHint.y, coverLayout.mouseHint.text, {
      key: coverLayout.mouseHint.options.key,
      width: coverLayout.mouseHint.options.width,
      height: coverLayout.mouseHint.options.height,
      depth: coverLayout.mouseHint.options.depth,
      textOffsetY: coverLayout.mouseHint.options.textOffsetY,
      iconOffsetY: coverLayout.mouseHint.options.iconOffsetY,
      iconSize: coverLayout.mouseHint.options.iconSize,
      maxWidth: coverLayout.mouseHint.options.maxWidth,
      maxHeight: coverLayout.mouseHint.options.maxHeight,
      fontSize: coverLayout.mouseHint.options.fontSize,
      minFontSize: coverLayout.mouseHint.options.minFontSize,
    });

    this.add.image(coverLayout.rightDecorationBottom.x, coverLayout.rightDecorationBottom.y, coverLayout.rightDecorationBottom.key)
      .setDisplaySize(coverLayout.rightDecorationBottom.width, coverLayout.rightDecorationBottom.height)
      .setDepth(coverLayout.rightDecorationBottom.depth);
    this.add.image(coverLayout.leftDecorationBottom.x, coverLayout.leftDecorationBottom.y, coverLayout.leftDecorationBottom.key)
      .setDisplaySize(coverLayout.leftDecorationBottom.width, coverLayout.leftDecorationBottom.height)
      .setAngle(coverLayout.leftDecorationBottom.angle)
      .setDepth(coverLayout.leftDecorationBottom.depth);

    this.drawStarCounter(SCENE_LAYOUTS.cover.starCounter.x, SCENE_LAYOUTS.cover.starCounter.y, gameState.achievements.filter(Boolean).length);
    this.add.image(coverLayout.missionHeader.badge.x, coverLayout.missionHeader.badge.y, coverLayout.missionHeader.badge.key)
      .setDisplaySize(coverLayout.missionHeader.badge.width, coverLayout.missionHeader.badge.height)
      .setDepth(coverLayout.missionHeader.badge.depth);
    window.RosaritoUI.addFittedText(this, coverLayout.missionHeader.title.x, coverLayout.missionHeader.title.y, coverLayout.missionHeader.title.text, "title", {
      maxWidth: coverLayout.missionHeader.title.maxWidth,
      maxHeight: coverLayout.missionHeader.title.maxHeight,
      minFontSize: coverLayout.missionHeader.title.minFontSize,
      depth: coverLayout.missionHeader.title.depth,
      style: coverLayout.missionHeader.title.style,
    });
    this.add.image(coverLayout.missionSummary.bg.x, coverLayout.missionSummary.bg.y, coverLayout.missionSummary.bg.key)
      .setDisplaySize(coverLayout.missionSummary.bg.width, coverLayout.missionSummary.bg.height)
      .setAlpha(coverLayout.missionSummary.bg.alpha)
      .setDepth(coverLayout.missionSummary.bg.depth);
    window.RosaritoUI.addFittedText(this, coverLayout.missionSummary.title.x, coverLayout.missionSummary.title.y, coverLayout.missionSummary.title.text, "body", {
      maxWidth: coverLayout.missionSummary.title.maxWidth,
      maxHeight: coverLayout.missionSummary.title.maxHeight,
      minFontSize: coverLayout.missionSummary.title.minFontSize,
      depth: coverLayout.missionSummary.title.depth,
      style: coverLayout.missionSummary.title.style,
    });
    this.add.image(coverLayout.missionSummary.icon.x, coverLayout.missionSummary.icon.y, coverLayout.missionSummary.icon.key)
      .setDisplaySize(coverLayout.missionSummary.icon.width, coverLayout.missionSummary.icon.height)
      .setDepth(coverLayout.missionSummary.icon.depth);

    const startTestScene = (sceneKey) => {
      resetRun();
      this.scene.start(sceneKey);
    };
    const missionCards = Array.isArray(coverLayout.missions) ? coverLayout.missions : [];
    missionCards.forEach((mission, i) => {
      const missionLabel = coverLayout.missionCard?.titlePrefix
        ? `${coverLayout.missionCard.titlePrefix} ${mission.label}`.trim()
        : mission.label;
      this.makeCoverMissionCard(
        coverLayout.missionCards.x + i * coverLayout.missionCards.gap,
        coverLayout.missionCards.y,
        mission.order || i + 1,
        missionLabel,
        mission.icon,
        () => startTestScene(mission.scene),
      ).setDepth(6);
    });
    this.add.image(coverLayout.goalPanel.x, coverLayout.goalPanel.y, coverLayout.goalPanel.key)
      .setDisplaySize(coverLayout.goalPanel.width, coverLayout.goalPanel.height)
      .setDepth(coverLayout.goalPanel.depth);
    this.add.image(coverLayout.goalPanel.book.x, coverLayout.goalPanel.book.y, coverLayout.goalPanel.book.key)
      .setDisplaySize(coverLayout.goalPanel.book.width, coverLayout.goalPanel.book.height)
      .setDepth(coverLayout.goalPanel.book.depth);
    this.add.image(coverLayout.goalPanel.star.x, coverLayout.goalPanel.star.y, coverLayout.goalPanel.star.key)
      .setDisplaySize(coverLayout.goalPanel.star.width, coverLayout.goalPanel.star.height)
      .setDepth(coverLayout.goalPanel.star.depth);
    window.RosaritoUI.addFittedText(this, coverLayout.missionSummary.titleBadge.x, coverLayout.missionSummary.titleBadge.y, coverLayout.missionSummary.titleBadge.text, "title", {
      maxWidth: coverLayout.missionSummary.titleBadge.maxWidth,
      maxHeight: coverLayout.missionSummary.titleBadge.maxHeight,
      minFontSize: coverLayout.missionSummary.titleBadge.minFontSize,
      depth: coverLayout.missionSummary.titleBadge.depth,
      style: coverLayout.missionSummary.titleBadge.style,
    });
    window.RosaritoUI.addFittedText(this, coverLayout.missionSummary.description.x, coverLayout.missionSummary.description.y, coverLayout.missionSummary.description.text, "body", {
      maxWidth: coverLayout.missionSummary.description.maxWidth,
      maxHeight: coverLayout.missionSummary.description.maxHeight,
      minFontSize: coverLayout.missionSummary.description.minFontSize,
      depth: coverLayout.missionSummary.description.depth,
      style: coverLayout.missionSummary.description.style,
    });

    const start = this.makeButton(coverLayout.startButton.x, coverLayout.startButton.y, coverLayout.startButtonLabel || "Comenzar", () => {
      resetRun();
      this.scene.start("QuizGame");
    }, coverLayout.startButton.width);
    start.setDepth(10);
    this.add.image(coverLayout.startButtonDecoration.arrow.x, coverLayout.startButtonDecoration.arrow.y, coverLayout.startButtonDecoration.arrow.key)
      .setDisplaySize(coverLayout.startButtonDecoration.arrow.width, coverLayout.startButtonDecoration.arrow.height)
      .setDepth(coverLayout.startButtonDecoration.arrow.depth);
    this.add.image(coverLayout.startButtonDecoration.flower.x, coverLayout.startButtonDecoration.flower.y, coverLayout.startButtonDecoration.flower.key)
      .setDisplaySize(coverLayout.startButtonDecoration.flower.width, coverLayout.startButtonDecoration.flower.height)
      .setDepth(coverLayout.startButtonDecoration.flower.depth);
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
    const quizLayout = SCENE_LAYOUTS.quiz;
    this.rosaritoSprite
      .setPosition(quizLayout.rosarito.x, quizLayout.rosarito.y)
      .setScale(quizLayout.rosarito.scale)
      .setDepth(quizLayout.rosarito.depth);
    this.narrateScreen("quiz");
    this.add.ellipse(
      quizLayout.shadow.x,
      quizLayout.shadow.y,
      quizLayout.shadow.width,
      quizLayout.shadow.height,
      quizLayout.shadow.color,
      quizLayout.shadow.alpha
    ).setDepth(quizLayout.shadow.depth);

    this.add
      .image(
        quizLayout.leftPanel.x,
        quizLayout.leftPanel.y,
        quizLayout.leftPanel.key || "minigame2-left-bg"
      )
      .setDisplaySize(quizLayout.leftPanel.width, quizLayout.leftPanel.height)
      .setDepth(quizLayout.leftPanel.depth)
      .setAlpha(quizLayout.leftPanel.alpha);
    window.RosaritoUI.addScreenTitle(this, quizLayout.title, {
      divider: quizLayout.titleDivider,
      flowers: quizLayout.titleFlowers,
    });

    window.RosaritoUI.addNarrativeBubble(this, quizLayout.narrative.x, quizLayout.narrative.y, quizLayout.narrative.text, {
      key: quizLayout.narrative.options.key,
      width: quizLayout.narrative.options.width,
      height: quizLayout.narrative.options.height,
      depth: quizLayout.narrative.options.depth,
      textOffsetX: quizLayout.narrative.options.textOffsetX,
      textOffsetY: quizLayout.narrative.options.textOffsetY,
      maxWidth: quizLayout.narrative.options.maxWidth,
      maxHeight: quizLayout.narrative.options.maxHeight,
      fontSize: quizLayout.narrative.options.fontSize,
      minFontSize: quizLayout.narrative.options.minFontSize,
      lineSpacing: quizLayout.narrative.options.lineSpacing,
    });
    const leftPanelHeart = quizLayout.leftPanel.titleHeart;
    this.add.image(
      leftPanelHeart.x,
      leftPanelHeart.y,
      leftPanelHeart.key || "m2-heart"
    )
      .setDisplaySize(leftPanelHeart.width, leftPanelHeart.height)
      .setDepth(leftPanelHeart.depth);

    window.RosaritoUI.addMouseHint(this, quizLayout.mouseHint.x, quizLayout.mouseHint.y, quizLayout.mouseHint.text, {
      key: quizLayout.mouseHint.options.key,
      width: quizLayout.mouseHint.options.width,
      height: quizLayout.mouseHint.options.height,
      depth: quizLayout.mouseHint.options.depth,
      textOffsetY: quizLayout.mouseHint.options.textOffsetY,
      iconOffsetY: quizLayout.mouseHint.options.iconOffsetY,
      iconSize: quizLayout.mouseHint.options.iconSize,
      maxWidth: quizLayout.mouseHint.options.maxWidth,
      maxHeight: quizLayout.mouseHint.options.maxHeight,
      fontSize: quizLayout.mouseHint.options.fontSize,
      minFontSize: quizLayout.mouseHint.options.minFontSize,
    });

    this.drawStarCounter(SCENE_LAYOUTS.quiz.starCounter.x, SCENE_LAYOUTS.quiz.starCounter.y, gameState.achievements.filter(Boolean).length);
    window.RosaritoUI.addSectionHeader(this, quizLayout.headerQuestion.x, quizLayout.headerQuestion.y, quizLayout.headerQuestion.title, {
      width: quizLayout.headerQuestion.width,
      height: quizLayout.headerQuestion.height,
      fontSize: quizLayout.headerQuestion.fontSize,
      color: quizLayout.headerQuestion.color,
      heart: quizLayout.headerQuestion.heart,
      depth: quizLayout.headerQuestion.depth,
    });
    window.RosaritoUI.addSectionHeader(this, quizLayout.headerInstruction.x, quizLayout.headerInstruction.y, quizLayout.headerInstruction.title, {
      width: quizLayout.headerInstruction.width,
      height: quizLayout.headerInstruction.height,
      fontSize: quizLayout.headerInstruction.fontSize,
      color: quizLayout.headerInstruction.color,
      maxWidth: quizLayout.headerInstruction.maxWidth,
      heart: quizLayout.headerInstruction.heart,
      depth: quizLayout.headerInstruction.depth,
    });
    const decor = quizLayout.questionDecor || {};
    this.add.image(decor.sideLeaf?.x, decor.sideLeaf?.y, decor.sideLeaf?.key || "m2-leaves")
      .setDisplaySize(decor.sideLeaf?.width, decor.sideLeaf?.height)
      .setDepth(decor.sideLeaf?.depth || 3)
      .setAngle(decor.sideLeaf?.angle || 0);
    this.add.image(decor.leftPlant?.x, decor.leftPlant?.y, decor.leftPlant?.key || "m2-plant_lavender")
      .setDisplaySize(decor.leftPlant?.width, decor.leftPlant?.height)
      .setDepth(decor.leftPlant?.depth || 3);
    this.add.image(decor.rightPlant?.x, decor.rightPlant?.y, decor.rightPlant?.key || "m2-plant_pink")
      .setDisplaySize(decor.rightPlant?.width, decor.rightPlant?.height)
      .setDepth(decor.rightPlant?.depth || 3);
    this.showQuestion();
  }

  showQuestion() {
    const quizFeedback = SCENE_LAYOUTS.quiz.feedback || {};
    const q = gameState.quizSet[gameState.quizIndex];
    const panelLayout = SCENE_LAYOUTS.quiz.questionPanel;
    const questionPanelDepth = panelLayout.panelDepth || 5;
    const questionPanel = window.RosaritoUI.addQuizQuestionPanel(this, panelLayout.x, panelLayout.y, q.question, {
      questionIndex: gameState.quizIndex + 1,
      totalQuestions: gameState.quizSet.length,
      questionFontSize: panelLayout.questionFontSize,
      questionLongFontSize: panelLayout.questionLongFontSize,
      maxQuestionLength: panelLayout.maxQuestionLength,
      questionMaxWidth: panelLayout.questionMaxWidth,
      questionMaxHeight: panelLayout.questionMaxHeight,
      questionMinFontSize: panelLayout.questionMinFontSize,
      progressFontSize: panelLayout.progressFontSize,
      counterXOffset: panelLayout.counterXOffset,
      counterYOffset: panelLayout.counterYOffset,
      counterWidth: panelLayout.counterWidth,
      counterHeight: panelLayout.counterHeight,
      panelWidth: panelLayout.panelWidth,
      panelHeight: panelLayout.panelHeight,
      panelDepth: questionPanelDepth,
      panelKey: panelLayout.panelKey || "m2-question_panel",
      flowerKey: panelLayout.flowerKey || "ui-icon_flower",
      flowerSize: panelLayout.flowerSize || 74,
      badgeXOffset: panelLayout.badgeXOffset || -234,
      badgeY: panelLayout.badgeY || -8,
    });
    questionPanel.counterText.setColor("#fff8e9");
    this.add.image(panelLayout.x, panelLayout.y + panelLayout.heartOffsetY, "m2-heart").setDisplaySize(30, 28).setDepth(questionPanelDepth + 2);
    q.options.forEach((option, i) => {
      this.makeQuizAnswerCard(SCENE_LAYOUTS.quiz.answerStart.x + i * SCENE_LAYOUTS.quiz.answerGap, SCENE_LAYOUTS.quiz.answerStart.y, option, i, (card) => {
        if (i === q.correct) {
          card.disableInteractive();
          card.add(this.add.image(58, -104, "ui-icon_check").setDisplaySize(42, 42));
          this.feedback(quizFeedback.correct || "Respuesta correcta", true);
          gameState.quizIndex += 1;
          if (gameState.quizIndex >= gameState.quizSet.length) {
            gameState.achievements[0] = true;
            this.celebrateRosarito();
            this.time.delayedCall(850, () => this.scene.start("PuzzleGame"));
          } else {
            this.time.delayedCall(650, () => this.scene.restart());
          }
        } else {
          this.feedback(quizFeedback.incorrect || "Probemos otra vez", false);
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
    const puzzleLayout = SCENE_LAYOUTS.puzzle;
    this.createBook("", "", { progress: false });
    this.rosaritoSprite.setPosition(puzzleLayout.rosarito.x, puzzleLayout.rosarito.y).setScale(puzzleLayout.rosarito.scale).setDepth(puzzleLayout.rosarito.depth);
    this.narrateScreen("puzzle");
    this.done = 0;
    this.puzzle = gameState.puzzleSet[gameState.puzzleIndex] || gameState.puzzlePool[0];
    if (!this.puzzle) {
      window.RosaritoUI.addFittedText(this, puzzleLayout.noPuzzle.x, puzzleLayout.noPuzzle.y, puzzleLayout.noPuzzle.text, "body", {
        maxWidth: puzzleLayout.noPuzzle.options.maxWidth,
        maxHeight: puzzleLayout.noPuzzle.options.maxHeight,
        minFontSize: puzzleLayout.noPuzzle.options.minFontSize,
        style: puzzleLayout.noPuzzle.options.style,
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
        this.updateSlotHint(gameObject);
      }
    });
    this.input.on("dragend", (pointer, gameObject) => this.finishPieceDrag(gameObject, board));
  }

  drawPuzzleStoryPage() {
    const puzzleLayout = SCENE_LAYOUTS.puzzle;
    const title = puzzleLayout.title;
    const topLabel = puzzleLayout.topLabel;
    this.add.ellipse(puzzleLayout.shadow.x, puzzleLayout.shadow.y, puzzleLayout.shadow.width, puzzleLayout.shadow.height, puzzleLayout.shadow.color, puzzleLayout.shadow.alpha).setDepth(puzzleLayout.shadow.depth);
    this.add.image(topLabel.badge.x, topLabel.badge.y, topLabel.badge.key)
      .setDisplaySize(topLabel.badge.width, topLabel.badge.height)
      .setTint(topLabel.badge.tint)
      .setAlpha(topLabel.badge.alpha)
      .setDepth(topLabel.badge.depth);
    window.RosaritoUI.addFittedText(this, topLabel.text.x, topLabel.text.y, topLabel.text.text, "button", {
      maxWidth: topLabel.text.maxWidth,
      maxHeight: topLabel.text.maxHeight,
      minFontSize: topLabel.text.minFontSize,
      depth: topLabel.text.depth,
      style: topLabel.text.style,
    }).setOrigin(0.5);

    window.RosaritoUI.addScreenTitle(this, title, {
      divider: puzzleLayout.titleDivider,
      flowers: puzzleLayout.titleFlowers,
    });

    window.RosaritoUI.addNarrativeBubble(this, puzzleLayout.narrative.x, puzzleLayout.narrative.y, puzzleLayout.narrative.text, {
      key: puzzleLayout.narrative.options.key,
      width: puzzleLayout.narrative.options.width,
      height: puzzleLayout.narrative.options.height,
      depth: puzzleLayout.narrative.options.depth,
      textOffsetX: puzzleLayout.narrative.options.textOffsetX,
      textOffsetY: puzzleLayout.narrative.options.textOffsetY,
      maxWidth: puzzleLayout.narrative.options.maxWidth,
      maxHeight: puzzleLayout.narrative.options.maxHeight,
      fontSize: puzzleLayout.narrative.options.fontSize,
      minFontSize: puzzleLayout.narrative.options.minFontSize,
    });

    window.RosaritoUI.addMouseHint(this, puzzleLayout.mouseHint.x, puzzleLayout.mouseHint.y, puzzleLayout.mouseHint.text, {
      width: puzzleLayout.mouseHint.options.width,
      height: puzzleLayout.mouseHint.options.height,
      depth: puzzleLayout.mouseHint.options.depth,
      textOffsetY: puzzleLayout.mouseHint.options.textOffsetY,
      iconOffsetY: puzzleLayout.mouseHint.options.iconOffsetY,
      iconSize: puzzleLayout.mouseHint.options.iconSize,
      maxWidth: puzzleLayout.mouseHint.options.maxWidth,
      maxHeight: puzzleLayout.mouseHint.options.maxHeight,
      fontSize: puzzleLayout.mouseHint.options.fontSize,
      minFontSize: puzzleLayout.mouseHint.options.minFontSize,
    });

    const info = puzzleLayout.infoPanel;
    this.add.image(info.x, info.y, "ui-notebook_panel")
      .setDisplaySize(info.width, info.height)
      .setDepth(5)
      .setAlpha(0.96);
    this.add.image(info.previewX, info.previewY, this.puzzle.previewKey).setDisplaySize(info.previewWidth, info.previewHeight).setDepth(6).setAlpha(0.92);
    const titlePanel = info.labelPanel || {};
    this.add.image((titlePanel.x || info.labelX) - 10, (titlePanel.y || (info.labelY - 50)), "ui-label_long_cream").setDisplaySize(titlePanel.width || 150, titlePanel.height || 46).setTint(titlePanel.tint || 0x8c63a8).setDepth(titlePanel.depth || 6);
    window.RosaritoUI.addFittedText(this, titlePanel.x || info.labelX - 10, titlePanel.y || (info.labelY - 50), titlePanel.title || info.title, "body", {
      maxWidth: titlePanel.textMaxWidth || 132,
      maxHeight: titlePanel.textMaxHeight || 36,
      minFontSize: titlePanel.textMinFontSize || 12,
      depth: (titlePanel.textDepth || 7),
      style: titlePanel.textStyle || info.titleStyle || {
        fontSize: "16px",
        fontStyle: "bold",
        color: "#fff8e9",
      },
    }).setOrigin(0.5);
    window.RosaritoUI.addFittedText(this, info.titleX, info.titleY, this.puzzle.title || this.puzzle.description, "body", {
      maxWidth: info.titleMaxWidth,
      maxHeight: info.titleMaxHeight,
      minFontSize: 12,
      depth: titlePanel.textDepth || 7,
      style: Object.assign({ wordWrap: { width: info.titleMaxWidth } }, info.puzzleTextStyle || {}),
    });
    const decor = puzzleLayout.infoDecor?.flower;
    this.add.image(decor?.x, decor?.y, decor?.key || "ui-icon_flower")
      .setDisplaySize(decor?.width || 40, decor?.height || 40)
      .setDepth(decor?.depth || 7);
  }

  drawPuzzleBoard(puzzle) {
    this.drawStarCounter(SCENE_LAYOUTS.puzzle.starCounter.x, SCENE_LAYOUTS.puzzle.starCounter.y, gameState.achievements.filter(Boolean).length);
    const puzzleLayout = SCENE_LAYOUTS.puzzle;
    const boardLayout = puzzleLayout.header;
    window.RosaritoUI.addSectionHeader(this, boardLayout.x, boardLayout.y, boardLayout.title, {
      width: boardLayout.width,
      height: boardLayout.height,
      depth: boardLayout.depth,
      fontSize: boardLayout.fontSize,
      color: boardLayout.color,
      maxWidth: boardLayout.maxWidth,
      heartOffsetY: boardLayout.heartOffsetY,
    });
    this.add.image(boardLayout.leaf.x, boardLayout.leaf.y, boardLayout.leaf.key)
      .setDisplaySize(boardLayout.leaf.width, boardLayout.leaf.height)
      .setAngle(boardLayout.leaf.angle)
      .setDepth(boardLayout.leaf.depth);

    const board = { ...puzzleLayout.board };
    const boardStyle = puzzleLayout.boardStyle || {};
    board.scale = board.size / 512;
    const half = board.size / 2;
    const frame = this.add.graphics().setDepth(boardStyle.frameDepth || 4);
    frame.fillStyle(boardStyle.sizeColor || 0xb992d6, boardStyle.sizeAlpha ?? 0.78);
    frame.fillRoundedRect(board.x - half - (boardStyle.cornerPadding || 14), board.y - half - (boardStyle.cornerPadding || 14), board.size + ((boardStyle.cornerPadding || 14) * 2), board.size + ((boardStyle.cornerPadding || 14) * 2), boardStyle.boardRadius || 22);
    frame.lineStyle(
      boardStyle.frameThickness || 4,
      boardStyle.frameColor || 0x7c529a,
      boardStyle.frameAlpha ?? 0.95
    );
    frame.strokeRoundedRect(board.x - half - (boardStyle.cornerPadding || 14), board.y - half - (boardStyle.cornerPadding || 14), board.size + ((boardStyle.cornerPadding || 14) * 2), board.size + ((boardStyle.cornerPadding || 14) * 2), boardStyle.boardStrokeRadius || 22);
    frame.lineStyle(
      boardStyle.innerThickness || 2,
      boardStyle.innerColor || 0xf0d1ff,
      boardStyle.innerAlpha ?? 0.76
    );
    frame.strokeRoundedRect(board.x - half - ((boardStyle.innerCornerPadding || 5)), board.y - half - ((boardStyle.innerCornerPadding || 5)), board.size + ((boardStyle.innerCornerPadding || 5) * 2), board.size + ((boardStyle.innerCornerPadding || 5) * 2), boardStyle.innerRadius || 16);
    this.add.rectangle(board.x, board.y, board.size, board.size, boardStyle.fillColor || 0xf7e5c4, boardStyle.fillAlpha ?? 0.62).setDepth(boardStyle.fillDepth || 4);
    this.add.image(board.x, board.y, puzzle.previewKey).setDisplaySize(board.size, board.size).setAlpha(boardStyle.previewAlpha ?? 0.22).setDepth(boardStyle.previewDepth || 5);
    this.drawPuzzleSlotLines(board);
    return board;
  }

  drawPuzzleSlotLines(board) {
    const slotStyle = SCENE_LAYOUTS.puzzle.boardStyle?.slotLine || {};
    const slotOverlay = SCENE_LAYOUTS.puzzle.boardStyle?.slotLineOverlay || {};
    const g = this.add.graphics().setDepth(6);
    const left = board.x - board.size / 2;
    const top = board.y - board.size / 2;
    const midX = board.x;
    const midY = board.y;
    g.lineStyle(slotStyle.thickness || 3, slotStyle.color || 0xc99d68, slotStyle.alpha ?? 0.72);
    g.beginPath();
    g.moveTo(midX, top);
    g.lineTo(midX, board.y - (slotStyle.topStopOffset || 54));
    g.strokeCircle(midX + (slotStyle.leftArcOffsetX || 26), board.y - (slotStyle.leftArcOffsetY || 28), slotStyle.radiusSmall || 25);
    g.moveTo(midX, board.y - (slotStyle.middleStopOffset || 2));
    g.lineTo(midX, top + board.size);
    g.moveTo(left, midY);
    g.lineTo(board.x - (slotStyle.leftStopOffset || 62), midY);
    g.strokeCircle(board.x - (slotStyle.rightArcOffsetX || 35), midY - (slotStyle.rightArcOffsetY || 23), slotStyle.radiusLarge || 24);
    g.moveTo(board.x - (slotStyle.rightStopOffset || 8), midY);
    g.lineTo(left + board.size, midY);
    g.strokePath();
    g.lineStyle(slotOverlay.thickness || 2, slotOverlay.color || 0xffffff, slotOverlay.alpha ?? 0.48);
    g.strokeRoundedRect(left, top, board.size, board.size, 14);
  }

  drawPuzzleTray(board) {
    const trayLayout = SCENE_LAYOUTS.puzzle.tray;
    const slotCount = trayLayout.slotCount || 4;
    const slotY = trayLayout.slotY;
    const slotSpacing = trayLayout.slotSpacing;
    const slotStartX = trayLayout.x + trayLayout.slotMargin;
    const slotYAbs = trayLayout.y + slotY;
    const trayPanel = this.add.image(trayLayout.x + trayLayout.width / 2, trayLayout.y + trayLayout.height / 2, trayLayout.panel?.key || "ui-panel_task_floral")
      .setDisplaySize(trayLayout.width + (trayLayout.panel?.padding || 22), trayLayout.height + (trayLayout.panel?.padding || 22))
      .setDepth(trayLayout.panel?.depth || 3)
      .setAlpha(trayLayout.panel?.alpha || 0.82);
    const decor = trayLayout.decor || {};
    if (decor.topLeftSparkle) {
      const deco = decor.topLeftSparkle;
      this.add.image(
        trayLayout.x + (deco.xOffset || 0),
        trayLayout.y + (deco.yOffset || 0),
        deco.key || "ui-icon_sparkles"
      ).setDisplaySize(deco.width, deco.height).setDepth(deco.depth || 5).setAlpha(deco.alpha ?? 0.7);
    }
    if (decor.bottomRightFlower) {
      const deco = decor.bottomRightFlower;
      this.add.image(
        trayLayout.x + (deco.xOffset || 0),
        trayLayout.y + (deco.yOffset || 0),
        deco.key || "ui-flower_cluster_bottom"
      ).setDisplaySize(deco.width, deco.height).setDepth(deco.depth || 5).setAlpha(deco.alpha ?? 0.78);
    }
    if (decor.bottomLeftLeaves) {
      const deco = decor.bottomLeftLeaves;
      this.add.image(
        trayLayout.x + (deco.xOffset || 0),
        trayLayout.y + (deco.yOffset || 0),
        deco.key || "m2-leaves"
      ).setDisplaySize(deco.width, deco.height)
        .setDepth(deco.depth || 5)
        .setAngle(deco.angle || 0)
        .setAlpha(deco.alpha ?? 0.7);
    }

    const tray = this.add.graphics().setDepth(4);
    const border = trayLayout.border || {};
    tray.lineStyle(border.thickness || 2, border.color || 0xd8b17a, border.alpha ?? 0.86);
    tray.strokeRoundedRect(
      trayLayout.x + (border.xPadding || 15),
      trayLayout.y + (border.yPadding || 10),
      trayLayout.width - (border.widthInset || 30),
      trayLayout.height - (border.heightInset || 24),
      border.radius || 18,
    );
    this.traySlots = shuffle([
      { x: slotStartX, y: slotYAbs },
      { x: slotStartX + slotSpacing, y: slotYAbs },
      { x: slotStartX + slotSpacing * 2, y: slotYAbs },
      { x: slotStartX + slotSpacing * 3, y: slotYAbs },
    ]);
    this.traySlots = this.traySlots.slice(0, slotCount);
    this.traySlots.forEach((slot) => {
      const slotVisual = trayLayout.slotBg || {};
      const slotBg = this.add.graphics().setDepth(4);
      slotBg.fillStyle(slotVisual.fillColor || 0xfff6de, slotVisual.fillAlpha ?? 0.28);
      slotBg.fillRoundedRect(
        slot.x - ((slotVisual.width || 88) / 2),
        slot.y - ((slotVisual.height || 90) / 2),
        slotVisual.width || 88,
        slotVisual.height || 90,
        slotVisual.radius || 18
      );
      slotBg.lineStyle(
        slotVisual.borderThickness || 2,
        slotVisual.borderColor || 0xd6ad78,
        slotVisual.borderAlpha ?? 0.55
      );
      slotBg.strokeRoundedRect(
        slot.x - ((slotVisual.width || 88) / 2) + 1,
        slot.y - ((slotVisual.height || 90) / 2) + 1,
        slotVisual.width ? slotVisual.width - 2 : 86,
        slotVisual.height ? slotVisual.height - 2 : 88,
        slotVisual.borderRadius || 14
      );
      const glow = slotVisual.glow || {};
      const slotGlow = this.add.image(slot.x, slot.y, glow.key || "ui-icon_sparkles")
        .setDisplaySize(glow.size || 18, glow.size || 18)
        .setAlpha(glow.alpha ?? 0.22)
        .setDepth(4);
      slotGlow.setTint(glow.tint || 0xf2cf9e);
    });
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
    this.clearSlotHint();
  }

  updateSlotHint(piece) {
    const boardStyle = SCENE_LAYOUTS.puzzle.boardStyle || {};
    const dragHint = boardStyle.dragHint || {};
    if (!this.traySlots?.length) return;

    let nearest;
    let nearestDistance = Number.POSITIVE_INFINITY;
    this.traySlots.forEach((slot) => {
      const distance = Phaser.Math.Distance.Between(piece.x, piece.y, slot.x, slot.y);
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearest = slot;
      }
    });

    const shouldHint = nearestDistance <= (boardStyle.dragHint?.activeDistance || 120);
    if (!shouldHint || !nearest) {
      this.clearSlotHint();
      return;
    }

    const activeSlot = this._activeSlotHint;
    const slotHint = boardStyle.slotHint || {};
    if (!activeSlot || activeSlot.x !== nearest.x || activeSlot.y !== nearest.y) {
      this.clearSlotHint();
      const ring = this.add.graphics().setDepth(dragHint.depth || 16);
      ring.lineStyle(slotHint.thickness || 2, slotHint.color || 0x6f3a90, slotHint.alpha ?? 0.2);
      ring.strokeCircle(nearest.x, nearest.y, slotHint.radius || 28);
      const icon = this.add.image(nearest.x, nearest.y, dragHint.key || "ui-icon_sparkles")
        .setDisplaySize(dragHint.size || 28, dragHint.size || 28)
        .setAlpha(dragHint.alpha || 0.4)
        .setDepth((dragHint.depth || 16) + 1);
      if (dragHint.tint) icon.setTint(dragHint.tint);
      this._activeSlotHint = { x: nearest.x, y: nearest.y, ring, icon };
      this.tweens.add({
        targets: icon,
        alpha: 0,
        y: nearest.y - 6,
        duration: 420,
        ease: "Sine.easeInOut",
        yoyo: true,
        repeat: -1,
      });
    }
  }

  clearSlotHint() {
    if (!this._activeSlotHint) return;
    if (this._activeSlotHint.ring) {
      this._activeSlotHint.ring.destroy();
    }
    if (this._activeSlotHint.icon) {
      this._activeSlotHint.icon.destroy();
    }
    this._activeSlotHint = null;
  }

  finishPieceDrag(piece, board) {
    if (piece.getData("locked")) return;
    this.clearSlotHint();
    const data = piece.getData("piece");
    const boardStyle = SCENE_LAYOUTS.puzzle.boardStyle || {};
    const snapDistance = boardStyle.snapDistance || 78;
    const distance = Phaser.Math.Distance.Between(piece.x, piece.y, data.targetX, data.targetY);
    if (distance < snapDistance) {
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

      const slotGlow = this.add.graphics().setDepth(14)
        .fillStyle(0xf4d8a5, 0.42)
        .fillCircle(data.targetX, data.targetY, board.size / 10 + 6);
      this.tweens.add({
        targets: slotGlow,
        alpha: 0,
        scale: 1.4,
        duration: 430,
        ease: "Cubic.easeOut",
        onComplete: () => slotGlow.destroy(),
      });
      const sparkle = this.add.image(data.targetX, data.targetY, "ui-icon_sparkles")
        .setDisplaySize((boardStyle.sparkle?.size || 34), (boardStyle.sparkle?.size || 34))
        .setDepth(31)
        .setAlpha(0.92);
      this.tweens.add({
        targets: sparkle,
        alpha: 0,
        y: data.targetY - (boardStyle.sparkle?.rise || 14),
        scale: 1.18,
        duration: boardStyle.sparkle?.fadeDuration || 360,
        ease: "Cubic.easeOut",
        onComplete: () => sparkle.destroy(),
      });
      const boardPulse = this.add.image(board.x, board.y, "ui-icon_sparkles")
        .setDepth(6)
        .setDisplaySize((boardStyle.boardPulse?.size || 28), (boardStyle.boardPulse?.size || 28))
        .setAlpha(0.65);
      this.tweens.add({
        targets: boardPulse,
        scale: boardStyle.boardPulse?.scale || 3.6,
        alpha: 0,
        duration: 360,
        ease: "Cubic.easeOut",
        onComplete: () => boardPulse.destroy(),
      });
      const lockedBadge = this.add.image(data.targetX, data.targetY, "m2-heart")
        .setDisplaySize(boardStyle.lockBadge?.size || 26, boardStyle.lockBadge?.sizeLarge || 24)
        .setDepth(32)
        .setAlpha(0.9)
        .setTint(boardStyle.lockBadge?.tint || 0x5ea57f);
      this.tweens.add({
        targets: lockedBadge,
        alpha: 0,
        y: data.targetY - (boardStyle.lockBadge?.offsetY || 8),
        scale: 1.2,
        duration: boardStyle.boardPulse?.duration || 360,
        ease: "Cubic.easeOut",
        onComplete: () => lockedBadge.destroy(),
      });
      this.done += 1;
      playTone(this, "success");
      if (this.done === 4) this.completePuzzle();
    } else {
      const puzzleLayout = SCENE_LAYOUTS.puzzle;
      const puzzleFeedback = puzzleLayout.feedback || {};
      this.feedback(puzzleFeedback.incorrect || "Casi! Mira la guía y prueba otra vez.", false);
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
    const puzzleLayout = SCENE_LAYOUTS.puzzle;
    const puzzleFeedback = puzzleLayout.feedback || {};
    this.nextButton = window.RosaritoUI.addNextButton(
      this,
      puzzleLayout.nextButton.x,
      puzzleLayout.nextButton.y,
      puzzleLayout.nextButton.label || "Siguiente",
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
    const puzzleLayout = SCENE_LAYOUTS.puzzle;
    const puzzleFeedback = puzzleLayout.feedback || {};
    this.feedback(puzzleFeedback.correct || "Imagen completa", true);
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
    const objectsLayout = SCENE_LAYOUTS.objects;
    this.createBook("", "", { progress: false });
    this.rosaritoSprite.setPosition(objectsLayout.rosarito.x, objectsLayout.rosarito.y).setScale(objectsLayout.rosarito.scale).setDepth(objectsLayout.rosarito.depth);
    this.narrateScreen("objects");
    this.found = 0;
    this.activeObjects = gameState.hiddenObjectSet.length ? gameState.hiddenObjectSet : selectHiddenObjects(gameState.hiddenObjectPool);
    this.hiddenObjectStates = new Map();
    this.objectHintIndex = 0;
    this.objectHintTimer = null;
    this.objectHintPulse = null;
    this.checkItems = new Map();
    this.drawObjectsStoryPage(objectsLayout);
    this.drawSearchScene(objectsLayout);
    this.createObjectsNextButton();
    this.activeObjects.forEach((obj, index) => this.drawChecklistItem(obj, index));
    this.activeObjects.forEach((obj) => this.drawHiddenObject(obj));
    this.startObjectHintLoop();
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      this.stopObjectHintLoop();
    });
  }

  drawObjectsStoryPage(objectsLayout) {
    this.add.ellipse(objectsLayout.shadow.x, objectsLayout.shadow.y, objectsLayout.shadow.width, objectsLayout.shadow.height, objectsLayout.shadow.color, objectsLayout.shadow.alpha).setDepth(objectsLayout.shadow.depth);
    window.RosaritoUI.addScreenTitle(this, objectsLayout.title, {
      divider: objectsLayout.titleDivider,
      flowers: objectsLayout.titleFlowers,
    });

    window.RosaritoUI.addNarrativeBubble(this, objectsLayout.narrative.x, objectsLayout.narrative.y, objectsLayout.narrative.text, {
      width: objectsLayout.narrative.options.width,
      height: objectsLayout.narrative.options.height,
      depth: objectsLayout.narrative.options.depth,
      textOffsetX: objectsLayout.narrative.options.textOffsetX,
      textOffsetY: objectsLayout.narrative.options.textOffsetY,
      maxWidth: objectsLayout.narrative.options.maxWidth,
      maxHeight: objectsLayout.narrative.options.maxHeight,
      fontSize: objectsLayout.narrative.options.fontSize,
      minFontSize: objectsLayout.narrative.options.minFontSize,
      lineSpacing: objectsLayout.narrative.options.lineSpacing,
    });
    this.add.image(objectsLayout.narrativeHeart.x, objectsLayout.narrativeHeart.y, objectsLayout.narrativeHeart.key)
      .setDisplaySize(objectsLayout.narrativeHeart.width, objectsLayout.narrativeHeart.height)
      .setDepth(objectsLayout.narrativeHeart.depth);

    window.RosaritoUI.addMouseHint(this, objectsLayout.mouseHint.x, objectsLayout.mouseHint.y, objectsLayout.mouseHint.text, {
      width: objectsLayout.mouseHint.options.width,
      height: objectsLayout.mouseHint.options.height,
      depth: objectsLayout.mouseHint.options.depth,
      textOffsetY: objectsLayout.mouseHint.options.textOffsetY,
      iconOffsetY: objectsLayout.mouseHint.options.iconOffsetY,
      iconSize: objectsLayout.mouseHint.options.iconSize,
      maxWidth: objectsLayout.mouseHint.options.maxWidth,
      maxHeight: objectsLayout.mouseHint.options.maxHeight,
      fontSize: objectsLayout.mouseHint.options.fontSize,
      minFontSize: objectsLayout.mouseHint.options.minFontSize,
    });

    window.RosaritoUI.addChecklistFrame(this, objectsLayout.checklist.x, objectsLayout.checklist.y, objectsLayout.checklist.title, {
      panelWidth: objectsLayout.checklist.panelWidth,
      panelHeight: objectsLayout.checklist.panelHeight,
      headerWidth: objectsLayout.checklist.headerWidth,
      headerHeight: objectsLayout.checklist.headerHeight,
      headerY: objectsLayout.checklist.headerY,
      titleY: objectsLayout.checklist.titleY,
    });
    this.add.image(objectsLayout.checklistFlowerBottom.x, objectsLayout.checklistFlowerBottom.y, objectsLayout.checklistFlowerBottom.key)
      .setDisplaySize(objectsLayout.checklistFlowerBottom.width, objectsLayout.checklistFlowerBottom.height)
      .setDepth(objectsLayout.checklistFlowerBottom.depth);
  }
  drawSearchScene(objectsLayout) {
    const searchScene = objectsLayout.searchScene;
    this.drawStarCounter(objectsLayout.starCounter.x, objectsLayout.starCounter.y, gameState.achievements.filter(Boolean).length);
    window.RosaritoUI.addSectionHeader(this, objectsLayout.header.x, objectsLayout.header.y, objectsLayout.header.title, {
      width: objectsLayout.header.width,
      height: objectsLayout.header.height,
      depth: objectsLayout.header.depth,
      tint: objectsLayout.header.tint,
      fontSize: objectsLayout.header.fontSize,
      color: objectsLayout.header.color,
      heartOffsetY: objectsLayout.header.heartOffsetY,
    });
    this.add.image(objectsLayout.headerLeaf.x, objectsLayout.headerLeaf.y, objectsLayout.headerLeaf.key)
      .setDisplaySize(objectsLayout.headerLeaf.width, objectsLayout.headerLeaf.height)
      .setAngle(objectsLayout.headerLeaf.angle)
      .setDepth(objectsLayout.headerLeaf.depth);

    this.sceneBounds = { ...SCENE_LAYOUTS.objects.sceneBounds };
    const frame = this.add.graphics().setDepth(4);
    frame.fillStyle(searchScene.fills.base.color, searchScene.fills.base.alpha);
    frame.fillRoundedRect(searchScene.sceneFrame.x, searchScene.sceneFrame.y, searchScene.sceneFrame.width, searchScene.sceneFrame.height, searchScene.sceneFrame.radius);
    frame.lineStyle(searchScene.frameBorder.outer.lineWidth, searchScene.frameBorder.outer.color, searchScene.frameBorder.outer.alpha);
    frame.strokeRoundedRect(searchScene.sceneFrame.x, searchScene.sceneFrame.y, searchScene.sceneFrame.width, searchScene.sceneFrame.height, searchScene.sceneFrame.radius);
    frame.lineStyle(searchScene.frameBorder.inner.lineWidth, searchScene.frameBorder.inner.color, searchScene.frameBorder.inner.alpha);
    frame.strokeRoundedRect(searchScene.inner.x, searchScene.inner.y, searchScene.inner.width, searchScene.inner.height, searchScene.inner.radius);
    this.add.image(this.sceneBounds.x, this.sceneBounds.y, searchScene.backgroundKey)
      .setDisplaySize(this.sceneBounds.width, this.sceneBounds.height)
      .setDepth(5);
    this.add.image(searchScene.leaves.left.x, searchScene.leaves.left.y, searchScene.leaves.left.key)
      .setDisplaySize(searchScene.leaves.left.width, searchScene.leaves.left.height)
      .setDepth(6);
    this.add.image(searchScene.leaves.right.x, searchScene.leaves.right.y, searchScene.leaves.right.key)
      .setDisplaySize(searchScene.leaves.right.width, searchScene.leaves.right.height)
      .setAngle(searchScene.leaves.right.angle || 0)
      .setDepth(6);

    this.successPanel = this.add.container(searchScene.successPanel.x, searchScene.successPanel.y).setAlpha(0).setDepth(searchScene.successPanel.depth);
    this.successPanel.add(this.add.image(0, 0, searchScene.successPanel.boxKey).setDisplaySize(searchScene.successPanel.boxWidth, searchScene.successPanel.boxHeight));
    this.successPanel.add(this.add.image(searchScene.successPanel.heartX, searchScene.successPanel.heartY, searchScene.successPanel.heartKey).setDisplaySize(searchScene.successPanel.heartWidth, searchScene.successPanel.heartHeight));
    this.successPanel.add(window.RosaritoUI.addFittedText(this, searchScene.successPanel.messageX, searchScene.successPanel.messageY, searchScene.completeText, {
      maxWidth: searchScene.successPanel.messageMaxWidth,
      maxHeight: searchScene.successPanel.messageMaxHeight,
      minFontSize: searchScene.successPanel.messageMinFont,
      style: {
        fontSize: searchScene.successPanel.messageFontSize,
        color: objectsLayout.searchScene.completeTextStyle.color,
        align: "center",
        wordWrap: { width: searchScene.successPanel.messageMaxWidth },
        lineSpacing: searchScene.successPanel.messageLineSpacing,
      },
    }).setOrigin(0.5));
  }

  drawChecklistItem(obj, index) {
    const checklistLayout = SCENE_LAYOUTS.objects.checklist;
    const itemLayout = checklistLayout.item || {};
    const y = (itemLayout.startY || 456) + index * (itemLayout.spacing || 48);
    const typography = window.RosaritoUI.TEXT_STYLES || {};
    const { row, label, check } = window.RosaritoUI.addChecklistRow(this, checklistLayout.x, y, obj.label, {
      ...itemLayout,
      bodyStyle: typography.body || {},
      titleStyle: itemLayout.labelStyle || {},
      rowKey: "hidden-ui-list_row",
      rowWidth: itemLayout.width || 266,
      rowHeight: itemLayout.height || 50,
      iconKey: obj.iconKey,
      iconX: itemLayout.iconX,
      iconY: itemLayout.labelY || 0,
      iconWidth: itemLayout.iconW || 38,
      iconHeight: itemLayout.iconH || 38,
      labelX: itemLayout.labelX || -55,
      labelY: itemLayout.labelY || 0,
      labelMaxWidth: itemLayout.labelMaxWidth || 148,
      labelMaxHeight: itemLayout.labelMaxHeight || 42,
      labelMinFont: itemLayout.labelMinFont || 12,
      checkX: itemLayout.checkX || 112,
      checkSize: itemLayout.checkSize || 30,
      checkTint: itemLayout.checkTint || 0x4f8553,
    });
    this.checkItems.set(obj.id, { row, label, check });
  }

  drawHiddenObject(obj) {
    const bounds = this.sceneBounds;
    const objectX = Number.isFinite(obj.xRatio) ? bounds.x - bounds.width / 2 + bounds.width * obj.xRatio : obj.x;
    const objectY = Number.isFinite(obj.yRatio) ? bounds.y - bounds.height / 2 + bounds.height * obj.yRatio : obj.y;
    const objectWidth = Number.isFinite(obj.widthRatio) ? bounds.width * obj.widthRatio : obj.width;
    const objectHeight = Number.isFinite(obj.heightRatio) ? bounds.height * obj.heightRatio : obj.height;
    const searchScene = SCENE_LAYOUTS.objects.searchScene || {};
    const searchDefaults = searchScene.hitDefaults || {};
    const baseHitPadding = Number(searchDefaults.basePadding || 58);
    const target = this.add.container(objectX, objectY).setDepth(12);
    const sprite = this.add.image(0, 0, obj.spriteKey).setDisplaySize(objectWidth, objectHeight);
    target.add(sprite);
    const hitPadding = Math.max(
      Number(obj.hitPadding || 0),
      baseHitPadding,
      Math.round(Math.max(objectWidth, objectHeight) * Number(searchDefaults.sizeScale || 0.10)),
    );
    target.setSize(objectWidth + hitPadding * 2, objectHeight + hitPadding * 2);
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

    const generousHitPadding = Math.max(
      Number(obj.hitPadding || 0),
      baseHitPadding,
      Math.round(Math.max(objectWidth, objectHeight) * Number(searchDefaults.sizeScale || 0.10)),
    );
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
    const objectFeedback = this.add.image(obj.x, obj.y - Math.min(14, obj.height * 0.2), "ui-icon_sparkles")
      .setDisplaySize(42, 42)
      .setDepth(25)
      .setAlpha(0.9);
    this.tweens.add({ targets: objectFeedback, alpha: 0, y: obj.y - obj.height / 2 - 8, scale: 1.12, duration: 360, ease: "Cubic.easeOut" });
    const foundBadge = this.add.image(obj.x, obj.y, "m2-heart")
      .setDisplaySize(24, 22)
      .setDepth(26)
      .setAlpha(0)
      .setTint(0x5ea57f);
    this.tweens.add({
      targets: foundBadge,
      alpha: 1,
      y: obj.y - 8,
      scale: 1.15,
      duration: 220,
      ease: "Sine.easeOut",
      yoyo: true,
      onComplete: () => {
        this.tweens.add({
          targets: foundBadge,
          alpha: 0,
          duration: 220,
          onComplete: () => foundBadge.destroy(),
        });
      },
    });
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
    const objectsLayout = SCENE_LAYOUTS.objects;
    this.nextButton = window.RosaritoUI.addNextButton(
      this,
      objectsLayout.nextButton.x,
      objectsLayout.nextButton.y,
      objectsLayout.nextButtonLabel || "Siguiente",
      () => this.scene.start("Final"),
      { enabled: false },
    );
  }

  enableObjectsNextButton() {
    this.nextButton.setEnabled(true);
  }

  completeHiddenObjects() {
    const objectsLayout = SCENE_LAYOUTS.objects;
    const objectFeedback = objectsLayout.feedback || {};
    this.stopObjectHintLoop();
    gameState.achievements[2] = true;
    this.celebrateRosarito();
    this.feedback(objectFeedback.complete || "Encontraste todos los objetos.", true);
    this.tweens.add({ targets: this.successPanel, alpha: 1, y: 610, duration: 280, ease: "Back.easeOut" });
    this.enableObjectsNextButton();
  }
}

class FinalScene extends BaseScene {
  constructor() {
    super("Final");
  }

  create() {
    const finalLayout = SCENE_LAYOUTS.final;
    this.createBook("", "");
    this.rosaritoSprite.setPosition(finalLayout.rosarito.x, finalLayout.rosarito.y)
      .setScale(finalLayout.rosarito.scale)
      .setDepth(finalLayout.rosarito.depth);
    this.celebrateRosarito();
    this.narrateScreen("final");

    this.add.image(finalLayout.flowers.topLeft.x, finalLayout.flowers.topLeft.y, finalLayout.flowers.topLeft.key)
      .setDisplaySize(finalLayout.flowers.topLeft.width, finalLayout.flowers.topLeft.height)
      .setDepth(finalLayout.flowers.topLeft.depth)
      .setAngle(finalLayout.flowers.topLeft.angle);
    this.add.image(finalLayout.flowers.topRight.x, finalLayout.flowers.topRight.y, finalLayout.flowers.topRight.key)
      .setDisplaySize(finalLayout.flowers.topRight.width, finalLayout.flowers.topRight.height)
      .setDepth(finalLayout.flowers.topRight.depth);

    this.add.image(finalLayout.headingPanel.x, finalLayout.headingPanel.y, finalLayout.headingPanel.key)
      .setDisplaySize(finalLayout.headingPanel.width, finalLayout.headingPanel.height)
      .setDepth(finalLayout.headingPanel.depth);
    window.RosaritoUI.addFittedText(this, finalLayout.headingPanel.text.x, finalLayout.headingPanel.text.y, finalLayout.text.title, "title", {
      maxWidth: finalLayout.headingPanel.text.maxWidth,
      maxHeight: finalLayout.headingPanel.text.maxHeight,
      minFontSize: finalLayout.headingPanel.text.minFontSize,
      depth: finalLayout.headingPanel.text.depth,
      style: finalLayout.headingPanel.text.style,
    }).setOrigin(0.5);

    this.add.image(finalLayout.bodyPanel.x, finalLayout.bodyPanel.y, finalLayout.bodyPanel.key)
      .setDisplaySize(finalLayout.bodyPanel.width, finalLayout.bodyPanel.height)
      .setAlpha(0.95)
      .setDepth(finalLayout.bodyPanel.depth);
    window.RosaritoUI.addFittedText(this, finalLayout.bodyPanel.text.x, finalLayout.bodyPanel.text.y, finalLayout.text.body, "body", {
      maxWidth: finalLayout.bodyPanel.text.maxWidth,
      maxHeight: finalLayout.bodyPanel.text.maxHeight,
      minFontSize: finalLayout.bodyPanel.text.minFontSize,
      depth: finalLayout.bodyPanel.text.depth,
      style: finalLayout.bodyPanel.text.style,
    });
    this.add.image(finalLayout.bodyPanel.divider.x, finalLayout.bodyPanel.divider.y, finalLayout.bodyPanel.divider.key)
      .setDisplaySize(finalLayout.bodyPanel.divider.width, finalLayout.bodyPanel.divider.height)
      .setDepth(finalLayout.bodyPanel.divider.depth);

    this.add.image(finalLayout.star.x, finalLayout.star.y, finalLayout.star.key)
      .setDisplaySize(finalLayout.star.width, finalLayout.star.height)
      .setDepth(finalLayout.star.depth);
    const starCountLayout = finalLayout.star.counter || {};
    const totalStars = Number(starCountLayout.max || gameState.achievements.length || 3);
    const starCountValue = `${gameState.achievements.filter(Boolean).length}/${totalStars}`;
    window.RosaritoUI.addFittedText(this, finalLayout.star.counter.x, finalLayout.star.counter.y, starCountValue, "title", {
      maxWidth: finalLayout.star.counter.maxWidth,
      maxHeight: finalLayout.star.counter.maxHeight,
      minFontSize: finalLayout.star.counter.minFontSize,
      depth: finalLayout.star.counter.depth,
      style: finalLayout.star.counter.style,
    }).setOrigin(0.5);

    this.add.image(finalLayout.closing.panel.x, finalLayout.closing.panel.y, finalLayout.closing.panel.key)
      .setDisplaySize(finalLayout.closing.panel.width, finalLayout.closing.panel.height)
      .setDepth(finalLayout.closing.panel.depth)
      .setAlpha(finalLayout.closing.panel.alpha);
    this.add.image(finalLayout.closing.book.x, finalLayout.closing.book.y, finalLayout.closing.book.key)
      .setDisplaySize(finalLayout.closing.book.width, finalLayout.closing.book.height)
      .setDepth(finalLayout.closing.book.depth);
    window.RosaritoUI.addFittedText(this, finalLayout.closing.title.x, finalLayout.closing.title.y, finalLayout.closing.title.text, "title", {
      maxWidth: finalLayout.closing.title.maxWidth,
      maxHeight: finalLayout.closing.title.maxHeight,
      minFontSize: finalLayout.closing.title.minFontSize,
      depth: finalLayout.closing.title.depth,
      style: finalLayout.closing.title.style,
    }).setOrigin(0.5);
    window.RosaritoUI.addFittedText(this, finalLayout.closing.message.x, finalLayout.closing.message.y, finalLayout.closing.message.text, "body", {
      maxWidth: finalLayout.closing.message.maxWidth,
      maxHeight: finalLayout.closing.message.maxHeight,
      minFontSize: finalLayout.closing.message.minFontSize,
      depth: finalLayout.closing.message.depth,
      style: finalLayout.closing.message.style,
    });

    this.add.image(finalLayout.flowers.bottom.x, finalLayout.flowers.bottom.y, finalLayout.flowers.bottom.key)
      .setDisplaySize(finalLayout.flowers.bottom.width, finalLayout.flowers.bottom.height)
      .setDepth(finalLayout.flowers.bottom.depth);
    this.add.image(finalLayout.sparkle.x, finalLayout.sparkle.y, finalLayout.sparkle.key)
      .setDisplaySize(finalLayout.sparkle.width, finalLayout.sparkle.height)
      .setDepth(finalLayout.sparkle.depth);

    this.makeButton(finalLayout.restart.x, finalLayout.restart.y, finalLayout.restart.label, () => {
      resetRun();
      this.scene.start(finalLayout.restart.targetScene);
    }, finalLayout.restart.width).setDepth(10);
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



