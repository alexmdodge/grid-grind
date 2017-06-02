/* eslint import/no-unresolved: [2, { ignore: ['pixi|p2$'] }] */
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
import 'pixi';  // eslint-disable-line import/no-extraneous-dependencies
import 'p2';  // eslint-disable-line import/no-extraneous-dependencies
import 'phaser';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GameUI from './game-ui/game-ui';
import GridGrind from './game-state';
import './game.scss';

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

    // this.WebFontConfig = {
    //   active() { game.time.events.add(Phaser.Timer.SECOND, createText, this); },
    //   google: {
    //     families: ['Fjalla One'],
    //   },
    // };
  }
}

export default class GameContainer extends Component {
  constructor() {
    super();
    this.state = {
      score: 0,
    };
  }

  renderActive() {
    if (!this.props.gameActive) {
      this.gg = new Game();
      return 'gg-game--hidden';
    }
    return '';
  }

  render() {
    return (
      <div className={`gg-game ${this.renderActive()}`}>
        <GameUI />
        <div id="gg-game-container" />
      </div>
    );
  }
}

GameContainer.propTypes = {
  gameActive: PropTypes.bool.isRequired,
};
