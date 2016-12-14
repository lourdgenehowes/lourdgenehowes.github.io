//Side cart function
$(document).ready(function($){
    //if you change this breakpoint in the style.css file (or _layout.scss if you use SASS), don't forget to update this value as well
    var $L = 1200,
        $menu_navigation = $('#main-nav'),
        $cart_trigger = $('#cd-cart-trigger'),
        $hamburger_icon = $('#cd-hamburger-menu'),
        $lateral_cart = $('#cd-cart'),
        $shadow_layer = $('#cd-shadow-layer');

    //open lateral menu on mobile
    $hamburger_icon.on('click', function(event){
        event.preventDefault();
        //close cart panel (if it's open)
        $lateral_cart.removeClass('speed-in');
        toggle_panel_visibility($menu_navigation, $shadow_layer, $('body'));
    });

    //open cart
    $cart_trigger.on('click', function(event){
        event.preventDefault();
        //close lateral menu (if it's open)
        $menu_navigation.removeClass('speed-in');
        toggle_panel_visibility($lateral_cart, $shadow_layer, $('body'));
    });

    //close lateral cart or lateral menu
    $shadow_layer.on('click', function(){
        $shadow_layer.removeClass('is-visible');
        // firefox transitions break when parent overflow is changed, so we need to wait for the end of the trasition to give the body an overflow hidden
        if( $lateral_cart.hasClass('speed-in') ) {
            $lateral_cart.removeClass('speed-in').on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
                $('body').removeClass('overflow-hidden');
            });
            $menu_navigation.removeClass('speed-in');
        } else {
            $menu_navigation.removeClass('speed-in').on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
                $('body').removeClass('overflow-hidden');
            });
            $lateral_cart.removeClass('speed-in');
        }
    });

    //move #main-navigation inside header on laptop
    //insert #main-navigation after header on mobile
    move_navigation( $menu_navigation, $L);
    $(window).on('resize', function(){
        move_navigation( $menu_navigation, $L);

        if( $(window).width() >= $L && $menu_navigation.hasClass('speed-in')) {
            $menu_navigation.removeClass('speed-in');
            $shadow_layer.removeClass('is-visible');
            $('body').removeClass('overflow-hidden');
        }

    });
});

function toggle_panel_visibility ($lateral_panel, $background_layer, $body) {
    if( $lateral_panel.hasClass('speed-in') ) {
        // firefox transitions break when parent overflow is changed, so we need to wait for the end of the trasition to give the body an overflow hidden
        $lateral_panel.removeClass('speed-in').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
            $body.removeClass('overflow-hidden');
        });
        $background_layer.removeClass('is-visible');

    } else {
        $lateral_panel.addClass('speed-in').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
            $body.addClass('overflow-hidden');
        });
        $background_layer.addClass('is-visible');
    }
}

function move_navigation( $navigation, $MQ) {
    if ( $(window).width() >= $MQ ) {
        $navigation.detach();
        $navigation.appendTo('header');
    } else {
        $navigation.detach();
        $navigation.insertAfter('header');
    }
}



//Multi level function
(function() {
    var menuEl = document.getElementById('menu-1'),
        mlmenu = new MLMenu(menuEl, {
            // breadcrumbsCtrl : true, // show breadcrumbs
            // initialBreadcrumb : 'all', // initial breadcrumb text
            backCtrl : false, // show back button
            // itemsDelayInterval : 60, // delay between each menu item sliding animation
            onItemClick: loadDummyData // callback: item that doesn´t have a submenu gets clicked - onItemClick([event], [inner HTML of the clicked item])
        });

    // mobile menu toggle
    var openMenuCtrl = document.querySelector('.action--open'),
        closeMenuCtrl = document.querySelector('.action--close');

    openMenuCtrl.addEventListener('click', openMenu);
    closeMenuCtrl.addEventListener('click', closeMenu);

    function openMenu() {
        classie.add(menuEl, 'menu--open');
    }

    function closeMenu() {
        classie.remove(menuEl, 'menu--open');
    }

    // simulate grid content loading
    var gridWrapper = document.querySelector('.content');

    function loadDummyData(ev, itemName) {
        ev.preventDefault();

        closeMenu();
        gridWrapper.innerHTML = '';
        classie.add(gridWrapper, 'content--loading');
        setTimeout(function() {
            classie.remove(gridWrapper, 'content--loading');
            gridWrapper.innerHTML = '<ul class="products">' + dummyData[itemName] + '<ul>';
        }, 700);
    }
})();


//Menu burger
$('#icon-transition').on('click', function () {
    $(this).toggleClass('open');
});

//Navbar shrink
$(function () {
    if (window.pageYOffset > 50 && $(document).width() >= 992) {
        $('nav').addClass('navbar-shrink')
        $(window).scroll(function () {
            if ($(document).scrollTop() > 50 && $(document).width() >= 992) {
                $('nav').addClass('navbar-shrink');
            } else {
                $('nav').removeClass('navbar-shrink');
            }
        });
    }
    else if (window.pageYOffset < 50 && $(document).width() >= 992) {
        $(window).scroll(function () {
            if ($(document).scrollTop() > 50 && $(document).width() >= 992) {
                $('nav').addClass('navbar-shrink');
            } else {
                $('nav').removeClass('navbar-shrink');
            }
        });
    }
    if ($(document).width() <= 991 && window.pageYOffset > 50 || $(document).width() <= 991 && window.pageYOffset < 50) {
        $('nav').addClass('navbar-shrink');
    }
});

