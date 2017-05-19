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
       onStart: function (data) {
           var initial_array = []; 
           initial_array = get_slider_start(data);
           filterSystem(initial_array);
        }
      
  });

  var slider = $("#slider").data("ionRangeSlider");

  $slider.on("change", function() {
      var slider_changing = [];
      slider_changing = get_slider(slider);
      filterSystem(slider_changing);
  });
});

var get_slider_start = function(data_slider){
    var initialFrom = data_slider.from + 1;
    var initialTo = data_slider.to + 1;
    var initial_state = [initialFrom, initialTo]
    return initial_state;
}
/* -- Getting the slider values -- */ 
var get_slider = function(slider_data) {
  var first = slider_data.result.from + 1;
  var last = slider_data.result.to + 1;
  months = [first, last];
  return months;
}

var filterSystem = function (slider_values) {
    console.log(slider_values);
}
