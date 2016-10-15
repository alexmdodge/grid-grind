'use strict';
/* globals */

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *  
 *                              []     [][][] []  [] [][][] []     [][][]
 *  Author: Alex Dodge          []     []     []  [] []     []     []
 *  Date: October 15, 2016      []     [][]   []  [] [][]   []     [][][]
 *  License: MIT                []     []      [][]  []     []         []
 *                              [][][] [][][]   []   [][][] [][][] [][][]
 *
 *  The levels object accepts the current level and generates all of the
 *  properties pertaining to that level. They can be retrieved through the
 *  following get methods. By dynamically generating levels, each individual
 *  does not have to be constructed, and instead levels will have properties
 *  and attributes extending the levels infinitely if required.
 *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

/* Constructor */
function Levels(currentLevel) {
	this.currentLevel = currentLevel;
}

/*
 * getGridSize
 *
 * Retrieves the grid size for the level. The first level is a 3x3 and it increases
 * by perfect squares each level, with some levels increasing only point value. The
 * pattern for generation will change depending on how quickly the levels can be played.
 */
Levels.prototype.getGridSize = function() {
	return this.currentLevel + 2 // If level 1, 3 blocks per row, 3 columns
}



Levels.prototype.getGridSize = function() {
	return this.currentLevel + 2 // If level 1, 3 blocks per row, 3 columns
}



Levels.prototype.getGridSize = function() {
	return this.currentLevel + 2 // If level 1, 3 blocks per row, 3 columns
}



Levels.prototype.getGridSize = function() {
	return this.currentLevel + 2 // If level 1, 3 blocks per row, 3 columns
}



Levels.prototype.getGridSize = function() {
	return this.currentLevel + 2 // If level 1, 3 blocks per row, 3 columns
}