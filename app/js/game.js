'use strict';
/* globals Phaser, console */

var game = new Phaser.Game(500, 500, Phaser.AUTO, null, {
   preload: preload, 
   create: create, 
   update: update
});



// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
//
//
//                         New Game Variables
//
//
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// Debug Messages
var inDebug = false;

// Blocks
var blocks;
var blockInfo;
var newBlock;

// Information
var movesLeft = 3;
var movesText;
//var playerName;
var score = 0;
var scoreText;

var startGame;
var startButton;

// Grid Variables
var gridSize = 9;
var levelRow = Math.sqrt(gridSize);
var levelCol = Math.sqrt(gridSize);

// Styling Variables
var textStyle = { 
   font: '18px Arial', 
   fill: 'grey', 
   fontWeight: 'bold'
};

function preload() {
   // Scales the game to the screen size
   //game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
   game.scale.pageAlignHorizontally = true;
   game.scale.pageAlignVertically = true;
   game.stage.backgroundColor = '#eee';

   // Example spritsheet for animations
   game.load.spritesheet('button', '../img/button.png', 120, 40);
   game.load.spritesheet('blocks', '../img/blocks.png', 25, 25);
}

function create() {
   startButton = game.add.button(game.world.width*0.5, game.world.height*0.5, 'button', startGame, this, 1, 0, 2);
   startButton.anchor.set(0.5);

   // Enables physics for the game
   //game.physics.startSystem(Phaser.Physics.ARCADE);
   // game.physics.enable(ball, Phaser.Physics.ARCADE);

   // Draws the block objects on the screen for each frame
   // Draws from a randomized array of the original sprite colours
   initBlocks();

   scoreText = game.add.text(15, 15, "POINTS: " + score, textStyle);
   movesText = game.add.text(game.world.width-15, 15, "MOVES LEFT: "+ movesLeft, textStyle);
   movesText.anchor.set(1,0);
}

function update() {
   checkBlockEvents();
}

function initBlocks() {
   blockInfo = {
      width: 120,
      height: 120,
      count: {
         row: levelRow,
         col: levelCol
      },
      offset: {
         top: 60,
         left: 60
      },
      padding: 10
   };

   blocks = game.add.group();
   
   for(var r=0; r < blockInfo.count.row; r++) {

      if(inDebug) {
         console.log(r);
      }
      for(var c=0; c < blockInfo.count.col; c++) {

         if(inDebug) {
            console.log(c);
         }

         var blockX = (c*(blockInfo.width+blockInfo.padding))+blockInfo.offset.left;
         var blockY = (r*(blockInfo.height+blockInfo.padding))+blockInfo.offset.top;

         newBlock = game.add.sprite(blockX, blockY, 'blocks');
         var newRandPos = Math.floor(Math.random()*6);
         newBlock.frame = newRandPos;

         newBlock.scale.setTo(5, 5);

         // Allows the block to be listened to
         newBlock.inputEnabled = true;

         blocks.add(newBlock);
      }
   }
}

function checkBlockEvents() {
   blocks.forEach(function(block) {  
      block.events.onInputDown.add(blockDown, this);
   });
}

function blockDown(sprite, pointer) {
   if (movesLeft > 0) {
      // To-Do
      // Add tween animation between the frames
      sprite.frame = (sprite.frame + 1) % 6;
      movesLeft--;
      movesText.setText("MOVES LEFT: "+ movesLeft);   
   } else {
      // Restart Game
      location.reload();
   }

   // Insert modal which says moves used up, game over
}

function startGame() {
   // Change visibility of the blocks
   // Fade in score, name, and moves left first, then blocks second
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *
 *          Example Function of using transition animations
 *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

function ballHitBrick(ball, brick) {
   var killTween = game.add.tween(brick.scale);
   killTween.to({x:0,y:0}, 200, Phaser.Easing.Linear.None);
   killTween.onComplete.addOnce(function(){
      brick.kill();
   }, this);
   killTween.start();


   score += 10;
   scoreText.setText('Points: '+score);

   if(score === blockInfo.count.row*blockInfo.count.col*10) {
      alert('You won the game, congratulations!');
      location.reload();
   }
}

* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */