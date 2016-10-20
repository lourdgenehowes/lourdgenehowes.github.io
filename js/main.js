//Product container
$(window).bind("load",function () {
    var productContainer = $("#new-arrival .section-container .section-content");
    productContainer.css("min-height", "0");
});

//Carousel setting
$('.owl-carousel').owlCarousel({
    items: 4,
    lazyLoad: true,
    loop: true,
    autoplay: true,
    autoplayTimeout: 10000,
    animateOut: 'fadeOut',
    margin: 0
});
