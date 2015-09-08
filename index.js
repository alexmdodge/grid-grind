// Anonymous function provides a space for code to run in
// closure, and also gives privacy


function player (maxSpeed, lives) {
   this.maxSpeed = maxSpeed;
   this.lives = lives;

   this.generate = function(xPos, yPos) {

   }
}


var initGame = function () {
   var pointValue = 0;

}

$(document).ready(function(){
    $(".start").click(function(){
        $(".description").fadeOut('slow', initGame());
    });
});