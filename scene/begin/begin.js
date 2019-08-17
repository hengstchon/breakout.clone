class SceneBegin extends Scene {
  constructor(game) {
    super(game);
    game.registerAction("k", function() {
      var s = new SceneMain(game);
      game.replaceScene(s);
    });
  }

  draw() {
    this.game.ctx.fillStyle = "#554";
    this.game.ctx.fillRect(0, 0, 400, 300);

    this.game.ctx.fillStyle = "#fff";
    this.game.ctx.fillText("按 k 开始游戏", 150, 150);
  }
}
