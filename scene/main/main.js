class SceneMain extends Scene {
  constructor(game) {
    super(game);
    this.init(game);

    // mouse drag
    this.ballDrag(game);
  }

  init(game) {
    this.paddle = Paddle(game);
    this.ball = Ball(game);
    window.blocks = loadLevel(game, 1);
    this.score = 0;

    var self = this;
    game.registerAction("a", function() {
      self.paddle.moveLeft();
    });

    game.registerAction("d", function() {
      self.paddle.moveRight();
    });

    game.registerAction("f", function() {
      self.ball.fire();
    });
  }

  ballDrag(game) {
    var ball = this.ball;
    var enableDrag = false;
    game.canvas.addEventListener("mousedown", function(e) {
      var x = e.offsetX;
      var y = e.offsetY;
      if (ball.hasPoint(x, y)) {
        enableDrag = true;
      }
    });
    game.canvas.addEventListener("mousemove", function(e) {
      if (enableDrag) {
        var x = e.offsetX;
        var y = e.offsetY;
        ball.x = x;
        ball.y = y;
      }
    });
    game.canvas.addEventListener("mouseup", function(e) {
      enableDrag = false;
    });
  }

  update() {
    var game = this.game;
    var paddle = this.paddle;
    var ball = this.ball;

    // game end
    if (ball.y > paddle.y) {
      var end = new SceneEnd(game);
      game.replaceScene(end);
    }

    if (paused) {
      return;
    }

    ball.move();
    if (paddle.collide(ball)) {
      ball.fantan();
    }

    for (var i = 0; i < blocks.length; i++) {
      var block = blocks[i];
      if (block.collide(ball)) {
        block.kill();
        ball.fantan();
        this.score += 100;
      }
    }
  }

  draw() {
    var game = this.game;
    var paddle = this.paddle;
    var ball = this.ball;

    game.ctx.fillStyle = "#554";
    game.ctx.fillRect(0, 0, 400, 300);

    game.drawImage(paddle);
    game.drawImage(ball);
    for (var i = 0; i < blocks.length; i++) {
      var block = blocks[i];
      if (block.alive) {
        game.drawImage(block);
      }
    }

    game.ctx.fillStyle = "#000";
    game.ctx.fillText("分数：" + this.score, 10, 290);
  }
}
