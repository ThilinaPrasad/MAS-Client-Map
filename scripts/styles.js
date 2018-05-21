//Floting Buttons 
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.fixed-action-btn');
    var instances = M.FloatingActionButton.init(elems, {
        hoverEnabled: true
    });
  });

// Tool Tips
$(document).ready(function(){
    $('.tooltipped').tooltip();
  });

// Side Nav
$(document).ready(function(){
    $('.sidenav').sidenav();
  });