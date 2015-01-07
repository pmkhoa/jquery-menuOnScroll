( function($) {
  $.menuOnScroll = function(menu, options) {
    var plugin = this,
        $menu = $(menu),
        menuItems,
        menuItemsLength,
        isTouch = 'ontouchstart' in window,
        activeMenuIndex = 0,
        containerScrollTop = new Array(),
        containerHeights = new Array(),
        winHeight,
        docHeight,
        resizeTimeout,

        defaults = {
          menuActiveClass: "active",
          menuSelector: ".menu-item",
          footerOffset: 0,
          headerOffset: 0,
          scrollOnClickOffset: 20
        },

        settings;

    plugin.init = function() {
      plugin.settings = settings = $.extend({}, defaults, options);
      plugin.run();
      plugin.onResizeDone();
    };

    plugin.onResizeDone = function() {
      $(window).on("resize", function() {
        clearTimeout(resizeTimeout);
        resizeTimout = setTimeout(plugin.run(), 300);
      });
    };

    plugin.run = function() {
      plugin.setDimension();
      plugin.setMenuItems();
      plugin.setContainerScrollTop();
      plugin.menuOnClick();
      plugin.windowOnScroll();
      plugin.initMenuOnLoad(); // This make sure that the first nav will be set onload.
    };

    // ===================================================
    // Plugin Actions
    // ===================================================

    plugin.windowOnScroll = function() {
      (isTouch === true) ? plugin.touchScroll() : plugin.mouseScroll();
    };

    plugin.touchScroll = function() {
      $(window).on({
        "touchmove": function() {
          var scrollTop = $(this).scrollTop();
          if (scrollTop >= 0)
            plugin.updateMenuOnScroll(scrollTop);
        }
      });
    };

    plugin.mouseScroll = function() {
      $(window).on("scroll", function() {
        var scrollTop = $(this).scrollTop();
        if (scrollTop >= 0)
          plugin.updateMenuOnScroll(scrollTop);
      });
    };

    plugin.updateMenuOnScroll = function(scrollTop) {
      plugin.setActiveMenuIndex(scrollTop);
      $menu.find("."+settings.menuActiveClass).removeClass(settings.menuActiveClass);
      $(menuItems[activeMenuIndex]).addClass(settings.menuActiveClass);
    };

    plugin.initMenuOnLoad = function() {
      $(window).load(function() {
        var scrollTop = $(window).scrollTop();
        plugin.updateMenuOnScroll(scrollTop);
      });
    };


    plugin.menuOnClick = function(element) {
      $(settings.menuSelector).find("a").on("click", function(event) {
        event.preventDefault();
        if (location.pathname.replace(/^\//,'') === this.pathname.replace(/^\//,'') &&
            location.hostname === this.hostname ) {
          var target = $(this.hash);
          target = target.length ? target : $('[name='+this.hash.slice(1)+']');
          var targetHash = this.hash.slice(1);
          plugin.scrollTo(target, targetHash);
        }
      });
    };

    plugin.scrollTo = function(target, targetHash) {
      var scrollTopVal = target.offset().top - settings.scrollOnClickOffset
      plugin.updateMenuOnScroll(scrollTopVal);
      $('html,body').stop().animate({
        scrollTop: scrollTopVal
      }, 300, function(e) { 
        if(history.pushState) {
          history.pushState(null, null, "#"+targetHash);
        }
        else {
          window.location.hash = "#"+targetHash;
        }
      });
    };


    // ===================================================
    // Plugin Utility Setters/Getters
    // ===================================================

    plugin.setMenuItems = function() {
      menuItems = $(settings.menuSelector);
      menuItemsLength = menuItems.length;
    };

    plugin.setDimension = function() {
      winHeight = $(window).height();
      docHeight = $(document).height();
    };

    plugin.setContainerScrollTop = function() {
      for (var i = 0; i < menuItemsLength; i++) {
        var sectionId = $(menuItems[i]).find("a").attr("href");
        containerHeights[i] = $(sectionId).outerHeight();
        containerScrollTop[i] = (i === 0) ? 0 : containerHeights[i-1] + containerScrollTop[i-1];
      }
    };

    plugin.setActiveMenuIndex = function(scrollTop) {
      scrollTop = settings.headerOffset + scrollTop;
      for (var i = 0; i < menuItemsLength; i++) {
        if ( scrollTop + winHeight > docHeight - settings.footerOffset ) {
          activeMenuIndex = menuItemsLength - 1;
          break;
        }
        else if (scrollTop >= containerScrollTop[i] && scrollTop < containerScrollTop[i+1]) {
          activeMenuIndex = i;
          break;
        }
        else {
          activeMenuIndex = menuItemsLength - 1;
        }
      }
    };
  };

  $.fn.menuOnScroll = function(options) {
    return this.each(function() {
      var $this = $(this);
      plugin = new $.menuOnScroll(this, options);
      plugin.init();
    });
  };

})(jQuery);
