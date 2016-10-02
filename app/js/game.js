'use strict';
/* globals Phaser, console, ColorTree, ColorNode */

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *
 *              ///////////////////////////////////////////////
 *              //                  Grid Grind               //
 *              ///////////////////////////////////////////////
 * 
 *                              Author : Alex Dodge
 *                       Last Modified : October 2, 2016
 *                             License : MIT     
 *
 *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */


/*
 * The game object initializes each piece.
 *
 * Game(width, height, renderer, phaser state objects)
 *
 * The Phaser.AUTO will auto detect which browser rendering to use and the null
 * parameter sets the default phaser states (preload, create, update).
 *
 */
var game = new Phaser.Game(500, 500, Phaser.AUTO, null, {
   preload: preload, 
   create: create, 
   update: update
});


/*
 * Game Variables
 *
 * Currently these are global variables. This is NOT best practice. The game will
 * either be wrapped in an IIFE, or I'll convert the syntax to ES 2015.
 *
 */

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
var playerName = "Alex";
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

/* Blue    #5f8ffd
   Orange  #fcca60
   Green   #69fe5e
   Red     #ff5c5c
   Purple  #d560fc
   Yellow  #f7fc60

var tileObjects = {
   width: 120,
   height: 120,
   padding: 10 ,
   fillStyles: {'#5f8ffd', '#fcca60', '#69fe5e', '#ff5c5c', '#d560fc'}
};
*/


/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                              
 *                               preload()
 *
 * Used to load assets and also setup the features of the game. In this case
 * the background color is set, the page is scaled, and the sprites are loaded
 * into the game.
 *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

function preload() {
   // Scales the game to the screen size
   //game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
   game.scale.pageAlignHorizontally = true;
   game.scale.pageAlignVertically = true;
   game.stage.backgroundColor = '#eee';

   /* Spritesheets for various components. Note the blocks are
    * going to be removed and generated. If you wanted to load a
    * button in the example is below.
    *
    * game.load.spritesheet('button', '../img/button.png', 120, 40);
    */
   game.load.spritesheet('blocks', '../img/blocks.png', 25, 25);
}


/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                            
 *                                 create()
 *
 * This is called once the preload is finished and is responsible for the setup
 * logic where you use the sprites. For this game with blocks are generated
 * and the text fields are setup. 
 *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

function create() {
   // To use physics with certain objects use this syntax
   // game.physics.startSystem(Phaser.Physics.ARCADE);
   // game.physics.enable(ball, Phaser.Physics.ARCADE);

   // Draws the block objects on the screen for each frame
   // Draws from a randomized array of the original sprite colours
   initBlocks();

   // Adds the various text elements for the game.
   scoreText = game.add.text(15, 15, "POINTS: " + score, textStyle);
   movesText = game.add.text(game.world.width-15, 15, "MOVES LEFT: "+ movesLeft, textStyle);
   nameText = game.add.text(15, game.world.height-35, "PLAYER: "+ playerName, textStyle);
   movesText.anchor.set(1,0);
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                            
 *                                  update()
 *
 * Called on every frame, this is reponsible for the actual interactions with
 * the game. In this case this function listens for players to click on the
 * blocks. When it detects input, it triggers the block update and chain search
 * function. These generate
 *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
function update() {
   checkBlockEvents();
}



/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                            
 *                                 Support Functions
 *
 * These are responsible for segmenting and organizing the game logic into
 * more manageable chunks.
 *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */


function initBlocks() {

   // Starting position for the generated blocks
   blockInfo = {
      top: 60,
      left: 60
   };

   blocks = game.add.group();
   
   for(var r=0; r < levelRow; r++) {

      for(var c=0; c < levelCol; c++) {

         var blockX = (c*(width + padding)) + blockInfo.left;
         var blockY = (r*(height + padding)) + blockInfo.top;

         newBlock = game.add.sprite(blockX, blockY, 'blocks');
         var newRandPos = Math.floor(Math.random()*6);
         newBlock.frame = newRandPos;

         newBlock.scale.setTo(5, 5);

         // Allows the block to listen to events
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


/*
 * checkColorChain() - Uses the N node Tree to search for and test chains
 * of blocks to see if there chain length is long enough to score.
 *
 */
function checkColorChain(sprite) {
   console.log("Source Sprite Frame: " + sprite.frame);
   console.log("X Position of sprite: " + sprite.x);
   console.log("Y Position of sprite: " + sprite.y);


   // Find all blocks that share the same color and store them as child nodes
   // store the parent node when it has same position
   var allSameColors = [];

   // A node container object which wraps the current tile with information
   // about whether it has already been stored in the color tree
   function ColorNodeContainer(colorTile) {
      this.tile = colorTile;
      this.matched = false;
   }

   blocks.forEach(function(block) {
      if (sprite.frame === block.frame) {
         allSameColors.push(new ColorNodeContainer(block));
         console.log("Current Color Array Count: " + allSameColors.length);
      }
   });


   /* Create the color tree, and add the source sprite from the click
    * as the root node. Then add it to the search queue to begin populating
    * the color chain tree.
    */ 
   var colorChainTree = new ColorTree();
   colorChainTree.root = new ColorNode(sprite);
   var searchQueue = [colorChainTree.root];


   // Executes until there are no longer nodes to check and add
   while(searchQueue.length) {

      var node = searchQueue.shift();
      var toAdd = false;

      for(var i = 0; i < allSameColors.length; i++) {

         /*
          * This statement first checks if the node has already been matched
          * to ensure no duplicate nodes are added.
          *
          * This statement checks each node by first checking for horizontal
          * positioning. If adding the delta and keeping the y value the same
          * evaluates true, then the node is not diagonal and in the proper
          * position.
          *
          * It repeats this logic for all of the color tiles around the current
          * source tile.
          */

         if (!allSameColors[i].matched) {

            // Right Tile Check
            if(node.data.x + delta == allSameColors[i].tile.x && node.data.y == allSameColors[i].tile.y) {
               toAdd = true;
            } 
            
            // Left Tile Check
            else if(node.data.x - delta == allSameColors[i].tile.x && node.data.y == allSameColors[i].tile.y) {
               toAdd = true;
            }

            // Up Tile Check
            else if(node.data.y - delta == allSameColors[i].tile.y && node.data.x == allSameColors[i].tile.x) {
               toAdd = true;
            } 

            // Down Tile Check
            else if(node.data.y + delta == allSameColors[i].tile.y && node.data.x == allSameColors[i].tile.x) {
               toAdd = true;
            }

            if(toAdd) {
               allSameColors[i].matched = true;
               var newConnect = new ColorNode(allSameColors[i].tile);
               node.children.push(newConnect);
               searchQueue.push(newConnect);
               colorChainTree.nodeCount++;

               console.log('Node added. Current node count: ' + colorChainTree.nodeCount);
               toAdd = false;
            }
         }
      } // End of for loop
   } // End of color tree population

   if(colorChainTree.nodeCount > 2) {
      // Traverses the tree, fades out linked elements, and sets the input so they can
      // no longer be accessed
      colorChainTree.traverseBFS(function(node) {game.add.tween(node.data).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true); node.data.inputEnabled = false;});

      // More complex score chaining system when later levels introduced
      score += colorChainTree.nodeCount;
      scoreText.setText("POINTS: "+ score);
   }
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