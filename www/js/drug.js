(function ($) {

    document.addEventListener('deviceready', onDeviceReady, false);
    $(document).ready(onDeviceReady);

    function onDeviceReady() {
        showData(location.href.split('?')[1].split('=')[1]);
        $('#back').click(gotoIndex);
    }

    function showData(drug) {
        $.getJSON('data/drugs/' + drug + '.json', displayData)
            .error(gotoIndex);
    }

    function gotoIndex() {
        location.href = 'index.html';
    }

    function displayData(data) {
        var $main = $('main');
        $main.append($('<h1>').html(data.name));

        $main.append($('<div>').html('Inductieperiode: ' + data.details.induction));
        $main.append($('<div>').html('Duur: ' + data.details.duration));

        var label = data.details.category.length == 1 ? 'Categorie' : 'Categorie&euml;n';
        $main.append($('<div>').html(label + ': ' + data.details.category.join(', ')));

        if (data.details.information) {

            var $information = $('<section>');
            for (var subject in data.details.information) {
                parseInformation(subject, data.details.information, $information, 2);
            }
            $main.append($information);
        }
    }

    function parseInformation(subject, items, $target, heading) {
        $target.append($('<h' + heading + '>').html(subject));

        var lines = [];

        for (var subitem in items[subject]) {
            if (typeof items[subject][subitem] === 'string') {
                lines.push(items[subject][subitem]);
            } else {
                parseInformation(subitem, items[subject], $target, heading + 1);
            }
        }

        if ( lines.length > 0 ) {
            var $p = $('<p>').append(lines.join('<br/>'));
            $target.append($p);
        }
    }

})(jQuery);