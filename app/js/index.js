import {Game} from './game';
var _ggGame, _ggNav;

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
      this.currentStep--
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
      $('.gg-intro').delay(500).fadeOut('fast');
      $('.gg-user-interface').delay(750).fadeIn('fast');
      $('.game-container').delay(750).fadeIn('fast', () => {
        new Game();
      });
  }

}

/**
 * Program is driven from this function. Begins once player
 * navigates through the tutorial, or skips it.
 */
$(document).ready( () => {
  $('.gg-intro-button').click( () => {
    _ggNav = new Navigation( $('.gg-field-input').val() );
    _ggNav.nextSlide();
  })

  $('.gg-button-next').click( () => {
    _ggNav.nextSlide();
  })

  $('.gg-button-back').click( () => {
    _ggNav.prevSlide();
  })

  $('.gg-skip-tutorial').click( () => {
    _ggNav.finalSlide();
  })

  $('.gg-button-start').click( () => {
    _ggNav.startGame();
  })
})