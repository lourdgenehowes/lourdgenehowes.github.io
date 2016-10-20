var main = main || {};
main.init = function () {
    main.owlCarouselInit();
};

main.owlCarouselInit = function () {
    $('.owl-carousel').owlCarousel({
        items: 3,
        lazyLoad: true,
        loop: true,
        autoplay: true,
        autoplayTimeout: 10000,
        animateOut: 'fadeOut',
        margin: 10
    });
};



$(function () {
    main.init
});