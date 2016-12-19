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
 *                       Last Modified : October 15, 2016
 *                             License : MIT     
 *
 *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

import GridGrind from './grid-grind-state.js';

class Game extends Phaser.Game {

   /*
    * The game object initializes each piece.
    *
    * Game(width, height, renderer, phaser state objects)
    *
    * The Phaser.AUTO will auto detect which browser rendering to use and the null
    * parameter sets the default phaser states (preload, create, update).
    *
    */
   constructor() {
      super(400, 400, Phaser.AUTO, 'game-container', null);
      this.state.add('GridGrind', GridGrind, false);
      this.state.start('GridGrind');
   }

   /** 
    * Triggers the tutorial where players can choose to skip it or go through
    * each slide. 
    */
    startTutorial() {

    }

   /**
    * Triggers the start of the game and configure initial data when the user clicks
    * to begin the game.
    */
   startGame() {
   }
}

new Game();