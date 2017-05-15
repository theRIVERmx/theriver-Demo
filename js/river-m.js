var map;

$(function () {
  var buttons = document.getElementsByClassName("buttons");
  for(var i = 0; i < buttons.length; i++) {
    buttons[i].checked = false;
  }
});

/* ------------ Slider Function */
$(function () {
  var $slider = $("#slider");
  
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

  var slider = $("#slider").data("ionRangeSlider");

  $slider.on("change", function() {
    values = get_slider(slider);
    filterSystem(values);
  });
})

/* -- Getting the sldier values -- */ 
var get_slider = function(slider_data) {
  var first = slider_data.result.from + 1;
  var last = slider_data.result.to + 1;
  months = [first, last];
  return months;
}

var filterSystem = function (slider_values) {
  $(
    'input[class = buttons]').change(function(e) {
    
  })
}