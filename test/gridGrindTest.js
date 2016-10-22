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
var assert = require('assert');
var levels  = require('../app/js/levels.js');