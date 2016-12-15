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
