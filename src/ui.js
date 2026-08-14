(function () {
const FONT_FAMILY = "Comic Sans MS, Trebuchet MS, Arial";

const TEXT_STYLES = {
  title: {
    fontFamily: FONT_FAMILY,
    fontStyle: "bold",
    color: "#6a3d8f",
    align: "center",
  },
  body: {
    fontFamily: FONT_FAMILY,
    color: "#3e2b22",
    align: "center",
    lineSpacing: 4,
  },
  question: {
    fontFamily: FONT_FAMILY,
    color: "#3e2b22",
    align: "center",
    lineSpacing: 3,
    wordWrap: { width: 350 },
  },
  button: {
    fontFamily: FONT_FAMILY,
    fontStyle: "bold",
    color: "#fff8e9",
    align: "center",
  },
  badge: {
    fontFamily: FONT_FAMILY,
    fontStyle: "bold",
    color: "#3e2b22",
    align: "center",
  },
};

function normalizeFontSize(value, fallback = 22) {
  const parsed = Number.parseInt(String(value || ""), 10);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function getTextStyle(nameOrStyle = "body", overrides = {}) {
  const base = typeof nameOrStyle === "string" ? TEXT_STYLES[nameOrStyle] || TEXT_STYLES.body : nameOrStyle;
  return { ...base, ...overrides };
}

function addFittedText(scene, x, y, text, styleNameOrStyle = "body", options = {}) {
  const {
    maxWidth,
    maxHeight,
    minFontSize = 16,
    origin = 0.5,
    depth,
    style = {},
  } = options;
  const resolvedStyle = getTextStyle(styleNameOrStyle, style);
  const label = scene.add.text(x, y, text, resolvedStyle).setOrigin(origin);
  if (depth !== undefined) label.setDepth(depth);

  const startingSize = normalizeFontSize(resolvedStyle.fontSize, 22);
  let nextSize = startingSize;
  while (nextSize > minFontSize && ((maxWidth && label.width > maxWidth) || (maxHeight && label.height > maxHeight))) {
    nextSize -= 1;
    label.setFontSize(nextSize);
  }
  return label;
}

function addNarrativeBubble(scene, x, y, text, options = {}) {
  const {
    width = 300,
    height = 132,
    depth = 7,
    alpha = 1,
    textOffsetX = 0,
    textOffsetY = 0,
    maxWidth = width * 0.72,
    maxHeight = height * 0.58,
    fontSize = "22px",
    minFontSize = 16,
    lineSpacing = 4,
    key = "ui-speech_large_cream",
  } = options;
  const bubble = scene.add.image(x, y, key).setDisplaySize(width, height).setDepth(depth);
  if (alpha !== 1) bubble.setAlpha(alpha);
  const label = addFittedText(scene, x + textOffsetX, y + textOffsetY, text, "body", {
    maxWidth,
    maxHeight,
    minFontSize,
    depth: depth + 1,
    style: {
      fontSize,
      lineSpacing,
      wordWrap: { width: maxWidth },
    },
  });
  return { bubble, label };
}

function addMouseHint(scene, x, y, text, options = {}) {
  const {
    width = 220,
    height = 140,
    depth = 7,
    textOffsetY = -20,
    iconOffsetY = 42,
    iconSize = 44,
    maxWidth = width * 0.62,
    maxHeight = height * 0.42,
    fontSize = "18px",
    minFontSize = 14,
    key = "ui-speech_large_lilac",
  } = options;
  const bubble = scene.add.image(x, y, key).setDisplaySize(width, height).setDepth(depth);
  const label = addFittedText(scene, x, y + textOffsetY, text, "body", {
    maxWidth,
    maxHeight,
    minFontSize,
    depth: depth + 1,
    style: {
      fontSize,
      wordWrap: { width: maxWidth },
    },
  });
  const icon = scene.add.image(x, y + iconOffsetY, "ui-icon_mouse").setDisplaySize(iconSize, iconSize).setDepth(depth + 1);
  return { bubble, label, icon };
}

function addSectionHeader(scene, x, y, text, options = {}) {
  const {
    width = 390,
    height = 70,
    depth = 5,
    tint,
    alpha = 1,
    fontSize = "28px",
    color = "#5b3277",
    maxWidth = width * 0.82,
    minFontSize = 18,
    heart = true,
    heartOffsetY = height * 0.64,
  } = options;
  const plate = scene.add.image(x, y, "ui-label_long_cream").setDisplaySize(width, height).setDepth(depth);
  if (tint) plate.setTint(tint);
  if (alpha !== 1) plate.setAlpha(alpha);
  const label = addFittedText(scene, x, y, text, "title", {
    maxWidth,
    maxHeight: height * 0.58,
    minFontSize,
    depth: depth + 1,
    style: {
      fontSize,
      color,
      strokeThickness: 0,
    },
  });
  const heartIcon = heart ? scene.add.image(x, y + heartOffsetY, "m2-heart").setDisplaySize(30, 28).setDepth(depth + 1) : null;
  return { plate, label, heart: heartIcon };
}

function addQuizQuestionPanel(scene, x, y, questionText, options = {}) {
  const {
    totalQuestions = 3,
    questionIndex = 1,
    panelWidth = 470,
    panelHeight = 78,
    panelDepth = 5,
    panelKey = "m2-question_panel",
    flowerKey = "ui-icon_flower",
    flowerSize = 74,
    badgeXOffset = -234,
    badgeY = -8,
    counterXOffset = 216,
    counterYOffset = -24,
    counterWidth = 78,
    counterHeight = 48,
    questionMaxWidth = 350,
    questionMaxHeight = 68,
    questionMinFontSize = 17,
    questionFontSize = "22px",
    questionLongFontSize = "20px",
    progressFontSize = "22px",
    maxQuestionLength = 52,
    progressTextColor = "#fff8e9",
  } = options;

  const panel = scene.add.image(x, y, panelKey).setDisplaySize(panelWidth, panelHeight).setDepth(panelDepth);

  const badge = scene.add.image(x + badgeXOffset, y + badgeY, flowerKey).setDisplaySize(flowerSize, flowerSize)
    .setDepth(panelDepth + 1);
  const badgeText = addFittedText(scene, badge.x, badge.y + (questionIndex >= 10 ? 8 : 4), String(questionIndex), "button", {
    maxWidth: 72,
    maxHeight: 34,
    minFontSize: 18,
    depth: panelDepth + 2,
    style: {
      fontSize: questionIndex >= 10 ? "32px" : "34px",
      fontStyle: "bold",
      color: "#fff8e9",
      stroke: "#6a3d8f",
      strokeThickness: 3,
      align: "center",
    },
  }).setOrigin(0.5);

  const questionCard = scene.add.graphics().setDepth(panelDepth + 1);
  questionCard.fillStyle(0x77559a, 0.94);
  questionCard.fillRoundedRect(x + counterXOffset - counterWidth / 2, y + badgeY - 2, counterWidth, counterHeight, 20);
  questionCard.lineStyle(3, 0xf3d36d, 0.95);
  questionCard.strokeRoundedRect(x + counterXOffset - counterWidth / 2, y + badgeY - 2, counterWidth, counterHeight, 20);

  const counterText = addFittedText(scene, x + counterXOffset, y + badgeY + counterHeight / 2 + 3, `${questionIndex}/${totalQuestions}`, "body", {
    maxWidth: counterWidth - 8,
    maxHeight: 34,
    minFontSize: 16,
    depth: panelDepth + 2,
    style: {
      fontSize: progressFontSize,
      fontStyle: "bold",
      color: progressTextColor,
    align: "center",
    },
  }).setOrigin(0.5);

  const questionLabel = addFittedText(scene, x + 34, y, questionText, "question", {
    maxWidth: questionMaxWidth,
    maxHeight: questionMaxHeight,
    minFontSize: questionMinFontSize,
    depth: panelDepth + 2,
    style: {
      fontSize: questionText.length > maxQuestionLength ? questionLongFontSize : questionFontSize,
      color: "#3e2b22",
      align: "center",
      wordWrap: { width: questionMaxWidth + 2 },
      lineSpacing: 3,
    },
  });

  return {
    panel,
    badge,
    badgeText,
    counterText,
    questionLabel,
    progressText: counterText,
    decorativeCounterBg: questionCard,
  };
}

function addChecklistFrame(scene, x, y, title, options = {}) {
  const {
    panelWidth = 300,
    panelHeight = 316,
    headerWidth = 314,
    headerHeight = 92,
    headerY = y - panelHeight / 2 + 5,
    panelDepth = 5,
    headerDepth = 6,
    titleY = headerY + 9,
  } = options;
  const panel = scene.add.image(x, y, "hidden-ui-list_panel").setDisplaySize(panelWidth, panelHeight).setDepth(panelDepth);
  const header = scene.add.image(x, headerY, "hidden-ui-list_header").setDisplaySize(headerWidth, headerHeight).setDepth(headerDepth);
  const label = addFittedText(scene, x, titleY, title, "button", {
    maxWidth: headerWidth * 0.78,
    maxHeight: 34,
    minFontSize: 16,
    depth: headerDepth + 1,
    style: {
      fontSize: "20px",
      color: "#fff8e9",
    },
  });
  return { panel, header, label };
}

function addChecklistRow(scene, x, y, text, options = {}) {
  const {
    rowKey = "hidden-ui-list_row",
    rowWidth = 266,
    rowHeight = 50,
    rowAlpha = 0.48,
    iconKey,
    iconX = -104,
    iconY = 0,
    iconWidth = 38,
    iconHeight = 38,
    labelX = -55,
    labelY = 0,
    labelMaxWidth = 148,
    labelMaxHeight = 42,
    labelMinFont = 12,
    labelStyle = {},
    checkX = 112,
    checkY = 0,
    checkSize = 30,
    checkTint = 0x4f8553,
    depth = 8,
    bodyStyle = {},
    titleStyle = {},
  } = options;

  const row = scene.add.container(x, y).setDepth(depth);
  row.add(scene.add.image(0, 0, rowKey)
    .setDisplaySize(rowWidth, rowHeight)
    .setAlpha(rowAlpha));
  if (iconKey) {
    row.add(scene.add.image(iconX, iconY, iconKey).setDisplaySize(iconWidth, iconHeight));
  }
  const label = addFittedText(scene, labelX, labelY, text, "body", {
    maxWidth: labelMaxWidth,
    maxHeight: labelMaxHeight,
    minFontSize: labelMinFont,
    style: {
      ...bodyStyle,
      ...titleStyle,
      align: labelX ? "left" : "center",
      wordWrap: { width: labelMaxWidth },
    },
  }).setOrigin(0, 0.5);
  const check = scene.add.image(checkX, checkY, "ui-icon_check")
    .setDisplaySize(checkSize, checkSize)
    .setAlpha(0)
    .setTint(checkTint)
    .setOrigin(0.5);
  row.add([label, check]);
  check.text = "";
  check.setData("checked", false);
  return { row, label, check };
}

function addScreenTitle(scene, lines, options = {}) {
  const {
    depth = 5,
    stroke = "#f6e2ba",
    strokeThickness = 4,
    color = "#6a3d8f",
    divider,
    flowers = [],
  } = options;
  const titleLines = lines.map((line) => scene.add.text(line.x, line.y, line.text, {
    ...TEXT_STYLES.title,
    fontSize: line.fontSize,
    color: line.color || color,
    stroke: line.stroke || stroke,
    strokeThickness: line.strokeThickness ?? strokeThickness,
  }).setOrigin(line.origin ?? 0.5).setDepth(line.depth ?? depth));
  const dividerImage = divider ? scene.add.image(divider.x, divider.y, divider.key || "ui-divider_heart_purple")
    .setDisplaySize(divider.width, divider.height)
    .setDepth(divider.depth ?? depth) : null;
  const flowerImages = flowers.map((flower) => {
    const image = scene.add.image(flower.x, flower.y, flower.key)
      .setDisplaySize(flower.width, flower.height)
      .setDepth(flower.depth ?? depth - 1);
    if (flower.angle) image.setAngle(flower.angle);
    return image;
  });
  return { lines: titleLines, divider: dividerImage, flowers: flowerImages };
}

function addNextButton(scene, x, y, label, onClick, options = {}) {
  const {
    depth = 900,
    enabled = true,
    arrowSize = 126,
    hoverArrowSize = 138,
    labelX = -118,
    labelY = 12,
    disabledHint = "Completa para continuar",
    disabledTextColor = "#6e3e73",
    disabledSubHint = "Toque en pantalla",
    hitArea = new Phaser.Geom.Rectangle(-168, -63, 230, 126),
  } = options;
  let isEnabled = enabled;
  const lockTint = 0x8f4f67;
  const button = scene.add.container(x, y).setDepth(depth);
  const arrow = scene.add.image(0, 0, "ui-button_arrow_right").setDisplaySize(arrowSize, arrowSize);
  const text = scene.add.text(labelX, labelY, label, {
    ...TEXT_STYLES.button,
    fontSize: "22px",
  }).setOrigin(0.5);
  const status = scene.add.text(labelX, 46, "", {
    ...TEXT_STYLES.body,
    fontSize: "15px",
    fontStyle: "bold",
    color: disabledTextColor,
  }).setOrigin(0.5);
  const statusHint = scene.add.image(labelX + 72, 28, "ui-icon_tap")
    .setDisplaySize(24, 24)
    .setTint(0x9a5a9f)
    .setAlpha(0.95);
  const disabledBackdrop = scene.add.graphics().setVisible(false);
  const disabledRing = scene.add.graphics().setVisible(false);
  const lockIcon = scene.add.image(labelX, 20, "ui-icon_exclaim")
    .setDisplaySize(26, 26)
    .setTint(0x85527a)
    .setAlpha(0.9);
  button.add([arrow, text, status, statusHint, disabledBackdrop, lockIcon, disabledRing]);
  button.lockIcon = lockIcon;
  button.disabledRing = disabledRing;
  button.disabledBackdrop = disabledBackdrop;
  button.setSize(hitArea.width, hitArea.height).setInteractive(hitArea, Phaser.Geom.Rectangle.Contains);
  let statusPulse = null;

  button.setEnabled = (nextEnabled = true, disabledText = disabledHint) => {
    isEnabled = nextEnabled;
    button.setAlpha(isEnabled ? 1 : 0.62);
    button.setScale(isEnabled ? 1 : 0.98);
    arrow.setTint(isEnabled ? 0xffffff : 0x9d95a8);
    text.setAlpha(isEnabled ? 1 : 0.8);
    status.setAlpha(isEnabled ? 0 : 1);
    statusHint.setAlpha(isEnabled ? 0 : 0.85);
    status.setText(isEnabled ? "" : disabledText);
    status.setColor(isEnabled ? "#6c6c6c" : disabledTextColor);
    statusHint.setTexture(isEnabled ? "ui-icon_tap" : "ui-icon_exclaim");
    statusHint.setTint(isEnabled ? 0x9a5a9f : lockTint);
    statusHint.setScale(isEnabled ? 1 : 1.12);
    statusHint.setAlpha(isEnabled ? 0.75 : 1);
    status.setText(isEnabled ? "" : `${disabledText}\n${disabledSubHint}`);
    status.setFontSize(isEnabled ? "14px" : "14px");
    status.setLineSpacing(isEnabled ? 0 : 2);
    if (button.input) button.input.enabled = isEnabled;
    if (statusPulse) {
      statusPulse.remove();
      statusPulse = null;
    }
    if (!isEnabled) {
      statusPulse = scene.tweens.add({
        targets: [statusHint, lockIcon],
        alpha: 0.45,
        yoyo: true,
        duration: 650,
        repeat: -1,
      });
      lockIcon.setVisible(true).setAlpha(0.64).setScale(0.95);
      disabledBackdrop.setVisible(true).setAlpha(0.28);
      disabledBackdrop.clear();
      disabledBackdrop.fillStyle(0x2a1828, 0.42);
      disabledBackdrop.fillRoundedRect(-154, -58, 256, 112, 28);
      disabledRing.setVisible(true).setAlpha(0.34);
      disabledRing.clear();
      disabledRing.fillStyle(0x8f5a7c, 0.15).fillRoundedRect(-146, -48, 240, 96, 24);
      disabledRing.lineStyle(2.5, 0xdca16f, 0.48).strokeRoundedRect(-146, -48, 240, 96, 24);
    } else {
      lockIcon.setVisible(false);
      disabledBackdrop.setVisible(false);
      disabledRing.setVisible(false);
      statusHint.setAlpha(0);
    }
    return button;
  };

  button.on("pointerover", () => {
    if (!isEnabled) return;
    button.setScale(1.04);
    window.RosaritoAudio.playTone(scene, "hover");
  });
  button.on("pointerout", () => {
    if (!isEnabled) return;
    button.setScale(1);
    arrow.setDisplaySize(arrowSize, arrowSize);
  });
  button.on("pointerdown", () => {
    if (!isEnabled) return;
    window.RosaritoAudio.playTone(scene, "click");
    if (window.requestImmersiveMode) window.requestImmersiveMode();
    onClick();
  });

  button.setEnabled(enabled);
  button.setArrowSize = (nextSize = arrowSize) => {
    arrow.setDisplaySize(nextSize, nextSize);
    return button;
  };
  button.hoverArrowSize = hoverArrowSize;
  return button;
}

function addPrimaryButton(scene, x, y, label, onClick, options = {}) {
  const {
    width = 250,
    height = 82,
    depth,
    fontSize = "24px",
    enabled = true,
  } = options;
  let isEnabled = enabled;
  const button = scene.add.container(x, y);
  if (depth !== undefined) button.setDepth(depth);
  const bg = scene.add.image(0, 0, "ui-button_long_purple").setDisplaySize(width, height);
  const text = scene.add.text(0, 0, label, {
    ...TEXT_STYLES.button,
    fontSize,
  }).setOrigin(0.5);
  button.add([bg, text]);
  button.setSize(width, height).setInteractive({ useHandCursor: true });

  button.setEnabled = (nextEnabled = true) => {
    isEnabled = nextEnabled;
    button.setAlpha(isEnabled ? 1 : 0.45);
    if (button.input) button.input.enabled = isEnabled;
    button.setScale(1);
    return button;
  };

  button.on("pointerover", () => {
    if (!isEnabled) return;
    button.setScale(1.03);
    window.RosaritoAudio.playTone(scene, "hover");
  });
  button.on("pointerout", () => {
    if (!isEnabled) return;
    button.setScale(1);
  });
  button.on("pointerdown", () => {
    if (!isEnabled) return;
    window.RosaritoAudio.playTone(scene, "click");
    if (window.requestImmersiveMode) window.requestImmersiveMode();
    onClick();
  });
  button.setEnabled(enabled);
  return button;
}

function drawProgress(scene, gameState) {
  for (let i = 0; i < 3; i += 1) {
    const x = 825 + i * 90;
    const active = gameState.achievements[i] || i === gameState.achievements.filter(Boolean).length;
    const star = scene.add.image(x, 96, "ui-star_full").setDisplaySize(54, 54);
    if (!active) star.setTint(0xd0c2b0).setAlpha(0.58);
  }
}

function drawStarCounter(scene, x = 1048, y = 96, value = 0) {
  scene.add.image(x, y, "ui-label_long_cream").setDisplaySize(98, 44).setDepth(5);
  scene.add.image(x - 32, y - 1, "ui-star_full").setDisplaySize(34, 34).setDepth(6);
  addFittedText(scene, x + 20, y, `${value}/3`, "body", {
    maxWidth: 48,
    maxHeight: 28,
    minFontSize: 18,
    style: {
      fontSize: "23px",
      fontStyle: "bold",
      color: "#3e2b22",
    },
  }).setOrigin(0.5).setDepth(6);
}

function createFeedback(scene, message, good = true) {
  window.RosaritoAudio.playTone(scene, good ? "success" : "error");
  window.RosaritoAudio.playAudioKey(scene, good ? "voice.feedback.success" : "voice.feedback.error");
  const panel = scene.add.container(window.RosaritoLayouts.WIDTH / 2, 145).setDepth(1000);
  panel.add(scene.add.image(0, 0, good ? "ui-speech_large_lilac" : "ui-speech_large_cream").setDisplaySize(690, 126));
  panel.add(scene.add.image(-292, -2, good ? "ui-icon_check" : "ui-icon_x").setDisplaySize(54, 54));
  panel.add(addFittedText(scene, 35, 0, message, "body", {
    maxWidth: 565,
    maxHeight: 72,
    minFontSize: 18,
    style: {
      fontSize: "22px",
      fontStyle: "bold",
      color: "#3e2b22",
      align: "center",
      wordWrap: { width: 565 },
    },
  }).setOrigin(0.5));
  scene.tweens.add({ targets: panel, y: 120, alpha: 0, delay: 850, duration: 500, onComplete: () => panel.destroy() });
  return panel;
}

window.RosaritoUI = {
  TEXT_STYLES,
  getTextStyle,
  addFittedText,
  addNarrativeBubble,
  addMouseHint,
  addSectionHeader,
  addQuizQuestionPanel,
  addChecklistFrame,
  addChecklistRow,
  addScreenTitle,
  addNextButton,
  addPrimaryButton,
  drawProgress,
  drawStarCounter,
  createFeedback,
};
}());
