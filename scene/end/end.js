class SceneEnd extends Scene {
  constructor(game) {
    super(game);
    game.registerAction("r", function() {
      var s = new SceneBegin(game);
      game.replaceScene(s);
    });
  }

  draw() {
    this.game.ctx.fillStyle = "#554";
    this.game.ctx.fillRect(0, 0, 400, 300);

    this.game.ctx.fillStyle = "#fff";
    this.game.ctx.fillText("游戏结束, 按 r 重新开始", 170, 150);
  }
}
