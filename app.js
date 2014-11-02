var Canvas = require('drawille');
var line = require('bresenham');

var buffer = 0;
var w = 320,
    h = 112,
    x = (w / 2),
    y = (h / 2),
    z = (w + h) / 2;
var tick = 0;
var c =  new Canvas(w, h);
var ratio = 128;
var speed = 0.5;
var newSpeed = 18;
var n = 256;
var stars = [];

function init() {
  for (var i = 0; i < n; i++) {
    stars[i] = new Array(7);
    stars[i][0] = Math.random() * w * 2 - x * 2;
    stars[i][1] = Math.random() * h * 2 - y * 2;
    stars[i][2] = Math.round(Math.random() * z);
    stars[i][3] = 0;
    stars[i][4] = 0;
    stars[i][5] = 0;
    stars[i][6] = 0;
  }
}

function render() {
  for (var i = 0; i < n; i++) {
    stars[i][5] = stars[i][3];
    stars[i][6] = stars[i][4];

    stars[i][2] -= speed;
    if (stars[i][2] > z) {
      stars[i][2] -= z
    }
    if (stars[i][2] < 0) {
      stars[i][2] += z;
      stars[i][0] = Math.random() * w * 2 - x * 2;
      stars[i][1] = Math.random() * h * 2 - y * 2;
    }
    stars[i][3] = x + (stars[i][0] / stars[i][2]) * ratio;
    stars[i][4] = y + (stars[i][1] / stars[i][2]) * ratio;
  }
  if (speed < newSpeed) {
    speed += 0.01;
  }
}

function draw() {
  c.clear();

  for (var i = 0; i < n; i++) {
    if (stars[i][5] > 0 && stars[i][5] < w && stars[i][6] > 0 && stars[i][6] < h) {
        line(stars[i][5], stars[i][6], stars[i][3], stars[i][4], c.set.bind(c));
    }
  }
  process.stdout.write(c.frame());
  process.stdout.write('debug: speed ' + speed + '');
}

function loop() {
  render();
  draw();
}

init();
setInterval(loop, 1000/60);

