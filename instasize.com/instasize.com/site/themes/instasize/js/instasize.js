window.addEventListener('load', function() {

  // lazy load images
  $('.lazy-image').Lazy();

  // bind web editor
  if(document.getElementById('uploadimage')){
    Dropzone.autoDiscover = false;
    InstaSizeWebEditor.init({
      imagePreviewSelector: '#imagepreview',
      fileUploaderSelector: '#uploadimage'
    });
  }

  var loadImage = document.getElementById('load');
  function loadInputHandler(event) {
    var imageFile = event.target.files[0];
    var imageElement = document.getElementById('image');
    imageElement.setAttribute('src', URL.createObjectURL(imageFile));
  };

  if(loadImage !== null){
    loadImage.onchange = loadInputHandler;
  }

function changeSliderHandler(event) {
  Caman("#image", function renderCaman() {
    // this.revert(false);
    this[event.target.name](event.target.value).render();
  });
};
  var ranges = document.querySelectorAll('input[type="range"]');
  ranges.forEach(function(range){
    range.onchange = changeSliderHandler;
  });

  function filterButtonHandler(event) {
    Caman('#image', function() {
      this.revert(false);
      this[event.target.id]().render();
    });
  };

  var filterButtons = document.querySelectorAll('.filter');
  filterButtons.forEach(function(filterButton) {
    filterButton.onclick = filterButtonHandler;
  });

  var saveButton = document.getElementById('save');
  function saveButtonHandler(event) {
    Caman('#image', function() {
      this.render(function () {
        this.save('image - Instasize.png');
      });
    });
  };

  if(saveButton !== null){
    saveButton.onclick = saveButtonHandler;
  }

  // search form handlers
  var searchForm = document.getElementById('searchForm');
  if(searchForm !== null){
    searchForm.onsubmit = function(e){
      var value = $('#searchInput').val();
      if(value === null || value.length === 0){
        return false;
      }

      $('#searchForm .search-wrapper-input').addClass('loading');
    }
  }


  // copy to clipboard on blog items
  function onCopyToClipboardClick(e){
    e.preventDefault();
    e.stopPropagation();

    var currentTarget = e.currentTarget;
    var hiddenInputEl = document.createElement('INPUT');
    hiddenInputEl.setAttribute("type", "text");
    hiddenInputEl.id = 'hiddenCopyBlogLink';
    hiddenInputEl.value = currentTarget.href;
    document.body.appendChild(hiddenInputEl);

    var copyText = document.getElementById("hiddenCopyBlogLink");
    copyText.select();
    document.execCommand("copy");

    document.body.removeChild(hiddenInputEl);

    currentTarget.classList.add('copied-to-clipboard');
    setTimeout(function(){
      currentTarget.classList.remove('copied-to-clipboard');
    }, 1500);

    return false;
  }

  var links = document.getElementsByClassName('copy-to-clipboard');
  for(var i = 0 ; i < links.length ; i++){
    var link = links[i];
    link.onclick = onCopyToClipboardClick;
  }

  // scroll for about page
  let aboutPosts = $('#about_posts');
  if (aboutPosts.length) {
    $('.about_wrapper--top_block--arrow').click(function () {
      location.href = "#about_posts";
    });
  }

  // slider-bottom on features sub page
  if ($('.features_ajustments--gallery').length>0) {
    $('.features_ajustments--gallery').slick({
      infinite: true,
      adaptiveHeight: true,
      slidesToShow: 2,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: true,
          }
        }
      ]
    });
  }

  // slider on features sub page
  let featuresSliders = $('.features_sub_page--slider_wrapper');
  if (featuresSliders.length) {
    $.each(featuresSliders, function(index, value){
      let slider_left = $(value).find('.slider_left');
      let slider_right = $(value).find('.slider_right');
      let slides = $(value).find('.slider_right .features_sub_page--slider--item');
      let counterZero = $(value).find('.all_zero');
      let counterOne = $(value).find('.all_one');
      let currentZero = $(value).find('.current_zero');
      let currentOne = $(value).find('.current_one');
      counterZero.text(slides.length - 1);
      counterOne.text(slides.length);

      slider_left.slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 600,
        asNavFor: slider_right,
        adaptiveHeight: true,
      });
      slider_right.slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 600,
        asNavFor: slider_left,
        adaptiveHeight: true,
      });

      slider_right.on('afterChange', function(event, slick, currentSlide, nextSlide){
        currentZero.text(currentSlide);
        currentOne.text(currentSlide + 1);
      });

    });

    if ($('.slider_black_arrows').length) {
      $(".slick-arrow").addClass("black_arrow");
    }

    // change color of arrows on slide
    let currentSlide = $('.change_arrow_color').slick('slickCurrentSlide');
    $('.change_arrow_color').on('afterChange', function(event, slick, currentSlide, nextSlide){
      if (currentSlide >= 1) {
        $(this).find(".slick-arrow").addClass("black_arrow");
        $(this).addClass("black_color");
      } else {
        $(this).find(".slick-arrow").removeClass("black_arrow");
        $(this).removeClass("black_color");
      }
    });
  }

  // steps slider on features sub page
  if ($('.features_sub_page--slider_steps--list').length>0) {
    $('.features_sub_page--slider_steps--list').slick({
      infinite: true,
      adaptiveHeight: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      responsive: [{
          breakpoint: 769,
          settings: {
            slidesToShow: 1
          }
        }]
    });
  }

  // styles for photo-cropper
  if ($('#photo-cropper-wrapper').length>0) {
    $('.navigation').addClass('navigation_photo_cropper');
    $('#photo-cropper-wrapper').css('padding-top', `${$('#navigation').outerHeight()}px`);
  }

  // scrolling header with title and breadcrumbs in sub pages
  if ($('.header_scrolling_section').length>0) {
    $('.navigation').addClass('navigation_black');
  }
  function headerScroll() {
    $('.scrolling_content').css('bottom', `${window.innerHeight - parseInt($('.scrolling_content').height())}px`);
  }
  headerScroll();
  window.addEventListener('resize', headerScroll);

  // styles for blog navigation
  if ($('.blog, .search-results-wrapper').length>0) {
    $('.navigation').addClass('navigation_black navigation_blog');
  }

  // accordion
  if ($('.accordion_title').length>0) {
    $('.navigation').addClass('navigation_black');
    let openedClass = 'accordion_opened';
    $('.accordion_item').click(function () {
      let parent = $(this).parent();
      let panel = $(this).find('.accordion_item_content')[0];
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
        $(parent).removeClass(openedClass);
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
        $(parent).addClass(openedClass);
      }
    });
  }

  // styles for 404 page
  if ($('#not-found')[0]) {
    $('.navigation').addClass('navigation_black');
  }

