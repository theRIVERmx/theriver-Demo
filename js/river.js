
var map;

markers = [];
names = [];
openMonth = [];
closeMonth = [];
check = [];



$("input").change(function(){
    var arr1 = ["meet", "stay", "join"];
    var checkarray1 = ["meet", "stay"];
    var count = 0

    //get the button which are checked from the user

    var getButtons = $('input:checked').map(function(){

    return $(this).val();

    });

    console.log(getButtons.get());

    /* algorithm to increase the value of count if a value of arr (selected buttons from user) is in checkarray (property of the hostel in JSON)*/

    function checkButton(arr, checkarray) {
        for(var i=0;i<checkarray.length;i++)
         {
            if($.inArray(checkarray[i],arr) ==-1) {
            }
            else {
                count = count + 1
            }
         }

        console.log(count);
        //Check whether the counted values are the same like the array length of the choosen values
        if (count == arr.length) {
            return true
        }
        else {
            return false
        }
    }

    var firstTry = checkButton(getButtons, checkarray1);
    console.log(firstTry);

});

//get data from the JSON by using getJSON

  geojson_url = 'js/collection00.geojson'
  $.getJSON(geojson_url, function(result) {
      data = result['features']
      $.each(data, function(key, val) {
        var titleText = val['properties']['title']
        console.log(titleText);
      });
  });




var filters = {join:false, meet:false, stay:false, create:false};

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
    max: 12
  });
  

  $slider.on("change", function () {
    
    var $this = $(this),
        value = $this.prop("value").split(";");
        from = $this.data("from") + 1;
        to = $this.data("to") + 1;
    
    for(var i = 0; i < markers.length; i++) {
      if(openMonth[i] >= from && closeMonth[i] <= to) {
        //keep_slider = true;
        markers[i].setVisible(true);
      } else {
        //keep_slider = false;
        markers[i].setVisible(false);
      }
    }
  });
})

$(function () {
  $('input[name=check-buttons]').change(function(e) {
    map_filter(this.id);
    filter_markers();
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
}


function loadMarkers() {
  var infoWindow = new google.maps.InfoWindow()
  geojson_url = 'js/db.geojson'
  $.getJSON(geojson_url, function(result) {
      data = result['features']
      $.each(data, function(key, val) {
        var point = new google.maps.LatLng(
                parseFloat(val['geometry']['coordinates'][0]),
                parseFloat(val['geometry']['coordinates'][1]));
        var titleText = val['properties']['title']
        var imagePlace = val['properties']['image']
        var infoPlace = val['properties']['information']
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
        jsonLength = markers.length;
        openMonth.push(open);
        closeMonth.push(close);
        marker.addListener('click', function() {
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
}



function initMap() {
  
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


/*var myControl = document.getElementById('myTextDiv');
map.controls[google.maps.ControlPosition.TOP_CENTER].push(myControl);*/




