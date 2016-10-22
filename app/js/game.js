'use strict';
/* globals Phaser, console, ColorTree, ColorNode, Level, $ */

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *
 *              
 *    [][][]  [][][] [][][] [][][]    [][][]  [][][] [][][] []    [] [][][]
 *    []      []  []   []   []   []   []      []  []   []   [][]  [] []   []
 *    [] [][] [][]     []   []   []   [] [][] [][]     []   [] [] [] []   []
 *    []  []  [] []    []   []   []   []  []  [] []    []   []  [][] []   []
 *    [][][]  []  [] [][][] [][][]    [][][]  []  [] [][][] []    [] [][][]
 * 
 *                              Author : Alex Dodge
 *                       Last Modified : October 15, 2016
 *                             License : MIT     
 *
 *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

(function() { 


   /*
    * The game object initializes each piece.
    *
    * Game(width, height, renderer, phaser state objects)
    *
    * The Phaser.AUTO will auto detect which browser rendering to use and the null
    * parameter sets the default phaser states (preload, create, update).
    *
    */
   var game = new Phaser.Game(400, 400, Phaser.AUTO, null, {
      preload: preload, 
      create: createLoadingScreen,
      update: update
   });

   /*
    * Game Variables
    *
    * The game itself is wrapped in an IIFE so all of the variables and functions
    * are encapsulated within this JavaScript file. This ensure they can't be
    * referenced by other libraries and files throughout exectuion.
    *
    */

   // Blocks
   var blocks;
   var newBlock;

   // Information
   var level; 
   var currentLevel = 1;
   var PADDING = 5;
   var movesLeft = 4;
   var pointsLeft = 5;
   var playerName = "Alex";
   var levelScore = 0;
   var score = 0;
   var gameStarted = false;
   var loadingScreen;

   /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    *                            
    *                                 Support Functions
    *
    * These are responsible for segmenting and organizing the game logic into
    * more manageable chunks.
    *
    * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */


   function initBlocks() {
      /* * * * * * * * * * *
       *  Color Reference  *
       * * * * * * * * * * *
         Blue    #5f8ffd
         Orange  #fcca60
         Green   #69fe5e
         Red     #ff5c5c
         Purple  #d560fc
         Yellow  #f7fc60
      */

      // Create a reference sprite to be passed into the current level
      var referenceSrite = game.add.sprite(0,0,'blocks');
      referenceSrite.visible = false;

      level = new Level(currentLevel, game.width, referenceSrite.width);
      var blockSize = level.getBlockSize();
      console.log("The current block size is " + blockSize);
      var gridSize = level.getGridSize();
      var blockScale = level.getBlockScale();
    
      blocks = game.add.group();
      
      for(var row=0; row < gridSize; row++) {

         for(var col=0; col < gridSize; col++) {

            var blockX = (col*(blockSize + PADDING));
            var blockY = (row*(blockSize + PADDING));

            newBlock = game.add.sprite(blockX, blockY, 'blocks');
            newBlock.alpha = 0;

            // Fades in block when added
            game.add.tween(newBlock).to( { alpha: 1 }, 800, Phaser.Easing.Linear.None, true);
            var newRandPos = Math.floor(Math.random()*6);
            newBlock.frame = newRandPos;

            console.log("Block width is " + newBlock.width);

            // Will be level.getBlockSize / newBlock.width
            newBlock.scale.setTo(blockScale, blockScale);

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
      var delta = level.getBlockSize() + PADDING;


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

               // Final check ensures the tile is to be added and that it already hasn't been scored
               // (faded when scored so alpha will be 0)
               console.log("The alpha value is: " + allSameColors[i].tile.alpha);
               if(toAdd && allSameColors[i].tile.alpha !== 0) {
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
         colorChainTree.traverseBFS(function(node) {
            // For flashing blocks
            // game.add.tween(node.data).to( { alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0, 200, true); 
            game.add.tween(node.data).to( { alpha: 0 }, 800, Phaser.Easing.Linear.None, true); 
            node.data.inputEnabled = false;});

         // More complex score chaining system when later levels introduced
         score += colorChainTree.nodeCount;
         levelScore += colorChainTree.nodeCount;
         pointsLeft -= levelScore;

         if(pointsLeft < 1) {
            // trigger next level by increasing
            currentLevel++;
            $('#progress-bar-done').animate({ width: '100%' });
            $('#progress-bar-done').animate({ width: '0%' });
            $('#update-level').html(currentLevel);
            createGame();
            
         } else {
            $("#update-points").html(score);
            $("#update-points-left").html(pointsLeft);
            gainExp();
         }
      }
   }

   function gainExp() {
      var progressWidth = Math.floor(100 * ((level.getPoints()-pointsLeft)/level.getPoints())) + '%';
      console.log("Percentage done is " + progressWidth);
      $('#progress-bar-done').animate({
         width: progressWidth
      });
   }

   function blockDown(sprite) {
      if (movesLeft > 1) {
         // To-Do
         // Add tween animation between the frames
         sprite.frame = (sprite.frame + 1) % 6;
         movesLeft--;
         $("#update-moves-left").html(movesLeft);
         //movesText.setText("MOVES LEFT: "+ movesLeft);

         // Take the current sprite which holds information
         // about position and color and use to check proximity
         checkColorChain(sprite);  
      } else {
         // Restart Game
         score = 0;
         currentLevel = 1;
         pointsLeft = level.getPoints();
         movesLeft = level.getMoves();
         $('#progress-bar-done').animate({ width: '0%' });
         createGame();
      }

      // Insert modal which says moves used up, game over
   }

   /*
   function startGame() {
      // Change visibility of the blocks
      // Fade in score, name, and moves left first, then blocks second
   }*/

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
      //game.scale.pageAlignHorizontally = true;
      //game.scale.pageAlignVertically = true;
      game.stage.backgroundColor = '#eee';

      /* Spritesheets for various components. Note the blocks are
       * going to be removed and generated. If you wanted to load a
       * button in the example is below.
       *
       * game.load.spritesheet('button', '../img/button.png', 120, 40);
       */
      game.load.spritesheet('blocks', '../img/hr-blocks.png', 100, 100);
      game.load.spritesheet('logo', '../img/grid-grind-logo.png', 1000, 653);
      game.load.spritesheet('buttons', '../img/buttons.png', 600, 100);
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

   function createLoadingScreen() {
      loadingScreen = game.add.group();

      game.add.sprite(game.world.width/2-125, 50, 'logo', 0, loadingScreen).scale.set(0.25,0.25);
      game.add.button(game.world.width/2-150, 250, 'buttons', createGame, this, 0, 0, 0, loadingScreen).scale.set(0.5, 0.5);
      game.add.button(game.world.width/2-150, 325, 'buttons', createGame, this, 1, 1, 1, loadingScreen).scale.set(0.5, 0.5);
   }

   function createGame() {
      // To use physics with certain objects use this syntax
      // game.physics.startSystem(Phaser.Physics.ARCADE);
      // game.physics.enable(ball, Phaser.Physics.ARCADE);

      // Cleans out all previous objects
      game.world.removeAll(true);

      // Draws the block objects on the screen for each frame
      // Draws from a randomized array of the original sprite colours
      initBlocks();

      // To add text elements to the game
      levelScore = 0;
      pointsLeft = level.getPoints();
      movesLeft = level.getMoves();
      $("#update-points").html(score);
      $("#update-moves-left").html(movesLeft);
      $("#player-name").html(playerName);
      $("#update-points-left").html(pointsLeft);

      gameStarted = true;
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
      if(gameStarted) {
         checkBlockEvents();
      }
   }
})();