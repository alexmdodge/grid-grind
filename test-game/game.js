'use strict';

/* Grid Grind Test */
/* Below is some pseudo code and ideas for the games interactions */

/* Player will be a singleton pattern so cannot create multiple players */
object player {
   var player = "#player";
   var life, posX, posY, isCreated;

   constructor = function() {
      life = 5;
      posX = $(player).getPosX;
      posY = $(player).getPosY;
      isCreated = false;
   }
}

/* Balls are constructed with the class selector, as there will eventually 
   be multiples */
object ball {
   var ball = ".ball";
   var posX, posY, startX;

   constructor = function() {
      posX = $(ball).getPosX;
      posY = $(ball).getPosY;
   }

   genStart = function(posX) {
      var choice = Math.floor(Math.random());
   }
}

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
   // var currentPosY = player.getPosY();
   var ballIsFalling = true;
   var ballHasHit = false;
   var ballHeight = 100;
   $(ball).delay(1000).fadeIn('slow');

   while(ballIsFalling) {
      // Move ball down 10px at a time, function drops ball
      // ball.fall(); 
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