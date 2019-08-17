var loadLevel = function(game, n) {
  n = n - 1;
  level = levels[n];
  var blocks = [];
  for (var i = 0; i < level.length; i++) {
    var p = level[i];
    var b = Block(game, p);
    blocks.push(b);
  }
  return blocks;
};

var enableDebugMode = function(game, enable) {
  if (!enable) {
    return;
  }
  paused = false;
  window.addEventListener("keydown", function(e) {
    var k = e.key;
    if (k == "p") {
      paused = !paused;
    } else if ("1234567".includes(k)) {
      blocks = loadLevel(game, Number(k));
    }
  });

  document
    .querySelector("#id-input-speed")
    .addEventListener("input", function(e) {
      var value = e.target.value;
      fps = Number(value);
    });
};

var __main = function() {
  var images = {
    paddle: "img/paddle.png",
    ball: "img/ball.png",
    block: "img/block.png",
  };
  var game = new Game(images, function(g) {
    var s = new SceneBegin(g);
    g.runWithScene(s);
  });

  enableDebugMode(game, true);
};

__main();
