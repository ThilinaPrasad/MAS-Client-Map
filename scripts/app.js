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



// marker types
const marker_r = 'https://thilinaprasad.github.io/MAS-SUPPLY-CHAIN-MAP/assets/marker_r_32x32.ico';
const marker_b = 'https://thilinaprasad.github.io/MAS-SUPPLY-CHAIN-MAP/assets/marker_b_32x32.ico';
const marker_y = 'https://thilinaprasad.github.io/MAS-SUPPLY-CHAIN-MAP/assets/marker_y_32x32.ico';
const marker_p = 'https://thilinaprasad.github.io/MAS-SUPPLY-CHAIN-MAP/assets/marker_p_32x32.ico';

// image icon for marker
var image = {
  url: marker_r,
};

$.getJSON('../storage/markerData/markerData.json', function (data) {


  //Add MAS Marker
  var coordinates = { lat: 7.161378, lng: 79.8812409 };
  var mas_marker = new google.maps.Marker({
    position: coordinates,
    file: 'MAS SLIDES',
    icon: image,
    animation: google.maps.Animation.BOUNCE,
    map: map,
    name: "MAS KREEDA-NIRMAAN",
    address: "MAS KREEDA-NIRMAAN PHASE-II, EPZ, Katunayake"
  });
  //marker hover effect
  google.maps.event.addListener(mas_marker, 'mouseover', function () {
    var content = "<center><img src='../mas_logo.png' style='margin:10px 0;'><br><b style='font-size:17px;'>" + mas_marker.name + "</b><br>" + mas_marker.address + "</center>";
    infoWindow.setContent(content);
    infoWindow.open(map, mas_marker);
  });
  google.maps.event.addListener(mas_marker, 'mouseout', function () {
    infoWindow.close();
  });

  //ADD MAS MARKER

  //add markers
  //let new_id = data.length+1;
  let clients = '<div class="chip">MAS KREEDA</div>';
  if (data.length > 0) {
    for (var i = 0; i < data.length; i++) {
      var place = data[i];
      //change marker type 
      switch(place.markerColor){
        case 'red': image.url = marker_r; break;
        case 'blue': image.url = marker_b; break;
        case 'yellow': image.url = marker_y; break;
        case 'purple': image.url = marker_p; break;
        default:image.url = marker_r;
      }
      console.log(image.url);
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

      google.maps.event.addListener(marker, 'click', function () {
        ipcRenderer.send('open:ppt',this.file);
      });

      //marker hover effect
      google.maps.event.addListener(marker, 'mouseover', function () {
        var content = "<center><img src='../storage/logos/"+this.logo+"' style='margin:10px 0;'><br><b style='font-size:17px;'>" + this.name + "</b><br>" + this.address + "</center><br><br><i class='material-icons tiny'>beenhere</i>&nbsp;Click to open presentatin";
        infoWindow.setContent(content);
        infoWindow.open(map, this);
      });
      google.maps.event.addListener(marker, 'mouseout', function () {
        infoWindow.close();
      });

      //Load available client in view
      clients += '<div class="chip">'+place.name+'<i class="close material-icons" data-name="'+place.name+'" onClick="deleteClient(this);">close</i></div>';

    }
  }
$('#clients-view').html(clients);
});
