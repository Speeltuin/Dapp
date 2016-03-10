(function ($) {

    showData(location.href.split('?')[1].split('=')[1]);
    $('#back').click(gotoIndex);

    function showData(drug) {
        $.getJSON('data/drugs/' + drug + '.json', displayData)
            .error(gotoIndex);
    }

    function gotoIndex() {
        location.href = 'index.html';
    }

    function displayData(data) {
        var $main = $('main');
        $main.append( $('<h1>').html(data.name) );
        $main.append( $('<span>').html( data.details.induction ) );
        $main.append( $('<span>').html( data.details.duration ) );
        $main.append( $('<span>').html( data.details.category.join(', ') ) );

        if ( data.details.information ) {

            var $information = $('<section>');

            console.log(data.details.information);

            for( var subject in data.details.information ) {
                $information.append( $('<h2>').html( subject ) );
                for ( var paragraph in data.details.information[subject] ) {
                    $information.append( $('<p>').html( data.details.information[subject][paragraph] ) );
                }
            }

            $main.append($information);
        }
    }

})(jQuery);