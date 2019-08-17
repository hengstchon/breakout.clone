var Block = function(game, position) {
  // position 是 [0, 0] 格式
  var p = position;
  var o = game.imgByName("block");
  o.x = p[0];
  o.y = p[1];
  o.alive = true;
  o.lifes = p[2] || 1;

  o.collide = function(b) {
    return o.alive && intersects(o, b);
  };

  o.kill = function() {
    o.lifes--;
    if (o.lifes < 1) {
      o.alive = false;
    }
  };

  return o;
};
