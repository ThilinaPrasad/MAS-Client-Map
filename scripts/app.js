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
$(document).ready(function(){
var srilanka = { lat: 7.8731, lng: 80.7718 };
var map = new google.maps.Map(document.getElementById('map'), {
  zoom: 7.6,
  center: srilanka,
  mapTypeId: google.maps.MapTypeId.ROADMAP,
  fullscreenControl: true
});
infoWindow = new google.maps.InfoWindow(); // create info window object
});

