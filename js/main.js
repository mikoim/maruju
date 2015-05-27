$(function() {
    var data;
    var inputSearch = $('#inputSearch');
    var re = new RegExp();
    var tmpl = $.templates("#tmplResult");

    $.ajax({
        type: 'GET',
        url: 'data.json',
        dataType: 'json',
        success: function(json){
            data = json;
        },
        error: function(jqXHR, textStatus, errorThrown) {
            inputSearch.attr("disabled", "disabled");
            inputSearch.attr("placeholder", textStatus + " / " + errorThrown);
        }
    });

    inputSearch.bind('keyup', function() {
        search($('#inputSearch').val());
    });

    function search(text) {
        if(text == "") {
            return;
        }

        try {
            re.compile(text);
        } catch(e) {
            inputSearch.parent().addClass("has-error");
            return;
        }

        inputSearch.parent().removeClass("has-error");

        var result = [];
        for (var i = 0; i < data.length; i ++) {
            var row = data[i];

            if(row['address'].match(re)) {
                row['id'] = result.length + 1;
                result.push(row);
            }
        }

        $('#tableResult').html(tmpl.render(result));
    }

});