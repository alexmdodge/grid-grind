'use strict';

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *  
 *                              []     [][][] []  [] [][][] []     [][][]
 *  Author: Alex Dodge          []     []     []  [] []     []     []
 *  Date: October 15, 2016      []     [][]   []  [] [][]   []     [][][]
 *  License: MIT                []     []      [][]  []     []         []
 *                              [][][] [][][]   []   [][][] [][][] [][][]
 *
 *  The levels object accepts the current level and game size. It then generates 
 *  all of the properties pertaining to that level. They can be retrieved through 
 *  the following get methods. By dynamically generating levels, each individual
 *  does not have to be constructed, and instead levels will have properties
 *  and attributes extending the levels infinitely if required.
 *
 *  ** NOTE **
 *  This level generation does assume a static block padding size of 5 which is
 *  specified as a constant in the initial game file.
 *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

/* Constructor */
function Level(currentLevel, gameSize, spriteSize) {
	this.currentLevel = currentLevel;
	this.gameSize = gameSize;
	this.spriteSize = spriteSize;
}

/*
 * getGridSize
 *
 * Retrieves the grid size for the level. The first level is a 3x3 and it increases
 * by perfect squares each level, with some levels increasing only point value. The
 * pattern for generation will change depending on how quickly the levels can be played.
 */
Level.prototype.getGridSize = function() {
	return this.currentLevel + 2; // If level 1, 3 blocks per row, 3 columns
};


/*
 * getMoves
 *
 * Returns the number of moves available to the player
 */
Level.prototype.getMoves = function() {
	return this.currentLevel*4; // Increase the moves each level by 4
};


/*
 * getBlockSize
 *
 * Returns the side length of the block for the current level size.
 * First divides the game size into chunks according to the grid size
 * then the padding is subtracted from each to account for it in the drawing
 * function.
 */
Level.prototype.getBlockSize = function() {
	var size = Math.floor( (this.gameSize / this.getGridSize()) - 5); 
	return size;
};


/*
 * getBlockScale
 *
 * The source image for the spritesheet determines the physical pizel size
 * of the blocks. This function determines what scale factor is needed for
 * the size of the game. Will change dynamically depending of game size, even
 * when scaled.
 */
Level.prototype.getBlockScale = function() {
	var scale = this.getBlockSize() / this.spriteSize; 
	return scale;
};