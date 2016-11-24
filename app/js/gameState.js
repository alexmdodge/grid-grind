/* jshint esversion: 6 */

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
 *                       Last Modified : October 23, 2016
 *                             License : MIT
 *
 *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
import {Level} from './levels.js';
import {ColorNode, ColorTree, ColorNodeContainer} from './colorTree.js';

class GameState extends Phaser.State {

	constructor() {
		super();
		this.blocks = null;
	   this.level = null;
	   this.currentLevel = 1;
	   this.PADDING = 5;
	   this.movesLeft = 4;
	   this.pointsLeft = 5;
	   this.playerName = "Alex";
	   this.score = 0;
	   this.gameStarted = false;
	   this.loadingScreen = null;
	}

	   /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    *
    *                               preload()
    *
    * Used to load assets and also setup the features of the game. In this case
    * the background color is set, the page is scaled, and the sprites are loaded
    * into the game.
    *
    * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

   preload() {
      // Scales the game to the screen size
      //game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      //game.scale.pageAlignHorizontally = true;
      //game.scale.pageAlignVertically = true;
      this.game.stage.backgroundColor = '#eee';

      /* Spritesheets for various components. Note the blocks are
       * going to be removed and generated. If you wanted to load a
       * button in the example is below.
       *
       * this.game.load.spritesheet('button', '../img/button.png', 120, 40);
       */
      this.game.load.spritesheet('blocks', '../img/hr-blocks.png', 100, 100);
      this.game.load.spritesheet('logo', '../img/grid-grind-logo.png', 1000, 653);
      this.game.load.spritesheet('buttons', '../img/buttons.png', 600, 100);
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

   //create() {
      //this.loadingScreen = this.game.add.group();

      //this.game.add.sprite(this.game.world.width/2-125, 50, 'logo', 0, this.loadingScreen).scale.set(0.25,0.25);
      //this.game.add.button(this.game.world.width/2-150, 250, 'buttons', this.initGame(), this, 0, 0, 0, this.loadingScreen).scale.set(0.5, 0.5);
      //this.game.add.button(this.game.world.width/2-150, 325, 'buttons', this.initGame(), this, 1, 1, 1, this.loadingScreen).scale.set(0.5, 0.5);
   //}

   create() {
      // To use physics with certain objects use this syntax
      // game.physics.startSystem(Phaser.Physics.ARCADE);
      // game.physics.enable(ball, Phaser.Physics.ARCADE);

      // Cleans out all previous objects
      this.game.world.removeAll(true);

      // Draws the block objects on the screen for each frame
      // Draws from a randomized array of the original sprite colours
      this.initBlocks();

      // To add text elements to the game
      this.pointsLeft = this.level.getPoints();
      this.movesLeft = this.level.getMoves();
      $("#update-points").html(this.score);
      $("#update-moves-left").html(this.movesLeft);
      $("#player-name").html(this.playerName);
      $("#update-points-left").html(this.pointsLeft);

      this.gameStarted = true;
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
   update() {
   }

   /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    *
    *                                 Support Functions
    *
    * These are responsible for segmenting and organizing the game logic into
    * more manageable chunks.
    *
    * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

   initBlocks() {
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
      let referenceSrite = this.game.add.sprite(0,0,'blocks');
      referenceSrite.visible = false;

      this.level = new Level(this.currentLevel, this.game.width, referenceSrite.width);
      let blockSize = this.level.getBlockSize();
      let gridSize = this.level.getGridSize();
      let blockScale = this.level.getBlockScale();

      this.blocks = this.game.add.group();

      for(let row=0; row < gridSize; row++) {

         for(let col=0; col < gridSize; col++) {

            let blockX = (col*(blockSize + this.PADDING));
            let blockY = (row*(blockSize + this.PADDING));

            let newBlock = this.game.add.sprite(blockX, blockY, 'blocks');
            newBlock.alpha = 0;

            // Fades in block when added
            this.game.add.tween(newBlock).to( { alpha: 1 }, 800, Phaser.Easing.Linear.None, true);
            let newRandPos = Math.floor(Math.random()*6);
            newBlock.frame = newRandPos;

            // Will be level.getBlockSize / newBlock.width
            newBlock.scale.setTo(blockScale, blockScale);

            // Allows the block to listen to events
            newBlock.inputEnabled = true;
            newBlock.events.onInputDown.add(this.blockDown, this);
            this.blocks.add(newBlock);
         }
      }
   }

   checkColorChain(sprite) {
      // Find all blocks that share the same color and store them as child nodes
      // store the parent node when it has same position
      let allSameColors = [];

      this.blocks.forEach(function(block) {
         if (sprite.frame === block.frame) {
            allSameColors.push(new ColorNodeContainer(block));
         }
      });


      /* 
       * Create the color tree, and add the source sprite from the click
       * as the root node. Then add it to the search queue to begin populating
       * the color chain tree.
       */
      let colorChainTree = new ColorTree();
      colorChainTree.root = new ColorNode(sprite);
      let searchQueue = [colorChainTree.root];

      /*
       * Represents the difference a block needs to be in order to have
       * a valid place in the chain. This could be delta left, right, up
       * or down.
       */
      let delta = this.level.getBlockSize() + this.PADDING;


      // Executes until there are no longer nodes to check and add
      while(searchQueue.length) {

         let node = searchQueue.shift();
         let toAdd = false;

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

               if(toAdd && allSameColors[i].tile.alpha !== 0) {
                  allSameColors[i].matched = true;

                  let newConnect = new ColorNode(allSameColors[i].tile);
                  node.children.push(newConnect);
                  searchQueue.push(newConnect);
                  colorChainTree.nodeCount++;

                  toAdd = false;
               }
            }
         } // End of for loop
      } // End of color tree population

      if(colorChainTree.nodeCount > 2) {
      	let self = this;
         // Traverses the tree, fades out linked elements, and sets the input so they can
         // no longer be accessed
         colorChainTree.traverseBFS(function(node) {
            // For flashing blocks
            // game.add.tween(node.data).to( { alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0, 200, true);
            self.game.add.tween(node.data).to( { alpha: 0 }, 800, Phaser.Easing.Linear.None, true);
            node.data.inputEnabled = false;
         });

         /*
          * Chain modifier multiplies the points as the chains gets larger. This encourages
          * larger chains to be found in order to complete the levels
          */
         let chainModifier = Math.ceil(colorChainTree.nodeCount / 3);
         let modifiedScore = chainModifier * colorChainTree.nodeCount;
         console.log("Chain modifier is " + chainModifier);

         this.score += modifiedScore;
         this.pointsLeft -= modifiedScore;

         if(this.pointsLeft < 1) {
            // trigger next level by increasing
            this.currentLevel++;
            $('#progress-bar-done').animate({ width: '100%' });
            $('#progress-bar-done').animate({ width: '0%' });
            $('#update-level').html(this.currentLevel);
            this.create();

         } else {
            $("#update-points").html(this.score);
            $("#update-points-left").html(this.pointsLeft);
            this.gainExp();
         }
      }
   }

   gainExp() {
      let progressWidth = Math.floor(100 * ((this.level.getPoints()-this.pointsLeft)/this.level.getPoints())) + '%';
      $('#progress-bar-done').animate({
         width: progressWidth
      });
   }

   blockDown(sprite) {
      if (this.movesLeft > 1) {

         // Rotate the sprite frame
         sprite.frame = (sprite.frame + 1) % 6;
         this.movesLeft--;
         $("#update-moves-left").html(this.movesLeft);

         // Take the current sprite which holds information
         // about position and color and use to check proximity
         this.checkColorChain(sprite);
      } else {
         // Restart Game
         this.score = 0;
         this.currentLevel = 1;
         this.pointsLeft = this.level.getPoints();
         this.movesLeft = this.level.getMoves();
         $('#progress-bar-done').animate({ width: '0%' });
         this.create();
      }
   }

}

export default GameState;
