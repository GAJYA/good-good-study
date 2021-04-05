"use strict";

// TODO: site logics
$(function ($) {
  var $body = $('html, body');
  $('#scroll_top').on('click', function () {
    $body.animate({
      scrollTop: 0
    }, 1300);
    return false;
  });
});