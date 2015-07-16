/**
 * ==================================================
 *    MARS GAME FILES
 * ==================================================
 *
 * Copyright by Dazvolt (dazvolt@gmail.com) 2014-2015.
 * MIT License.
 */
//This widget generates hexagon grid

$.widget("ui.gen_map", {
  options: {
    hexagon: {
      per_row: 7,
      border: {
        color: 'rgba(255, 255, 255, 0.3)',
        thick: 1
      },
      fill: {
        color: 'rgba(0, 0, 0, 0)'
      }
    }
  },
  _init: function () {
    var this_height = parseInt(this.element.css('height')),
      this_width = parseInt(this.element.css('width')),
      R = (this_width / this.options.hexagon.per_row) / 3,
      rows = (this_height / (R * 2)) * 2 - 1,
      pi = Math.PI,
      step_x = R * 3,
      step_y = ((Math.sqrt(3) / 2) * R),
      store_points = '', helper, counter, coordinates,
      free_space = (this_width - ((this.options.hexagon.per_row * R * 2) + ((this.options.hexagon.per_row - 1) * R))) / 2;

    $(this.element).hide();

    for (var yi = 0; yi < rows; yi++) { //loop through y rows

      yi % 2 == 0 ? helper = 0 : helper = R + R / 2; //is it middle or main row?
      yi % 2 == 0 ? counter = 0 : counter = 1; //is it middle or main row?

      for (var xi = 0; xi < (this.options.hexagon.per_row - counter); xi++) { //loop through x cells
        for (var i = 0; i < 6; i++) {
          var x = parseInt(R * Math.cos(pi * i / 3) + R + step_x * xi + helper + free_space).toFixed(0);
          var y = parseInt(R * Math.sin(pi * i / 3) + R + step_y * yi).toFixed(0);
          store_points = store_points + x + ' ' + y;
          if (i != 5) {
            store_points += ', ';
          }
        }
        coordinates = [xi + 1, yi + 1];
        d3.select('svg').append('polygon').attr('points', store_points).attr('data-coordinates', coordinates).text(coordinates);
        store_points = '';
      }
    }

    d3.selectAll('polygon')
      .attr('stroke-width', this.options.hexagon.border.thick)
      .attr('stroke', this.options.hexagon.border.color)
      .attr('fill', this.options.hexagon.fill.color);
  },
  destroy: function () {
    this.element.remove();
    $.Widget.prototype.destroy.call(this);
  }
});