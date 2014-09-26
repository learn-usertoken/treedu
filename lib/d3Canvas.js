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

    d3.canvas.area = function(drawille_canvas) {
        var x0 = function(d) { return d[0]; },
            x1 = function(d) { return d[0]; },
            y0 = 0,
            y1 = function(d) { return d[1]; },
            strokeStyle = 'transparent',
            fillStyle,
            lineWidth,
            lineCap,
            lineJoin,
            miterLimit;

        var ctx = drawille_canvas;

        function area(canvas, data) {
            var n = data.length;

            canvas.each(function draw() {
                var i = 0;

                ctx.strokeStyle = strokeStyle;
                ctx.fillStyle = fillStyle;
                ctx.lineWidth = lineWidth;
                ctx.lineCap = lineCap;
                ctx.lineJoin = lineJoin;
                ctx.miterLimit = miterLimit;
                ctx.beginPath();
                ctx.moveTo.apply(ctx, coords0(data[0], 0));
                while (++i < n) {
                    ctx.lineTo.apply(ctx, coords0(data[i], i));
                }
                while (--i > -1) {
                    ctx.lineTo.apply(ctx, coords1(data[i], i));
                }
                ctx.lineTo.apply(ctx, coords0(data[0], 0));
                ctx.stroke();
                ctx.fill();
                ctx.closePath();
            });

            function coords0() {
                return [+x0.apply(this, arguments), +y0.apply(this, arguments)];
            }

            function coords1() {
                return [+x1.apply(this, arguments), +y1.apply(this, arguments)];
            }
        }

        area.x = function(_) {
            if (!arguments.length) return x1;
            x0 = x1 = _;
            return area;
        };

        area.x0 = function(_) {
            if (!arguments.length) return x0;
            x0 = _;
            return area;
        };

        area.x1 = function(_) {
            if (!arguments.length) return x1;
            x1 = _;
            return area;
        };

        area.y = function(_) {
            if (!arguments.length) return y1;
            y0 = y1 = _;
            return area;
        };

        area.y0 = function(_) {
            if (!arguments.length) return y0;
            y0 = _;
            return area;
        };

        area.y1 = function(_) {
            if (!arguments.length) return y1;
            y1 = _;
            return area;
        };

        area.strokeStyle = function(_) {
            if (!arguments.length) return strokeStyle;
            strokeStyle = _;
            return area;
        };

        area.fillStyle = function(_) {
            if (!arguments.length) return fillStyle;
            fillStyle = _;
            return area;
        };

        area.lineWidth = function(_) {
            if (!arguments.length) return lineWidth;
            lineWidth = _;
            return area;
        };

        area.lineCap = function(_) {
            if (!arguments.length) return lineCap;
            lineCap = _;
            return area;
        };

        area.lineJoin = function(_) {
            if (!arguments.length) return lineJoin;
            lineJoin = _;
            return area;
        };

        area.miterLimit = function(_) {
            if (!arguments.length) return miterLimit;
            miterLimit = _;
            return area;
        };

        return area;
    };

    d3.canvas.arc = function(drawille_canvas) {
        var innerRadius = function(d) { return d.innerRadius; },
            outerRadius = function(d) { return d.outerRadius; },
            startAngle = function(d) { return d.startAngle; },
            endAngle = function(d) { return d.endAngle; },
            arcOffset = - Math.PI / 2,
            strokeStyle = 'transparent',
            fillStyle,
            lineWidth,
            lineCap,
            lineJoin,
            miterLimit,
            translate;

        var ctx = drawille_canvas;

        function arc(canvas, data) {
            canvas.each(function draw() {
                var r0 = innerRadius(data),
                    r1 = outerRadius(data),
                    a0 = startAngle(data) + arcOffset,
                    a1 = endAngle(data) + arcOffset;

                ctx.strokeStyle = strokeStyle;
                ctx.fillStyle = fillStyle;
                ctx.lineWidth = lineWidth;
                ctx.lineCap = lineCap;
                ctx.lineJoin = lineJoin;
                ctx.miterLimit = miterLimit;
                ctx.translate.apply(ctx, translate);
                ctx.beginPath();

                ctx.moveTo.apply(ctx, ptoc(r0, a0));
                ctx.lineTo.apply(ctx, ptoc(r1, a0));
                ctx.arc(0, 0, r1, a0, a1);
                ctx.lineTo.apply(ctx, ptoc(r0, a1));
                ctx.arc(0, 0, r0, a1, a0, true);

                ctx.stroke();
                ctx.fill();
                ctx.closePath();
                ctx.restore();
            });

            function ptoc(r, a) {
                return [Math.cos(a) * r, Math.sin(a) * r];
            }
        }

        arc.innerRadius = function(_) {
            if (!arguments.length) return innerRadius;
            innerRadius = _;
            return arc;
        };

        arc.outerRadius = function(_) {
            if (!arguments.length) return outerRadius;
            outerRadius = _;
            return arc;
        };

        arc.startAngle = function(_) {
            if (!arguments.length) return startAngle;
            startAngle = _;
            return arc;
        };

        arc.endAngle = function(_) {
            if (!arguments.length) return endAngle;
            endAngle = _;
            return arc;
        };

        arc.centroid = function() {
            var r = (innerRadius.apply(this, arguments)
                + outerRadius.apply(this, arguments)) / 2,
                a = (startAngle.apply(this, arguments)
                + endAngle.apply(this, arguments)) / 2 + arcOffset;
            return [Math.cos(a) * r, Math.sin(a) * r];
        };

        arc.strokeStyle = function(_) {
            if (!arguments.length) return strokeStyle;
            strokeStyle = _;
            return arc;
        };

        arc.fillStyle = function(_) {
            if (!arguments.length) return fillStyle;
            fillStyle = _;
            return arc;
        };

        arc.lineWidth = function(_) {
            if (!arguments.length) return lineWidth;
            lineWidth = _;
            return arc;
        };

        arc.lineCap = function(_) {
            if (!arguments.length) return lineCap;
            lineCap = _;
            return arc;
        };

        arc.lineJoin = function(_) {
            if (!arguments.length) return lineJoin;
            lineJoin = _;
            return arc;
        };

        arc.miterLimit = function(_) {
            if (!arguments.length) return miterLimit;
            miterLimit = _;
            return arc;
        };

        arc.translate = function(_) {
            if (!arguments.length) return translate;
            translate = _;
            return arc;
        };

        return arc;
    };

    module.exports = d3;

})((function() {
  if (typeof module === 'object' && module.exports && typeof require === 'function') {
      return require('d3');
  }
  return this.d3;
})());