//Navbar menu animation
$(document).ready(function ($) {
    function morphDropdown(element) {
        this.element = element;
        this.mainNavigation = this.element.find('.main-nav');
        this.mainNavigationItems = this.mainNavigation.find('.has-dropdown');
        this.dropdownList = this.element.find('.dropdown-list');
        this.dropdownWrappers = this.dropdownList.find('.dropdown');
        this.dropdownItems = this.dropdownList.find('.content');
        this.dropdownBg = this.dropdownList.find('.bg-layer');
        this.mq = this.checkMq();
        this.bindEvents();
    }

    morphDropdown.prototype.checkMq = function () {
        //check screen size
        var self = this;
        return window.getComputedStyle(self.element.get(0), '::before').getPropertyValue('content').replace(/'/g, "").replace(/"/g, "").split(', ');
    };

    morphDropdown.prototype.bindEvents = function () {
        var self = this;
        //hover over an item in the main navigation
        this.mainNavigationItems.mouseenter(function (event) {
            //hover over one of the nav items -> show dropdown
            self.showDropdown($(this));
        }).mouseleave(function () {
            setTimeout(function () {
                //if not hovering over a nav item or a dropdown -> hide dropdown
                if (self.mainNavigation.find('.has-dropdown:hover').length == 0 && self.element.find('.dropdown-list:hover').length == 0) self.hideDropdown();
            }, 50);
        });

        //hover over the dropdown
        this.dropdownList.mouseleave(function () {
            setTimeout(function () {
                //if not hovering over a dropdown or a nav item -> hide dropdown
                (self.mainNavigation.find('.has-dropdown:hover').length == 0 && self.element.find('.dropdown-list:hover').length == 0 ) && self.hideDropdown();
            }, 50);
        });

        //click on an item in the main navigation -> open a dropdown on a touch device
        this.mainNavigationItems.on('touchstart', function (event) {
            var selectedDropdown = self.dropdownList.find('#' + $(this).data('content'));
            if (!self.element.hasClass('is-dropdown-visible') || !selectedDropdown.hasClass('active')) {
                event.preventDefault();
                self.showDropdown($(this));
            }
        });

        //on small screens, open navigation clicking on the menu icon
        this.element.on('click', '.nav-trigger', function (event) {
            event.preventDefault();
            self.element.toggleClass('nav-open');
        });
    };

    morphDropdown.prototype.showDropdown = function (item) {
        this.mq = this.checkMq();
        if (this.mq == 'desktop') {
            var self = this;
            var selectedDropdown = this.dropdownList.find('#' + item.data('content')),
                selectedDropdownHeight = selectedDropdown.innerHeight(),
                selectedDropdownWidth = selectedDropdown.children('.content').innerWidth(),
                selectedDropdownLeft = item.offset().left + item.innerWidth() / 2 - selectedDropdownWidth / 2;

            //update dropdown position and size
            this.updateDropdown(selectedDropdown, parseInt(selectedDropdownHeight), selectedDropdownWidth, parseInt(selectedDropdownLeft));
            //add active class to the proper dropdown item
            this.element.find('.active').removeClass('active');
            selectedDropdown.addClass('active').removeClass('move-left move-right').prevAll().addClass('move-left').end().nextAll().addClass('move-right');
            item.addClass('active');
            //show the dropdown wrapper if not visible yet
            if (!this.element.hasClass('is-dropdown-visible')) {
                setTimeout(function () {
                    self.element.addClass('is-dropdown-visible');
                }, 10);
            }
        }
    };

    morphDropdown.prototype.updateDropdown = function (dropdownItem, height, width, left) {
        this.dropdownList.css({
            '-moz-transform': 'translateX(' + left + 'px)',
            '-webkit-transform': 'translateX(' + left + 'px)',
            '-ms-transform': 'translateX(' + left + 'px)',
            '-o-transform': 'translateX(' + left + 'px)',
            'transform': 'translateX(' + left + 'px)',
            'width': width + 'px',
            'height': height + 'px'
        });

        this.dropdownBg.css({
            '-moz-transform': 'scaleX(' + width + ') scaleY(' + height + ')',
            '-webkit-transform': 'scaleX(' + width + ') scaleY(' + height + ')',
            '-ms-transform': 'scaleX(' + width + ') scaleY(' + height + ')',
            '-o-transform': 'scaleX(' + width + ') scaleY(' + height + ')',
            'transform': 'scaleX(' + width + ') scaleY(' + height + ')'
        });
    };

    morphDropdown.prototype.hideDropdown = function () {
        this.mq = this.checkMq();
        if (this.mq == 'desktop') {
            this.element.removeClass('is-dropdown-visible').find('.active').removeClass('active').end().find('.move-left').removeClass('move-left').end().find('.move-right').removeClass('move-right');
        }
    };

    morphDropdown.prototype.resetDropdown = function () {
        this.mq = this.checkMq();
        if (this.mq == 'mobile') {
            this.dropdownList.removeAttr('style');
        }
    };

    var morphDropdowns = [];
    if ($('.cd-morph-dropdown').length > 0) {
        $('.cd-morph-dropdown').each(function () {
            //create a morphDropdown object for each .cd-morph-dropdown
            morphDropdowns.push(new morphDropdown($(this)));
        });

        var resizing = false;

        //on resize, reset dropdown style property
        updateDropdownPosition();
        $(window).on('resize', function () {
            if (!resizing) {
                resizing = true;
                (!window.requestAnimationFrame) ? setTimeout(updateDropdownPosition, 300) : window.requestAnimationFrame(updateDropdownPosition);
            }
        });

        function updateDropdownPosition() {
            morphDropdowns.forEach(function (element) {
                element.resetDropdown();
            });

            resizing = false;
        };
    }
});