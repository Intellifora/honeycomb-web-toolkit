let sidebar = () => {

    if ( typeof window.jQuery === 'undefined') {
        window.console.error( 'Honeycomb: jQuery not found, so the scrollTree plugin won\'t be loaded' );
        return;
    }

    if ( typeof window.jQuery.fn.scrollTree === 'undefined' ) {
        window.console.error( 'Honeycomb: The scrollTree plugin hasn\'t been installed correctly. - Plugin undefined' );
        return;
    }

    window.jQuery('.confluence-sidebar ul').scrollTree({
        'contextPath': window.contextPath,
        'css': {
            'ancestor': 'nav--vertical__active-parent',
            'current': 'nav--vertical__active',
            'collapsed': 'collapsed',
            'expanded': 'nav--vertical__active-parent',
            'toggle': 'nav--vertical__toggle',
            'normal': ''
        },
        'renderChildLi': function (child, opts) {
            let html = '<li class="' + opts.css[child.type] + '">';
            html += '<a href="' + child.link + '" class="' + opts.css[child.type] + '">';

            if ( typeof child.children !== 'undefined' ) {
                html += '<span class="' + opts.css.toggle + ' ' + opts.css.toggle + '--has-children"></span>';
            }

            html += child.title + '</a>';
            html += '</li>';

            return html;
        }
    });
};

let lightbox = () => {
    if (typeof window.jQuery === 'undefined') {
        window.console.error( 'Honeycomb: jQuery not found, so lightbox functionality won\'t work' );
        return;
    }

    window.jQuery('.confluence-embedded-image').each(function(){
        let $this = window.jQuery(this);
        let $parent = $this.parent().get(0);
        if ( $parent.nodeName !== 'A' ) {
            let $a = window.jQuery('<a/>')
            .addClass('lightbox link-image js-lightbox')
            .attr('href', $this.attr('src'))
            .attr('rel', 'lightbox');
            $this.wrap($a);
        }
    });
};

let notifications = () => {
    if (typeof window.jQuery === 'undefined') {
        window.console.error( 'Honeycomb: jQuery not found, so notification functionality won\'t work as expected' );
        return;
    }

    // List of classes to add to.
    let classes = {
        'confluence-information-macro': 'notification notification--block notification--block--minimal',
        'confluence-information-macro-tip': 'notification--success',
        'confluence-information-macro-note': 'notification--warning',
        'confluence-information-macro-information': 'notification--info',
        'confluence-information-macro-warning': 'notification--fail',
        'confluence-information-macro-body': 'notification__body',
        'confluence-information-macro-icon': 'notification__icon'
    };

    let icons = {
        'info': 'icon--info',
        'success': 'icon--success',
        'fail': 'icon--fail',
        'warning': 'icon--warning'
    };

    // Loop through and add the classes.
    for ( let c in classes ) {
        window.jQuery('.' + c).addClass(classes[c]);
    }

    // Add the inner container.
    window.jQuery('.confluence-information-macro').wrapInner('<div class="notification--block__inner-container"></div>');

    // Loop through adding in notification icons.
    window.jQuery('.confluence-information-macro').each(function(){
        let $this = window.jQuery(this);
        for ( let i in icons ) {
            if ( $this.hasClass('notification--' + i ) ) {
                let c = 'icon ' + icons[i];
                let $span = window.jQuery('<span/>').addClass(c);
                $span.prependTo($this.find('.confluence-information-macro-icon'));
            }
        }
    });
};

let toc = () => {
    if (typeof window.jQuery === 'undefined') {
        window.console.error( 'Honeycomb: jQuery not found, so TOC functionality won\'t work as expected' );
        return;
    }

    window.jQuery('.toc-macro').each(function(){
        let $this = window.jQuery(this);
        let defaults = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
        let headings = $this.data('headerelements').toLowerCase().split(',');
        let excludedHeadings = [];

        for ( let i = 0; i < defaults.length; i++ ) {
            if ( headings.indexOf( defaults[ i ] ) === -1 ) {
                excludedHeadings.push( defaults[ i ] );
            }
        }

        // Exclude H1 headings by default.
        excludedHeadings.push('h1');

        // Convert array to string.
        excludedHeadings = excludedHeadings.join( ', ' );

        $this.toc({
            exclude: excludedHeadings,
            numerate: false
        });
    });
};

let init = () => {
    sidebar();
    lightbox();
    notifications();
    toc();
};

export default {
    init: init
};
