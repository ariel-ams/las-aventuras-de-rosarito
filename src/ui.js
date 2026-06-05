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

window.RosaritoUI = { TEXT_STYLES, getTextStyle, addFittedText, drawProgress, drawStarCounter, createFeedback };
}());
