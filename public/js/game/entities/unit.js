define(function(require) {
  var _ = require('underscore');
  var Crafty = require('crafty');

  var UnitFactory = {
    create: function(game) {
      var server = game.server;

      var unit = Crafty.e("2D, Canvas, Color, Multiway, Delay, Collision, Unit, RandomStartPosition")
        .attr({ w: 10, h: 10, server: server })
        .color('rgb(0,0,255)')
        .multiway(1, {})
        .disableControl()
        .bind("joined", function(){
          unit.sendStateToServer();
        })
        .bind('Moved', function(from) {
          if (unit.hit('solid')) {
            unit.attr({x: from.x, y:from.y});
          }
          unit.sendStateToServer();
        });

      return unit;
    }
  };

  return UnitFactory;
});
