$.widget("ui.GenerateUI", {
    options : {
        
    },
    _init : function() {   
    },
    destroy : function () {
        this.element.remove();
        $.Widget.prototype.destroy.call(this);
    }
});