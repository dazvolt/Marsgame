$.widget("ui.generateUI", {
    options : {
        blocks : ['#buildings','#research','#tech']
    },
    _init : function() {
        var $this = this.element;

        $this.find('div').each( function (){
            var $the = $(this).find('.body');

            switch($(this).attr('id')) {
                case '#buildings':
                    break
                case '#research':
                    break
                case '#tech':
                    break
            }

        })
    },
    destroy : function () {
        this.element.remove();
        $.Widget.prototype.destroy.call(this);
    }
});
