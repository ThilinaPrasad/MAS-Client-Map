// Internet Connection checker
function checkNetConnection() {
  var xhr = new XMLHttpRequest();
  var file = "https://www.google.com/maps";
  var r = Math.round(Math.random() * 10000);
  xhr.open('HEAD', file + "?subins=" + r, false);
  try {
    xhr.send();
    if (xhr.status >= 200 && xhr.status < 304) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    return false;
  }
}

function connChecker() {
  if (!checkNetConnection()) {
    $.confirm({
      theme: 'supervan',
      title: 'Connection Problem!',
      content: 'Please connect to internet before running this app!',
      columnClass: 'small',
      buttons: {
        tryAgain: {
          text: 'Try Again!',
          btnClass: 'btn-red',
          keys: ['enter'],
          action: function () {
            connChecker();
            location.reload();
          }
        }
      }
    });
  }else{
  //page loading animation part 1
  $(window).on('load', function() {
    $("#pageLoad").fadeOut('fast');
});

$(document).ready(function() {
    //page loading animation part 2
    $("#app").fadeIn('fast');});
  }
}

connChecker();
// Internet Connection checker

//Initialize the map
//Map Initialize

const { ipcRenderer } = require('electron');

var srilanka = { lat: 7.8731, lng: 80.7718 };
var map = new google.maps.Map(document.getElementById('map'), {
  zoom: 7.5,
  center: srilanka,
  mapTypeId: google.maps.MapTypeId.ROADMAP,
  fullscreenControl: true
});
infoWindow = new google.maps.InfoWindow(); // create info window object

// image icon for marker
var image = {
  url: 'https://thilinaprasad.github.io/MAS-Client-Map/marker.ico',
};

$.getJSON('../storage/markerData/markerData.json', function (data) {

  // Over lapping marker object
var oms = new OverlappingMarkerSpiderfier(map, {
  markersWontMove: true,
  markersWontHide: true,
  basicFormatEvents: true
});

  //Add MAS Marker
  var coordinates = { lat: 6.8231014, lng: 79.8935539 };
  var mas_marker = new google.maps.Marker({
    position: coordinates,
    file: 'MAS SLIDES',
    icon: image,
    animation: google.maps.Animation.BOUNCE,
    map: map,
    name: "MAS Intimates (Pvt) Ltd",
    address: "7th Ln, Dehiwala-Mount Lavinia."

  });

  oms.addMarker(mas_marker);
  google.maps.event.addListener(mas_marker, 'dblclick', function () { // marker onclick event
    // Presentation Open part goes here
    //alert('Add Slide show to open : ' + mas_marker.file);
  });

  google.maps.event.addListener(mas_marker, 'spider_click', function () { // 

  });

  google.maps.event.addListener(mas_marker, 'click', function () {
    var content = "<center><img src='../logo.png' style='margin:10px 0;'><br><b style='font-size:17px;'>" + mas_marker.name + "</b><br>" + mas_marker.address + "</center><br><br><i class='material-icons tiny'>beenhere</i>&nbsp;Click to spider all clients<br><i class='material-icons tiny'>beenhere</i>&nbsp;Double tap to open presentation";
    infoWindow.setContent(content);
    infoWindow.open(map, mas_marker);
  });

  //marker hover effect
  google.maps.event.addListener(mas_marker, 'mouseover', function () {
    var content = "<center><img src='../logo.png' style='margin:10px 0;'><br><b style='font-size:17px;'>" + mas_marker.name + "</b><br>" + mas_marker.address + "</center><br><br><i class='material-icons tiny'>beenhere</i>&nbsp;Click to spider all clients<br><i class='material-icons tiny'>beenhere</i>&nbsp;Double tap to open presentation";
    infoWindow.setContent(content);
    infoWindow.open(map, mas_marker);
  });
  google.maps.event.addListener(mas_marker, 'mouseout', function () {
    infoWindow.close();
  });

  //ADD MAS MARKER

  let new_id = data.length+1;
  let clients = '<div class="chip">MAS Intimates (Pvt) Ltd</div>';
  if (data.length > 0) {
    for (var i = 0; i < data.length; i++) {
      var place = data[i];
      var coordinates = { lat: parseFloat(place.latitude), lng: parseFloat(place.longitude) };
      var marker = new google.maps.Marker({
        position: coordinates,
        file: place.file,
        icon: image,
        animation: google.maps.Animation.DROP,
        map: map,
        name: place.name,
        address: place.address,
        logo : place.logo
      });

      oms.addMarker(marker);
      google.maps.event.addListener(marker, 'dblclick', function () { // marker onclick event
        // Presentation Open part goes here
        ipcRenderer.send('open:ppt',this.file);
      });

      google.maps.event.addListener(marker, 'spider_click', function () { // 

      });

      google.maps.event.addListener(marker, 'click', function () {
        var content = "<center><img src='../storage/logos/"+this.logo+"' style='margin:10px 0;'><br><b style='font-size:17px;'>" + this.name + "</b><br>" + this.address + "</center><br><br><i class='material-icons tiny'>beenhere</i>&nbsp;Click to spider all clients<br><i class='material-icons tiny'>beenhere</i>&nbsp;Double tap to open presentation";
        infoWindow.setContent(content);
        infoWindow.open(map, this);
      });

      //marker hover effect
      google.maps.event.addListener(marker, 'mouseover', function () {
        var content = "<center><img src='../storage/logos/"+this.logo+"' style='margin:10px 0;'><br><b style='font-size:17px;'>" + this.name + "</b><br>" + this.address + "</center><br><br><i class='material-icons tiny'>beenhere</i>&nbsp;Click to spider all clients<br><i class='material-icons tiny'>beenhere</i>&nbsp;Double tap to open presentation";
        infoWindow.setContent(content);
        infoWindow.open(map, this);
      });
      google.maps.event.addListener(marker, 'mouseout', function () {
        infoWindow.close();
      });

      //Load available client in view
      clients += '<div class="chip">'+place.name+'</div>';

    }
  }
$('#clients-view').html(clients);
});
