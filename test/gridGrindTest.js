'use strict';
/* globals require, describe */

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *
 *    [][][]  [][][] [][][] [][][]    [][][]  [][][] [][][] []    [] [][][]
 *    []      []  []   []   []   []   []      []  []   []   [][]  [] []   []
 *    [] [][] [][]     []   []   []   [] [][] [][]     []   [] [] [] []   []
 *    []  []  [] []    []   []   []   []  []  [] []    []   []  [][] []   []
 *    [][][]  []  [] [][][] [][][]    [][][]  []  [] [][][] []    [] [][][]
 * 
 *				       [][][] [][][] [][][] [][][] [][][]
 *      				 []   []     []       []   []
 *     					 []   [][][] [][][]   []   [][][]
 * 					     []   []         []   []       []
 * 					     []   [][][] [][][]   []   [][][]
 *
 *                              Author : Alex Dodge
 *                       Last Modified : October 22, 2016
 *                             License : MIT     
 *
 *
 *  This test suite was written to support a TDD for this game. This is my first
 *  attempt at test driven development, so any suggestions and improvements are
 *  very welcome.
 *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */


/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 								 Required Modules
 *
 * All of the required modules (the files containing code to be tested) are
 * contained in this section. The first is the type of assertion library Mocha
 * is using. There are a number of different kinds.
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
var expect = require('chai').expect;
var levels = require('../app/js/levels.js');
//var phaser = require('../app/js/phaser.min.js');
//var jquery = require('../app/js/jquery.min.js');
//var game   = require('../app/js/game.js');


/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 				           Initial Game Default Variables
 *
 * An object literal which describes the intial configuration of the game for
 * use in the testing process. This will be used as a comparison to ensure that
 * any game environment variables that changes will be investigated.
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

var testVars = {
	gameWidth:      400,    // The width of the phaser game window
	gameHeight:     400,    // The height of the phaser game window
	gamePadding:    5,      // The padding between each drawn block
	gameStatus:     false,  // Whether the game has been initialized or not
	spriteSize:     100,    // Standard size of sprites from spritesheet
	initLevel:      1,      // Starting level
	initMoves:      4,      // Starting moves
	initPoints:     5,      // Starting points to complete level
	initScore:      0,      // Starting score for all levels
	initLevelScore: 0       // Starting score for each level
};

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 				                   Test Cases
 * All of the available test cases. Each are borken down using the describe
 * function into various test suites.
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
 console.log("The levels object is " + levels);
 console.log("The levels object inside is " + levels.Level);

describe('Level Tests', function(){
	//var testLevel = new levels.Level(testVars.initLevel, testVars.gameWidth, testVars.spriteSize);
	
	expect(levels).to.be.an('object');
});