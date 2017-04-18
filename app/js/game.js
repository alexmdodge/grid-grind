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
 *                       Last Modified : April 17, 2017
 *                             License : MIT     
 *
 *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

import GridGrind from './grid-grind-state.js';

// Global variables for initial navigation and to hold the players name
export var _ggPlayerName;
var _ggNavigation;

class Game extends Phaser.Game {

  /**
   * The game object initializes each piece.
   *
   * Game(width, height, renderer, phaser state objects)
   *
   * The Phaser.AUTO will auto detect which browser rendering to use and the null
   * parameter sets the default phaser states (preload, create, update).
   *
   */
  constructor() {
    super(400, 400, Phaser.AUTO, 'gg-game-container', null);
    this.state.add('GridGrind', GridGrind, false);
    this.state.start('GridGrind');

    this.WebFontConfig = {
      active: function() { game.time.events.add(Phaser.Timer.SECOND, createText, this); },
      google: {
        families: ['Fjalla One']
      }
    };
  }
}


class Navigation {
  constructor(playerName) {
    this.playerName = playerName;
    this.currentStep = 0;
  }

  /**
   * Navigates to the next tutorial slide. Checks if first time in
   * tutorial and adjusts screen accordingly.
   */
  nextSlide() {
    if (this.currentStep === 0) {
      $('.gg-tutorial').fadeIn('fast');

      this.currentStep++;
      $('.gg-tutorial-slide' + this.currentStep).delay(800).fadeIn('fast');
    } else {
      this.currentStep++;
      $('.gg-tutorial-slide' + (this.currentStep - 1) ).fadeOut('fast');
      $('.gg-tutorial-slide' + this.currentStep).delay(250).fadeIn('fast');
    }
  }

  /**
   * Navigates to the previous tutorial slide. Allows you to go back to
   * the main introduction screen so you can change your name before 
   * starting the game.
   */
  prevSlide() {
    if (this.currentStep - 1 === 0) {
      $('.gg-tutorial-slide' + this.currentStep).fadeOut('fast');
      $('.gg-tutorial').delay(500).fadeOut('fast');
      this.currentStep--;
    } else {
      this.currentStep--;
      $('.gg-tutorial-slide' + (this.currentStep + 1) ).fadeOut('fast');
      $('.gg-tutorial-slide' + this.currentStep).delay(250).fadeIn('fast');
    }
  }

  /**
   * Navigates to the final slide. Is triggered when the player chooses
   * to skip the tutorial.
   */
  finalSlide() {
      $('.gg-tutorial-slide' + this.currentStep).fadeOut('fast', () => {
        this.currentStep = 4;
      });
      $('.gg-tutorial-slide4').delay(250).fadeIn('fast');
  }

  startGame() {
      $('.gg-tutorial-slide' + this.currentStep).fadeOut('fast');
      $('.gg-tutorial').delay(250).fadeOut('fast');
      $('.gg-intro').delay(500).fadeOut('fast', () => {
        let ggGame = new Game();
        $('.gg-user-interface').removeClass('gg-hide-game');
        $('#gg-game-container').removeClass('gg-hide-game');
        _ggPlayerName = $('.gg-field-input').val();
      });
  }
}

/**
 * Program is driven from this function. Begins once player
 * navigates through the tutorial, or skips it.
 */
$(document).ready( () => {
  $('#gg-game-container').addClass('gg-hide-game');

  $('.gg-intro-button').click( () => {
    _ggNavigation = new Navigation( $('.gg-field-input').val() );
    _ggNavigation.nextSlide();
  })

  $('.gg-button-next').click( () => {
    _ggNavigation.nextSlide();
  })

  $('.gg-button-back').click( () => {
    _ggNavigation.prevSlide();
  })

  $('.gg-skip-tutorial').click( () => {
    _ggNavigation.finalSlide();
  })

  $('.gg-button-start').click( () => {
    _ggNavigation.startGame();
  })
});