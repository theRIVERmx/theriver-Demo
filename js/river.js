
var map;

var markers = [];
var categories = [];
var names = [];
var openMonth = [];
var closeMonth = [];
var check = [];
var sliderCheck = [];
var jsonLength;
var realCheckProbe = [];
var basket = [];

function defaultSlider() {
    for (var i = 0; i < markers.length; i++) {
        sliderCheck[i] = true;
        console.log(sliderCheck)
    }

}

function loadMarkers() {
  var infoWindow = new google.maps.InfoWindow()
  geojson_url = 'js/db-final.geojson'
  $.getJSON(geojson_url, function(result) {
      data = result['features']
      $.each(data, function(key, val) {
        var point = new google.maps.LatLng(
                parseFloat(val['geometry']['coordinates'][0]),
                parseFloat(val['geometry']['coordinates'][1]));
        var titleText = val['properties']['title']
        var imagePlace = val['properties']['image']
        var infoPlace = val['properties']['information']
        var category = val['properties']['categories'];

        open = val['properties']['open']
        close = val['properties']['close']
        //Marker Init
        marker = new google.maps.Marker({
          position: point,
          icon: {
            path: 'M0,50 A50,50,0 1 1 100,50 A50,50,0 1 1 0,50 Z',
            fillColor: '#ff8a65',
            fillOpacity: 0.9,
            scale: 0.18,
            strokeColor: '#ff8a65'
          },
          title: titleText,
          map: map,
          properties: val['properties']
         });
        var markerInfo = "<div><h3>" + titleText + "</h3><p>" + infoPlace + "</p><img src=" + imagePlace + "></div>"
        var markerPosition = marker.position;
          
        names.push(titleText);
        markers.push(marker);
        categories.push(category);
        jsonLength = markers.length;
        openMonth.push(open);
        closeMonth.push(close);
        marker.addListener('click', function() {
            $("#shoppingButton").css("margin-right", "25%");
           map.setZoom(5);
            map.panTo(markerPosition);
          document.getElementById("boxInfo").style.width = "250px";
          document.getElementById("main").style.marginLeft = "250px";
           $('#information').html(markerInfo)
           function displayDate() {
           }
        });
      });

  });
}


function closeNav() {
    document.getElementById("boxInfo").style.width = "0px";
    document.getElementById("main").style.marginLeft = "0px";
    $("#shoppingButton").css("margin-right", "5%");
    map.setZoom(2);
}



window.initMap = function() {
  
  var styledMapType = new google.maps.StyledMapType(
    [
      {
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#f5f5f5"
          }
        ]
      },
      {
        "elementType": "labels",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "elementType": "labels.icon",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#616161"
          }
        ]
      },
      {
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#f5f5f5"
          }
        ]
      },
      {
        "featureType": "administrative.land_parcel",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "administrative.land_parcel",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#bdbdbd"
          }
        ]
      },
      {
        "featureType": "administrative.neighborhood",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#eeeeee"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#757575"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#e5e5e5"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#9e9e9e"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#ffffff"
          }
        ]
      },
      {
        "featureType": "road.arterial",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#757575"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#dadada"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#616161"
          }
        ]
      },
      {
        "featureType": "road.local",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#9e9e9e"
          }
        ]
      },
      {
        "featureType": "transit.line",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#e5e5e5"
          }
        ]
      },
      {
        "featureType": "transit.station",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#eeeeee"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#c9c9c9"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#9e9e9e"
          }
        ]
      }
    ],
    {name: 'theRiver'});

    map_options = {
      zoom: 2,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      center: {lat: 20, lng: 0},
      mapTypeControlOptions: {
            mapTypeIds: ['styled_map'],
            position: google.maps.ControlPosition.TOP_BOTTOM
          },
      streetViewControl: false
    }
    map_document = document.getElementById('map-container')
    map = new google.maps.Map(map_document,map_options);
    map.mapTypes.set('styled_map', styledMapType);
    map.setMapTypeId('styled_map');
    loadMarkers()
    google.maps.event.addDomListener(window, "resize", function() {
      var center = map.getCenter();
      google.maps.event.trigger(map, "resize");
      map.setCenter(center);
    });
    

    
}
//get data from the JSON by using getJSON



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
    //console.log(realCheckProbe);
     for(var i = 0; i < markers.length; i++) {
      if((closeMonth[i] < slider_values[0]) || (slider_values[1] <= openMonth[i])) {
        sliderCheck[i] = false;
        //keep_slider = true;
        //markers[i].setVisible(true);
      } else {
          sliderCheck[i] = true;
        //keep_slider = false;
        //markers[i].setVisible(false);
      }
    }
    //console.log(sliderCheck);
}

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

  $slider.on("change", function () {
    var slider_changing = [];
    slider_changing = get_slider(slider);
    filterSystem(slider_changing);
    filter();
    checkFilter();

  });
})

function checkFilter() {
    //console.log(sliderCheck);
    //console.log(realCheckProbe);
    var k = 0;
    var p = 0;
    for (var i = 0; i < markers.length; i++) {
        if (sliderCheck[i] == true && realCheckProbe[i] == true) {
            k = k + 1
            markers[i].setVisible(true);
            //console.log("Du wirst markiert Bruder");
        }
        else {
            markers[i].setVisible(false);
            p = p + 1
            //console.log("Idiot");
        }
    }
    console.log(p);
    console.log(k);
}

$(function () {
    var slider = $("#slider").data("ionRangeSlider");

  $('input[name=check-buttons]').change(function(e) {
    var slider_changing = [];
    slider_changing = get_slider(slider);
    filterSystem(slider_changing);
    filter();
    checkFilter();
  });

})

var get_set_options = function() {
  ret_array = []
  for (option in filters) {
    if (filters[option]) {
      ret_array.push(option)
    }
  }
  return ret_array;
}


