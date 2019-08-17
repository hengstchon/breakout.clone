var Paddle = function(game) {
  var o = game.imgByName("paddle");
  o.x = 150;
  o.y = 250;
  o.speed = 15;

  o.move = function(x) {
    if (x < 0) {
      x = 0;
    } else if (x > 400 - o.w) {
      x = 400 - o.w;
    }
    o.x = x;
  };

  o.moveLeft = function() {
    o.move(o.x - o.speed);
  };

  o.moveRight = function() {
    o.move(o.x + o.speed);
  };

  o.collide = function(ball) {
    return intersects(o, ball);
  };

  return o;
};
