//This widget generates hexagon grid

$.widget("ui.mapGen", {
    options : {
        scale : 1.5,
        howMuch : 5,
        border : {
            color : 'rgba(0,0,0,0.4)',
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
        var yRow = (thisHeight / yside).toFixed(0)*2 - 2;
        var xRow = this.options.howMuch;
        
        //understand free space 
        var freeSpace = (thisWidth - (((this.options.howMuch*4) + ((this.options.howMuch-1)*2))*sidesize)).toFixed(0);
        var correction = freeSpace/2;

        console.log('Total polygons: x="'+xRow+'" y="'+yRow+'"' + ' Free Space:'+freeSpace);
        
        for (var iz = 0; iz < yRow; iz++) {
            if (iz%2 == 0) {//четное число, основные строки 0, 2, 4, 6 и тд
                for (var i = 0; i < this.options.howMuch; i++) {
                    var pointOne = [sidesize + (sidesize*6*i) + correction, yside + (yside*iz)/2];
                    var pointTwo = [0 + (sidesize*6*i) + correction, (yside/2) + (yside*iz)/2];
                    var pointThree = [sidesize + (sidesize*6*i) + correction, 0 + (yside*iz)/2];
                    var pointFour = [(xside + sidesize) + (sidesize*6*i) + correction, 0 + (yside*iz)/2];
                    var pointFive = [(xside + (sidesize*2 + (sidesize*6*i))) + correction, yside/2 + (yside*iz)/2];
                    var pointSix = [(xside + sidesize) + (sidesize*6*i) + correction, yside + (yside*iz)/2];
                
                    d3.select('svg')
                      .append('polygon')
                      .attr('points', pointOne+' '+pointTwo+' '+pointThree+' '+pointFour+' '+pointFive+' '+pointSix);
                }
            } else { //нечетное число, строки 1, 3, 5, которые идут между основными
                for (var i = 0; i < (this.options.howMuch-1); i++) {
                    var pointOne = [sidesize + (sidesize*6*i) + sidesize*3 + correction, yside + (yside*iz/2)];
                    var pointTwo = [0 + (sidesize*6*i) + sidesize*3 + correction, (yside/2) + (yside*iz)/2];
                    var pointThree = [sidesize + (sidesize*6*i) + sidesize*3 + correction, 0 + (yside*iz)/2];
                    var pointFour = [(xside + sidesize) + (sidesize*6*i) + sidesize*3 + correction, 0 + (yside*iz)/2];
                    var pointFive = [(xside + (sidesize*2 + (sidesize*6*i))) + sidesize*3 + correction, yside/2 + (yside*iz)/2];
                    var pointSix = [(xside + sidesize) + (sidesize*6*i) + sidesize*3 + correction, yside + (yside*iz)/2];
                
                    d3.select('svg')
                      .append('polygon')
                      .attr('points', pointOne+' '+pointTwo+' '+pointThree+' '+pointFour+' '+pointFive+' '+pointSix);
                }
            }
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