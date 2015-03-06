/**
 * @file
 * JS for front page.
 */
(function ($) {
  Drupal.behaviors.dkanFront = {
    attach: function (context) {
      // Fade in 'add dataset' block.
      $('#block-dkan-sitewide-demo-front-dkan-add-front').delay(1500).fadeIn();
      // Remove 'add dataset' block.
      $('#block-dkan-sitewide-demo-front-dkan-add-front a.close').click(function() {
        $('#block-dkan-sitewide-demo-front-dkan-add-front').fadeOut();
      });
    }
  }
})(jQuery);

;
/**
 * @file
 * JS for DKAN site.
 */
(function ($) {

  /**
   * Shows and hides a description for Drupal form elements.
   */
  $.fn.dkanFormsHide = function () {
    this.each(function () {
      $(this).addClass('compact-form-wrapper');
      var desc = $(this).find('.description').addClass('compact-form-description');
      var input = $(this).find('input');
      desc.click(function () {
        input.focus();
      });
      if ($(input).html() == '') {
        var input = $(this).find('textarea');
      }
      if ($(input).html() == null) {
        var input = $(this).find('input');
      }
      input.addClass('compact-form-input')
      input.blur(function () {
        if (input.val() === '') {
          desc.fadeIn('fast');
        }
      });
      input.keyup(function () {
        if (input.val() != '') {
          desc.hide();
        }
      });
      if (input.val() != '') {
        desc.css('display', 'none');
      }
    });
  }

  /**
   * Shows and hides a description for Autocomplete Deluxe form elements.
   */
  $.fn.dkanFormsAutoDeluxeHide = function () {
    this.each(function () {
      $(this).addClass('compact-form-wrapper');
      var desc = $(this).find('.description').addClass('compact-form-description');
      var input = $(this).find('#autocomplete-deluxe-input');
      desc.click(function () {
        input.focus();
      });
      input.focus(function () {
        desc.hide();
      });
      if ($('#autocomplete-deluxe-item').html() != null) {
        desc.css('display', 'none');
      }
      if ($(this).find('input').val() != '') {
        desc.css('display', 'none');
      }
    });
  }

  Drupal.behaviors.dkanSite = {
    attach: function (context, settings) {
      // Autohide selected elements.

      var elements = "#views-exposed-form-dataset-page,#block-dkan-sitewide-dkan-sitewide-search-bar,#views-exposed-form-groups-search-entity-view-1,#views-exposed-form-user-profile-search-entity-view-1";
      $(elements, context).dkanFormsHide();
      var autoDeluxeElements = ".field-name-field-tags";
      $(autoDeluxeElements, context).dkanFormsAutoDeluxeHide();

      $('img').imgscale({
        parent : '.media-image',
        scale: 'fit',
        fade : 100
      });

      // Hide Block width Icons

      var url = document.URL.toString();
      if (url.split('?')[1] || url.match('query')) {
        $('#block-views-categories-block-1').fadeOut().hide();
      }

      if (url.split('#')[1] || url.match('page')) {
        $('#block-views-categories-block-1').fadeOut().hide();
      }
      if (url.match('dataset/')) {
        $('#block-views-categories-block-1').fadeOut().hide();
      }

    }
  }
})(jQuery);
;
// http://imgscale.kjmeath.com
(function(a){a.fn.imgscale=function(f){f=a.extend({parent:false,scale:"fill",center:true,fade:0},f);var i,e,j,k,c,d,h,b;this.each(function(){var l=a(this);var m=(!f.parent?l.parent():l.parents(f.parent));m.css({opacity:1,overflow:'hidden'});if(m.length>0){l.removeAttr("height").removeAttr("width");if(this.complete){g(l,m,false)}else{l.load(function(){g(l,m,true)})}}});function g(l,p,r){i=p.height();e=p.width();j=l.height();k=l.width();n();function n(){if(e>i){m("w")}else{if(e<i){m("t")}else{if(e==i){m("s")}}}}function m(v){if(k>j){t(v,"w")}else{if(k<j){t(v,"t")}else{if(k==j){t(v,"s")}}}}function t(w,v){if(w=="w"&&v=="w"){q()}else{if(w=="w"&&v=="t"){s("w")}else{if(w=="w"&&v=="s"){s("w")}else{if(w=="t"&&v=="w"){s("w")}else{if(w=="t"&&v=="t"){q()}else{if(w=="t"&&v=="s"){s("t")}else{if(w=="s"&&v=="w"){s("t")}else{if(w=="s"&&v=="t"){s("w")}else{if(w=="s"&&v=="s"){s("w")}}}}}}}}}}function q(){if((k*i/k)>=e){s("t")}else{s("w")}}function s(v){switch(v){case"t":if(f.scale=="fit"){l.attr("width",e)}else{l.attr("height",i)}break;case"w":if(f.scale=="fit"){l.attr("height",i)}else{l.attr("width",e)}break}if(f.center){o()}else{u()}}function o(){c=l.width();d=l.height();if(d>i){b="-"+(Math.floor((d-i)/2))+"px";l.css("margin-top",b)}if(c>e){h="-"+(Math.floor((c-e)/2))+"px";l.css("margin-left",h)}u()}function u(){if(f.fade>0&&r){p.animate({opacity:1},f.fade)}else{p.css("opacity",1)}}}}})(jQuery);;
