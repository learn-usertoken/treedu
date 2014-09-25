'use strict';

(function (d3) {

    d3.canvas = {};

    d3.canvas.line = function(drawille_canvas) {
        var x = function(d) { return d[0]; },
            y = function(d) { return d[1]; },
            strokeStyle,
            lineWidth,
            lineCap,
            lineJoin,
            miterLimit;

        var ctx = drawille_canvas;

        function line(canvas, data) {
            var n = data.length;

            canvas.each(function draw() {
                // var ctx = this.getContext('2d'),
                //     i = 0;
                var i = 0;

                ctx.strokeStyle = strokeStyle;
                ctx.lineWidth = lineWidth;
                ctx.lineCap = lineCap;
                ctx.miterLimit = miterLimit;
                ctx.beginPath();
                ctx.moveTo.apply(ctx, coords(data[0], 0));
                while (++i < n) {
                    ctx.lineTo.apply(ctx, coords(data[i], i));
                }
                ctx.stroke();
            });

            function coords() {
                return [+x.apply(this, arguments), +y.apply(this, arguments)];
            }
        }

        line.x = function(_) {
            if (!arguments.length) return x;
            x = _;
            return line;
        };

        line.y = function(_) {
            if (!arguments.length) return y;
            y = _;
            return line;
        };

        line.strokeStyle = function(_) {
            if (!arguments.length) return strokeStyle;
            strokeStyle = _;
            return line;
        };

        line.lineWidth = function(_) {
            if (!arguments.length) return lineWidth;
            lineWidth = _;
            return line;
        };

        line.lineCap = function(_) {
            if (!arguments.length) return lineCap;
            lineCap = _;
            return line;
        };

        line.lineJoin = function(_) {
            if (!arguments.length) return lineJoin;
            lineJoin = _;
            return line;
        };

        line.miterLimit = function(_) {
            if (!arguments.length) return miterLimit;
            miterLimit = _;
            return line;
        };

        return line;
    };
    module.exports = d3;

})((function() {
  if (typeof module === 'object' && module.exports && typeof require === 'function') { // on est dans node
      return require('d3');
  }
  return this.d3;// on va chercher d3 en global
})());
