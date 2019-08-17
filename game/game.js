class Game {
  constructor(images, runCallback) {
    this.images = images;
    this.runCallback = runCallback;
    this.scene = null;
    this.keysdown = {};
    this.actions = {};
    this.imgs = {};
    this.canvas = document.querySelector("#id-canvas");
    this.ctx = this.canvas.getContext("2d");
    window.fps = 30;

    // events
    window.addEventListener("keydown", e => {
      this.keysdown[e.key] = true;
    });

    window.addEventListener("keyup", e => {
      this.keysdown[e.key] = false;
    });

    var loads = [];
    var names = Object.keys(images);
    for (var i = 0; i < names.length; i++) {
      let name = names[i];
      var path = images[name];
      let img = new Image();
      img.src = path;
      img.onload = () => {
        loads.push(1);
        this.imgs[name] = img;
        if (loads.length == names.length) {
          this.__start();
        }
      };
    }
  }

  drawImage(myImg) {
    this.ctx.drawImage(myImg.img, myImg.x, myImg.y);
  }

  // register
  registerAction(key, callback) {
    this.actions[key] = callback;
  }

  // update
  update() {
    this.scene.update();
  }

  // draw
  draw = function() {
    this.scene.draw();
  };

  replaceScene(scene) {
    this.scene = scene;
  }

  // timer
  runloop() {
    var g = this;
    // events
    var actions = Object.keys(g.actions);
    for (var i = 0; i < actions.length; i++) {
      var key = actions[i];
      if (g.keysdown[key]) {
        g.actions[key]();
      }
    }

    // update
    g.update();
    // clear
    g.ctx.clearRect(0, 0, g.canvas.width, g.canvas.height);
    // draw
    g.draw();

    setTimeout(function() {
      g.runloop();
    }, 1000 / fps);
  }

  imgByName(name) {
    var g = this;
    var img = g.imgs[name];
    var o = {
      img: img,
      w: img.width,
      h: img.height,
    };
    return o;
  }

  __start() {
    this.runCallback(this);
  }

  runWithScene(scene) {
    var g = this;
    g.scene = scene;
    setTimeout(function() {
      g.runloop();
    }, 1000 / fps);
  }
}