/*test*/

  // job form
  let jobForm = document.getElementById('job_listing_form');
  if (jobForm) {
    let fileInput = jobForm.querySelector('#job_file_input');
    let fileInputText = jobForm.querySelector('#job_file_text');
    let fileLabel = jobForm.querySelector('#job_file_label');
    fileInput.addEventListener('change', function(e) {
      fileInputText.textContent = fileInput.files[0].name || 'Resume';
      fileLabel.style.color = '#898989';
      fileLabel.style.borderColor = '#2E5EFF';
    });
  }

  // change link to download depending on device
  let downloadAppLink = $('.download_app');
  if(downloadAppLink) {
    let userAgent = navigator.userAgent || navigator.vendor;
    if (/android/i.test(userAgent)) {
      downloadAppLink.attr("href", "https://play.google.com/store/apps/details?id=com.jsdev.instasize&hl=en");
    }
  }

  // when scroll up show header
  let prevScrollpos = window.pageYOffset;
  let navigation = document.getElementById("navigation");
  window.onscroll = function() {
    let currentScrollPos = window.pageYOffset;
    if (currentScrollPos == 0) {
      navigation.style.top = "0";
      navigation.classList.remove("navigation_scroll");
    } else if (prevScrollpos > currentScrollPos) {
      navigation.style.top = "0";
      navigation.classList.add("navigation_scroll");
    } else {
      navigation.style.top = `-200px`;
      navigation.classList.remove("navigation_scroll");
    }
    prevScrollpos = currentScrollPos;
  }

  // premium-page video background
  let premiumVideo = document.getElementById('premium_banner_video');
  if (premiumVideo) {
    new vidbg('.instasize_plus_container--banner', {
      mp4: 'https://res.cloudinary.com/munkee/video/upload/q_auto,vc_auto/v1600470786/instasize-website/Premium/premium-hero.mp4',
      webm: 'https://res.cloudinary.com/munkee/video/upload/q_auto,vc_auto/v1600470786/instasize-website/Premium/premium-hero.webm',
      poster: 'https://res.cloudinary.com/munkee/video/upload/f_auto,q_auto/v1600470786/instasize-website/Premium/premium-hero'
    });
  }

  // press-kit-page video background
  let pressKitVideo = document.getElementById('press_kit_banner_video');
  if (pressKitVideo) {
    new vidbg('.press_kit--banner', {
      mp4: '/site/themes/instasize/video/home-banner.mp4',
      webm: '/site/themes/instasize/video/home-banner.webm',
      poster: '/site/themes/instasize/video/press-kit-poster.jpg'
    });
  }

  // filter-page video background
  let filterVideo = document.getElementById('filter_page_banner');
  if (filterVideo) {
    new vidbg('#filter_page_banner', {
      mp4: 'https://res.cloudinary.com/munkee/video/upload/q_auto,vc_auto/v1598472680/instasize-website/filters-video.mp4',
      webm: 'https://res.cloudinary.com/munkee/video/upload/q_auto,vc_auto/v1598472680/instasize-website/filters-video.webm',
      poster: 'https://res.cloudinary.com/munkee/image/upload/f_auto,q_auto/v1600379390/instasize-website/Features/Filters/filters-hero'
    });
  }

  // resize-page video background
  let resizingVideo = document.getElementById('resizing_page_step');
  if (resizingVideo) {
    new vidbg('#resizing_page_step', {
      mp4: 'https://res.cloudinary.com/munkee/video/upload/f_auto,q_auto/v1600286667/instasize-website/Features/Resizing/video-resizing-girl.mp4',
      webm: 'https://res.cloudinary.com/munkee/video/upload/f_auto,q_auto/v1600286667/instasize-website/Features/Resizing/video-resizing-girl.webm',
      poster: 'https://res.cloudinary.com/munkee/video/upload/f_auto,q_auto/v1600286667/instasize-website/Features/Resizing/video-resizing-girl'
    });
  }

  // overlays page video backgrounds
  let overlaysVideo = document.getElementById('overlays_page_banner');
  if (overlaysVideo) {
    new vidbg('#overlays_page_banner', {
      mp4: 'https://res.cloudinary.com/munkee/video/upload/q_auto,vc_auto/v1599678105/instasize-website/Features/Overlays/overlays-video.mp4',
      webm: 'https://res.cloudinary.com/munkee/video/upload/q_auto,vc_auto/v1599678105/instasize-website/Features/Overlays/overlays-video.webm'
    });
    new vidbg('#overlays_slide_one', {
      mp4: 'https://res.cloudinary.com/munkee/video/upload/f_auto,q_auto,vc_auto/v1599683286/instasize-website/Features/Overlays/film-overlays-video.mp4',
      webm: 'https://res.cloudinary.com/munkee/video/upload/f_auto,q_auto,vc_auto/v1599683286/instasize-website/Features/Overlays/film-overlays-video.webm',
      poster: 'https://res.cloudinary.com/munkee/video/upload/f_auto,q_auto/v1599683286/instasize-website/Features/Overlays/film-overlays-video'
    });
    new vidbg('#overlays_slide_two', {
      mp4: 'https://res.cloudinary.com/munkee/video/upload/f_auto,q_auto,vc_auto/v1599686536/instasize-website/Features/Overlays/texture-overlays-video.mp4',
      webm: 'https://res.cloudinary.com/munkee/video/upload/f_auto,q_auto,vc_auto/v1599686536/instasize-website/Features/Overlays/texture-overlays-video.webm',
      poster: 'https://res.cloudinary.com/munkee/video/upload/f_auto,q_auto/v1599686536/instasize-website/Features/Overlays/texture-overlays-video'
    });
    new vidbg('#overlays_slide_three', {
      mp4: 'https://res.cloudinary.com/munkee/video/upload/f_auto,q_auto,vc_auto/v1599686540/instasize-website/Features/Overlays/vintage-overlays-video.mp4',
      webm: 'https://res.cloudinary.com/munkee/video/upload/f_auto,q_auto,vc_auto/v1599686540/instasize-website/Features/Overlays/vintage-overlays-video.webm',
      poster: 'https://res.cloudinary.com/munkee/video/upload/f_auto,q_auto/v1599686540/instasize-website/Features/Overlays/vintage-overlays-video'
    });
    new vidbg('#overlays_slide_four', {
      mp4: 'https://res.cloudinary.com/munkee/video/upload/f_auto,q_auto,vc_auto/v1599688732/instasize-website/Features/Overlays/light-overlays-video.mp4',
      webm: 'https://res.cloudinary.com/munkee/video/upload/f_auto,q_auto,vc_auto/v1599688732/instasize-website/Features/Overlays/light-overlays-video.webm',
      poster: 'https://res.cloudinary.com/munkee/video/upload/f_auto,q_auto/v1599688732/instasize-website/Features/Overlays/light-overlays-video'
    });
  }

  // text-editor video backgrounds
  let textEditorVideo = document.getElementById('text_editor_page_banner');
  if (textEditorVideo) {
    // let nameVideoFile = ($(window).width() > 576) ? "text-editor-banner" : "text-editor-banner-mobile";
    new vidbg('#text_editor_page_banner', {
      mp4: `https://res.cloudinary.com/munkee/video/upload/f_auto,q_auto/v1600446579/instasize-website/Features/Text/add-text-to-photos-videos-hero.mp4`,
      webm: `https://res.cloudinary.com/munkee/video/upload/f_auto,q_auto/v1600446579/instasize-website/Features/Text/add-text-to-photos-videos-hero.webm`,
      poster: `https://res.cloudinary.com/munkee/video/upload/f_auto,q_auto/v1600446579/instasize-website/Features/Text/add-text-to-photos-videos-hero`
    });
    new vidbg('#text_editor_page_step_one', {
      mp4: 'https://res.cloudinary.com/munkee/video/upload/f_auto,q_auto/v1600446569/instasize-website/Features/Text/add-text-to-photos-and-videos.mp4',
      webm: 'https://res.cloudinary.com/munkee/video/upload/f_auto,q_auto/v1600446569/instasize-website/Features/Text/add-text-to-photos-and-videos.webm',
      poster: 'https://res.cloudinary.com/munkee/video/upload/f_auto,q_auto/v1600446569/instasize-website/Features/Text/add-text-to-photos-and-videos'
    });
    new vidbg('#text_editor_page_step_two', {
      mp4: 'https://res.cloudinary.com/munkee/video/upload/f_auto,q_auto/v1600446577/instasize-website/Features/Text/how-to-add-text-to-photos.mp4',
      webm: 'https://res.cloudinary.com/munkee/video/upload/f_auto,q_auto/v1600446577/instasize-website/Features/Text/how-to-add-text-to-photos.webm',
      poster: 'https://res.cloudinary.com/munkee/video/upload/f_auto,q_auto/v1600446577/instasize-website/Features/Text/how-to-add-text-to-photos'
    });
  }

  // layering-page video backgrounds
  let layeringSlider = document.querySelector('.layering_slider');
  if (layeringSlider) {
    new vidbg('#layering_slide_one', {
      mp4: 'https://res.cloudinary.com/munkee/video/upload/f_auto,q_auto,vc_auto/v1598473448/instasize-website/Features/Layering/girl-video-layers-pool.mp4',
      webm: 'https://res.cloudinary.com/munkee/video/upload/f_auto,q_auto,vc_auto/v1598473448/instasize-website/Features/Layering/girl-video-layers-pool.webm',
      poster: 'https://res.cloudinary.com/munkee/video/upload/f_auto,q_auto/v1598473448/instasize-website/Features/Layering/girl-video-layers-pool'
    });
    new vidbg('#layering_slide_two', {
      mp4: 'https://res.cloudinary.com/munkee/video/upload/f_auto,q_auto,vc_auto/v1598473452/instasize-website/Features/Layering/girl-video-layer-flowers.mp4',
      webm: 'https://res.cloudinary.com/munkee/video/upload/f_auto,q_auto,vc_auto/v1598473452/instasize-website/Features/Layering/girl-video-layer-flowers.webm',
      poster: 'https://res.cloudinary.com/munkee/video/upload/f_auto,q_auto/v1598473452/instasize-website/Features/Layering/girl-video-layer-flowers'
    });
    new vidbg('#layering_slide_three', {
      mp4: 'https://res.cloudinary.com/munkee/video/upload/f_auto,q_auto,vc_auto/v1598473459/instasize-website/Features/Layering/girl-video-layers-selfie.mp4',
      webm: 'https://res.cloudinary.com/munkee/video/upload/f_auto,q_auto,vc_auto/v1598473459/instasize-website/Features/Layering/girl-video-layers-selfie.webm',
      poster: 'https://res.cloudinary.com/munkee/video/upload/f_auto,q_auto/v1598473459/instasize-website/Features/Layering/girl-video-layers-selfie'
    });
  }

  // video-editor-page video backgrounds
  let videoEditorVideo = document.getElementById('video_editor_page_banner');
  if (videoEditorVideo) {
    new vidbg('#video_editor_page_banner', {
      mp4: 'https://res.cloudinary.com/munkee/video/upload/f_auto,q_auto/v1599678849/instasize-website/Features/Video/video-editor-video.mp4',
      webm: 'https://res.cloudinary.com/munkee/video/upload/f_auto,q_auto/v1599678849/instasize-website/Features/Video/video-editor-video.webm',
      poster: 'https://res.cloudinary.com/munkee/video/upload/f_auto,q_auto/v1599678849/instasize-website/Features/Video/video-editor-video'
    });
    new vidbg('#video_editor_step_one', {
      mp4: 'https://res.cloudinary.com/munkee/video/upload/f_auto,q_auto/v1599689701/instasize-website/Features/Video/crop-fit-video.mp4',
      webm: 'https://res.cloudinary.com/munkee/video/upload/f_auto,q_auto/v1599689701/instasize-website/Features/Video/crop-fit-video.webm',
      poster: 'https://res.cloudinary.com/munkee/video/upload/f_auto,q_auto/v1599689701/instasize-website/Features/Video/crop-fit-video'
    });
    new vidbg('#video_editor_step_three', {
      mp4: 'https://res.cloudinary.com/munkee/video/upload/f_auto,q_auto/v1599689702/instasize-website/Features/Video/overlays-video.mp4',
      webm: 'https://res.cloudinary.com/munkee/video/upload/f_auto,q_auto/v1599689702/instasize-website/Features/Video/overlays-video.webm',
      poster: 'https://res.cloudinary.com/munkee/video/upload/f_auto,q_auto/v1599689702/instasize-website/Features/Video/overlays-video'
    });
    new vidbg('#video_editor_step_four', {
      mp4: 'https://res.cloudinary.com/munkee/video/upload/f_auto,q_auto/v1599689701/instasize-website/Features/Video/add-text-video.mp4',
      webm: 'https://res.cloudinary.com/munkee/video/upload/f_auto,q_auto/v1599689701/instasize-website/Features/Video/add-text-video.webm',
      poster: 'https://res.cloudinary.com/munkee/video/upload/f_auto,q_auto/v1599689701/instasize-website/Features/Video/add-text-video'
    });
  }

  // web-stories-page video backgrounds
  let webStoriesVideo = document.getElementById('web_stories_step_one');
  if (webStoriesVideo) {
    if ($(window).width() > 576) {
      new vidbg('#web_stories_banner', {
        mp4: 'https://res.cloudinary.com/munkee/video/upload/f_auto,q_auto/v1600467370/instasize-website/Features/Web-Stories/web-stories-hero.mp4',
        webm: 'https://res.cloudinary.com/munkee/video/upload/f_auto,q_auto/v1600467370/instasize-website/Features/Web-Stories/web-stories-hero.webm',
        poster: 'https://res.cloudinary.com/munkee/video/upload/f_auto,q_auto/v1600467370/instasize-website/Features/Web-Stories/web-stories-hero'
      });
    } else {
      new vidbg('#web_stories_banner', {
        mp4: 'https://res.cloudinary.com/munkee/video/upload/f_auto,q_auto/v1600467370/instasize-website/Features/Web-Stories/web-stories-hero.mp4',
        webm: 'https://res.cloudinary.com/munkee/video/upload/f_auto,q_auto/v1600467370/instasize-website/Features/Web-Stories/web-stories-hero.webm',
        poster: 'https://res.cloudinary.com/munkee/video/upload/f_auto,q_auto/v1600467370/instasize-website/Features/Web-Stories/web-stories-hero'
      });
    }
    new vidbg('#web_stories_step_one', {
      mp4: 'https://res.cloudinary.com/munkee/video/upload/f_auto,q_auto/v1600467370/instasize-website/Features/Web-Stories/visual-aesthetic-web-stories.mp4',
      webm: 'https://res.cloudinary.com/munkee/video/upload/f_auto,q_auto/v1600467370/instasize-website/Features/Web-Stories/visual-aesthetic-web-stories.webm',
      poster: 'https://res.cloudinary.com/munkee/video/upload/f_auto,q_auto/v1600467370/instasize-website/Features/Web-Stories/visual-aesthetic-web-stories'
    });
    new vidbg('#web_stories_step_two', {
      mp4: 'https://res.cloudinary.com/munkee/video/upload/f_auto,q_auto/v1600467370/instasize-website/Features/Web-Stories/boost-engagement-web-stories.mp4',
      webm: 'https://res.cloudinary.com/munkee/video/upload/f_auto,q_auto/v1600467370/instasize-website/Features/Web-Stories/boost-engagement-web-stories.webm',
      poster: 'https://res.cloudinary.com/munkee/video/upload/f_auto,q_auto/v1600467370/instasize-website/Features/Web-Stories/boost-engagement-web-stories'
    });
    new vidbg('#web_stories_step_three', {
      mp4: 'https://res.cloudinary.com/munkee/video/upload/f_auto,q_auto/v1600467370/instasize-website/Features/Web-Stories/post-link-in-bio-web-stories.mp4',
      webm: 'https://res.cloudinary.com/munkee/video/upload/f_auto,q_auto/v1600467370/instasize-website/Features/Web-Stories/post-link-in-bio-web-stories.webm',
      poster: 'https://res.cloudinary.com/munkee/video/upload/f_auto,q_auto/v1600467370/instasize-website/Features/Web-Stories/post-link-in-bio-web-stories'
    });
    new vidbg('#web_stories_step_four', {
      mp4: 'https://res.cloudinary.com/munkee/video/upload/f_auto,q_auto/v1600467370/instasize-website/Features/Web-Stories/seo-friendly-web-stories.mp4',
      webm: 'https://res.cloudinary.com/munkee/video/upload/f_auto,q_auto/v1600467370/instasize-website/Features/Web-Stories/seo-friendly-web-stories.webm',
      poster: 'https://res.cloudinary.com/munkee/video/upload/f_auto,q_auto,w_1000,h_1000/v1600467370/instasize-website/Features/Web-Stories/seo-friendly-web-stories'
    });
  }

  // adjustments-page video background
  let adjustmentsVideo = document.getElementById('adjustments_page_banner');
  if (adjustmentsVideo) {
    new vidbg('#adjustments_page_banner', {
      mp4: 'https://res.cloudinary.com/munkee/video/upload/f_auto,q_auto/v1600464072/instasize-website/Features/Editing-Tools/editing-tools-hero.mp4',
      webm: 'https://res.cloudinary.com/munkee/video/upload/f_auto,q_auto/v1600464072/instasize-website/Features/Editing-Tools/editing-tools-hero.webm',
      poster: 'https://res.cloudinary.com/munkee/video/upload/f_auto,q_auto/v1600464072/instasize-website/Features/Editing-Tools/editing-tools-hero'
    });
  }

  // magic-fill-page video background
  let magicFillVideo = document.getElementById('magic_fill_page_step_one');
  if (magicFillVideo) {
    new vidbg('#magic_fill_page_step_one', {
      mp4: 'https://res.cloudinary.com/munkee/video/upload/f_auto,q_auto/v1599776755/instasize-website/Features/Magic-Fill/magic-fill-tool-video.mp4',
      webm: 'https://res.cloudinary.com/munkee/video/upload/f_auto,q_auto/v1599776755/instasize-website/Features/Magic-Fill/magic-fill-tool-video.webm',
      poster: 'https://res.cloudinary.com/munkee/video/upload/f_auto,q_auto/v1599776755/instasize-website/Features/Magic-Fill/magic-fill-tool-video'
    });
  }

  // home-page scroll between sections
  let homeScroll = document.getElementById('home_sections');
  if (homeScroll) {

    const homeWrapperSections = Array.from(document.getElementsByClassName('home_wrapper--section'));
    const arrAnime = homeWrapperSections.map(el => {
      if (el.classList.contains('slide_in_left')) {
        return {
          fadeInUp: anime({
            targets: el.querySelectorAll('.animate__fadeInUp'),
            translateY: '-50%',
            duration: 2000,
            delay: 400,
            opacity: 1,
            easing: 'easeInOutExpo'
          }),
          slideInLeft: anime({
            targets: el.querySelectorAll('.animate__slideInLeft'),
            right: 0,
            duration: 2000,
            delay: 400,
            easing: 'easeInOutExpo'
          })
        }
      }
      return {
        fadeInUp: anime({
          targets: el.querySelectorAll('.animate__fadeInUp'),
          translateY: '-50%',
          duration: 2000,
          delay: 400,
          opacity: 1,
          easing: 'easeInOutExpo'
        })
      }
    });

    $('#home_sections').pagepiling({
      scrollingSpeed: 200,
      sectionSelector: '.home_wrapper--section',
      navigation: false,
      verticalCentered: false,
      touchSensitivity: 1,
      onLeave: function(index, nextIndex, direction){
        resetAnimations(nextIndex - 1)
        if (index == 2 && direction == 'up'){
          navigation.style.top = "0";
          navigation.classList.remove("navigation_scroll");
        } else if (direction =='down'){
          navigation.style.top = `-200px`;
          navigation.classList.remove("navigation_scroll");
        } else if (direction == 'up') {
          navigation.style.top = "0";
          navigation.classList.add("navigation_scroll");
        }
      }
    });

    // home module animation
    function resetAnimations(index){
      arrAnime[index]['fadeInUp'].restart();
      if (arrAnime[index]['slideInLeft']){
        if ($(window).width() > 576) {
          arrAnime[index]['slideInLeft'].restart();
        }
      }
    }

    // home-page video backgrounds
    new vidbg('.home_banner_video', {
      mp4: 'https://res.cloudinary.com/munkee/video/upload/q_auto,vc_auto/v1598044671/instasize-website/hero-video.mp4',
      webm: 'https://res.cloudinary.com/munkee/video/upload/q_auto,vc_auto/v1598044671/instasize-website/hero-video.webm',
      poster: 'https://res.cloudinary.com/munkee/video/upload/f_auto,q_auto/v1598044671/instasize-website/hero-video'
    });

    new vidbg('.feature_filters_video', {
      mp4: 'https://res.cloudinary.com/munkee/video/upload/q_auto,vc_auto/v1598472680/instasize-website/filters-video.mp4',
      webm: 'https://res.cloudinary.com/munkee/video/upload/q_auto,vc_auto/v1598472680/instasize-website/filters-video.webm'
    });

    new vidbg('.feature_effects', {
      mp4: 'https://res.cloudinary.com/munkee/video/upload/q_auto,vc_auto/v1599678105/instasize-website/Features/Overlays/overlays-video.mp4',
      webm: 'https://res.cloudinary.com/munkee/video/upload/q_auto,vc_auto/v1599678105/instasize-website/Features/Overlays/overlays-video.webm'
    });

    // scroll on banner
    $('#home_banner_arrow').click(function () {
      $.fn.pagepiling.moveSectionDown();
    });
  }

  // features text animation
  const featuresWrapper = document.getElementById('banner_text_animation');
  if (featuresWrapper) {
    $('.banner_animation').waypoint(function(direction) {
      if (direction === 'down') {
        fadeInUp.restart();
        fade.restart();
      }
    }, {
      offset: '60%'
    });

    $('.banner_animation').waypoint(function(direction) {
      if (direction === 'up') {
        fadeInUp.restart();
        fade.restart();
      }
    }, {
      offset: '-100%'
    });

    const fadeInUp = anime({
      targets: '.animate__fadeInUp',
      translateY: '-50%',
      duration: 2000,
      delay: 0,
      opacity: 1,
      easing: 'easeInOutExpo'
    });

    const fade = anime({
      targets: '.animate__fade',
      opacity: 1,
      duration: 2000,
      delay: 0,
      easing: 'easeInOutExpo'
    });
  }

  // drop-down menu desktop
  $('.nav-features').click(function (e) {
    e.preventDefault();
    let navHeight = document.getElementById('navigation').offsetHeight;
    $('.features-drop-down').toggleClass('features-drop-down-show');
    $('.features-drop-down').css('top', `${navHeight}px`);
    if (homeScroll) {
      $('.navigation').toggleClass('navigation_black');
    }
    $('#navigation').toggleClass('white_background');
    if ($("#navigation").hasClass('white_background')) {
        $('<div class="overlay">&nbsp;</div>').prependTo($('body'));
    } else {
        $('.overlay').remove();
    }
    $('.overlay').click(function () {
      $('#navigation').toggleClass('white_background');
      $('.features-drop-down').toggleClass('features-drop-down-show');
      $('.overlay').remove();
      if (homeScroll) {
        $('.navigation').toggleClass('navigation_black');
      }
    });
  });

  // mobile menu
  $('.burger-container').click(function (e) {
      navigation.classList.toggle('menu-opened');
  });

  let subMenuOpened = 'sub-menu-opened';
  let subMenuLinkActive = 'sub-menu-link-active';
  $('.has-sub-menu').click(function (e) {
    e.preventDefault();
    let subMenu = this.nextElementSibling;
    if (subMenu.style.maxHeight) {
      $(subMenu).removeClass(subMenuOpened);
      $(this).removeClass(subMenuLinkActive);
      subMenu.style.maxHeight = null;
    } else {
      $(subMenu).addClass(subMenuOpened);
      $(this).addClass(subMenuLinkActive);
      subMenu.style.maxHeight = subMenu.scrollHeight + "px";
    }
  });

}, false);


