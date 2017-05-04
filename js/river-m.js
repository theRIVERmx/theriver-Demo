var map;
var filters = { stay: false, meet: false, create: false, join: false }
var $slider = $("#slider");

markers = [];

$(function () {
  $slider.ionRangeSlider({
    type: 'double',
    values: [
        "January", "February", "March",
        "April", "May", "June",
        "July", "August", "September", "October",
        "November", "December"
    ],
    min: 1,
    max: 12,
  });

  $slider.on("change", function() {
    $slider_value = $(this);
  });
})

$(function () {

  $('input[name = wo-condition]').change(function (e) {
      set_buttons(this);
    //conditional_rules(this);
  })
})

var conditional_rule = function(check_buttons) {
  
}

var set_buttons = function(check_buttons) {
  if(check_buttons.checked == true) {
    filters[check_buttons.id] = true;
  } else {
    filters[check_buttons.id] = false;
  }
  console.log(filters)
}

/*
function get_slider() {
  var $this = $(this);
  
  console.log($this);
}
*/