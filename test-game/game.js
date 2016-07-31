'use strict';

/* Grid Grind Test */
/* Below is some pseudo code and ideas for the games interactions */


/* Creates a player and fades in the element.
 *
 */
function initPlayer() {
   var player = '#player';
   $(player).delay(1000).fadeIn('slow');
   // var currentPosX = player.getPosX();
   // var currentPosY = player.getPosY();
   // var playerLife = player.getLife();
   // append player life to header tag

}

function initBall() {
   var ball = '#ball';
   var ballIsFalling = true;
   var ballHasHit = false;
   var ballHeight = 100;
   $(ball).delay(1000).fadeIn('slow');

   while(ballIsFalling) {
      // Move ball down 10px at a time
      $(ball).delay(200).css('top:110px;');

      //
      if(ballHasHit) {
         ballIsFalling = false;
      }
   }
}

function removeStart() {
   $('#start-button').fadeOut('fast');
   $('.start-info').fadeOut('fast');
}

function initGame() {
   
   removeStart();
   initPlayer();
   initBall();

   $(document).keydown(function(event) {
      switch(event.which) {
         case 37:
            alert('You moved left!');
            break;

         case 39:
            alert('You moved right!');
            break;

         default: return;
      }

      event.preventDefault();
   });

}

$(document).ready(function() {
   $('#start-button').click(function() {
      initGame();
   });
});