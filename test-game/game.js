var game = new Phaser.Game(480, 320, Phaser.AUTO, null, {
   preload: preload, 
   create: create, 
   update: update
});

// Global Variables - Not Best Practice
var ball;
var paddle;
var bricks;
var newBrick;
var brickInfo;

function preload() {
   game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
   game.scale.pageAlignHorizontally = true;
   game.scale.pageAlignVertically = true;
   game.stage.backgroundColor = '#eee';
   game.load.image('ball', 'img/ball.png');
   game.load.image('paddle', 'img/paddle.png');
}

function create() {
   ball = game.add.sprite(game.world.width*0.5, game.world.height-25, 'ball');
   paddle = game.add.sprite(game.world.width*0.5, game.world.height-5, 'paddle');
   ball.anchor.set(0.5);
   paddle.anchor.set(0.5,1);

   ball.scale.setTo(0.25, 0.25);
   paddle.scale.setTo(0.35, 0.35);

   game.physics.startSystem(Phaser.Physics.ARCADE);
   game.physics.enable(ball, Phaser.Physics.ARCADE);
   game.physics.enable(paddle, Phaser.Physics.ARCADE);


   ball.body.collideWorldBounds = true;
   game.physics.arcade.checkCollision.down = false;
   ball.checkWorldBounds = true;
   ball.events.onOutOfBounds.add(function(){
      alert('Game over!');
      location.reload();
   }, this);
   ball.body.bounce.set(1);
   ball.body.velocity.set(100, -100);
   paddle.body.immovable = true;

}

function update() {
   game.physics.arcade.collide(ball, paddle);
   paddle.x = game.input.x || game.world.width*0.5;
}