var filter_markers = function() {
  set_filters = get_set_options();
    console.log(set_filters)
  for (i = 0; i < markers.length; i++) {
    marker = markers[i];
    keep = true;
    for (opt=0; opt<set_filters.length; opt++) {
      if (!marker.properties[set_filters[opt]]) {
        keep = false;
      }
    }

    check[opt] = marker[opt];
    marker.setVisible(keep)
  }
}

var map_filter = function(id_val) {
  console.log(id_val)
   if (filters[id_val]) {
    filters[id_val] = false
  }
   else {
    filters[id_val] = true
  }
    console.log(filters);
}

//modified functions from Can

// Sets the map on all markers in the array.
function setMapOnAll(map) {
        for (var i = 0; i < markers.length; i++) {
          markers[i].setMap(map);
        }
      }

// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
        setMapOnAll(null);
      }

// Shows any markers currently in the array.
function showMarkers() {
        setMapOnAll(map);
      }

function statusData() {
    var getButtons = $('input:checked').map(function(){
        return $(this).val();
    });
    return getButtons;
}

function filter() {

    var status = statusData();
    //console.log(status.get());
    //console.log(markers.length);
    for (var i = 0; i < markers.length; i++) {
        //console.log("Test");
          var marker = markers[i]
          var cat = categories[i];
          var checkTheSlider = sliderCheck[i];
          //console.log(checkTheSlider);
          //console.log(cat);
          var realCheck = checkButton(status, cat);
           realCheckProbe[i] = checkButton(status, cat);
          //console.log(realCheck);
        /*if (realCheck == true) {
            marker.setVisible(true);
        }
        else {
            marker.setVisible(false);
        }*/
    }
}

function getData(coord1, coord2) {

            /*geojson_url = 'js/db-final.geojson'
             $.getJSON(geojson_url, function(result) {
                  data = result['features']
                  $.each(data, function(key, val) {
                    var coordLocation = val['geometry']['coordinates']
                    console.log(coordLocation);*/

                    var point = new google.maps.LatLng(
                        parseFloat(coord1),
                        parseFloat(coord2));

                    var marker = new google.maps.Marker({
                        position: point,
                        title:"Hello World!",
                        icon: {
                            path: 'M0,50 A50,50,0 1 1 100,50 A50,50,0 1 1 0,50 Z',
                            fillColor: '#ff8a65',
                            fillOpacity: 0.9,
                            scale: 0.18,
                            strokeColor: '#ff8a65'
                          }
                    });

                  return marker;
                  };

function checkButton(arr, checkarray) {
            count = 0;
            for(var i=0;i<checkarray.length;i++)
             {
                if($.inArray(checkarray[i],arr) ==-1) {
                }
                else {
                    count = count + 1
                }
             }

            //console.log(count);
            //Check whether the counted values are the same like the array length of the choosen values
            if (count == arr.length) {
                return true
            }
            else {
                return false
            }
        }




$("#myTextDiv").hide();

$("#joinhover").mouseover(function () {
    $("#myTextDiv").html("<h1>JOIN<h1>");
    $("#myTextDiv").show();
});

$("#joinhover").mouseout(function() {
    $("#myTextDiv").hide();
});

$("#createhover").mouseover(function() {
     $("#myTextDiv").html("<h1>CREATE<h1>");
    $("#myTextDiv").show();
});

$("#createhover").mouseout(function() {
    $("#myTextDiv").hide();
});

$("#meethover").mouseover(function() {
     $("#myTextDiv").html("<h1>MEET<h1>");
    $("#myTextDiv").show();
});

$("#meethover").mouseout(function() {
    $("#myTextDiv").hide();
});

$("#stayhover").mouseover(function() {
     $("#myTextDiv").html("<h1>STAY<h1>");
    $("#myTextDiv").show();
});

$("#stayhover").mouseout(function() {
    $("#myTextDiv").hide();
});



$(function () {

  var $sliderUser = $("#sliderUser");

  $sliderUser.ionRangeSlider({
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
    var sliderUser = $("#sliderUser").data("ionRangeSlider");
  });



var counterBasket = 0;
var newHtml = "";

$("#addBasket").click(function() {
    console.log("Hwelllloo");
    var testInfo = $("#information").find("h3").html();
    if (counterBasket > 2) {
        alert("Reached 3 hostels!");
    }
    else {
        console.log("Ich bin im ELSE")
        for (var i = 0; i < names.length; i++) {

            if (testInfo == names[i]) {
                console.log("Ich bin im IF")
                basket[counterBasket] = i;
                console.log(basket);

                var displayName = names[basket[counterBasket]];
                console.log(displayName);
                var displayOpenMonth = openMonth[basket[counterBasket]];
                var displayCloseMonth = closeMonth[basket[counterBasket]];

                newHtml += "<br><h3>" + displayName + "</h3>  " + displayOpenMonth + " until " + displayCloseMonth;
                console.log(newHtml);
                counterBasket = counterBasket + 1;
                }

            }
        }



});




$("#shoppingButton").click(function() {
    console.log("Halllllooo");
    $("#map-container").toggle(500);
    $("#results").html(newHtml);
    $("#userOptions").toggle(1000);

});

/*var myControl = document.getElementById('myTextDiv');
map.controls[google.maps.ControlPosition.TOP_CENTER].push(myControl);*/

/*position: relative;
    z-index: 1;
    left: -25px;
    top: 1px;
    cursor:pointer;
    width: 0;*/

function testFunktion() {
    var h1 = 1;
    var h2 = 4;
    var s1 = 4;
    var s2 = 11;

    if(h2 < s1 || s2 < h1) {
        console.log(false);
    }
    else {
        console.log(true);
    }

}

testFunktion();
