'use strict';
/* globals Phaser, console, ColorTree */

var game = new Phaser.Game(500, 500, Phaser.AUTO, null, {
   preload: preload, 
   create: create, 
   update: update
});



// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
//
//              ///////////////////////////////////////////////
//              //                Game Variables             //
//              ///////////////////////////////////////////////
// 
//             Note that global variables are not best practices
//                     they will be changed at some point!      
//
//
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// Debug Messages, eventually turn this into a function which
// prints a number of important messages
var inDebug = false;

// Blocks
var blocks;
var blockInfo;
var newBlock;
var width = 120;
var height = 120;
var padding = 10;
var delta = width+padding;

// Information
var movesLeft = 999;
var movesText;
var playerName = "AlexIsDaBest";
var nameText;
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
   fill: '#888', 
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
   nameText = game.add.text(15, game.world.height-35, "PLAYER: "+ playerName, textStyle);
   movesText.anchor.set(1,0);
}

function update() {
   checkBlockEvents();
}

function initBlocks() {
   blockInfo = {
      top: 60,
      left: 60
   };

   blocks = game.add.group();
   
   for(var r=0; r < levelRow; r++) {

      if(inDebug) {
         console.log(r);
      }
      for(var c=0; c < levelCol; c++) {

         if(inDebug) {
            console.log(c);
         }

         var blockX = (c*(width + padding)) + blockInfo.left;
         var blockY = (r*(height + padding)) + blockInfo.top;

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

function buildColorBranch(spriteColorNode) {
   spriteColorNode.childNodes.forEach( function(color) {

   });
}

function checkColorChain(sprite) {
   console.log("Source Sprite Frame: " + sprite.frame);
   console.log("X Position of sprite: " + sprite.x);
   console.log("Y Position of sprite: " + sprite.y);


   // Find all blocks that share the same color and store them as child nodes
   // store the parent node when it has same position
   var allSameColors = [];

   blocks.forEach(function(block) {
      if (sprite.frame === block.frame) {
         allSameColors.push(block);
         console.log("Current Color Array Count: " + allSameColors.length);
      }
   });

   var colorChainTree = new ColorTree();

}

function blockDown(sprite, pointer) {
   if (movesLeft > 0) {
      // To-Do
      // Add tween animation between the frames
      sprite.frame = (sprite.frame + 1) % 6;
      movesLeft--;
      movesText.setText("MOVES LEFT: "+ movesLeft);

      // Take the current sprite which holds information
      // about position and color and use to check proximity
      checkColorChain(sprite);  
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