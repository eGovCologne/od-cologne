if (Drupal && jQuery) {
  // only load if Drupal and jQuery are defined.
  (function ($) {
    Drupal.behaviors.picture = {
      attach: function (context) {
        window.picturefill(context);
      }
    };
  })(jQuery);
}