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
    hitArea = new Phaser.Geom.Rectangle(-168, -63, 230, 126),
  } = options;
  let isEnabled = enabled;
  const button = scene.add.container(x, y).setDepth(depth);
  const arrow = scene.add.image(0, 0, "ui-button_arrow_right").setDisplaySize(arrowSize, arrowSize);
  const text = scene.add.text(labelX, labelY, label, {
    ...TEXT_STYLES.button,
    fontSize: "22px",
  }).setOrigin(0.5);
  button.add([arrow, text]);
  button.setSize(hitArea.width, hitArea.height).setInteractive(hitArea, Phaser.Geom.Rectangle.Contains);

  button.setEnabled = (nextEnabled = true) => {
    isEnabled = nextEnabled;
    button.setAlpha(isEnabled ? 1 : 0.42);
    button.setScale(1);
    if (button.input) button.input.enabled = isEnabled;
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

function drawProgress(scene, gameState) {
  for (let i = 0; i < 3; i += 1) {
    const x = 825 + i * 90;
    const active = gameState.achievements[i] || i === gameState.achievements.filter(Boolean).length;
    const star = scene.add.image(x, 96, "ui-star_full").setDisplaySize(54, 54);
    if (!active) star.setTint(0xd0c2b0).setAlpha(0.58);
    scene.add.text(x, 94, String(i + 1), {
      fontFamily: "Comic Sans MS, Trebuchet MS, Arial",
      fontSize: "21px",
      fontStyle: "bold",
      color: "#3e2b22",
    }).setOrigin(0.5);
  }
}

function drawStarCounter(scene, x = 1048, y = 96, value = 0) {
  scene.add.image(x, y, "ui-label_long_cream").setDisplaySize(98, 44).setDepth(5);
  scene.add.image(x - 32, y - 1, "ui-star_full").setDisplaySize(34, 34).setDepth(6);
  scene.add.text(x + 20, y, `${value}/3`, {
    fontFamily: "Comic Sans MS, Trebuchet MS, Arial",
    fontSize: "23px",
    fontStyle: "bold",
    color: "#3e2b22",
  }).setOrigin(0.5).setDepth(6);
}

function createFeedback(scene, message, good = true) {
  window.RosaritoAudio.playTone(scene, good ? "success" : "error");
  window.RosaritoAudio.playAudioKey(scene, good ? "voice.feedback.success" : "voice.feedback.error");
  const panel = scene.add.container(window.RosaritoLayouts.WIDTH / 2, 145).setDepth(1000);
  panel.add(scene.add.image(0, 0, good ? "ui-speech_large_lilac" : "ui-speech_large_cream").setDisplaySize(690, 126));
  panel.add(scene.add.image(-292, -2, good ? "ui-icon_check" : "ui-icon_x").setDisplaySize(54, 54));
  panel.add(scene.add.text(35, 0, message, {
    fontFamily: "Comic Sans MS, Trebuchet MS, Arial",
    fontSize: "22px",
    fontStyle: "bold",
    color: "#3e2b22",
    align: "center",
    wordWrap: { width: 565 },
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
  addChecklistFrame,
  addScreenTitle,
  addNextButton,
  drawProgress,
  drawStarCounter,
  createFeedback,
};
}());
