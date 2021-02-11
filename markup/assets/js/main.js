import svg4everybody from 'svg4everybody';
import Swiper, {Pagination, Navigation, Controller, EffectFlip, EffectFade, Lazy, Scrollbar, Thumbs, Autoplay, Keyboard, Mousewheel} from 'swiper';
import Tabby from 'tabbyjs';
// import mask from "jquery-mask-plugin";

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
    Swiper.use([Pagination, Navigation, Controller, EffectFlip, EffectFade, Lazy, Scrollbar, Thumbs, Autoplay, Keyboard, Mousewheel]);

    const $sliderSwiper = new Swiper('.slider__in', {
      direction: 'horizontal',
      loop: false,
      // effect: 'fade',

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


    const $heroThumbs = $('.choose-popup__col_desc .choose-popup__thumbs');

    const $heroSwiper = new Swiper('.choose-popup__col_desc .choose-popup__slider', {
      direction: 'horizontal',
      // effect: 'fade',
      slidesPerView: 1,
      loop: false,
      paginationClickable: true,
      preloadImages: true,
      observer: true,
      observeParents: true,

    });


    if ($heroThumbs.length > 0) {

      const $heroSwiperThumbs = new Swiper('.choose-popup__col_desc .choose-popup__thumbs', {
        setWrapperSize: true,
        initialSlide: 0,
        loop: false,
        simulateTouch: true,
        slideToClickedSlide: true,
        preventClicks: true,
        centeredSlides: true,
        // roundLengths: true,
        slidesPerView: 'auto',
        allowTouchMove: true,
        updateOnWindowResize: true,
        slidesPerColumnFill: 'row',
        preloadImages: true,
        slidesPerColumn: 1,
        observer: true,
        observeParents: true,
        init: true,
        breakpoints: {
          0: {
          },
          1100: {
          }
        }

      });

      $heroSwiper.controller.control = $heroSwiperThumbs;
      $heroSwiperThumbs.controller.control = $heroSwiper;

    }





    const $heroThumbsMob = $('.choose-popup__col_shrink .choose-popup__thumbs');

    const $heroSwiperMob = new Swiper('.choose-popup__col_shrink .choose-popup__slider', {
      direction: 'horizontal',
      // effect: 'fade',
      slidesPerView: 1,
      loop: false,
      paginationClickable: true,
      preloadImages: true,
      observer: true,
      observeParents: true,

    });


    if ($heroThumbsMob.length > 0) {

      const $heroSwiperThumbsMob = new Swiper('.choose-popup__col_shrink .choose-popup__thumbs', {
        setWrapperSize: true,
        initialSlide: 0,
        loop: false,
        simulateTouch: true,
        slideToClickedSlide: true,
        preventClicks: true,
        slidesPerView: 'auto',
        centeredSlides: true,
        updateOnWindowResize: true,
        allowTouchMove: true,
        observer: true,
        observeParents: true,
        roundLengths: true,
        slidesPerColumnFill: 'row',
        slidesPerColumn: 1,
        init: true,
        preloadImages: true,
        breakpoints: {
          0: {
          },
          1100: {
          }
        }

      });

      $heroSwiperMob.controller.control = $heroSwiperThumbsMob;
      $heroSwiperThumbsMob.controller.control = $heroSwiperMob;


    }






    // breakpoint where swiper will be destroyed
    // and switches to a dual-column layout
    const breakpoint = window.matchMedia( '(min-width:640px)' );

    // keep track of swiper instances to destroy later
    let mySwiper;

    //////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////

    const breakpointChecker = function() {

      // if larger viewport and multi-row layout needed
      if ( breakpoint.matches === true ) {

        // clean up old instances and inline styles when available
      if ( mySwiper !== undefined ) mySwiper.destroy( true, true );

      // or/and do nothing
      return;

        // else if a small viewport and single column layout needed
        } else if ( breakpoint.matches === false ) {

          // fire small viewport version of swiper
          return enableSwiper();

        }

    };

    //////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////

    const enableSwiper = function() {

      mySwiper = new Swiper ('.gallery__images', {
        direction: 'horizontal',
        loop: true,
        // effect: 'fade',
        slidesPerView: 1.5,
        navigation: {
          nextEl: '.gallery__button_next',
          prevEl: '.gallery__button_prev',
        },

        lazy: true,
        lazy: {
          loadPrevNext: true,
          loadPrevNextAmount: 1,
        },

      });

    };


    // keep an eye on viewport size changes
    breakpoint.addListener(breakpointChecker);

    // kickstart
    breakpointChecker();



    // Gallery

    // $('.content__side_mob .sidebar__image').magnificPopup({
    //   type: 'image',
    //   gallery: {
    //     enabled: true
    //   }
    // });


    // Popup

    $('.open-popup').magnificPopup({
      type: 'inline',
      midClick: true
    });


    /**
     * Magnific
     */

    // $('.gallery__link').magnificPopup({
    //   type: 'image',
    //   gallery:{
    //     enabled:true
    //   }
    // })


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
     * Video slider
     */

    const $videoSwiper = new Swiper('.video__slider', {
      direction: 'horizontal',
      loop: true,
      // effect: 'fade',
      // slidesPerView: 2.1,
      centeredSlides: true,
      preventClicks: true,
      // spaceBetween: 70,
      navigation: {
        nextEl: '.video__nav-button_next',
        prevEl: '.video__nav-button_prev',
      },
      keyboard: {
        enabled: true,
        onlyInViewport: true,
      },
      // lazy: true,
      // lazy: {
      //   loadPrevNext: true,
      //   loadPrevNextAmount: 3,
      // },
      breakpoints: {
        320: {
          slidesPerView: 1,
        },
        480: {
          slidesPerView: 2,
        },
        640: {
          slidesPerView: 2.1,
        }
      },

    });


      /**
      * Change Video to Iframe
      */

      function findVideos() {
          let videos = document.querySelectorAll('.video__slide');

          for (let i = 0; i < videos.length; i++) {
              setupVideo(videos[i]);
          }
      }

      function setupVideo(video) {
          let link   = video.querySelector('.video__link');
          let media  = video.querySelector('.video__media');
          let button = video.querySelector('.video__button');
          let title  = video.querySelector('.video__slide-title');

          let id = parseMediaURL(media);
          let $video = video.querySelector('.video__slide-in');
          // let $videoActive = document.querySelector('.swiper-slide-active');

          $video.addEventListener('click', () => {
              console.log('click');
              let iframe = createIframe(id);

              title.remove();
              link.remove();
              button.remove();
              $video.appendChild(iframe);
          });

          link.removeAttribute('href');
          video.classList.add('video__slide_enabled');
      }

      function parseMediaURL(media) {
          let regexp = /https:\/\/i\.ytimg\.com\/vi\/([a-zA-Z0-9_-]+)\/maxresdefault\.jpg/i;
          let url = media.src;
          let match = url.match(regexp);

          return match[1];
      }

      function createIframe(id) {
          let iframe = document.createElement('iframe');

          iframe.setAttribute('allowfullscreen', '');
          iframe.setAttribute('allow', 'autoplay');
          iframe.setAttribute('src', generateURL(id));
          iframe.classList.add('video__media');

          return iframe;
      }

      function generateURL(id) {
          let query = '?rel=0&showinfo=0&autoplay=1&playsinline=1';

          return 'https://www.youtube.com/embed/' + id + query;
      }

      findVideos();


    /**
     * Feedback slider
     */

    const $feedbackSwiper = new Swiper('.feedback__slider', {
      direction: 'horizontal',
      loop: true,
      // effect: 'fade',
      centeredSlides: true,
      preventClicks: true,
      // spaceBetween: 70,
      navigation: {
        nextEl: '.feedback__nav-button_next',
        prevEl: '.feedback__nav-button_prev',
      },
      keyboard: {
        enabled: true,
        onlyInViewport: true,
      },
      breakpoints: {
        300: {
          slidesPerView: 1,
        },
        480: {
          slidesPerView: 1.3,
        },
        640: {
          slidesPerView: 1.6,
        }
      },
      lazy: true,
      lazy: {
        loadPrevNext: true,
        loadPrevNextAmount: 3,
      },

    });


    // Phone Mask

    $('.form__group_phone input').mask("+ 7 (999) 999-99-99", {
      placeholder: "Телефон для связи"
    });





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
      'houses',
    ]);


  });


})(jQuery);
