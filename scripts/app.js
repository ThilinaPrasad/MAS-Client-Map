// Internet Connection checker
function checkNetConnection(){
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

function connChecker(){
    if(!checkNetConnection()){
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
                    action: function(){
                        connChecker();
                    }
                }
            }
        });
    }
}

connChecker();
// Internet Connection checker

//Initialize the map
//Map Initialize

var srilanka = { lat: 7.8731, lng: 80.7718 };
var map = new google.maps.Map(document.getElementById('map'), {
  zoom: 7.6,
  center: srilanka,
  mapTypeId: google.maps.MapTypeId.ROADMAP,
  fullscreenControl: true
});
infoWindow = new google.maps.InfoWindow(); // create info window object


// image icon for marker
var image = {
    url: 'http://www.uomleos.org/wp-content/uploads/2018/04/marker_icon.png',
  };

  // Over lapping marker object
  var oms = new OverlappingMarkerSpiderfier(map, {
    markersWontMove: true,
    markersWontHide: true,
    basicFormatEvents: true
  });

//Add Marker
var coordinates = { lat: 6.8231014, lng: 79.8935539 };
      var mas_marker = new google.maps.Marker({
        position: coordinates,
        file: 'MAS SLIDES',
        icon: image,
        animation: google.maps.Animation.BOUNCE,
        map: map,
        name: "MAS Intimates (Pvt) Ltd",
        address:"7th Ln, Dehiwala-Mount Lavinia."

      });

      oms.addMarker(mas_marker); 
      google.maps.event.addListener(mas_marker, 'dblclick', function () { // marker onclick event
        // Presentation Open part goes here
        alert('Add Slide show to open : '+mas_marker.file);
      });
      
      google.maps.event.addListener(mas_marker, 'spider_click', function () { // 
      
      });
    
      google.maps.event.addListener(mas_marker, 'click', function () {
        var content = "<b>"+mas_marker.name+"</b><br>"+mas_marker.address+"<br><br>&diams;&nbsp;Click to spider all clients<br>&diams;&nbsp;Double tap to open presentation";
        infoWindow.setContent(content);
        infoWindow.open(map, mas_marker);
      });
      
      //marker hover effect
      google.maps.event.addListener(mas_marker, 'mouseover', function () {
        var content = "<b>"+mas_marker.name+"</b><br>"+mas_marker.address+"<br><br><i class='material-icons tiny'>beenhere</i>&nbsp;Click to spider all clients<br><i class='material-icons tiny'>beenhere</i>&nbsp;Double tap to open presentation";
        infoWindow.setContent(content);
        infoWindow.open(map, mas_marker);
      });
      google.maps.event.addListener(mas_marker, 'mouseout', function () {
        infoWindow.close();
      });

