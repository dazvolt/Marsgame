var _resource = {
    init : function () {
        this.redraw();
    },
    redraw : function () {
        $('#top-panel #resource .resource').each( function () {
            $(this).find('span[data-resource="amount"]').text(data.resource.defined[$(this).attr('id')].amount);
        });
    }
};