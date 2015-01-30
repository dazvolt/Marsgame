//This widget generates hexagon grid

$.widget("ui.mapGen", {
    options : {
        scale : 1.5,
        howMuch : 8,
        border : {
            color : 'rgba(0,0,0,0.5)',
            thick : 1,
        },
        fill : {
            color : 'none',
        },
    },
    _init : function() {
        var thisHeight = parseInt(this.element.css('height'));
        var thisWidth = parseInt(this.element.css('width'));
        
        var xside = (((thisWidth / this.options.howMuch) / 6) * 2);
        console.log(xside);
        var yside = (xside / this.options.scale);
        var sidesize = (xside / 2);
        
       
        
        //understand y rows
        var yRow = (thisHeight / yside).toFixed(0);
        var xRow = this.options.howMuch;
        
        console.log('First polygon points="'+pointOne+' '+pointTwo+' '+pointThree+' '+pointFour+' '+pointFive+' '+pointSix+'"');
        console.log('Total polygons: x="'+xRow+'" y="'+yRow+'"');
        
        for (var i = 0; i < this.options.howMuch; i++) {
            var pointOne = [sidesize + (sidesize*6*i), yside];
            var pointTwo = [0 + (sidesize*6*i), (yside/2)];
            var pointThree = [sidesize + (sidesize*6*i), 0];
            var pointFour = [(xside + sidesize) + (sidesize*6*i), 0];
            var pointFive = [(xside + (sidesize*2 + (sidesize*6*i))), yside/2];
            var pointSix = [(xside + sidesize) + (sidesize*6*i), yside];
        
        
            d3.select('svg')
              .append('polygon')
              .attr('points', pointOne+' '+pointTwo+' '+pointThree+' '+pointFour+' '+pointFive+' '+pointSix);
              
        }
        
        if (this.options.fill.color == 'none') {
            d3.selectAll('polygon')
                .attr('fill','rgba(0,0,0,0');
        }
        d3.selectAll('polygon')
          .attr('stroke-width', this.options.border.thick)
          .attr('stroke', this.options.border.color);  
        
    },
    destroy : function () {
        this.element.remove();
        $.Widget.prototype.destroy.call(this);
    }
});