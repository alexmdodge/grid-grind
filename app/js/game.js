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
var inDebug = true;
var debugTemp;

// Blocks
var redBlock;
var greenBlock;
var blueBlock;
var yellowBlock;
var orangeBlock;
var purpleBlock;

var gridColors = [];
var blocks;
var blockInfo;
var blockX = 0;
var blockY = 0;

// Information
var movesLeft = 3;
var movesText;
var playerName;
var score = 0;
var scoreText;

var startGame;
var startButton;

// Grid Variables
var gridSize = 9;
var levelRow = Math.sqrt(gridSize);
var levelCol = Math.sqrt(gridSize);

// Styling Variables
var textStyle = { font: '18px Helvetica', fill: '#0095DD' };

function preload() {
   // Scales the game to the screen size
   //game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
   game.scale.pageAlignHorizontally = true;
   game.scale.pageAlignVertically = true;
   game.stage.backgroundColor = '#eee';

   game.load.image('redB',    '../img/redBlock.png');
   game.load.image('greenB',  '../img/greenBlock.png');
   game.load.image('blueB',   '../img/blueBlock.png');
   game.load.image('yellowB', '../img/yellowBlock.png');
   game.load.image('orangeB', '../img/orangeBlock.png');
   game.load.image('purpleB', '../img/purpleBlock.png');

   // Generates the random grig as needed
   generateGrid();

   // Example spritsheet for animations
   game.load.spritesheet('button', '../img/button.png', 120, 40);
}

function create() {
   startButton = game.add.button(game.world.width*0.5, game.world.height*0.5, 'button', startGame, this, 1, 0, 2);
   startButton.anchor.set(0.5);
   
   // Initialize all of the color object sprites
   redBlock    = game.add.sprite(50, 250, 'redB');
   greenBlock  = game.add.sprite(50, 250, 'greenB');
   blueBlock   = game.add.sprite(50, 250, 'blueB');
   yellowBlock = game.add.sprite(50, 250, 'yellowB');
   orangeBlock = game.add.sprite(50, 250, 'orangeB');
   purpleBlock = game.add.sprite(50, 250, 'purpleB');

   // Sets the anchor coordinate to be the center of the sprite
   redBlock.anchor.set(0.5);
   greenBlock.anchor.set(0.5);
   blueBlock.anchor.set(0.5);
   yellowBlock.anchor.set(0.5);
   orangeBlock.anchor.set(0.5);
   purpleBlock.anchor.set(0.5);
   

   // Enables physics for the game
   game.physics.startSystem(Phaser.Physics.ARCADE);
   // game.physics.enable(ball, Phaser.Physics.ARCADE);

   // Draws the block objects on the screen for each frame
   // Draws from a randomized array of the original sprite colours
   initBlocks();

   scoreText = game.add.text(5, 5, 'Points: ' + score, textStyle);
   movesText = game.add.text(game.world.width-5, 5, 'Moves Left: '+ movesLeft, textStyle);
   movesText.anchor.set(1,0);
}

function update() {
}

function generateGrid() {
   var colors = [redBlock, greenBlock, blueBlock, yellowBlock, orangeBlock, purpleBlock];

   for (var r = 0; r < levelRow; r++) {

      gridColors[r] = [];
      for (var c = 0; c < levelCol; c++) {
         gridColors[r][c] = colors[Math.floor(Math.random*6)];

         if(inDebug) {
            debugTemp = gridColors[r][c];
            console.log("" + debugTemp);
         }
      }
   }
}

function initBlocks() {
   blockInfo = {
      width: 25,
      height: 25,
      count: {
         row: levelRow,
         col: levelCol
      },
      offset: {
         top: 10,
         left: 10
      },
      padding: 10
   };

   blocks = game.add.group();
   
   for(var r=0; r < levelRow; r++) {
      for(var c=0; c < levelCol; r++) {
         blockX = (r*(blockInfo.width+blockInfo.padding))+blockInfo.offset.left;
         blockY = (c*(blockInfo.height+blockInfo.padding))+blockInfo.offset.top;
         newBrick = game.add.sprite(blockX, blockY, 'brick');
         newBrick.scale.setTo(0.18, 0.18);


         game.physics.enable(newBrick, Phaser.Physics.ARCADE);
         newBrick.body.immovable = true;
         newBrick.anchor.set(0.5);
         blocks.add(newBrick);
      }
   }
}

function startGame() {
   startButton.destroy();
   blocks.setVisibility = true;
   playing = true;
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