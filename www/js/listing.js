(function ($) {

    document.addEventListener('deviceready', onDeviceReady, false);
    $(document).ready(onDeviceReady);

    function onDeviceReady() {
        $('#search').on('change keyup blur', search);
        updateList();
    }

    function updateList() {
        $.getJSON('../data/index.json', parseListing);
    }

    function parseListing(listing) {
        for (var index in listing) {
            addToList(index, listing[index]);
        }
    }

    function addToList(title, data) {
        var $html = $('<article class="drug">');
        $html.data('drug', title);
        $html.append($('<h1>').html(title));
        $html.append($('<span>').html(data.duration));
        $html.append($('<span>').html(data.category.join(', ')));

        $html.click(gotoPage);

        $('#list').append($html);
    }

    function gotoPage() {
        var $this = $(this);

        location.href = 'drug.html?drug=' + $this.data('drug');
    }

    function search() {
        var search = $(this).val();

        $('#debug').html(search);

        $('#list > article').each(function () {
            var $this = $(this);
            var found = false;

            // Title search
            found = ( -1 !== $this.find('h1').html().indexOf(search) );

            // Info search
            $this.find('span').each(function () {
                found = found || ( -1 !== $(this).html().indexOf(search) );
            });

            if (found) {
                $this.removeClass('hidden');
            } else {
                $this.addClass('hidden');
            }
        });
    }

})(jQuery);