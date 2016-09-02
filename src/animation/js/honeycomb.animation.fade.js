let interval = 5000;
let fadeOutDuration = 1000;
let fadeInDuration = 2500;

let init = () => {
    if ( typeof $ === 'undefined' ) return;

    $('.js-animate--fade').each(function() {
        let $this = $(this);
        $this.find('.js-animate--fade__item').wrapAll('<div class=\"js-animate--fade__container\"/>');
        $this.find('.js-animate--fade__item').hide().first().show();
        setInterval(step, interval);
    });
};

let step = () => {
    $('.js-animate--fade').each(function() {
        let $band = $(this);
        let $current = $band.find('.js-animate--fade__item:visible');
        let $next = ($current.next('.js-animate--fade__item').length !== 0) ? $current.next('.js-animate--fade__item') : $band.find('.js-animate--fade__item').first();

        $current.fadeOut({
            duration: fadeOutDuration,
            complete: function() {
                $next.fadeIn({
                    duration: fadeInDuration
                });
            }
        });
    });
};

export default {
    init: init
};
