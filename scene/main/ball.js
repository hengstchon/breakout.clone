var Ball = function(game) {
  var o = game.imgByName("ball");
  o.x = 150;
  o.y = 200;
  o.speedX = 5;
  o.speedY = 5;
  o.fired = false;

  o.fire = function() {
    o.fired = true;
  };

  o.move = function() {
    if (o.fired) {
      if (o.x < 0 || o.x > 400) {
        o.speedX *= -1;
      }
      if (o.y < 0 || o.y > 300) {
        o.speedY *= -1;
      }
      o.x += o.speedX;
      o.y += o.speedY;
    }
  };

  o.fantan = function() {
    o.speedY *= -1;
  };

  o.hasPoint = function(x, y) {
    var xIn = aInb(x, o.x, o.x + o.w);
    var yIn = aInb(y, o.y, o.y + o.h);
    return xIn && yIn;
  };

  return o;
};
