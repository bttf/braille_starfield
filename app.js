var line = require('bresenham');
var canvas = require('drawille');
var blessed = require('blessed');
var screen = blessed.screen();
var shipName = 'U.S.S. Chowdhury';
var viewScreenLabel = 'ViewScreen';
var stars = [];
var graph;
var c;
var n, speed, ratio, w, h, x, y, z;


var drawHeader = function() {
  var headerText = shipName;

  var header = blessed.text({
    top: 'top',
    left: 'left',
    width: headerText.length,
    height: '1',
    fg: {
      "fg": "#a537fd"	
    },
    content: headerText,
    tags: true
  });

  var date = blessed.text({
    top: 'top',
    right: 0,
    width: 9,
    height: '1',
    align: 'right',
    content: '',
    tags: true
  });

  screen.append(header);
  screen.append(date);

  var zeroPad = function(input) {
    return ('0' + input).slice(-2);
  };

  var updateTime = function() {
    var time = new Date();
    date.setContent(zeroPad(time.getHours()) + ':' + zeroPad(time.getMinutes()) + ':' + zeroPad(time.getSeconds()) + ' ');
    screen.render();
  };

  updateTime();
  setInterval(updateTime, 1000);
};

var drawStars = function() {
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
  c.clear();

  for (var i = 0; i < n; i++) {
    if (stars[i][5] > 0 && stars[i][5] < w && stars[i][6] > 0 && stars[i][6] < h) {
      line(stars[i][5], stars[i][6], stars[i][3], stars[i][4], c.set.bind(c));
    }
  }
  var txtOutput = c.frame().split("\n");
  txtOutput[0] = 'w: ' + w + ', h: ' + h;
  // txtOutput[1] = h;
  // txtOutput[2] = graph.width;
  // txtOutput[3] = graph.height;
  // txtOutput[4] = stars.length;
  // txtOutput[5] = stars[1][0] + ' ' +
  //                stars[1][1] + ' ' +
  //                stars[1][2] + ' ' +
  //                stars[1][3] + ' ' +
  //                '\n' +
  //                stars[1][4] + ' ' +
  //                stars[1][5] + ' ' +
  //                stars[1][6];
  graph.setContent(txtOutput.join("\n"));
  screen.render();
};

var init = function() {
  drawHeader();

  graph = blessed.box({
    top: 1,
    left: 'left',
    width: '100%',
    height: '98%',
    content: '',
    fg: "#a537fd",
    tags: true,
    border: {
      "type": "line",
      "fg": "#00ebbe"
    },
    label: ' ' + viewScreenLabel + ' '
  });

  screen.append(graph);
  n = 128;
  speed = 5;
  w = (graph.width - (graph.width % 4)) * 2;
  h = (graph.height - (graph.height % 4)) * 2;
  ratio = w / 2;
  x = (w / 2);
  y = (h / 2);
  z = (w + h) / 2;
  c = new canvas(w, h);

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

  drawStars();
  setInterval(drawStars, 1000/60);
  screen.render()
};

init();