/* font tracking */
eval(function(p,a,c,k,e,r){e=function(c){return c.toString(a)};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('4 7=g.b;4 2=3.p(\'r\');2.9=\'a/5\';2.c=\'d\';2.e=(\'6:\'==3.u.h?\'6:\':\'i:\')+\'//j.k.l/t/1.5?m=n&o=\'+7;(3.8(\'q\')[0]||3.8(\'s\')[0]).f(2);',31,31,'||mtiTracking|document|var|css|https|projectId|getElementsByTagName|type|text|MTIProjectId|rel|stylesheet|href|appendChild|window|protocol|http|fast|fonts|net|apiType|css|projectid|createElement|head|link|body||location'.split('|'),0,{}))
/* fontawesome */
!function(){"use strict";var t=function(){},e={},n={},i=null,r={mark:t,measure:t};try{"undefined"!=typeof window&&(e=window),"undefined"!=typeof document&&(n=document),"undefined"!=typeof MutationObserver&&(i=MutationObserver),"undefined"!=typeof performance&&(r=performance)}catch(t){}var a=(e.navigator||{}).userAgent,o=void 0===a?"":a,s=e,f=n,l=i,c=r,u=!!s.document,m=!!f.documentElement&&!!f.head&&"function"==typeof f.addEventListener&&"function"==typeof f.createElement,d=~o.indexOf("MSIE")||~o.indexOf("Trident/"),g="___FONT_AWESOME___",h=16,p="svg-inline--fa",v="data-fa-i2svg",b="data-fa-pseudo-element",y="fontawesome-i2svg",w=function(){try{return!0}catch(t){return!1}}(),x=[1,2,3,4,5,6,7,8,9,10],k=x.concat([11,12,13,14,15,16,17,18,19,20]),z=["class","data-prefix","data-icon","data-fa-transform","data-fa-mask"],C=["xs","sm","lg","fw","ul","li","border","pull-left","pull-right","spin","pulse","rotate-90","rotate-180","rotate-270","flip-horizontal","flip-vertical","stack","stack-1x","stack-2x","inverse","layers","layers-text","layers-counter"].concat(x.map(function(t){return t+"x"})).concat(k.map(function(t){return"w-"+t})),N=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")},A=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),O=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(t[i]=n[i])}return t},M=function(t){if(Array.isArray(t)){for(var e=0,n=Array(t.length);e<t.length;e++)n[e]=t[e];return n}return Array.from(t)},L=s.FontAwesomeConfig||{},E=Object.keys(L),j=O({familyPrefix:"fa",replacementClass:p,autoReplaceSvg:!0,autoAddCss:!0,autoA11y:!0,searchPseudoElements:!1,observeMutations:!0,keepOriginalSource:!0,measurePerformance:!1,showMissingIcons:!0},L);j.autoReplaceSvg||(j.observeMutations=!1);var S=O({},j);function P(t){var e=(arguments.length>1&&void 0!==arguments[1]?arguments[1]:{}).asNewDefault,n=void 0!==e&&e,i=Object.keys(S),r=n?function(t){return~i.indexOf(t)&&!~E.indexOf(t)}:function(t){return~i.indexOf(t)};Object.keys(t).forEach(function(e){r(e)&&(S[e]=t[e])})}s.FontAwesomeConfig=S;var T=s||{};T[g]||(T[g]={}),T[g].styles||(T[g].styles={}),T[g].hooks||(T[g].hooks={}),T[g].shims||(T[g].shims=[]);var R=T[g],H=[],F=!1;m&&((F=(f.documentElement.doScroll?/^loaded|^c/:/^loaded|^i|^c/).test(f.readyState))||f.addEventListener("DOMContentLoaded",function t(){f.removeEventListener("DOMContentLoaded",t),F=1,H.map(function(t){return t()})}));var I=function(t){m&&(F?setTimeout(t,0):H.push(t))},_=h,B={size:16,x:0,y:0,rotate:0,flipX:!1,flipY:!1};function D(t){if(t&&m){var e=f.createElement("style");e.setAttribute("type","text/css"),e.innerHTML=t;for(var n=f.head.childNodes,i=null,r=n.length-1;r>-1;r--){var a=n[r],o=(a.tagName||"").toUpperCase();["STYLE","LINK"].indexOf(o)>-1&&(i=a)}return f.head.insertBefore(e,i),t}}var W=0;function X(){return++W}function Y(t){for(var e=[],n=(t||[]).length>>>0;n--;)e[n]=t[n];return e}function U(t){return t.classList?Y(t.classList):(t.getAttribute("class")||"").split(" ").filter(function(t){return t})}function V(t,e){var n,i=e.split("-"),r=i[0],a=i.slice(1).join("-");return r!==t||""===a||(n=a,~C.indexOf(n))?null:a}function q(t){return(""+t).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&#39;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function K(t){return Object.keys(t||{}).reduce(function(e,n){return e+(n+": ")+t[n]+";"},"")}function G(t){return t.size!==B.size||t.x!==B.x||t.y!==B.y||t.rotate!==B.rotate||t.flipX||t.flipY}function J(t){var e=t.transform,n=t.containerWidth,i=t.iconWidth;return{outer:{transform:"translate("+n/2+" 256)"},inner:{transform:"translate("+32*e.x+", "+32*e.y+") "+" "+("scale("+e.size/16*(e.flipX?-1:1)+", "+e.size/16*(e.flipY?-1:1)+") ")+" "+("rotate("+e.rotate+" 0 0)")},path:{transform:"translate("+i/2*-1+" -256)"}}}var Q={x:0,y:0,width:"100%",height:"100%"},Z=function(t){var e=t.children,n=t.attributes,i=t.main,r=t.mask,a=t.transform,o=i.width,s=i.icon,f=r.width,l=r.icon,c=J({transform:a,containerWidth:f,iconWidth:o}),u={tag:"rect",attributes:O({},Q,{fill:"white"})},m={tag:"g",attributes:O({},c.inner),children:[{tag:"path",attributes:O({},s.attributes,c.path,{fill:"black"})}]},d={tag:"g",attributes:O({},c.outer),children:[m]},g="mask-"+X(),h="clip-"+X(),p={tag:"defs",children:[{tag:"clipPath",attributes:{id:h},children:[l]},{tag:"mask",attributes:O({},Q,{id:g,maskUnits:"userSpaceOnUse",maskContentUnits:"userSpaceOnUse"}),children:[u,d]}]};return e.push(p,{tag:"rect",attributes:O({fill:"currentColor","clip-path":"url(#"+h+")",mask:"url(#"+g+")"},Q)}),{children:e,attributes:n}},$=function(t){var e=t.children,n=t.attributes,i=t.main,r=t.transform,a=K(t.styles);if(a.length>0&&(n.style=a),G(r)){var o=J({transform:r,containerWidth:i.width,iconWidth:i.width});e.push({tag:"g",attributes:O({},o.outer),children:[{tag:"g",attributes:O({},o.inner),children:[{tag:i.icon.tag,children:i.icon.children,attributes:O({},i.icon.attributes,o.path)}]}]})}else e.push(i.icon);return{children:e,attributes:n}},tt=function(t){var e=t.children,n=t.main,i=t.mask,r=t.attributes,a=t.styles,o=t.transform;if(G(o)&&n.found&&!i.found){var s=n.width/n.height/2,f=.5;r.style=K(O({},a,{"transform-origin":s+o.x/16+"em "+(f+o.y/16)+"em"}))}return[{tag:"svg",attributes:r,children:e}]},et=function(t){var e=t.prefix,n=t.iconName,i=t.children,r=t.attributes,a=t.symbol,o=!0===a?e+"-"+S.familyPrefix+"-"+n:a;return[{tag:"svg",attributes:{style:"display: none;"},children:[{tag:"symbol",attributes:O({},r,{id:o}),children:i}]}]};function nt(t){var e=t.icons,n=e.main,i=e.mask,r=t.prefix,a=t.iconName,o=t.transform,s=t.symbol,f=t.title,l=t.extra,c=t.watchable,u=void 0!==c&&c,m=i.found?i:n,d=m.width,g=m.height,h="fa-w-"+Math.ceil(d/g*16),p=[S.replacementClass,a?S.familyPrefix+"-"+a:"",h].concat(l.classes).join(" "),b={children:[],attributes:O({},l.attributes,{"data-prefix":r,"data-icon":a,class:p,role:"img",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 "+d+" "+g})};u&&(b.attributes[v]=""),f&&b.children.push({tag:"title",attributes:{id:b.attributes["aria-labelledby"]||"title-"+X()},children:[f]});var y=O({},b,{prefix:r,iconName:a,main:n,mask:i,transform:o,symbol:s,styles:l.styles}),w=i.found&&n.found?Z(y):$(y),x=w.children,k=w.attributes;return y.children=x,y.attributes=k,s?et(y):tt(y)}function it(t){var e=t.content,n=t.width,i=t.height,r=t.transform,a=t.title,o=t.extra,s=t.watchable,f=void 0!==s&&s,l=O({},o.attributes,a?{title:a}:{},{class:o.classes.join(" ")});f&&(l[v]="");var c,u,m,g,p,b,y,w,x,k=O({},o.styles);G(r)&&(k.transform=(u=(c={transform:r,startCentered:!0,width:n,height:i}).transform,m=c.width,g=void 0===m?h:m,p=c.height,b=void 0===p?h:p,y=c.startCentered,x="",x+=(w=void 0!==y&&y)&&d?"translate("+(u.x/_-g/2)+"em, "+(u.y/_-b/2)+"em) ":w?"translate(calc(-50% + "+u.x/_+"em), calc(-50% + "+u.y/_+"em)) ":"translate("+u.x/_+"em, "+u.y/_+"em) ",x+="scale("+u.size/_*(u.flipX?-1:1)+", "+u.size/_*(u.flipY?-1:1)+") ",x+="rotate("+u.rotate+"deg) "),k["-webkit-transform"]=k.transform);var z=K(k);z.length>0&&(l.style=z);var C=[];return C.push({tag:"span",attributes:l,children:[e]}),a&&C.push({tag:"span",attributes:{class:"sr-only"},children:[a]}),C}var rt=function(){},at=S.measurePerformance&&c&&c.mark&&c.measure?c:{mark:rt,measure:rt},ot='FA "5.0.9"',st=function(t){at.mark(ot+" "+t+" ends"),at.measure(ot+" "+t,ot+" "+t+" begins",ot+" "+t+" ends")},ft={begin:function(t){return at.mark(ot+" "+t+" begins"),function(){return st(t)}},end:st},lt=function(t,e,n,i){var r,a,o,s,f,l=Object.keys(t),c=l.length,u=void 0!==i?(s=e,f=i,function(t,e,n,i){return s.call(f,t,e,n,i)}):e;for(void 0===n?(r=1,o=t[l[0]]):(r=0,o=n);r<c;r++)o=u(o,t[a=l[r]],a,t);return o},ct=R.styles,ut=R.shims,mt={},dt={},gt={},ht=function(){var t=function(t){return lt(ct,function(e,n,i){return e[i]=lt(n,t,{}),e},{})};mt=t(function(t,e,n){return t[e[3]]=n,t}),dt=t(function(t,e,n){var i=e[2];return t[n]=n,i.forEach(function(e){t[e]=n}),t});var e="far"in ct;gt=lt(ut,function(t,n){var i=n[0],r=n[1],a=n[2];return"far"!==r||e||(r="fas"),t[i]={prefix:r,iconName:a},t},{})};ht();var pt=R.styles,vt=function(){return{prefix:null,iconName:null,rest:[]}};function bt(t){return t.reduce(function(t,e){var n=V(S.familyPrefix,e);if(pt[e])t.prefix=e;else if(n){var i="fa"===t.prefix?gt[n]||{prefix:null,iconName:null}:{};t.iconName=i.iconName||n,t.prefix=i.prefix||t.prefix}else e!==S.replacementClass&&0!==e.indexOf("fa-w-")&&t.rest.push(e);return t},vt())}function yt(t,e,n){if(t&&t[e]&&t[e][n])return{prefix:e,iconName:n,icon:t[e][n]}}function wt(t){var e,n=t.tag,i=t.attributes,r=void 0===i?{}:i,a=t.children,o=void 0===a?[]:a;return"string"==typeof t?q(t):"<"+n+" "+(e=r,Object.keys(e||{}).reduce(function(t,n){return t+(n+'="')+q(e[n])+'" '},"").trim())+">"+o.map(wt).join("")+"</"+n+">"}var xt=function(){};function kt(t){return"string"==typeof(t.getAttribute?t.getAttribute(v):null)}var zt={replace:function(t){var e=t[0],n=t[1].map(function(t){return wt(t)}).join("\n");if(e.parentNode&&e.outerHTML)e.outerHTML=n+(S.keepOriginalSource&&"svg"!==e.tagName.toLowerCase()?"\x3c!-- "+e.outerHTML+" --\x3e":"");else if(e.parentNode){var i=document.createElement("span");e.parentNode.replaceChild(i,e),i.outerHTML=n}},nest:function(t){var e=t[0],n=t[1];if(~U(e).indexOf(S.replacementClass))return zt.replace(t);var i=new RegExp(S.familyPrefix+"-.*");delete n[0].attributes.style;var r=n[0].attributes.class.split(" ").reduce(function(t,e){return e===S.replacementClass||e.match(i)?t.toSvg.push(e):t.toNode.push(e),t},{toNode:[],toSvg:[]});n[0].attributes.class=r.toSvg.join(" ");var a=n.map(function(t){return wt(t)}).join("\n");e.setAttribute("class",r.toNode.join(" ")),e.setAttribute(v,""),e.innerHTML=a}};function Ct(t,e){var n="function"==typeof e?e:xt;0===t.length?n():(s.requestAnimationFrame||function(t){return t()})(function(){var e=!0===S.autoReplaceSvg?zt.replace:zt[S.autoReplaceSvg]||zt.replace,i=ft.begin("mutate");t.map(e),i(),n()})}var Nt=!1;var At=null;var Ot=function(t){var e=t.getAttribute("style"),n=[];return e&&(n=e.split(";").reduce(function(t,e){var n=e.split(":"),i=n[0],r=n.slice(1);return i&&r.length>0&&(t[i]=r.join(":").trim()),t},{})),n};var Mt=function(t){var e,n,i,r,a=t.getAttribute("data-prefix"),o=t.getAttribute("data-icon"),s=void 0!==t.innerText?t.innerText.trim():"",f=bt(U(t));return a&&o&&(f.prefix=a,f.iconName=o),f.prefix&&s.length>1?f.iconName=(i=f.prefix,r=t.innerText,dt[i][r]):f.prefix&&1===s.length&&(f.iconName=(e=f.prefix,n=function(t){for(var e="",n=0;n<t.length;n++)e+=("000"+t.charCodeAt(n).toString(16)).slice(-4);return e}(t.innerText),mt[e][n])),f},Lt=function(t){var e={size:16,x:0,y:0,flipX:!1,flipY:!1,rotate:0};return t?t.toLowerCase().split(" ").reduce(function(t,e){var n=e.toLowerCase().split("-"),i=n[0],r=n.slice(1).join("-");if(i&&"h"===r)return t.flipX=!0,t;if(i&&"v"===r)return t.flipY=!0,t;if(r=parseFloat(r),isNaN(r))return t;switch(i){case"grow":t.size=t.size+r;break;case"shrink":t.size=t.size-r;break;case"left":t.x=t.x-r;break;case"right":t.x=t.x+r;break;case"up":t.y=t.y-r;break;case"down":t.y=t.y+r;break;case"rotate":t.rotate=t.rotate+r}return t},e):e},Et=function(t){return Lt(t.getAttribute("data-fa-transform"))},jt=function(t){var e=t.getAttribute("data-fa-symbol");return null!==e&&(""===e||e)},St=function(t){var e=Y(t.attributes).reduce(function(t,e){return"class"!==t.name&&"style"!==t.name&&(t[e.name]=e.value),t},{}),n=t.getAttribute("title");return S.autoA11y&&(n?e["aria-labelledby"]=S.replacementClass+"-title-"+X():e["aria-hidden"]="true"),e},Pt=function(t){var e=t.getAttribute("data-fa-mask");return e?bt(e.split(" ").map(function(t){return t.trim()})):vt()};function Tt(t){this.name="MissingIcon",this.message=t||"Icon unavailable",this.stack=(new Error).stack}(Tt.prototype=Object.create(Error.prototype)).constructor=Tt;var Rt={fill:"currentColor"},Ht={attributeType:"XML",repeatCount:"indefinite",dur:"2s"},Ft={tag:"path",attributes:O({},Rt,{d:"M156.5,447.7l-12.6,29.5c-18.7-9.5-35.9-21.2-51.5-34.9l22.7-22.7C127.6,430.5,141.5,440,156.5,447.7z M40.6,272H8.5 c1.4,21.2,5.4,41.7,11.7,61.1L50,321.2C45.1,305.5,41.8,289,40.6,272z M40.6,240c1.4-18.8,5.2-37,11.1-54.1l-29.5-12.6 C14.7,194.3,10,216.7,8.5,240H40.6z M64.3,156.5c7.8-14.9,17.2-28.8,28.1-41.5L69.7,92.3c-13.7,15.6-25.5,32.8-34.9,51.5 L64.3,156.5z M397,419.6c-13.9,12-29.4,22.3-46.1,30.4l11.9,29.8c20.7-9.9,39.8-22.6,56.9-37.6L397,419.6z M115,92.4 c13.9-12,29.4-22.3,46.1-30.4l-11.9-29.8c-20.7,9.9-39.8,22.6-56.8,37.6L115,92.4z M447.7,355.5c-7.8,14.9-17.2,28.8-28.1,41.5 l22.7,22.7c13.7-15.6,25.5-32.9,34.9-51.5L447.7,355.5z M471.4,272c-1.4,18.8-5.2,37-11.1,54.1l29.5,12.6 c7.5-21.1,12.2-43.5,13.6-66.8H471.4z M321.2,462c-15.7,5-32.2,8.2-49.2,9.4v32.1c21.2-1.4,41.7-5.4,61.1-11.7L321.2,462z M240,471.4c-18.8-1.4-37-5.2-54.1-11.1l-12.6,29.5c21.1,7.5,43.5,12.2,66.8,13.6V471.4z M462,190.8c5,15.7,8.2,32.2,9.4,49.2h32.1 c-1.4-21.2-5.4-41.7-11.7-61.1L462,190.8z M92.4,397c-12-13.9-22.3-29.4-30.4-46.1l-29.8,11.9c9.9,20.7,22.6,39.8,37.6,56.9 L92.4,397z M272,40.6c18.8,1.4,36.9,5.2,54.1,11.1l12.6-29.5C317.7,14.7,295.3,10,272,8.5V40.6z M190.8,50 c15.7-5,32.2-8.2,49.2-9.4V8.5c-21.2,1.4-41.7,5.4-61.1,11.7L190.8,50z M442.3,92.3L419.6,115c12,13.9,22.3,29.4,30.5,46.1 l29.8-11.9C470,128.5,457.3,109.4,442.3,92.3z M397,92.4l22.7-22.7c-15.6-13.7-32.8-25.5-51.5-34.9l-12.6,29.5 C370.4,72.1,384.4,81.5,397,92.4z"})},It=O({},Ht,{attributeName:"opacity"}),_t={tag:"g",children:[Ft,{tag:"circle",attributes:O({},Rt,{cx:"256",cy:"364",r:"28"}),children:[{tag:"animate",attributes:O({},Ht,{attributeName:"r",values:"28;14;28;28;14;28;"})},{tag:"animate",attributes:O({},It,{values:"1;0;1;1;0;1;"})}]},{tag:"path",attributes:O({},Rt,{opacity:"1",d:"M263.7,312h-16c-6.6,0-12-5.4-12-12c0-71,77.4-63.9,77.4-107.8c0-20-17.8-40.2-57.4-40.2c-29.1,0-44.3,9.6-59.2,28.7 c-3.9,5-11.1,6-16.2,2.4l-13.1-9.2c-5.6-3.9-6.9-11.8-2.6-17.2c21.2-27.2,46.4-44.7,91.2-44.7c52.3,0,97.4,29.8,97.4,80.2 c0,67.6-77.4,63.5-77.4,107.8C275.7,306.6,270.3,312,263.7,312z"}),children:[{tag:"animate",attributes:O({},It,{values:"1;0;0;0;0;1;"})}]},{tag:"path",attributes:O({},Rt,{opacity:"0",d:"M232.5,134.5l7,168c0.3,6.4,5.6,11.5,12,11.5h9c6.4,0,11.7-5.1,12-11.5l7-168c0.3-6.8-5.2-12.5-12-12.5h-23 C237.7,122,232.2,127.7,232.5,134.5z"}),children:[{tag:"animate",attributes:O({},It,{values:"0;0;1;1;0;0;"})}]}]},Bt=R.styles,Dt="fa-layers-text",Wt=/Font Awesome 5 (Solid|Regular|Light|Brands)/,Xt={Solid:"fas",Regular:"far",Light:"fal",Brands:"fab"};function Yt(t,e){var n={found:!1,width:512,height:512,icon:_t};if(t&&e&&Bt[e]&&Bt[e][t]){var i=Bt[e][t];n={found:!0,width:i[0],height:i[1],icon:{tag:"path",attributes:{fill:"currentColor",d:i.slice(4)[0]}}}}else if(t&&e&&!S.showMissingIcons)throw new Tt("Icon is missing for prefix "+e+" with icon name "+t);return n}function Ut(t){var e,n,i,r,a,o,s,f,l,c,u,m,g,h,p,v,b,y,w,x=(n=Mt(e=t),i=n.iconName,r=n.prefix,a=n.rest,o=Ot(e),s=Et(e),f=jt(e),l=St(e),c=Pt(e),{iconName:i,title:e.getAttribute("title"),prefix:r,transform:s,symbol:f,mask:c,extra:{classes:a,styles:o,attributes:l}});return~x.extra.classes.indexOf(Dt)?function(t,e){var n=e.title,i=e.transform,r=e.extra,a=null,o=null;if(d){var s=parseInt(getComputedStyle(t).fontSize,10),f=t.getBoundingClientRect();a=f.width/s,o=f.height/s}return S.autoA11y&&!n&&(r.attributes["aria-hidden"]="true"),[t,it({content:t.innerHTML,width:a,height:o,transform:i,title:n,extra:r,watchable:!0})]}(t,x):(u=t,g=(m=x).iconName,h=m.title,p=m.prefix,v=m.transform,b=m.symbol,y=m.mask,w=m.extra,[u,nt({icons:{main:Yt(g,p),mask:Yt(y.iconName,y.prefix)},prefix:p,iconName:g,transform:v,symbol:b,mask:y,title:h,extra:w,watchable:!0})])}function Vt(t){"function"==typeof t.remove?t.remove():t&&t.parentNode&&t.parentNode.removeChild(t)}function qt(t){if(m){var e=ft.begin("searchPseudoElements");Nt=!0,function(){Y(t.querySelectorAll("*")).forEach(function(t){[":before",":after"].forEach(function(e){var n=s.getComputedStyle(t,e),i=n.getPropertyValue("font-family").match(Wt),r=Y(t.children).filter(function(t){return t.getAttribute(b)===e})[0];if(r&&(r.nextSibling&&r.nextSibling.textContent.indexOf(b)>-1&&Vt(r.nextSibling),Vt(r),r=null),i&&!r){var a=n.getPropertyValue("content"),o=f.createElement("i");o.setAttribute("class",""+Xt[i[1]]),o.setAttribute(b,e),o.innerText=3===a.length?a.substr(1,1):a,":before"===e?t.insertBefore(o,t.firstChild):t.appendChild(o)}})})}(),Nt=!1,e()}}function Kt(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;if(m){var n=f.documentElement.classList,i=function(t){return n.add(y+"-"+t)},r=function(t){return n.remove(y+"-"+t)},a=Object.keys(Bt),o=["."+Dt+":not(["+v+"])"].concat(a.map(function(t){return"."+t+":not(["+v+"])"})).join(", ");if(0!==o.length){var s=Y(t.querySelectorAll(o));if(s.length>0){i("pending"),r("complete");var l=ft.begin("onTree"),c=s.reduce(function(t,e){try{var n=Ut(e);n&&t.push(n)}catch(t){w||t instanceof Tt&&console.error(t)}return t},[]);l(),Ct(c,function(){i("active"),i("complete"),r("pending"),"function"==typeof e&&e()})}}}}function Gt(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,n=Ut(t);n&&Ct([n],e)}var Jt=function(){var t=p,e=S.familyPrefix,n=S.replacementClass,i="svg:not(:root).svg-inline--fa{overflow:visible}.svg-inline--fa{display:inline-block;font-size:inherit;height:1em;overflow:visible;vertical-align:-.125em}.svg-inline--fa.fa-lg{vertical-align:-.225em}.svg-inline--fa.fa-w-1{width:.0625em}.svg-inline--fa.fa-w-2{width:.125em}.svg-inline--fa.fa-w-3{width:.1875em}.svg-inline--fa.fa-w-4{width:.25em}.svg-inline--fa.fa-w-5{width:.3125em}.svg-inline--fa.fa-w-6{width:.375em}.svg-inline--fa.fa-w-7{width:.4375em}.svg-inline--fa.fa-w-8{width:.5em}.svg-inline--fa.fa-w-9{width:.5625em}.svg-inline--fa.fa-w-10{width:.625em}.svg-inline--fa.fa-w-11{width:.6875em}.svg-inline--fa.fa-w-12{width:.75em}.svg-inline--fa.fa-w-13{width:.8125em}.svg-inline--fa.fa-w-14{width:.875em}.svg-inline--fa.fa-w-15{width:.9375em}.svg-inline--fa.fa-w-16{width:1em}.svg-inline--fa.fa-w-17{width:1.0625em}.svg-inline--fa.fa-w-18{width:1.125em}.svg-inline--fa.fa-w-19{width:1.1875em}.svg-inline--fa.fa-w-20{width:1.25em}.svg-inline--fa.fa-pull-left{margin-right:.3em;width:auto}.svg-inline--fa.fa-pull-right{margin-left:.3em;width:auto}.svg-inline--fa.fa-border{height:1.5em}.svg-inline--fa.fa-li{width:2em}.svg-inline--fa.fa-fw{width:1.25em}.fa-layers svg.svg-inline--fa{bottom:0;left:0;margin:auto;position:absolute;right:0;top:0}.fa-layers{display:inline-block;height:1em;position:relative;text-align:center;vertical-align:-.125em;width:1em}.fa-layers svg.svg-inline--fa{-webkit-transform-origin:center center;transform-origin:center center}.fa-layers-counter,.fa-layers-text{display:inline-block;position:absolute;text-align:center}.fa-layers-text{left:50%;top:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);-webkit-transform-origin:center center;transform-origin:center center}.fa-layers-counter{background-color:#ff253a;border-radius:1em;-webkit-box-sizing:border-box;box-sizing:border-box;color:#fff;height:1.5em;line-height:1;max-width:5em;min-width:1.5em;overflow:hidden;padding:.25em;right:0;text-overflow:ellipsis;top:0;-webkit-transform:scale(.25);transform:scale(.25);-webkit-transform-origin:top right;transform-origin:top right}.fa-layers-bottom-right{bottom:0;right:0;top:auto;-webkit-transform:scale(.25);transform:scale(.25);-webkit-transform-origin:bottom right;transform-origin:bottom right}.fa-layers-bottom-left{bottom:0;left:0;right:auto;top:auto;-webkit-transform:scale(.25);transform:scale(.25);-webkit-transform-origin:bottom left;transform-origin:bottom left}.fa-layers-top-right{right:0;top:0;-webkit-transform:scale(.25);transform:scale(.25);-webkit-transform-origin:top right;transform-origin:top right}.fa-layers-top-left{left:0;right:auto;top:0;-webkit-transform:scale(.25);transform:scale(.25);-webkit-transform-origin:top left;transform-origin:top left}.fa-lg{font-size:1.33333em;line-height:.75em;vertical-align:-.0667em}.fa-xs{font-size:.75em}.fa-sm{font-size:.875em}.fa-1x{font-size:1em}.fa-2x{font-size:2em}.fa-3x{font-size:3em}.fa-4x{font-size:4em}.fa-5x{font-size:5em}.fa-6x{font-size:6em}.fa-7x{font-size:7em}.fa-8x{font-size:8em}.fa-9x{font-size:9em}.fa-10x{font-size:10em}.fa-fw{text-align:center;width:1.25em}.fa-ul{list-style-type:none;margin-left:2.5em;padding-left:0}.fa-ul>li{position:relative}.fa-li{left:-2em;position:absolute;text-align:center;width:2em;line-height:inherit}.fa-border{border:solid .08em #eee;border-radius:.1em;padding:.2em .25em .15em}.fa-pull-left{float:left}.fa-pull-right{float:right}.fa.fa-pull-left,.fab.fa-pull-left,.fal.fa-pull-left,.far.fa-pull-left,.fas.fa-pull-left{margin-right:.3em}.fa.fa-pull-right,.fab.fa-pull-right,.fal.fa-pull-right,.far.fa-pull-right,.fas.fa-pull-right{margin-left:.3em}.fa-spin{-webkit-animation:fa-spin 2s infinite linear;animation:fa-spin 2s infinite linear}.fa-pulse{-webkit-animation:fa-spin 1s infinite steps(8);animation:fa-spin 1s infinite steps(8)}@-webkit-keyframes fa-spin{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes fa-spin{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}.fa-rotate-90{-webkit-transform:rotate(90deg);transform:rotate(90deg)}.fa-rotate-180{-webkit-transform:rotate(180deg);transform:rotate(180deg)}.fa-rotate-270{-webkit-transform:rotate(270deg);transform:rotate(270deg)}.fa-flip-horizontal{-webkit-transform:scale(-1,1);transform:scale(-1,1)}.fa-flip-vertical{-webkit-transform:scale(1,-1);transform:scale(1,-1)}.fa-flip-horizontal.fa-flip-vertical{-webkit-transform:scale(-1,-1);transform:scale(-1,-1)}:root .fa-flip-horizontal,:root .fa-flip-vertical,:root .fa-rotate-180,:root .fa-rotate-270,:root .fa-rotate-90{-webkit-filter:none;filter:none}.fa-stack{display:inline-block;height:2em;position:relative;width:2em}.fa-stack-1x,.fa-stack-2x{bottom:0;left:0;margin:auto;position:absolute;right:0;top:0}.svg-inline--fa.fa-stack-1x{height:1em;width:1em}.svg-inline--fa.fa-stack-2x{height:2em;width:2em}.fa-inverse{color:#fff}.sr-only{border:0;clip:rect(0,0,0,0);height:1px;margin:-1px;overflow:hidden;padding:0;position:absolute;width:1px}.sr-only-focusable:active,.sr-only-focusable:focus{clip:auto;height:auto;margin:0;overflow:visible;position:static;width:auto}";if("fa"!==e||n!==t){var r=new RegExp("\\.fa\\-","g"),a=new RegExp("\\."+t,"g");i=i.replace(r,"."+e+"-").replace(a,"."+n)}return i};var Qt=function(){function t(){N(this,t),this.definitions={}}return A(t,[{key:"add",value:function(){for(var t=this,e=arguments.length,n=Array(e),i=0;i<e;i++)n[i]=arguments[i];var r=n.reduce(this._pullDefinitions,{});Object.keys(r).forEach(function(e){t.definitions[e]=O({},t.definitions[e]||{},r[e]),function t(e,n){var i=Object.keys(n).reduce(function(t,e){var i=n[e];return i.icon?t[i.iconName]=i.icon:t[e]=i,t},{});"function"==typeof R.hooks.addPack?R.hooks.addPack(e,i):R.styles[e]=O({},R.styles[e]||{},i),"fas"===e&&t("fa",n)}(e,r[e])})}},{key:"reset",value:function(){this.definitions={}}},{key:"_pullDefinitions",value:function(t,e){var n=e.prefix&&e.iconName&&e.icon?{0:e}:e;return Object.keys(n).map(function(e){var i=n[e],r=i.prefix,a=i.iconName,o=i.icon;t[r]||(t[r]={}),t[r][a]=o}),t}}]),t}();function Zt(t){return{found:!0,width:t[0],height:t[1],icon:{tag:"path",attributes:{fill:"currentColor",d:t.slice(4)[0]}}}}var $t=!1;function te(){S.autoAddCss&&($t||D(Jt()),$t=!0)}function ee(t,e){return Object.defineProperty(t,"abstract",{get:e}),Object.defineProperty(t,"html",{get:function(){return t.abstract.map(function(t){return wt(t)})}}),Object.defineProperty(t,"node",{get:function(){if(m){var e=f.createElement("div");return e.innerHTML=t.html,e.children}}}),t}function ne(t){var e=t.prefix,n=void 0===e?"fa":e,i=t.iconName;if(i)return yt(re.definitions,n,i)||yt(R.styles,n,i)}var ie,re=new Qt,ae=(ie=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=e.transform,i=void 0===n?B:n,r=e.symbol,a=void 0!==r&&r,o=e.mask,s=void 0===o?null:o,f=e.title,l=void 0===f?null:f,c=e.classes,u=void 0===c?[]:c,m=e.attributes,d=void 0===m?{}:m,g=e.styles,h=void 0===g?{}:g;if(t){var p=t.prefix,v=t.iconName,b=t.icon;return ee(O({type:"icon"},t),function(){return te(),S.autoA11y&&(l?d["aria-labelledby"]=S.replacementClass+"-title-"+X():d["aria-hidden"]="true"),nt({icons:{main:Zt(b),mask:s?Zt(s.icon):{found:!1,width:null,height:null,icon:{}}},prefix:p,iconName:v,transform:O({},B,i),symbol:a,title:l,extra:{attributes:d,styles:h,classes:u}})})}},function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=(t||{}).icon?t:ne(t||{}),i=e.mask;return i&&(i=(i||{}).icon?i:ne(i||{})),ie(n,O({},e,{mask:i}))}),oe={noAuto:function(){var t;P({autoReplaceSvg:t=!1,observeMutations:t}),At&&At.disconnect()},dom:{i2svg:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};if(m){te();var e=t.node,n=void 0===e?f:e,i=t.callback,r=void 0===i?function(){}:i;S.searchPseudoElements&&qt(n),Kt(n,r)}},css:Jt,insertCss:function(){D(Jt())}},library:re,parse:{transform:function(t){return Lt(t)}},findIconDefinition:ne,icon:ae,text:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=e.transform,i=void 0===n?B:n,r=e.title,a=void 0===r?null:r,o=e.classes,s=void 0===o?[]:o,f=e.attributes,l=void 0===f?{}:f,c=e.styles,u=void 0===c?{}:c;return ee({type:"text",content:t},function(){return te(),it({content:t,transform:O({},B,i),title:a,extra:{attributes:l,styles:u,classes:[S.familyPrefix+"-layers-text"].concat(M(s))}})})},layer:function(t){return ee({type:"layer"},function(){te();var e=[];return t(function(t){Array.isArray(t)?t.map(function(t){e=e.concat(t.abstract)}):e=e.concat(t.abstract)}),[{tag:"span",attributes:{class:S.familyPrefix+"-layers"},children:e}]})}},se=function(){m&&S.autoReplaceSvg&&oe.dom.i2svg({node:f})};Object.defineProperty(oe,"config",{get:function(){return S},set:function(t){P(t)}}),function(t){try{t()}catch(t){if(!w)throw t}}(function(){u&&(s.FontAwesome||(s.FontAwesome=oe),I(function(){Object.keys(R.styles).length>0&&se(),S.observeMutations&&"function"==typeof MutationObserver&&function(t){if(l){var e=t.treeCallback,n=t.nodeCallback,i=t.pseudoElementsCallback;At=new l(function(t){Nt||Y(t).forEach(function(t){if("childList"===t.type&&t.addedNodes.length>0&&!kt(t.addedNodes[0])&&(S.searchPseudoElements&&i(t.target),e(t.target)),"attributes"===t.type&&t.target.parentNode&&S.searchPseudoElements&&i(t.target.parentNode),"attributes"===t.type&&kt(t.target)&&~z.indexOf(t.attributeName))if("class"===t.attributeName){var r=bt(U(t.target)),a=r.prefix,o=r.iconName;a&&t.target.setAttribute("data-prefix",a),o&&t.target.setAttribute("data-icon",o)}else n(t.target)})}),m&&At.observe(f.getElementsByTagName("body")[0],{childList:!0,attributes:!0,characterData:!0,subtree:!0})}}({treeCallback:Kt,nodeCallback:Gt,pseudoElementsCallback:qt})})),R.hooks=O({},R.hooks,{addPack:function(t,e){R.styles[t]=O({},R.styles[t]||{},e),ht(),se()},addShims:function(t){var e;(e=R.shims).push.apply(e,M(t)),ht(),se()}})})}();
/* fa-brands */
!function(){"use strict";var c={};try{"undefined"!=typeof window&&(c=window)}catch(c){}var h=(c.navigator||{}).userAgent,z=void 0===h?"":h,v=c,l=(~z.indexOf("MSIE")||z.indexOf("Trident/"),"___FONT_AWESOME___"),m=function(){try{return!0}catch(c){return!1}}(),s=[1,2,3,4,5,6,7,8,9,10],e=s.concat([11,12,13,14,15,16,17,18,19,20]);["xs","sm","lg","fw","ul","li","border","pull-left","pull-right","spin","pulse","rotate-90","rotate-180","rotate-270","flip-horizontal","flip-vertical","stack","stack-1x","stack-2x","inverse","layers","layers-text","layers-counter"].concat(s.map(function(c){return c+"x"})).concat(e.map(function(c){return"w-"+c}));var a=v||{};a[l]||(a[l]={}),a[l].styles||(a[l].styles={}),a[l].hooks||(a[l].hooks={}),a[l].shims||(a[l].shims=[]);var t=a[l],M=Object.assign||function(c){for(var h=1;h<arguments.length;h++){var z=arguments[h];for(var v in z)Object.prototype.hasOwnProperty.call(z,v)&&(c[v]=z[v])}return c},V={android:[448,512,[],"f17b","M89.6 204.5v115.8c0 15.4-12.1 27.7-27.5 27.7-15.3 0-30.1-12.4-30.1-27.7V204.5c0-15.1 14.8-27.5 30.1-27.5 15.1 0 27.5 12.4 27.5 27.5zm10.8 157c0 16.4 13.2 29.6 29.6 29.6h19.9l.3 61.1c0 36.9 55.2 36.6 55.2 0v-61.1h37.2v61.1c0 36.7 55.5 36.8 55.5 0v-61.1h20.2c16.2 0 29.4-13.2 29.4-29.6V182.1H100.4v179.4zm248-189.1H99.3c0-42.8 25.6-80 63.6-99.4l-19.1-35.3c-2.8-4.9 4.3-8 6.7-3.8l19.4 35.6c34.9-15.5 75-14.7 108.3 0L297.5 34c2.5-4.3 9.5-1.1 6.7 3.8L285.1 73c37.7 19.4 63.3 56.6 63.3 99.4zm-170.7-55.5c0-5.7-4.6-10.5-10.5-10.5-5.7 0-10.2 4.8-10.2 10.5s4.6 10.5 10.2 10.5c5.9 0 10.5-4.8 10.5-10.5zm113.4 0c0-5.7-4.6-10.5-10.2-10.5-5.9 0-10.5 4.8-10.5 10.5s4.6 10.5 10.5 10.5c5.6 0 10.2-4.8 10.2-10.5zm94.8 60.1c-15.1 0-27.5 12.1-27.5 27.5v115.8c0 15.4 12.4 27.7 27.5 27.7 15.4 0 30.1-12.4 30.1-27.7V204.5c0-15.4-14.8-27.5-30.1-27.5z"],"app-store":[512,512,[],"f36f","M255.9 120.9l9.1-15.7c5.6-9.8 18.1-13.1 27.9-7.5 9.8 5.6 13.1 18.1 7.5 27.9l-87.5 151.5h63.3c20.5 0 32 24.1 23.1 40.8H113.8c-11.3 0-20.4-9.1-20.4-20.4 0-11.3 9.1-20.4 20.4-20.4h52l66.6-115.4-20.8-36.1c-5.6-9.8-2.3-22.2 7.5-27.9 9.8-5.6 22.2-2.3 27.9 7.5l8.9 15.7zm-78.7 218l-19.6 34c-5.6 9.8-18.1 13.1-27.9 7.5-9.8-5.6-13.1-18.1-7.5-27.9l14.6-25.2c16.4-5.1 29.8-1.2 40.4 11.6zm168.9-61.7h53.1c11.3 0 20.4 9.1 20.4 20.4 0 11.3-9.1 20.4-20.4 20.4h-29.5l19.9 34.5c5.6 9.8 2.3 22.2-7.5 27.9-9.8 5.6-22.2 2.3-27.9-7.5-33.5-58.1-58.7-101.6-75.4-130.6-17.1-29.5-4.9-59.1 7.2-69.1 13.4 23 33.4 57.7 60.1 104zM256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm216 248c0 118.7-96.1 216-216 216-118.7 0-216-96.1-216-216 0-118.7 96.1-216 216-216 118.7 0 216 96.1 216 216z"],"app-store-ios":[448,512,[],"f370","M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zM127 384.5c-5.5 9.6-17.8 12.8-27.3 7.3-9.6-5.5-12.8-17.8-7.3-27.3l14.3-24.7c16.1-4.9 29.3-1.1 39.6 11.4L127 384.5zm138.9-53.9H84c-11 0-20-9-20-20s9-20 20-20h51l65.4-113.2-20.5-35.4c-5.5-9.6-2.2-21.8 7.3-27.3 9.6-5.5 21.8-2.2 27.3 7.3l8.9 15.4 8.9-15.4c5.5-9.6 17.8-12.8 27.3-7.3 9.6 5.5 12.8 17.8 7.3 27.3l-85.8 148.6h62.1c20.2 0 31.5 23.7 22.7 40zm98.1 0h-29l19.6 33.9c5.5 9.6 2.2 21.8-7.3 27.3-9.6 5.5-21.8 2.2-27.3-7.3-32.9-56.9-57.5-99.7-74-128.1-16.7-29-4.8-58 7.1-67.8 13.1 22.7 32.7 56.7 58.9 102h52c11 0 20 9 20 20 0 11.1-9 20-20 20z"],apple:[376,512,[],"f179","M314.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C59.3 141.2 0 184.8 0 273.5c0 26.2 4.8 53.3 14.4 81.2 12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"],"apple-pay":[640,512,[],"f415","M116.9 158.5c-7.5 8.9-19.5 15.9-31.5 14.9-1.5-12 4.4-24.8 11.3-32.6 7.5-9.1 20.6-15.6 31.3-16.1 1.2 12.4-3.7 24.7-11.1 33.8m10.9 17.2c-17.4-1-32.3 9.9-40.5 9.9-8.4 0-21-9.4-34.8-9.1-17.9.3-34.5 10.4-43.6 26.5-18.8 32.3-4.9 80 13.3 106.3 8.9 13 19.5 27.3 33.5 26.8 13.3-.5 18.5-8.6 34.5-8.6 16.1 0 20.8 8.6 34.8 8.4 14.5-.3 23.6-13 32.5-26 10.1-14.8 14.3-29.1 14.5-29.9-.3-.3-28-10.9-28.3-42.9-.3-26.8 21.9-39.5 22.9-40.3-12.5-18.6-32-20.6-38.8-21.1m100.4-36.2v194.9h30.3v-66.6h41.9c38.3 0 65.1-26.3 65.1-64.3s-26.4-64-64.1-64h-73.2zm30.3 25.5h34.9c26.3 0 41.3 14 41.3 38.6s-15 38.8-41.4 38.8h-34.8V165zm162.2 170.9c19 0 36.6-9.6 44.6-24.9h.6v23.4h28v-97c0-28.1-22.5-46.3-57.1-46.3-32.1 0-55.9 18.4-56.8 43.6h27.3c2.3-12 13.4-19.9 28.6-19.9 18.5 0 28.9 8.6 28.9 24.5v10.8l-37.8 2.3c-35.1 2.1-54.1 16.5-54.1 41.5.1 25.2 19.7 42 47.8 42zm8.2-23.1c-16.1 0-26.4-7.8-26.4-19.6 0-12.3 9.9-19.4 28.8-20.5l33.6-2.1v11c0 18.2-15.5 31.2-36 31.2zm102.5 74.6c29.5 0 43.4-11.3 55.5-45.4L640 193h-30.8l-35.6 115.1h-.6L537.4 193h-31.6L557 334.9l-2.8 8.6c-4.6 14.6-12.1 20.3-25.5 20.3-2.4 0-7-.3-8.9-.5v23.4c1.8.4 9.3.7 11.6.7z"],bitcoin:[512,512,[],"f379","M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zm-141.651-35.33c4.937-32.999-20.191-50.739-54.55-62.573l11.146-44.702-27.213-6.781-10.851 43.524c-7.154-1.783-14.502-3.464-21.803-5.13l10.929-43.81-27.198-6.781-11.153 44.686c-5.922-1.349-11.735-2.682-17.377-4.084l.031-.14-37.53-9.37-7.239 29.062s20.191 4.627 19.765 4.913c11.022 2.751 13.014 10.044 12.68 15.825l-12.696 50.925c.76.194 1.744.473 2.829.907-.907-.225-1.876-.473-2.876-.713l-17.796 71.338c-1.349 3.348-4.767 8.37-12.471 6.464.271.395-19.78-4.937-19.78-4.937l-13.51 31.147 35.414 8.827c6.588 1.651 13.045 3.379 19.4 5.006l-11.262 45.213 27.182 6.781 11.153-44.733a1038.209 1038.209 0 0 0 21.687 5.627l-11.115 44.523 27.213 6.781 11.262-45.128c46.404 8.781 81.299 5.239 95.986-36.727 11.836-33.79-.589-53.281-25.004-65.991 17.78-4.098 31.174-15.792 34.747-39.949zm-62.177 87.179c-8.41 33.79-65.308 15.523-83.755 10.943l14.944-59.899c18.446 4.603 77.6 13.717 68.811 48.956zm8.417-87.667c-7.673 30.736-55.031 15.12-70.393 11.292l13.548-54.327c15.363 3.828 64.836 10.973 56.845 43.035z"],"cc-amazon-pay":[576,512,[],"f42d","M124.7 201.8c.1-11.8 0-23.5 0-35.3v-35.3c0-1.3.4-2 1.4-2.7 11.5-8 24.1-12.1 38.2-11.1 12.5.9 22.7 7 28.1 21.7 3.3 8.9 4.1 18.2 4.1 27.7 0 8.7-.7 17.3-3.4 25.6-5.7 17.8-18.7 24.7-35.7 23.9-11.7-.5-21.9-5-31.4-11.7-.9-.8-1.4-1.6-1.3-2.8zm154.9 14.6c4.6 1.8 9.3 2 14.1 1.5 11.6-1.2 21.9-5.7 31.3-12.5.9-.6 1.3-1.3 1.3-2.5-.1-3.9 0-7.9 0-11.8 0-4-.1-8 0-12 0-1.4-.4-2-1.8-2.2-7-.9-13.9-2.2-20.9-2.9-7-.6-14-.3-20.8 1.9-6.7 2.2-11.7 6.2-13.7 13.1-1.6 5.4-1.6 10.8.1 16.2 1.6 5.5 5.2 9.2 10.4 11.2zM576 80v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V80c0-26.5 21.5-48 48-48h480c26.5 0 48 21.5 48 48zm-207.5 23.9c.4 1.7.9 3.4 1.6 5.1 16.5 40.6 32.9 81.3 49.5 121.9 1.4 3.5 1.7 6.4.2 9.9-2.8 6.2-4.9 12.6-7.8 18.7-2.6 5.5-6.7 9.5-12.7 11.2-4.2 1.1-8.5 1.3-12.9.9-2.1-.2-4.2-.7-6.3-.8-2.8-.2-4.2 1.1-4.3 4-.1 2.8-.1 5.6 0 8.3.1 4.6 1.6 6.7 6.2 7.5 4.7.8 9.4 1.6 14.2 1.7 14.3.3 25.7-5.4 33.1-17.9 2.9-4.9 5.6-10.1 7.7-15.4 19.8-50.1 39.5-100.3 59.2-150.5.6-1.5 1.1-3 1.3-4.6.4-2.4-.7-3.6-3.1-3.7-5.6-.1-11.1 0-16.7 0-3.1 0-5.3 1.4-6.4 4.3-.4 1.1-.9 2.3-1.3 3.4l-29.1 83.7c-2.1 6.1-4.2 12.1-6.5 18.6-.4-.9-.6-1.4-.8-1.9-10.8-29.9-21.6-59.9-32.4-89.8-1.7-4.7-3.5-9.5-5.3-14.2-.9-2.5-2.7-4-5.4-4-6.4-.1-12.8-.2-19.2-.1-2.2 0-3.3 1.6-2.8 3.7zM242.4 206c1.7 11.7 7.6 20.8 18 26.6 9.9 5.5 20.7 6.2 31.7 4.6 12.7-1.9 23.9-7.3 33.8-15.5.4-.3.8-.6 1.4-1 .5 3.2.9 6.2 1.5 9.2.5 2.6 2.1 4.3 4.5 4.4 4.6.1 9.1.1 13.7 0 2.3-.1 3.8-1.6 4-3.9.1-.8.1-1.6.1-2.3v-88.8c0-3.6-.2-7.2-.7-10.8-1.6-10.8-6.2-19.7-15.9-25.4-5.6-3.3-11.8-5-18.2-5.9-3-.4-6-.7-9.1-1.1h-10c-.8.1-1.6.3-2.5.3-8.2.4-16.3 1.4-24.2 3.5-5.1 1.3-10 3.2-15 4.9-3 1-4.5 3.2-4.4 6.5.1 2.8-.1 5.6 0 8.3.1 4.1 1.8 5.2 5.7 4.1 6.5-1.7 13.1-3.5 19.7-4.8 10.3-1.9 20.7-2.7 31.1-1.2 5.4.8 10.5 2.4 14.1 7 3.1 4 4.2 8.8 4.4 13.7.3 6.9.2 13.9.3 20.8 0 .4-.1.7-.2 1.2-.4 0-.8 0-1.1-.1-8.8-2.1-17.7-3.6-26.8-4.1-9.5-.5-18.9.1-27.9 3.2-10.8 3.8-19.5 10.3-24.6 20.8-4.1 8.3-4.6 17-3.4 25.8zM98.7 106.9v175.3c0 .8 0 1.7.1 2.5.2 2.5 1.7 4.1 4.1 4.2 5.9.1 11.8.1 17.7 0 2.5 0 4-1.7 4.1-4.1.1-.8.1-1.7.1-2.5v-60.7c.9.7 1.4 1.2 1.9 1.6 15 12.5 32.2 16.6 51.1 12.9 17.1-3.4 28.9-13.9 36.7-29.2 5.8-11.6 8.3-24.1 8.7-37 .5-14.3-1-28.4-6.8-41.7-7.1-16.4-18.9-27.3-36.7-30.9-2.7-.6-5.5-.8-8.2-1.2h-7c-1.2.2-2.4.3-3.6.5-11.7 1.4-22.3 5.8-31.8 12.7-2 1.4-3.9 3-5.9 4.5-.1-.5-.3-.8-.4-1.2-.4-2.3-.7-4.6-1.1-6.9-.6-3.9-2.5-5.5-6.4-5.6h-9.7c-5.9-.1-6.9 1-6.9 6.8zM493.6 339c-2.7-.7-5.1 0-7.6 1-43.9 18.4-89.5 30.2-136.8 35.8-14.5 1.7-29.1 2.8-43.7 3.2-26.6.7-53.2-.8-79.6-4.3-17.8-2.4-35.5-5.7-53-9.9-37-8.9-72.7-21.7-106.7-38.8-8.8-4.4-17.4-9.3-26.1-14-3.8-2.1-6.2-1.5-8.2 2.1v1.7c1.2 1.6 2.2 3.4 3.7 4.8 36 32.2 76.6 56.5 122 72.9 21.9 7.9 44.4 13.7 67.3 17.5 14 2.3 28 3.8 42.2 4.5 3 .1 6 .2 9 .4.7 0 1.4.2 2.1.3h17.7c.7-.1 1.4-.3 2.1-.3 14.9-.4 29.8-1.8 44.6-4 21.4-3.2 42.4-8.1 62.9-14.7 29.6-9.6 57.7-22.4 83.4-40.1 2.8-1.9 5.7-3.8 8-6.2 4.3-4.4 2.3-10.4-3.3-11.9zm50.4-27.7c-.8-4.2-4-5.8-7.6-7-5.7-1.9-11.6-2.8-17.6-3.3-11-.9-22-.4-32.8 1.6-12 2.2-23.4 6.1-33.5 13.1-1.2.8-2.4 1.8-3.1 3-.6.9-.7 2.3-.5 3.4.3 1.3 1.7 1.6 3 1.5.6 0 1.2 0 1.8-.1l19.5-2.1c9.6-.9 19.2-1.5 28.8-.8 4.1.3 8.1 1.2 12 2.2 4.3 1.1 6.2 4.4 6.4 8.7.3 6.7-1.2 13.1-2.9 19.5-3.5 12.9-8.3 25.4-13.3 37.8-.3.8-.7 1.7-.8 2.5-.4 2.5 1 4 3.4 3.5 1.4-.3 3-1.1 4-2.1 3.7-3.6 7.5-7.2 10.6-11.2 10.7-13.8 17-29.6 20.7-46.6.7-3 1.2-6.1 1.7-9.1.2-4.7.2-9.6.2-14.5z"],"cc-amex":[576,512,[],"f1f3","M576 255.4c-37.9-.2-44.2-.9-54.5 5v-5c-45.3 0-53.5-1.7-64.9 5.2v-5.2h-78.2v5.1c-11.4-6.5-21.4-5.1-75.7-5.1v5.6c-6.3-3.7-14.5-5.6-24.3-5.6h-58c-3.5 3.8-12.5 13.7-15.7 17.2-12.7-14.1-10.5-11.6-15.5-17.2h-83.1v92.3h82c3.3-3.5 12.9-13.9 16.1-17.4 12.7 14.3 10.3 11.7 15.4 17.4h48.9c0-14.7.1-8.3.1-23 11.5.2 24.3-.2 34.3-6.2 0 13.9-.1 17.1-.1 29.2h39.6c0-18.5.1-7.4.1-25.3 6.2 0 7.7 0 9.4.1.1 1.3 0 0 0 25.2 152.8 0 145.9 1.1 156.7-4.5v4.5c34.8 0 54.8 2.2 67.5-6.1V432c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V228.3h26.6c4.2-10.1 2.2-5.3 6.4-15.3h19.2c4.2 10 2.2 5.2 6.4 15.3h52.9v-11.4c2.2 5 1.1 2.5 5.1 11.4h29.5c2.4-5.5 2.6-5.8 5.1-11.4v11.4h135.5v-25.1c6.4 0 8-.1 9.8.2 0 0-.2 10.9.1 24.8h66.5v-8.9c7.4 5.9 17.4 8.9 29.7 8.9h26.8c4.2-10.1 2.2-5.3 6.4-15.3h19c6.5 15 .2.5 6.6 15.3h52.8v-21.9c11.8 19.7 7.8 12.9 13.2 21.9h41.6v-92h-39.9v18.4c-12.2-20.2-6.3-10.4-11.2-18.4h-43.3v20.6c-6.2-14.6-4.6-10.8-8.8-20.6h-32.4c-.4 0-2.3.2-2.3-.3h-27.6c-12.8 0-23.1 3.2-30.7 9.3v-9.3h-39.9v5.3c-10.8-6.1-20.7-5.1-64.4-5.3-.1 0-11.6-.1-11.6 0h-103c-2.5 6.1-6.8 16.4-12.6 30-2.8-6-11-23.8-13.9-30h-46V157c-7.4-17.4-4.7-11-9-21.1H22.9c-3.4 7.9-13.7 32-23.1 53.9V80c0-26.5 21.5-48 48-48h480c26.5 0 48 21.5 48 48v175.4zm-186.6-80.6c-.3.2-1.4 2.2-1.4 7.6 0 6 .9 7.7 1.1 7.9.2.1 1.1.5 3.4.5l7.3-16.9c-1.1 0-2.1-.1-3.1-.1-5.6 0-7 .7-7.3 1zm-19.9 130.9c9.2 3.3 11 9.5 11 18.4l-.1 13.8h-16.6l.1-11.5c0-11.8-3.8-13.8-14.8-13.8h-17.6l-.1 25.3h-16.6l.1-69.3h39.4c13 0 27.1 2.3 27.1 18.7-.1 7.6-4.2 15.3-11.9 18.4zm-6.3-15.4c0-6.4-5.6-7.4-10.7-7.4h-21v15.6h20.7c5.6 0 11-1.3 11-8.2zm181.7-7.1H575v-14.6h-32.9c-12.8 0-23.8 6.6-23.8 20.7 0 33 42.7 12.8 42.7 27.4 0 5.1-4.3 6.4-8.4 6.4h-32l-.1 14.8h32c8.4 0 17.6-1.8 22.5-8.9v-25.8c-10.5-13.8-39.3-1.3-39.3-13.5 0-5.8 4.6-6.5 9.2-6.5zm-99.2-.3v-14.3h-55.2l-.1 69.3h55.2l.1-14.3-38.6-.3v-13.8H445v-14.1h-37.8v-12.5h38.5zm42.2 40.1h-32.2l-.1 14.8h32.2c14.8 0 26.2-5.6 26.2-22 0-33.2-42.9-11.2-42.9-26.3 0-5.6 4.9-6.4 9.2-6.4h30.4v-14.6h-33.2c-12.8 0-23.5 6.6-23.5 20.7 0 33 42.7 12.5 42.7 27.4-.1 5.4-4.7 6.4-8.8 6.4zm-78.1-158.7c-17.4-.3-33.2-4.1-33.2 19.7 0 11.8 2.8 19.9 16.1 19.9h7.4l23.5-54.5h24.8l27.9 65.4v-65.4h25.3l29.1 48.1v-48.1h16.9v69H524l-31.2-51.9v51.9h-33.7l-6.6-15.3h-34.3l-6.4 15.3h-19.2c-22.8 0-33-11.8-33-34 0-23.3 10.5-35.3 34-35.3h16.1v15.2zm14.3 24.5h22.8l-11.2-27.6-11.6 27.6zm-72.6-39.6h-16.9v69.3h16.9v-69.3zm-38.1 37.3c9.5 3.3 11 9.2 11 18.4v13.5h-16.6c-.3-14.8 3.6-25.1-14.8-25.1h-18v25.1h-16.4v-69.3l39.1.3c13.3 0 27.4 2 27.4 18.4.1 8-4.3 15.7-11.7 18.7zm-6.7-15.3c0-6.4-5.6-7.4-10.7-7.4h-21v15.3h20.7c5.7 0 11-1.3 11-7.9zm-59.5-7.4v-14.6h-55.5v69.3h55.5v-14.3h-38.9v-13.8h37.8v-14.1h-37.8v-12.5h38.9zm-84.6 54.7v-54.2l-24 54.2H124l-24-54.2v54.2H66.2l-6.4-15.3H25.3l-6.4 15.3H1l29.7-69.3h24.5l28.1 65.7v-65.7h27.1l21.7 47 19.7-47h27.6v69.3h-16.8zM53.9 188.8l-11.5-27.6-11.2 27.6h22.7zm253 102.5c0 27.9-30.4 23.3-49.3 23.3l-.1 23.3h-32.2l-20.4-23-21.3 23h-65.4l.1-69.3h66.5l20.5 22.8 21-22.8H279c15.6 0 27.9 5.4 27.9 22.7zm-112.7 11.8l-17.9-20.2h-41.7v12.5h36.3v14.1h-36.3v13.8h40.6l19-20.2zM241 276l-25.3 27.4 25.3 28.1V276zm48.3 15.3c0-6.1-4.6-8.4-10.2-8.4h-21.5v17.6h21.2c5.9 0 10.5-2.8 10.5-9.2z"],"cc-apple-pay":[576,512,[],"f416","M302.2 218.4c0 17.2-10.5 27.1-29 27.1h-24.3v-54.2h24.4c18.4 0 28.9 9.8 28.9 27.1zm47.5 62.6c0 8.3 7.2 13.7 18.5 13.7 14.4 0 25.2-9.1 25.2-21.9v-7.7l-23.5 1.5c-13.3.9-20.2 5.8-20.2 14.4zM576 79v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V79c0-26.5 21.5-48 48-48h480c26.5 0 48 21.5 48 48zM127.8 197.2c8.4.7 16.8-4.2 22.1-10.4 5.2-6.4 8.6-15 7.7-23.7-7.4.3-16.6 4.9-21.9 11.3-4.8 5.5-8.9 14.4-7.9 22.8zm60.6 74.5c-.2-.2-19.6-7.6-19.8-30-.2-18.7 15.3-27.7 16-28.2-8.8-13-22.4-14.4-27.1-14.7-12.2-.7-22.6 6.9-28.4 6.9-5.9 0-14.7-6.6-24.3-6.4-12.5.2-24.2 7.3-30.5 18.6-13.1 22.6-3.4 56 9.3 74.4 6.2 9.1 13.7 19.1 23.5 18.7 9.3-.4 13-6 24.2-6 11.3 0 14.5 6 24.3 5.9 10.2-.2 16.5-9.1 22.8-18.2 6.9-10.4 9.8-20.4 10-21zm135.4-53.4c0-26.6-18.5-44.8-44.9-44.8h-51.2v136.4h21.2v-46.6h29.3c26.8 0 45.6-18.4 45.6-45zm90 23.7c0-19.7-15.8-32.4-40-32.4-22.5 0-39.1 12.9-39.7 30.5h19.1c1.6-8.4 9.4-13.9 20-13.9 13 0 20.2 6 20.2 17.2v7.5l-26.4 1.6c-24.6 1.5-37.9 11.6-37.9 29.1 0 17.7 13.7 29.4 33.4 29.4 13.3 0 25.6-6.7 31.2-17.4h.4V310h19.6v-68zM516 210.9h-21.5l-24.9 80.6h-.4l-24.9-80.6H422l35.9 99.3-1.9 6c-3.2 10.2-8.5 14.2-17.9 14.2-1.7 0-4.9-.2-6.2-.3v16.4c1.2.4 6.5.5 8.1.5 20.7 0 30.4-7.9 38.9-31.8L516 210.9z"],"cc-diners-club":[576,512,[],"f24c","M239.7 79.9c-96.9 0-175.8 78.6-175.8 175.8 0 96.9 78.9 175.8 175.8 175.8 97.2 0 175.8-78.9 175.8-175.8 0-97.2-78.6-175.8-175.8-175.8zm-39.9 279.6c-41.7-15.9-71.4-56.4-71.4-103.8s29.7-87.9 71.4-104.1v207.9zm79.8.3V151.6c41.7 16.2 71.4 56.7 71.4 104.1s-29.7 87.9-71.4 104.1zM528 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h480c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zM329.7 448h-90.3c-106.2 0-193.8-85.5-193.8-190.2C45.6 143.2 133.2 64 239.4 64h90.3c105 0 200.7 79.2 200.7 193.8 0 104.7-95.7 190.2-200.7 190.2z"],"cc-discover":[576,512,[],"f1f2","M83 212.1c0 7.9-3.2 15.5-8.9 20.7-4.9 4.4-11.6 6.4-21.9 6.4H48V185h4.2c10.3 0 16.7 1.7 21.9 6.6 5.7 5 8.9 12.6 8.9 20.5zM504.8 184h-4.9v24.9h4.7c10.3 0 15.8-4.4 15.8-12.8 0-7.9-5.5-12.1-15.6-12.1zM576 80v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V80c0-26.5 21.5-48 48-48h480c26.5 0 48 21.5 48 48zM428 253h45.3v-13.8H444V217h28.3v-13.8H444V185h29.3v-14H428v82zm-86.2-82l35 84.2h8.6l35.5-84.2h-17.5l-22.2 55.2-21.9-55.2h-17.5zm-83 41.6c0 24.6 19.9 44.6 44.6 44.6 24.6 0 44.6-19.9 44.6-44.6 0-24.6-19.9-44.6-44.6-44.6-24.6 0-44.6 19.9-44.6 44.6zm-68-.5c0 32.5 33.6 52.5 63.3 38.2v-19c-19.3 19.3-46.8 5.8-46.8-19.2 0-23.7 26.7-39.1 46.8-19v-19c-30.2-15-63.3 6.8-63.3 38zm-33.9 28.3c-7.6 0-13.8-3.7-17.5-10.8l-10.3 9.9c17.8 26.1 56.6 18.2 56.6-11.3 0-13.1-5.4-19-23.6-25.6-9.6-3.4-12.3-5.9-12.3-10.3 0-8.7 14.5-14.1 24.9-2.5l8.4-10.8c-19.1-17.1-49.7-8.9-49.7 14.3 0 11.3 5.2 17.2 20.2 22.7 25.7 9.1 14.7 24.4 3.3 24.4zm-57.4-28.3c0-24.1-18-41.1-44.1-41.1H32v82h23.4c30.9 0 44.1-22.4 44.1-40.9zm23.4-41.1h-16v82h16v-82zM544 288c-33.3 20.8-226.4 124.4-416 160h401c8.2 0 15-6.8 15-15V288zm0-35l-25.9-34.5c12.1-2.5 18.7-10.6 18.7-23.2 0-28.5-30.3-24.4-52.9-24.4v82h16v-32.8h2.2l22.2 32.8H544z"],"cc-jcb":[576,512,[],"f24b","M431.5 244.3V212c41.2 0 38.5.2 38.5.2 7.3 1.3 13.3 7.3 13.3 16 0 8.8-6 14.5-13.3 15.8-1.2.4-3.3.3-38.5.3zm42.8 20.2c-2.8-.7-3.3-.5-42.8-.5v35c39.6 0 40 .2 42.8-.5 7.5-1.5 13.5-8 13.5-17 0-8.7-6-15.5-13.5-17zM576 80v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V80c0-26.5 21.5-48 48-48h480c26.5 0 48 21.5 48 48zM182 192.3h-57c0 67.1 10.7 109.7-35.8 109.7-19.5 0-38.8-5.7-57.2-14.8v28c30 8.3 68 8.3 68 8.3 97.9 0 82-47.7 82-131.2zm178.5 4.5c-63.4-16-165-14.9-165 59.3 0 77.1 108.2 73.6 165 59.2V287C312.9 311.7 253 309 253 256s59.8-55.6 107.5-31.2v-28zM544 286.5c0-18.5-16.5-30.5-38-32v-.8c19.5-2.7 30.3-15.5 30.3-30.2 0-19-15.7-30-37-31 0 0 6.3-.3-120.3-.3v127.5h122.7c24.3.1 42.3-12.9 42.3-33.2z"],"cc-mastercard":[576,512,[],"f1f1","M482.9 410.3c0 6.8-4.6 11.7-11.2 11.7-6.8 0-11.2-5.2-11.2-11.7 0-6.5 4.4-11.7 11.2-11.7 6.6 0 11.2 5.2 11.2 11.7zm-310.8-11.7c-7.1 0-11.2 5.2-11.2 11.7 0 6.5 4.1 11.7 11.2 11.7 6.5 0 10.9-4.9 10.9-11.7-.1-6.5-4.4-11.7-10.9-11.7zm117.5-.3c-5.4 0-8.7 3.5-9.5 8.7h19.1c-.9-5.7-4.4-8.7-9.6-8.7zm107.8.3c-6.8 0-10.9 5.2-10.9 11.7 0 6.5 4.1 11.7 10.9 11.7 6.8 0 11.2-4.9 11.2-11.7 0-6.5-4.4-11.7-11.2-11.7zm105.9 26.1c0 .3.3.5.3 1.1 0 .3-.3.5-.3 1.1-.3.3-.3.5-.5.8-.3.3-.5.5-1.1.5-.3.3-.5.3-1.1.3-.3 0-.5 0-1.1-.3-.3 0-.5-.3-.8-.5-.3-.3-.5-.5-.5-.8-.3-.5-.3-.8-.3-1.1 0-.5 0-.8.3-1.1 0-.5.3-.8.5-1.1.3-.3.5-.3.8-.5.5-.3.8-.3 1.1-.3.5 0 .8 0 1.1.3.5.3.8.3 1.1.5s.2.6.5 1.1zm-2.2 1.4c.5 0 .5-.3.8-.3.3-.3.3-.5.3-.8 0-.3 0-.5-.3-.8-.3 0-.5-.3-1.1-.3h-1.6v3.5h.8V426h.3l1.1 1.4h.8l-1.1-1.3zM576 81v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V81c0-26.5 21.5-48 48-48h480c26.5 0 48 21.5 48 48zM64 220.6c0 76.5 62.1 138.5 138.5 138.5 27.2 0 53.9-8.2 76.5-23.1-72.9-59.3-72.4-171.2 0-230.5-22.6-15-49.3-23.1-76.5-23.1-76.4-.1-138.5 62-138.5 138.2zm224 108.8c70.5-55 70.2-162.2 0-217.5-70.2 55.3-70.5 162.6 0 217.5zm-142.3 76.3c0-8.7-5.7-14.4-14.7-14.7-4.6 0-9.5 1.4-12.8 6.5-2.4-4.1-6.5-6.5-12.2-6.5-3.8 0-7.6 1.4-10.6 5.4V392h-8.2v36.7h8.2c0-18.9-2.5-30.2 9-30.2 10.2 0 8.2 10.2 8.2 30.2h7.9c0-18.3-2.5-30.2 9-30.2 10.2 0 8.2 10 8.2 30.2h8.2v-23zm44.9-13.7h-7.9v4.4c-2.7-3.3-6.5-5.4-11.7-5.4-10.3 0-18.2 8.2-18.2 19.3 0 11.2 7.9 19.3 18.2 19.3 5.2 0 9-1.9 11.7-5.4v4.6h7.9V392zm40.5 25.6c0-15-22.9-8.2-22.9-15.2 0-5.7 11.9-4.8 18.5-1.1l3.3-6.5c-9.4-6.1-30.2-6-30.2 8.2 0 14.3 22.9 8.3 22.9 15 0 6.3-13.5 5.8-20.7.8l-3.5 6.3c11.2 7.6 32.6 6 32.6-7.5zm35.4 9.3l-2.2-6.8c-3.8 2.1-12.2 4.4-12.2-4.1v-16.6h13.1V392h-13.1v-11.2h-8.2V392h-7.6v7.3h7.6V416c0 17.6 17.3 14.4 22.6 10.9zm13.3-13.4h27.5c0-16.2-7.4-22.6-17.4-22.6-10.6 0-18.2 7.9-18.2 19.3 0 20.5 22.6 23.9 33.8 14.2l-3.8-6c-7.8 6.4-19.6 5.8-21.9-4.9zm59.1-21.5c-4.6-2-11.6-1.8-15.2 4.4V392h-8.2v36.7h8.2V408c0-11.6 9.5-10.1 12.8-8.4l2.4-7.6zm10.6 18.3c0-11.4 11.6-15.1 20.7-8.4l3.8-6.5c-11.6-9.1-32.7-4.1-32.7 15 0 19.8 22.4 23.8 32.7 15l-3.8-6.5c-9.2 6.5-20.7 2.6-20.7-8.6zm66.7-18.3H408v4.4c-8.3-11-29.9-4.8-29.9 13.9 0 19.2 22.4 24.7 29.9 13.9v4.6h8.2V392zm33.7 0c-2.4-1.2-11-2.9-15.2 4.4V392h-7.9v36.7h7.9V408c0-11 9-10.3 12.8-8.4l2.4-7.6zm40.3-14.9h-7.9v19.3c-8.2-10.9-29.9-5.1-29.9 13.9 0 19.4 22.5 24.6 29.9 13.9v4.6h7.9v-51.7zm7.6-75.1v4.6h.8V302h1.9v-.8h-4.6v.8h1.9zm6.6 123.8c0-.5 0-1.1-.3-1.6-.3-.3-.5-.8-.8-1.1-.3-.3-.8-.5-1.1-.8-.5 0-1.1-.3-1.6-.3-.3 0-.8.3-1.4.3-.5.3-.8.5-1.1.8-.5.3-.8.8-.8 1.1-.3.5-.3 1.1-.3 1.6 0 .3 0 .8.3 1.4 0 .3.3.8.8 1.1.3.3.5.5 1.1.8.5.3 1.1.3 1.4.3.5 0 1.1 0 1.6-.3.3-.3.8-.5 1.1-.8.3-.3.5-.8.8-1.1.3-.6.3-1.1.3-1.4zm3.2-124.7h-1.4l-1.6 3.5-1.6-3.5h-1.4v5.4h.8v-4.1l1.6 3.5h1.1l1.4-3.5v4.1h1.1v-5.4zm4.4-80.5c0-76.2-62.1-138.3-138.5-138.3-27.2 0-53.9 8.2-76.5 23.1 72.1 59.3 73.2 171.5 0 230.5 22.6 15 49.5 23.1 76.5 23.1 76.4.1 138.5-61.9 138.5-138.4z"],"cc-visa":[576,512,[],"f1f0","M470.1 231.3s7.6 37.2 9.3 45H446c3.3-8.9 16-43.5 16-43.5-.2.3 3.3-9.1 5.3-14.9l2.8 13.4zM576 80v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V80c0-26.5 21.5-48 48-48h480c26.5 0 48 21.5 48 48zM152.5 331.2L215.7 176h-42.5l-39.3 106-4.3-21.5-14-71.4c-2.3-9.9-9.4-12.7-18.2-13.1H32.7l-.7 3.1c15.8 4 29.9 9.8 42.2 17.1l35.8 135h42.5zm94.4.2L272.1 176h-40.2l-25.1 155.4h40.1zm139.9-50.8c.2-17.7-10.6-31.2-33.7-42.3-14.1-7.1-22.7-11.9-22.7-19.2.2-6.6 7.3-13.4 23.1-13.4 13.1-.3 22.7 2.8 29.9 5.9l3.6 1.7 5.5-33.6c-7.9-3.1-20.5-6.6-36-6.6-39.7 0-67.6 21.2-67.8 51.4-.3 22.3 20 34.7 35.2 42.2 15.5 7.6 20.8 12.6 20.8 19.3-.2 10.4-12.6 15.2-24.1 15.2-16 0-24.6-2.5-37.7-8.3l-5.3-2.5-5.6 34.9c9.4 4.3 26.8 8.1 44.8 8.3 42.2.1 69.7-20.8 70-53zM528 331.4L495.6 176h-31.1c-9.6 0-16.9 2.8-21 12.9l-59.7 142.5H426s6.9-19.2 8.4-23.3H486c1.2 5.5 4.8 23.3 4.8 23.3H528z"],facebook:[448,512,[],"f09a","M448 56.7v398.5c0 13.7-11.1 24.7-24.7 24.7H309.1V306.5h58.2l8.7-67.6h-67v-43.2c0-19.6 5.4-32.9 33.5-32.9h35.8v-60.5c-6.2-.8-27.4-2.7-52.2-2.7-51.6 0-87 31.5-87 89.4v49.9h-58.4v67.6h58.4V480H24.7C11.1 480 0 468.9 0 455.3V56.7C0 43.1 11.1 32 24.7 32h398.5c13.7 0 24.8 11.1 24.8 24.7z"],"facebook-f":[264,512,[],"f39e","M76.7 512V283H0v-91h76.7v-71.7C76.7 42.4 124.3 0 193.8 0c33.3 0 61.9 2.5 70.2 3.6V85h-48.2c-37.8 0-45.1 18-45.1 44.3V192H256l-11.7 91h-73.6v229"],"facebook-messenger":[448,512,[],"f39f","M224 32C15.9 32-77.5 278 84.6 400.6V480l75.7-42c142.2 39.8 285.4-59.9 285.4-198.7C445.8 124.8 346.5 32 224 32zm23.4 278.1L190 250.5 79.6 311.6l121.1-128.5 57.4 59.6 110.4-61.1-121.1 128.5z"],"facebook-square":[448,512,[],"f082","M448 80v352c0 26.5-21.5 48-48 48h-85.3V302.8h60.6l8.7-67.6h-69.3V192c0-19.6 5.4-32.9 33.5-32.9H384V98.7c-6.2-.8-27.4-2.7-52.2-2.7-51.6 0-87 31.5-87 89.4v49.9H184v67.6h60.9V480H48c-26.5 0-48-21.5-48-48V80c0-26.5 21.5-48 48-48h352c26.5 0 48 21.5 48 48z"],google:[488,512,[],"f1a0","M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"],"google-play":[512,512,[],"f3ab","M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z"],"google-wallet":[448,512,[],"f1ee","M156.8 126.8c37.6 60.6 64.2 113.1 84.3 162.5-8.3 33.8-18.8 66.5-31.3 98.3-13.2-52.3-26.5-101.3-56-148.5 6.5-36.4 2.3-73.6 3-112.3zM109.3 200H16.1c-6.5 0-10.5 7.5-6.5 12.7C51.8 267 81.3 330.5 101.3 400h103.5c-16.2-69.7-38.7-133.7-82.5-193.5-3-4-8-6.5-13-6.5zm47.8-88c68.5 108 130 234.5 138.2 368H409c-12-138-68.4-265-143.2-368H157.1zm251.8-68.5c-1.8-6.8-8.2-11.5-15.2-11.5h-88.3c-5.3 0-9 5-7.8 10.3 13.2 46.5 22.3 95.5 26.5 146 48.2 86.2 79.7 178.3 90.6 270.8 15.8-60.5 25.3-133.5 25.3-203 0-73.6-12.1-145.1-31.1-212.6z"],instagram:[448,512,[],"f16d","M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"],itunes:[448,512,[],"f3b4","M223.6 80.3C129 80.3 52.5 157 52.5 251.5S129 422.8 223.6 422.8s171.2-76.7 171.2-171.2c0-94.6-76.7-171.3-171.2-171.3zm79.4 240c-3.2 13.6-13.5 21.2-27.3 23.8-12.1 2.2-22.2 2.8-31.9-5-11.8-10-12-26.4-1.4-36.8 8.4-8 20.3-9.6 38-12.8 3-.5 5.6-1.2 7.7-3.7 3.2-3.6 2.2-2 2.2-80.8 0-5.6-2.7-7.1-8.4-6.1-4 .7-91.9 17.1-91.9 17.1-5 1.1-6.7 2.6-6.7 8.3 0 116.1.5 110.8-1.2 118.5-2.1 9-7.6 15.8-14.9 19.6-8.3 4.6-23.4 6.6-31.4 5.2-21.4-4-28.9-28.7-14.4-42.9 8.4-8 20.3-9.6 38-12.8 3-.5 5.6-1.2 7.7-3.7 5-5.7.9-127 2.6-133.7.4-2.6 1.5-4.8 3.5-6.4 2.1-1.7 5.8-2.7 6.7-2.7 101-19 113.3-21.4 115.1-21.4 5.7-.4 9 3 9 8.7-.1 170.6.4 161.4-1 167.6zM345.2 32H102.8C45.9 32 0 77.9 0 134.8v242.4C0 434.1 45.9 480 102.8 480h242.4c57 0 102.8-45.9 102.8-102.8V134.8C448 77.9 402.1 32 345.2 32zM223.6 444c-106.3 0-192.5-86.2-192.5-192.5S117.3 59 223.6 59s192.5 86.2 192.5 192.5S329.9 444 223.6 444z"],"itunes-note":[384,512,[],"f3b5","M381.9 388.2c-6.4 27.4-27.2 42.8-55.1 48-24.5 4.5-44.9 5.6-64.5-10.2-23.9-20.1-24.2-53.4-2.7-74.4 17-16.2 40.9-19.5 76.8-25.8 6-1.1 11.2-2.5 15.6-7.4 6.4-7.2 4.4-4.1 4.4-163.2 0-11.2-5.5-14.3-17-12.3-8.2 1.4-185.7 34.6-185.7 34.6-10.2 2.2-13.4 5.2-13.4 16.7 0 234.7 1.1 223.9-2.5 239.5-4.2 18.2-15.4 31.9-30.2 39.5-16.8 9.3-47.2 13.4-63.4 10.4-43.2-8.1-58.4-58-29.1-86.6 17-16.2 40.9-19.5 76.8-25.8 6-1.1 11.2-2.5 15.6-7.4 10.1-11.5 1.8-256.6 5.2-270.2.8-5.2 3-9.6 7.1-12.9 4.2-3.5 11.8-5.5 13.4-5.5 204-38.2 228.9-43.1 232.4-43.1 11.5-.8 18.1 6 18.1 17.6.2 344.5 1.1 326-1.8 338.5z"],linkedin:[448,512,[],"f08c","M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"],"linkedin-in":[448,512,[],"f0e1","M100.3 480H7.4V180.9h92.9V480zM53.8 140.1C24.1 140.1 0 115.5 0 85.8 0 56.1 24.1 32 53.8 32c29.7 0 53.8 24.1 53.8 53.8 0 29.7-24.1 54.3-53.8 54.3zM448 480h-92.7V334.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V480h-92.8V180.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V480z"],medium:[448,512,[],"f23a","M0 32v448h448V32H0zm372.2 106.1l-24 23c-2.1 1.6-3.1 4.2-2.7 6.7v169.3c-.4 2.6.6 5.2 2.7 6.7l23.5 23v5.1h-118V367l24.3-23.6c2.4-2.4 2.4-3.1 2.4-6.7V199.8l-67.6 171.6h-9.1L125 199.8v115c-.7 4.8 1 9.7 4.4 13.2l31.6 38.3v5.1H71.2v-5.1l31.6-38.3c3.4-3.5 4.9-8.4 4.1-13.2v-133c.4-3.7-1-7.3-3.8-9.8L75 138.1V133h87.3l67.4 148L289 133.1h83.2v5z"],"medium-m":[512,512,[],"f3c7","M71.5 142.3c.6-5.9-1.7-11.8-6.1-15.8L20.3 72.1V64h140.2l108.4 237.7L364.2 64h133.7v8.1l-38.6 37c-3.3 2.5-5 6.7-4.3 10.8v272c-.7 4.1 1 8.3 4.3 10.8l37.7 37v8.1H307.3v-8.1l39.1-37.9c3.8-3.8 3.8-5 3.8-10.8V171.2L241.5 447.1h-14.7L100.4 171.2v184.9c-1.1 7.8 1.5 15.6 7 21.2l50.8 61.6v8.1h-144v-8L65 377.3c5.4-5.6 7.9-13.5 6.5-21.2V142.3z"],pinterest:[496,512,[],"f0d2","M496 256c0 137-111 248-248 248-25.6 0-50.2-3.9-73.4-11.1 10.1-16.5 25.2-43.5 30.8-65 3-11.6 15.4-59 15.4-59 8.1 15.4 31.7 28.5 56.8 28.5 74.8 0 128.7-68.8 128.7-154.3 0-81.9-66.9-143.2-152.9-143.2-107 0-163.9 71.8-163.9 150.1 0 36.4 19.4 81.7 50.3 96.1 4.7 2.2 7.2 1.2 8.3-3.3.8-3.4 5-20.3 6.9-28.1.6-2.5.3-4.7-1.7-7.1-10.1-12.5-18.3-35.3-18.3-56.6 0-54.7 41.4-107.6 112-107.6 60.9 0 103.6 41.5 103.6 100.9 0 67.1-33.9 113.6-78 113.6-24.3 0-42.6-20.1-36.7-44.8 7-29.5 20.5-61.3 20.5-82.6 0-19-10.2-34.9-31.4-34.9-24.9 0-44.9 25.7-44.9 60.2 0 22 7.4 36.8 7.4 36.8s-24.5 103.8-29 123.2c-5 21.4-3 51.6-.9 71.2C65.4 450.9 0 361.1 0 256 0 119 111 8 248 8s248 111 248 248z"],"pinterest-p":[384,512,[],"f231","M204 6.5C101.4 6.5 0 74.9 0 185.6 0 256 39.6 296 63.6 296c9.9 0 15.6-27.6 15.6-35.4 0-9.3-23.7-29.1-23.7-67.8 0-80.4 61.2-137.4 140.4-137.4 68.1 0 118.5 38.7 118.5 109.8 0 53.1-21.3 152.7-90.3 152.7-24.9 0-46.2-18-46.2-43.8 0-37.8 26.4-74.4 26.4-113.4 0-66.2-93.9-54.2-93.9 25.8 0 16.8 2.1 35.4 9.6 50.7-13.8 59.4-42 147.9-42 209.1 0 18.9 2.7 37.5 4.5 56.4 3.4 3.8 1.7 3.4 6.9 1.5 50.4-69 48.6-82.5 71.4-172.8 12.3 23.4 44.1 36 69.3 36 106.2 0 153.9-103.5 153.9-196.8C384 71.3 298.2 6.5 204 6.5z"],"pinterest-square":[448,512,[],"f0d3","M448 80v352c0 26.5-21.5 48-48 48H154.4c9.8-16.4 22.4-40 27.4-59.3 3-11.5 15.3-58.4 15.3-58.4 8 15.3 31.4 28.2 56.3 28.2 74.1 0 127.4-68.1 127.4-152.7 0-81.1-66.2-141.8-151.4-141.8-106 0-162.2 71.1-162.2 148.6 0 36 19.2 80.8 49.8 95.1 4.7 2.2 7.1 1.2 8.2-3.3.8-3.4 5-20.1 6.8-27.8.6-2.5.3-4.6-1.7-7-10.1-12.3-18.3-34.9-18.3-56 0-54.2 41-106.6 110.9-106.6 60.3 0 102.6 41.1 102.6 99.9 0 66.4-33.5 112.4-77.2 112.4-24.1 0-42.1-19.9-36.4-44.4 6.9-29.2 20.3-60.7 20.3-81.8 0-53-75.5-45.7-75.5 25 0 21.7 7.3 36.5 7.3 36.5-31.4 132.8-36.1 134.5-29.6 192.6l2.2.8H48c-26.5 0-48-21.5-48-48V80c0-26.5 21.5-48 48-48h352c26.5 0 48 21.5 48 48z"],snapchat:[496,512,[],"f2ab","M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm169.5 338.9c-3.5 8.1-18.1 14-44.8 18.2-1.4 1.9-2.5 9.8-4.3 15.9-1.1 3.7-3.7 5.9-8.1 5.9h-.2c-6.2 0-12.8-2.9-25.8-2.9-17.6 0-23.7 4-37.4 13.7-14.5 10.3-28.4 19.1-49.2 18.2-21 1.6-38.6-11.2-48.5-18.2-13.8-9.7-19.8-13.7-37.4-13.7-12.5 0-20.4 3.1-25.8 3.1-5.4 0-7.5-3.3-8.3-6-1.8-6.1-2.9-14.1-4.3-16-13.8-2.1-44.8-7.5-45.5-21.4-.2-3.6 2.3-6.8 5.9-7.4 46.3-7.6 67.1-55.1 68-57.1 0-.1.1-.2.2-.3 2.5-5 3-9.2 1.6-12.5-3.4-7.9-17.9-10.7-24-13.2-15.8-6.2-18-13.4-17-18.3 1.6-8.5 14.4-13.8 21.9-10.3 5.9 2.8 11.2 4.2 15.7 4.2 3.3 0 5.5-.8 6.6-1.4-1.4-23.9-4.7-58 3.8-77.1C183.1 100 230.7 96 244.7 96c.6 0 6.1-.1 6.7-.1 34.7 0 68 17.8 84.3 54.3 8.5 19.1 5.2 53.1 3.8 77.1 1.1.6 2.9 1.3 5.7 1.4 4.3-.2 9.2-1.6 14.7-4.2 4-1.9 9.6-1.6 13.6 0 6.3 2.3 10.3 6.8 10.4 11.9.1 6.5-5.7 12.1-17.2 16.6-1.4.6-3.1 1.1-4.9 1.7-6.5 2.1-16.4 5.2-19 11.5-1.4 3.3-.8 7.5 1.6 12.5.1.1.1.2.2.3.9 2 21.7 49.5 68 57.1 4 1 7.1 5.5 4.9 10.8z"],"snapchat-ghost":[512,512,[],"f2ac","M510.846 392.673c-5.211 12.157-27.239 21.089-67.36 27.318-2.064 2.786-3.775 14.686-6.507 23.956-1.625 5.566-5.623 8.869-12.128 8.869l-.297-.005c-9.395 0-19.203-4.323-38.852-4.323-26.521 0-35.662 6.043-56.254 20.588-21.832 15.438-42.771 28.764-74.027 27.399-31.646 2.334-58.025-16.908-72.871-27.404-20.714-14.643-29.828-20.582-56.241-20.582-18.864 0-30.736 4.72-38.852 4.72-8.073 0-11.213-4.922-12.422-9.04-2.703-9.189-4.404-21.263-6.523-24.13-20.679-3.209-67.31-11.344-68.498-32.15a10.627 10.627 0 0 1 8.877-11.069c69.583-11.455 100.924-82.901 102.227-85.934.074-.176.155-.344.237-.515 3.713-7.537 4.544-13.849 2.463-18.753-5.05-11.896-26.872-16.164-36.053-19.796-23.715-9.366-27.015-20.128-25.612-27.504 2.437-12.836 21.725-20.735 33.002-15.453 8.919 4.181 16.843 6.297 23.547 6.297 5.022 0 8.212-1.204 9.96-2.171-2.043-35.936-7.101-87.29 5.687-115.969C158.122 21.304 229.705 15.42 250.826 15.42c.944 0 9.141-.089 10.11-.089 52.148 0 102.254 26.78 126.723 81.643 12.777 28.65 7.749 79.792 5.695 116.009 1.582.872 4.357 1.942 8.599 2.139 6.397-.286 13.815-2.389 22.069-6.257 6.085-2.846 14.406-2.461 20.48.058l.029.01c9.476 3.385 15.439 10.215 15.589 17.87.184 9.747-8.522 18.165-25.878 25.018-2.118.835-4.694 1.655-7.434 2.525-9.797 3.106-24.6 7.805-28.616 17.271-2.079 4.904-1.256 11.211 2.46 18.748.087.168.166.342.239.515 1.301 3.03 32.615 74.46 102.23 85.934 6.427 1.058 11.163 7.877 7.725 15.859z"],"snapchat-square":[448,512,[],"f2ad","M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm-6.5 314.9c-3.5 8.1-18.1 14-44.8 18.2-1.4 1.9-2.5 9.8-4.3 15.9-1.1 3.7-3.7 5.9-8.1 5.9h-.2c-6.2 0-12.8-2.9-25.8-2.9-17.6 0-23.7 4-37.4 13.7-14.5 10.3-28.4 19.1-49.2 18.2-21 1.6-38.6-11.2-48.5-18.2-13.8-9.7-19.8-13.7-37.4-13.7-12.5 0-20.4 3.1-25.8 3.1-5.4 0-7.5-3.3-8.3-6-1.8-6.1-2.9-14.1-4.3-16-13.8-2.1-44.8-7.5-45.5-21.4-.2-3.6 2.3-6.8 5.9-7.4 46.3-7.6 67.1-55.1 68-57.1 0-.1.1-.2.2-.3 2.5-5 3-9.2 1.6-12.5-3.4-7.9-17.9-10.7-24-13.2-15.8-6.2-18-13.4-17-18.3 1.6-8.5 14.4-13.8 21.9-10.3 5.9 2.8 11.2 4.2 15.7 4.2 3.3 0 5.5-.8 6.6-1.4-1.4-23.9-4.7-58 3.8-77.1C159.1 100 206.7 96 220.7 96c.6 0 6.1-.1 6.7-.1 34.7 0 68 17.8 84.3 54.3 8.5 19.1 5.2 53.1 3.8 77.1 1.1.6 2.9 1.3 5.7 1.4 4.3-.2 9.2-1.6 14.7-4.2 4-1.9 9.6-1.6 13.6 0 6.3 2.3 10.3 6.8 10.4 11.9.1 6.5-5.7 12.1-17.2 16.6-1.4.6-3.1 1.1-4.9 1.7-6.5 2.1-16.4 5.2-19 11.5-1.4 3.3-.8 7.5 1.6 12.5.1.1.1.2.2.3.9 2 21.7 49.5 68 57.1 4 1 7.1 5.5 4.9 10.8z"],tumblr:[320,512,[],"f173","M309.8 480.3c-13.6 14.5-50 31.7-97.4 31.7-120.8 0-147-88.8-147-140.6v-144H17.9c-5.5 0-10-4.5-10-10v-68c0-7.2 4.5-13.6 11.3-16 62-21.8 81.5-76 84.3-117.1.8-11 6.5-16.3 16.1-16.3h70.9c5.5 0 10 4.5 10 10v115.2h83c5.5 0 10 4.4 10 9.9v81.7c0 5.5-4.5 10-10 10h-83.4V360c0 34.2 23.7 53.6 68 35.8 4.8-1.9 9-3.2 12.7-2.2 3.5.9 5.8 3.4 7.4 7.9l22 64.3c1.8 5 3.3 10.6-.4 14.5z"],"tumblr-square":[448,512,[],"f174","M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm-82.3 364.2c-8.5 9.1-31.2 19.8-60.9 19.8-75.5 0-91.9-55.5-91.9-87.9v-90h-29.7c-3.4 0-6.2-2.8-6.2-6.2v-42.5c0-4.5 2.8-8.5 7.1-10 38.8-13.7 50.9-47.5 52.7-73.2.5-6.9 4.1-10.2 10-10.2h44.3c3.4 0 6.2 2.8 6.2 6.2v72h51.9c3.4 0 6.2 2.8 6.2 6.2v51.1c0 3.4-2.8 6.2-6.2 6.2h-52.1V321c0 21.4 14.8 33.5 42.5 22.4 3-1.2 5.6-2 8-1.4 2.2.5 3.6 2.1 4.6 4.9l13.8 40.2c1 3.2 2 6.7-.3 9.1z"],twitter:[512,512,[],"f099","M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"],"twitter-square":[448,512,[],"f081","M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm-48.9 158.8c.2 2.8.2 5.7.2 8.5 0 86.7-66 186.6-186.6 186.6-37.2 0-71.7-10.8-100.7-29.4 5.3.6 10.4.8 15.8.8 30.7 0 58.9-10.4 81.4-28-28.8-.6-53-19.5-61.3-45.5 10.1 1.5 19.2 1.5 29.6-1.2-30-6.1-52.5-32.5-52.5-64.4v-.8c8.7 4.9 18.9 7.9 29.6 8.3a65.447 65.447 0 0 1-29.2-54.6c0-12.2 3.2-23.4 8.9-33.1 32.3 39.8 80.8 65.8 135.2 68.6-9.3-44.5 24-80.6 64-80.6 18.9 0 35.9 7.9 47.9 20.7 14.8-2.8 29-8.3 41.6-15.8-4.9 15.2-15.2 28-28.8 36.1 13.2-1.4 26-5.1 37.8-10.2-8.9 13.1-20.1 24.7-32.9 34z"],weibo:[512,512,[],"f18a","M407 177.6c7.6-24-13.4-46.8-37.4-41.7-22 4.8-28.8-28.1-7.1-32.8 50.1-10.9 92.3 37.1 76.5 84.8-6.8 21.2-38.8 10.8-32-10.3zM214.8 446.7C108.5 446.7 0 395.3 0 310.4c0-44.3 28-95.4 76.3-143.7C176 67 279.5 65.8 249.9 161c-4 13.1 12.3 5.7 12.3 6 79.5-33.6 140.5-16.8 114 51.4-3.7 9.4 1.1 10.9 8.3 13.1 135.7 42.3 34.8 215.2-169.7 215.2zm143.7-146.3c-5.4-55.7-78.5-94-163.4-85.7-84.8 8.6-148.8 60.3-143.4 116s78.5 94 163.4 85.7c84.8-8.6 148.8-60.3 143.4-116zM347.9 35.1c-25.9 5.6-16.8 43.7 8.3 38.3 72.3-15.2 134.8 52.8 111.7 124-7.4 24.2 29.1 37 37.4 12 31.9-99.8-55.1-195.9-157.4-174.3zm-78.5 311c-17.1 38.8-66.8 60-109.1 46.3-40.8-13.1-58-53.4-40.3-89.7 17.7-35.4 63.1-55.4 103.4-45.1 42 10.8 63.1 50.2 46 88.5zm-86.3-30c-12.9-5.4-30 .3-38 12.9-8.3 12.9-4.3 28 8.6 34 13.1 6 30.8.3 39.1-12.9 8-13.1 3.7-28.3-9.7-34zm32.6-13.4c-5.1-1.7-11.4.6-14.3 5.4-2.9 5.1-1.4 10.6 3.7 12.9 5.1 2 11.7-.3 14.6-5.4 2.8-5.2 1.1-10.9-4-12.9z"],weixin:[576,512,[],"f1d7","M385.2 167.6c6.4 0 12.6.3 18.8 1.1C387.4 90.3 303.3 32 207.7 32 100.5 32 13 104.8 13 197.4c0 53.4 29.3 97.5 77.9 131.6l-19.3 58.6 68-34.1c24.4 4.8 43.8 9.7 68.2 9.7 6.2 0 12.1-.3 18.3-.8-4-12.9-6.2-26.6-6.2-40.8-.1-84.9 72.9-154 165.3-154zm-104.5-52.9c14.5 0 24.2 9.7 24.2 24.4 0 14.5-9.7 24.2-24.2 24.2-14.8 0-29.3-9.7-29.3-24.2.1-14.7 14.6-24.4 29.3-24.4zm-136.4 48.6c-14.5 0-29.3-9.7-29.3-24.2 0-14.8 14.8-24.4 29.3-24.4 14.8 0 24.4 9.7 24.4 24.4 0 14.6-9.6 24.2-24.4 24.2zM563 319.4c0-77.9-77.9-141.3-165.4-141.3-92.7 0-165.4 63.4-165.4 141.3S305 460.7 397.6 460.7c19.3 0 38.9-5.1 58.6-9.9l53.4 29.3-14.8-48.6C534 402.1 563 363.2 563 319.4zm-219.1-24.5c-9.7 0-19.3-9.7-19.3-19.6 0-9.7 9.7-19.3 19.3-19.3 14.8 0 24.4 9.7 24.4 19.3 0 10-9.7 19.6-24.4 19.6zm107.1 0c-9.7 0-19.3-9.7-19.3-19.6 0-9.7 9.7-19.3 19.3-19.3 14.5 0 24.4 9.7 24.4 19.3.1 10-9.9 19.6-24.4 19.6z"],whatsapp:[448,512,[],"f232","M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"],"whatsapp-square":[448,512,[],"f40c","M224 122.8c-72.7 0-131.8 59.1-131.9 131.8 0 24.9 7 49.2 20.2 70.1l3.1 5-13.3 48.6 49.9-13.1 4.8 2.9c20.2 12 43.4 18.4 67.1 18.4h.1c72.6 0 133.3-59.1 133.3-131.8 0-35.2-15.2-68.3-40.1-93.2-25-25-58-38.7-93.2-38.7zm77.5 188.4c-3.3 9.3-19.1 17.7-26.7 18.8-12.6 1.9-22.4.9-47.5-9.9-39.7-17.2-65.7-57.2-67.7-59.8-2-2.6-16.2-21.5-16.2-41s10.2-29.1 13.9-33.1c3.6-4 7.9-5 10.6-5 2.6 0 5.3 0 7.6.1 2.4.1 5.7-.9 8.9 6.8 3.3 7.9 11.2 27.4 12.2 29.4s1.7 4.3.3 6.9c-7.6 15.2-15.7 14.6-11.6 21.6 15.3 26.3 30.6 35.4 53.9 47.1 4 2 6.3 1.7 8.6-1 2.3-2.6 9.9-11.6 12.5-15.5 2.6-4 5.3-3.3 8.9-2 3.6 1.3 23.1 10.9 27.1 12.9s6.6 3 7.6 4.6c.9 1.9.9 9.9-2.4 19.1zM400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zM223.9 413.2c-26.6 0-52.7-6.7-75.8-19.3L64 416l22.5-82.2c-13.9-24-21.2-51.3-21.2-79.3C65.4 167.1 136.5 96 223.9 96c42.4 0 82.2 16.5 112.2 46.5 29.9 30 47.9 69.8 47.9 112.2 0 87.4-72.7 158.5-160.1 158.5z"],youtube:[576,512,[],"f167","M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"],"youtube-square":[448,512,[],"f431","M186.8 202.1l95.2 54.1-95.2 54.1V202.1zM448 80v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V80c0-26.5 21.5-48 48-48h352c26.5 0 48 21.5 48 48zm-42 176.3s0-59.6-7.6-88.2c-4.2-15.8-16.5-28.2-32.2-32.4C337.9 128 224 128 224 128s-113.9 0-142.2 7.7c-15.7 4.2-28 16.6-32.2 32.4-7.6 28.5-7.6 88.2-7.6 88.2s0 59.6 7.6 88.2c4.2 15.8 16.5 27.7 32.2 31.9C110.1 384 224 384 224 384s113.9 0 142.2-7.7c15.7-4.2 28-16.1 32.2-31.9 7.6-28.5 7.6-88.1 7.6-88.1z"]};!function(c){try{!function c(h,z){var v=Object.keys(z).reduce(function(c,h){var v=z[h];return v.icon?c[v.iconName]=v.icon:c[h]=v,c},{});"function"==typeof t.hooks.addPack?t.hooks.addPack(h,v):t.styles[h]=M({},t.styles[h]||{},v),"fas"===h&&c("fa",z)}("fab",V)}catch(c){if(!m)throw c}}()}();
/* fa solid */
!function(){"use strict";var c={};try{"undefined"!=typeof window&&(c=window)}catch(c){}var t=(c.navigator||{}).userAgent,e=void 0===t?"":t,n=c,a=(~e.indexOf("MSIE")||e.indexOf("Trident/"),"___FONT_AWESOME___"),r=function(){try{return!0}catch(c){return!1}}(),o=[1,2,3,4,5,6,7,8,9,10],l=o.concat([11,12,13,14,15,16,17,18,19,20]);["xs","sm","lg","fw","ul","li","border","pull-left","pull-right","spin","pulse","rotate-90","rotate-180","rotate-270","flip-horizontal","flip-vertical","stack","stack-1x","stack-2x","inverse","layers","layers-text","layers-counter"].concat(o.map(function(c){return c+"x"})).concat(l.map(function(c){return"w-"+c}));var s=n||{};s[a]||(s[a]={}),s[a].styles||(s[a].styles={}),s[a].hooks||(s[a].hooks={}),s[a].shims||(s[a].shims=[]);var i=s[a],f=Object.assign||function(c){for(var t=1;t<arguments.length;t++){var e=arguments[t];for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(c[n]=e[n])}return c},u={  "comment": [512, 512, [], "f075", "M256 32C114.6 32 0 125.1 0 240c0 49.6 21.4 95 57 130.7C44.5 421.1 2.7 466 2.2 466.5c-2.2 2.3-2.8 5.7-1.5 8.7S4.8 480 8 480c66.3 0 116-31.8 140.6-51.4 32.7 12.3 69 19.4 107.4 19.4 141.4 0 256-93.1 256-208S397.4 32 256 32z"],envelope:[512,512,[],"f0e0","M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z"],"envelope-open":[512,512,[],"f2b6","M512 464c0 26.51-21.49 48-48 48H48c-26.51 0-48-21.49-48-48V200.724a48 48 0 0 1 18.387-37.776c24.913-19.529 45.501-35.365 164.2-121.511C199.412 29.17 232.797-.347 256 .003c23.198-.354 56.596 29.172 73.413 41.433 118.687 86.137 139.303 101.995 164.2 121.512A48 48 0 0 1 512 200.724V464zm-65.666-196.605c-2.563-3.728-7.7-4.595-11.339-1.907-22.845 16.873-55.462 40.705-105.582 77.079-16.825 12.266-50.21 41.781-73.413 41.43-23.211.344-56.559-29.143-73.413-41.43-50.114-36.37-82.734-60.204-105.582-77.079-3.639-2.688-8.776-1.821-11.339 1.907l-9.072 13.196a7.998 7.998 0 0 0 1.839 10.967c22.887 16.899 55.454 40.69 105.303 76.868 20.274 14.781 56.524 47.813 92.264 47.573 35.724.242 71.961-32.771 92.263-47.573 49.85-36.179 82.418-59.97 105.303-76.868a7.998 7.998 0 0 0 1.839-10.967l-9.071-13.196z"],"envelope-square":[448,512,[],"f199","M400 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V80c0-26.51-21.49-48-48-48zM178.117 262.104C87.429 196.287 88.353 196.121 64 177.167V152c0-13.255 10.745-24 24-24h272c13.255 0 24 10.745 24 24v25.167c-24.371 18.969-23.434 19.124-114.117 84.938-10.5 7.655-31.392 26.12-45.883 25.894-14.503.218-35.367-18.227-45.883-25.895zM384 217.775V360c0 13.255-10.745 24-24 24H88c-13.255 0-24-10.745-24-24V217.775c13.958 10.794 33.329 25.236 95.303 70.214 14.162 10.341 37.975 32.145 64.694 32.01 26.887.134 51.037-22.041 64.72-32.025 61.958-44.965 81.325-59.406 95.283-70.199z"],link:[512,512,[],"f0c1","M326.612 185.391c59.747 59.809 58.927 155.698.36 214.59-.11.12-.24.25-.36.37l-67.2 67.2c-59.27 59.27-155.699 59.262-214.96 0-59.27-59.26-59.27-155.7 0-214.96l37.106-37.106c9.84-9.84 26.786-3.3 27.294 10.606.648 17.722 3.826 35.527 9.69 52.721 1.986 5.822.567 12.262-3.783 16.612l-13.087 13.087c-28.026 28.026-28.905 73.66-1.155 101.96 28.024 28.579 74.086 28.749 102.325.51l67.2-67.19c28.191-28.191 28.073-73.757 0-101.83-3.701-3.694-7.429-6.564-10.341-8.569a16.037 16.037 0 0 1-6.947-12.606c-.396-10.567 3.348-21.456 11.698-29.806l21.054-21.055c5.521-5.521 14.182-6.199 20.584-1.731a152.482 152.482 0 0 1 20.522 17.197zM467.547 44.449c-59.261-59.262-155.69-59.27-214.96 0l-67.2 67.2c-.12.12-.25.25-.36.37-58.566 58.892-59.387 154.781.36 214.59a152.454 152.454 0 0 0 20.521 17.196c6.402 4.468 15.064 3.789 20.584-1.731l21.054-21.055c8.35-8.35 12.094-19.239 11.698-29.806a16.037 16.037 0 0 0-6.947-12.606c-2.912-2.005-6.64-4.875-10.341-8.569-28.073-28.073-28.191-73.639 0-101.83l67.2-67.19c28.239-28.239 74.3-28.069 102.325.51 27.75 28.3 26.872 73.934-1.155 101.96l-13.087 13.087c-4.35 4.35-5.769 10.79-3.783 16.612 5.864 17.194 9.042 34.999 9.69 52.721.509 13.906 17.454 20.446 27.294 10.606l37.106-37.106c59.271-59.259 59.271-155.699.001-214.959z"]};!function(c){try{!function c(t,e){var n=Object.keys(e).reduce(function(c,t){var n=e[t];return n.icon?c[n.iconName]=n.icon:c[t]=n,c},{});"function"==typeof i.hooks.addPack?i.hooks.addPack(t,n):i.styles[t]=f({},i.styles[t]||{},n),"fas"===t&&c("fa",e)}("fas",u)}catch(c){if(!r)throw c}}()}();
