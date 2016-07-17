function initPlayer() {
   var player = '#player';
   $(player).fadeIn('slow');
}

function initBall() {
   var ball = '#ball';
   var ballIsFalling = true;
   $(ball).fadeIn('slow');

   while(ballIsFalling) {
      
   }

}

function removeStart() {
   $('.start-button').fadeOut('fast');
   $('.start-info').fadeOut('fast');
}

function gameStart() {
   $(document).keydown(function(event) {
      switch(event.which) {
         case 37:


         break;

         case 39:

         break;

         default: return;
      }

      event.preventDefault();
   });
   
   removeStart();
   initPlayer();
   initBall();



}

$(document).ready(function() {
   $('.start-button').click(function() {
      gameStart();
   })
});