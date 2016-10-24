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

import GameState from 'gameState.js';

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
      this.state.add('GameState', GameState, false);
      this.state.start('GameState');
   }
}

new Game();