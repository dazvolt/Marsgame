/**
 * Created by Dazvolt on 2/12/15.
 */
$.fn.addText = function(text, newrow) {
    if (newrow) {
        this.html( this.html() + '<br />' + text );
    } else if (!newrow) {
        this.html( this.html() + text );
    }
};