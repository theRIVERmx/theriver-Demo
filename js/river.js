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

        //Get all the coordinates you need



        //getData();

        // Load Marker

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
          properties: val['properties'],
        });


          var getButtons = $('input:checked').map(function(){
                    return $(this).val();
                  });

          console.log(getButtons.get());

          var cat = val['properties']['categories'];
          console.log(cat);
          var realCheck = checkButton(getButtons, cat);
          console.log(realCheck);
          if (realCheck == false) {
            marker.setVisible(false);
          }

      });

  });
}

loadMarkers();
        google.maps.event.addDomListener(window, "resize", function() {
          var center = map.getCenter();
          google.maps.event.trigger(map, "resize");
          map.setCenter(center);
        });



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


function deleteMarkers() {

}


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


$(function () {
    $("input").change(function(){
        var arr1 = ["meet", "stay", "join"];
        var checkarray1 = ["meet", "stay"];
        var count = 0
        getData();
        //get the button which are checked from the user
        var getButtons = $('input:checked').map(function(){

        return $(this).val();

        });

        console.log(getButtons.get());


        var firstTry = checkButton(getButtons, checkarray1);
        console.log(firstTry);

         geojson_url = 'js/db-final.geojson'
         $.getJSON(geojson_url, function(result) {
              data = result['features']
              $.each(data, function(key, val) {
                var coord1 = val['geometry']['coordinates'][0];
                var coord2 = val['geometry']['coordinates'][1];
                var titleText = val['properties']['categories']
                var realCheck = checkButton(getButtons, titleText);
                //console.log(titleText);
                //console.log(realCheck);

                if (realCheck == false) {
                    var coord1 = val['geometry']['coordinates'][0];
                    var coord2 = val['geometry']['coordinates'][1];
                    var name = val['properties']['title'];
                    console.log(name);
                    var marker = getData(coord1, coord2);
                    console.log(marker);
                };
              });
         });

    });

});

$(document).ready(function(){
    //load the default map

    

    // Loading the markers

    /*function loadMarkers() {
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
}*/

    /* algorithm to increase the value of count if a value of arr (selected buttons from user) is in checkarray (property of the hostel in JSON)*/



    //get data from the JSON by using getJSON

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
});



