'use strict';
/* globals require, describe, it */

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
 *  very welcome. Note that the external class files are much easier to test
 *  than the actual game files. 
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
import {Level} from '../app/js/levels.js';
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
	initLevelScore: 0,       // Starting score for each level
	levelGridSize:  3,      // Level grid width/height
	gridDiff:       2      // Level grid width/height. Difference levelGridSize - initLevel
};

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 				                   Test Cases
 * All of the available test cases. Each are borken down using the describe
 * function into various test suites.
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

describe('class (Level) Tests', function(){

	describe('Constructor Confirmation', function() {
		var testLevel = new Level(testVars.initLevel, testVars.gameWidth, testVars.spriteSize);

		it('creates a non null level object', function() {
			expect(testLevel).is.not.equal('null');
		});

		it('has an initial level of -> ' + testVars.initLevel, function() {
			expect(testLevel.currentLevel).to.equal(testVars.initLevel);
		});

		it('has a game width of -> ' + testVars.gameWidth, function() {
			expect(testLevel.gameSize).to.equal(testVars.gameWidth);
		});

		it('has an initial sprite width of ->' + testVars.spriteSize, function() {
			expect(testLevel.spriteSize).to.equal(testVars.spriteSize);
		});
	});

	describe('Methods', function() {
		describe('getGridSize()', function() {
			it('returns a grid size of -1 when level is any number less than 1', function() {
				var testObject = new Level(-20, testVars.gameWidth, testVars.spriteWidth);
				expect(testObject.getGridSize()).to.equal(-1);
			});

			it('returns a grid size of 20 when level is 18', function() {
				var testObject = new Level(18, testVars.gameWidth, testVars.spriteWidth);
				expect(testObject.getGridSize()).to.equal(20);
			});

			it('returns a grid size of 1001 when level is 999', function() {
				var testObject = new Level(999, testVars.gameWidth, testVars.spriteWidth);
				expect(testObject.getGridSize()).to.equal(1001);
			});
		});


		describe('getMoves()', function() {
			it('returns -1 moves left when current level is less than 1', function() {
				var testObject = new Level(-30, testVars.gameWidth, testVars.spriteWidth);
				expect(testObject.getMoves()).to.equal(-1);
			});

			it('returns 20 moves left when current level is 7', function() {
				var testObject = new Level(7, testVars.gameWidth, testVars.spriteWidth);
				expect(testObject.getMoves()).to.equal(20);
			});

			it('returns 1000 moves left when level is 498', function() {
				var testObject = new Level(497, testVars.gameWidth, testVars.spriteWidth);
				expect(testObject.getMoves()).to.equal(1000);
			});
		});


		describe('getPoints()', function() {
			it('returns -1 points left when current level is less than 1', function() {
				var testObject = new Level(-30, testVars.gameWidth, testVars.spriteWidth);
				expect(testObject.getPoints()).to.equal(-1);
			});

			it('returns 20 points left when current level is 4', function() {
				var testObject = new Level(4, testVars.gameWidth, testVars.spriteWidth);
				expect(testObject.getPoints()).to.equal(20);
			});

			it('returns 1604 points left when level is 40', function() {
				var testObject = new Level(40, testVars.gameWidth, testVars.spriteWidth);
				expect(testObject.getPoints()).to.equal(1604);
			});
		});


		describe('getBlockSize() - Determines the number of pixels available to each block.', function() {
			it('returns -1 when size is less than 0.', function() {
				var testObject = new Level(-30, testVars.gameWidth, testVars.spriteWidth);
				expect(testObject.getBlockSize()).to.equal(-1);
			});

			it('returns 128 when grid is 3 blocks wide and game width of 400 (padding of 5 for each block).', function() {
				var testObject = new Level(1, 400, testVars.spriteWidth);
				expect(testObject.getBlockSize()).to.equal(128);
			});

			it('returns 35 when grid is 10 blocks wide and game width of 400 (padding of 5 for each block).', function() {
				var testObject = new Level(8, 400, testVars.spriteWidth);
				expect(testObject.getBlockSize()).to.equal(35);
			});
		});


		describe('getScaleSize() - Determines how much each block should be scaled based on source sprite', function() {
			it('returns -1 when size is less than 0.', function() {
				var testObject = new Level(-20, testVars.gameWidth, testVars.spriteWidth);
				expect(testObject.getBlockScale()).to.be.NaN;
			});

			it('returns 1.28 when grid is 3 blocks wide and sprite width is 100.', function() {
				var testObject = new Level(1, 400, 100);
				expect(testObject.getBlockScale()).to.equal(1.28);
			});

			it('returns 0.35 when grid is 10 blocks wide and sprite width is 100.', function() {
				var testObject = new Level(8, 400, 100);
				expect(testObject.getBlockScale()).to.equal(0.35);
			});
		});
	});
});