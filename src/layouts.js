(function () {
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

const SCENE_LAYOUTS = {
  cover: {
    startButton: { x: 1010, y: 706, width: 280 },
    starCounter: { x: 1090, y: 90 },
  },
  dones: {
    optionStart: { x: 735, y: 330 },
    optionGap: { x: 240, y: 132 },
    rosarito: { x: 1082, y: 595, scale: 0.19 },
  },
  quiz: {
    starCounter: { x: 1126, y: 82 },
    answerStart: { x: 720, y: 526 },
    answerGap: 170,
  },
  puzzle: {
    starCounter: { x: 1110, y: 84 },
    board: { x: 885, y: 365, size: 390 },
    nextButton: { x: 1095, y: 675 },
  },
  objects: {
    starCounter: { x: 1110, y: 84 },
    sceneBounds: { x: 902, y: 378, width: 520, height: 430 },
    nextButton: { x: 1095, y: 675 },
  },
};

window.RosaritoLayouts = { WIDTH, HEIGHT, COLORS, LAYOUT, SCENE_LAYOUTS };
}());
