import svg4everybody from 'svg4everybody';
import Swiper, {Pagination, Navigation, Controller, EffectFade, Lazy, Scrollbar, Thumbs, Autoplay} from 'swiper';
import Tabby from 'tabbyjs';

(function ($) {

  svg4everybody();

  let styles = [
    'padding: 2px 9px',
    'background: #1b1e64',
    'color: #fff',
    'display: inline-block',
    'box-shadow: 0 -1px 0 rgba(255, 255, 255, 0.2) inset, 0 5px 3px -5px rgba(0, 0, 0, 0.5), 0 -13px 5px -10px rgba(255, 255, 255, 0.4) inset',
    'line-height: 1.52',
    'text-align: left',
    'font-size: 14px',
    'font-weight: 400'
  ].join(';');

  console.log('%c developed by igor gorlov gorlov https://gorlov.gq', styles);


  /*
    Lazyload images
  */

  let lazyLoadInstance = new LazyLoad({
    elements_selector: '.lazy',
    load_delay: 50,
    use_native: false
  });

  if (lazyLoadInstance) {
    lazyLoadInstance.update();
  }


  $(function () {

    // Nav

    const $nav = $('.nav');

    const $navTrigger = $('.nav-trigger');
    const wW = $(window).outerWidth();

    $navTrigger.on('click', function (e) {
      e.preventDefault();
      $(this).toggleClass('nav-trigger_active');
      $nav.toggleClass('nav_open');
      $('.header').toggleClass('header_open');

    });

    $(window).on('resize', function () {
      let wW = $(window).outerWidth();
      if (wW >= 1201) {
        $navTrigger.removeClass('nav-trigger_active');
        $nav.removeClass('nav_open');
        $('.header').removeClass('header_open');
      }
    });


    const $headerHeight = $('.header').outerHeight(),
      $header = $('.header');

    $(window).on('scroll', function (event) {
      event.preventDefault();
      if ($(window).scrollTop() >= $headerHeight) {
        // console.log($(window).scrollTop());
        $header.addClass('header_scrolled');
      } else {
        $header.removeClass('header_scrolled');

      }
    });

    if ($(window).scrollTop() >= $headerHeight) {
      // console.log($(window).scrollTop());
      $header.addClass('header_scrolled');
    } else {
      $header.removeClass('header_scrolled');

    }

    // Close nav

    $(document).on('click', function (e) {
      if (!$(e.target).closest('.nav-trigger_active').length) {
        $navTrigger.removeClass('nav-trigger_active');
        $nav.removeClass('nav_open');

      }
    });


     // configure Swiper to use modules
    Swiper.use([Pagination, Navigation, Controller, EffectFade, Lazy, Scrollbar, Thumbs, Autoplay]);

    const $sliderSwiper = new Swiper('.slider__in', {
      direction: 'horizontal',
      loop: true,
      effect: 'fade',
      fadeEffect: {
        crossFade: true
      },
      slidesPerView: 1,
      pagination: {
        el: '.slider__pagination',
        type: 'bullets',
        clickable: true
      },
      navigation: {
        nextEl: '.slider__button_next',
        prevEl: '.slider__button_prev',
      },

      lazy: true,
      lazy: {
        loadPrevNext: true,
        loadPrevNextAmount: 1,
      },

    });

    // Gallery

    $('.content__side_mob .sidebar__image').magnificPopup({
      type: 'image',
      gallery: {
        enabled: true
      }
    });


    /**
     * Quantity
     */

    $('.form__quantity-add').click(function () {
      const th = $(this).closest('.form__quantity-w').find('.form__quantity-count');
      th.val(+th.val() + 1);
    });
    $('.form__quantity-sub').click(function () {
      const th = $(this).closest('.form__quantity-w').find('.form__quantity-count');
          if (th.val() > 1) th.val(+th.val() - 1);
    });

    /**
     * Scheme
     */

    $(".equipment__link").hover( function() {
      $(this).parent().toggleClass('.equipment__item_active');
      const value=$(this).attr('data-src');
      $(".equipment__scheme").attr("src", value);
    });

    /**
     * Tabs
     */

    if ( $('.tabs').length > 0 ) {
      const tabs = new Tabby('.tabs__nav');
    }

    /**
     * Magnific
     */

    $('.gallery__link').magnificPopup({
      type: 'image',
      gallery:{
        enabled:true
      }
    })

    // List pages

    function pageWidget(pages) {
      var widgetWrap = $('<div class="widget_wrap"><ul class="widget_list"></ul></div>');
      widgetWrap.prependTo("body");
      for (var i = 0; i < pages.length; i++) {
        $('<li class="widget_item"><a class="widget_link" href="' + pages[i] + '.html' + '">' + pages[i] + '</a></li>').appendTo('.widget_list');
      }
      var widgetStilization = $('<style>body {position:relative} .widget_wrap{position:absolute;top:0;left:0;z-index:9999;padding:10px 20px;background:#222;border-bottom-right-radius:10px;-webkit-transition:all .3s ease;transition:all .3s ease;-webkit-transform:translate(-100%,0);-ms-transform:translate(-100%,0);transform:translate(-100%,0)}.widget_wrap:after{content:" ";position:absolute;top:0;left:100%;width:24px;height:24px;background:#222 url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAgMAAABinRfyAAAABGdBTUEAALGPC/xhBQAAAAxQTFRF////////AAAA////BQBkwgAAAAN0Uk5TxMMAjAd+zwAAACNJREFUCNdjqP///y/DfyBg+LVq1Xoo8W8/CkFYAmwA0Kg/AFcANT5fe7l4AAAAAElFTkSuQmCC) no-repeat 50% 50%;cursor:pointer}.widget_wrap:hover{-webkit-transform:translate(0,0);-ms-transform:translate(0,0);transform:translate(0,0)}.widget_item{padding:0 0 10px}.widget_link{color:#fff;text-decoration:none;font-size:15px;}.widget_link:hover{text-decoration:underline} </style>');
      widgetStilization.prependTo(".widget_wrap");
    }

    pageWidget([
      'index',
      'resort',
      // 'article',
      // 'contact-us',
    ]);


  });


})(jQuery);
