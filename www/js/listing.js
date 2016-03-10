(function ($) {

    document.addEventListener('deviceready', onDeviceReady, false);
    $(document).ready(onDeviceReady);

    function onDeviceReady() {
        $('#search').on('change keyup blur', search);
        updateList();
    }

    function updateList() {
        $.getJSON('data/index.json', parseListing).error(function () {
            $('#debug').html('error loading json.')
        });
    }

    function parseListing(listing) {
        for (var index in listing) {
            addToList(index, listing[index]);
        }
    }

    function addToList(title, data) {
        var $html = $('<article class="drug">');

        $html.append($('<h1>').html(title));
        $html.data('drug', title);

        $html.append($('<span>').html('duur: ' + data.duration));
        $html.append($('<span>').html(data.category.join(', ')));

        $html.click(gotoPage);

        $('#list').append($html);
    }

    function gotoPage() {
        var $this = $(this);

        location.href = 'drug.html?drug=' + $this.data('drug');
    }

    function search() {
        var search = $(this).val().toLowerCase();

        $('#list > article').each(function () {
            var $this = $(this);
            var found = false;

            // Title search
            found = ( -1 !== $this.find('h1').text().toLowerCase().indexOf(search) );

            // Info search
            $this.find('span').each(function () {
                found = found || ( -1 !== $(this).text().toLowerCase().indexOf(search) );
            });

            if (found) {
                $this.removeClass('hidden');
            } else {
                $this.addClass('hidden');
            }
        });
    }

})(jQuery);