'use strict';

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


// Blocks
var redBlock;
var greenBlock;
var blueBlock;
var yellowBlock;
var orangeBlock;
var purpleBlock;

// Information
var movesLeft;
var name;
var score = 0;
var startButton;

// Grid Variables
var levelRow;
var levelCol;


// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
//
//
//                         Old Game Variables
//
//
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
var ball;
var bricks;
var newBrick;
var paddle;
var brickInfo;

var textStyle = { font: '18px Helvetica', fill: '#0095DD' };
var scoreText;

var lives = 3;
var livesText;
var lifeLostText;

var playing = false;

function preload() {
   // Scales the game to the screen size
   //game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
   game.scale.pageAlignHorizontally = true;
   game.scale.pageAlignVertically = true;
   game.stage.backgroundColor = '#eee';

   game.load.image('redB', '../img/redBlock.png');
   game.load.image('greenB', '../img/greenBlock.png');
   game.load.image('blueB', '../img/blueBlock.png');
   game.load.image('yellowB', '../img/yellowBlock.png');
   game.load.image('orangeB', '../img/orangeBlock.png');
   game.load.image('purpleB', '../img/purpleBlock.png');

   // Example spritsheet for animations
   game.load.spritesheet('button', '../img/button.png', 120, 40);
}

function create() {
   startButton = game.add.button(game.world.width*0.5, game.world.height*0.5, 'button', startGame, this, 1, 0, 2);
   startButton.anchor.set(0.5);
   
   redBlock = game.add.sprite(50, 250, 'ball');
   ball.animations.add('wobble', [0,1,0,2,0,1,0,2,0], 24);

   ball.anchor.set(0.5);
   paddle.anchor.set(0.5,1);

   paddle.scale.setTo(0.35, 0.35);

   game.physics.startSystem(Phaser.Physics.ARCADE);
   game.physics.enable(ball, Phaser.Physics.ARCADE);
   game.physics.enable(paddle, Phaser.Physics.ARCADE);


   ball.body.collideWorldBounds = true;
   game.physics.arcade.checkCollision.down = false;
   ball.checkWorldBounds = true;

   ball.events.onOutOfBounds.add(ballLeaveScreen, this);

   ball.body.bounce.set(1);
   paddle.body.immovable = true;

   initBricks();

   scoreText = game.add.text(5, 5, 'Points: 0', textStyle);
   livesText = game.add.text(game.world.width-5, 5, 'Lives: '+lives, textStyle);
   livesText.anchor.set(1,0);
   lifeLostText = game.add.text(game.world.width*0.5, game.world.height*0.5, 'Life lost, click to continue', textStyle);
   lifeLostText.anchor.set(0.5);
   lifeLostText.visible = false;

}

function update() {
}

function initBricks() {
   brickInfo = {
      width: 65,
      height: 20,
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

   bricks = game.add.group();
   
   for(var c=0; c<brickInfo.count.row; c++) {
      for(var r=0; r<brickInfo.count.col; r++) {
         var blockX = (r*(brickInfo.width+brickInfo.padding))+brickInfo.offset.left;
         var blockY = (c*(brickInfo.height+brickInfo.padding))+brickInfo.offset.top;
         newBrick = game.add.sprite(brickX, brickY, 'brick');
         newBrick.scale.setTo(0.18, 0.18);


         game.physics.enable(newBrick, Phaser.Physics.ARCADE);
         newBrick.body.immovable = true;
         newBrick.anchor.set(0.5);
         bricks.add(newBrick);
      }
   }
}

function ballHitBrick(ball, brick) {
   var killTween = game.add.tween(brick.scale);
   killTween.to({x:0,y:0}, 200, Phaser.Easing.Linear.None);
   killTween.onComplete.addOnce(function(){
      brick.kill();
   }, this);
   killTween.start();


   score += 10;
   scoreText.setText('Points: '+score);

   if(score === brickInfo.count.row*brickInfo.count.col*10) {
      alert('You won the game, congratulations!');
      location.reload();
   }
}

function ballLeaveScreen() {
    lives--;
    if(lives) {
      livesText.setText('Lives: '+lives);
      lifeLostText.visible = true;
      ball.reset(game.world.width*0.5, game.world.height-25);
      paddle.reset(game.world.width*0.5, game.world.height-5);
      
      game.input.onDown.addOnce(function(){
         lifeLostText.visible = false;
         ball.body.velocity.set(150, -150);
      }, this);
   } else {
       alert('You lost, game over!');
       location.reload();
   }
}

function ballHitPaddle(ball, paddle) {
   ball.animations.play('wobble');
   ball.body.velocity.x = -1*5*(paddle.x-ball.x);
}

function startGame() {
   startButton.destroy();
   ball.body.velocity.set(150, -150);
   playing = true;
}