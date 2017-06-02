/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *
 *                              []     [][][] []  [] [][][] []     [][][]
 *  Author: Alex Dodge          []     []     []  [] []     []     []
 *  Date: April 17, 2017        []     [][]   []  [] [][]   []     [][][]
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

export default class Level {
  /* Constructor */
  constructor(currentLevel, gameSize, spriteSize) {
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
  getGridSize() {
    if (this.currentLevel < 1) {
      return -1; // Indicates level error
    }
    return this.currentLevel + 2; // If level 1, 3 blocks per row, 3 columns
  }

  /*
   * getMoves
   *
   * Returns the number of moves available to the player
   */
  getMoves() {
    if (this.currentLevel < 1) {
      return -1; // Indicates level error
    }
    return (this.currentLevel * 2) + 5; // Increase by 2, start at 6
  }

  /*
   * getMoves
   *
   * Returns the number of points to complete the level
   */
  getPoints() {
    if (this.currentLevel < 1) {
      return -1; // Indicates level error
    }
    // Increase by square, start at 4
    return (this.currentLevel * this.currentLevel) + (3 * this.currentLevel);
  }

  /*
   * getBlockSize
   *
   * Returns the side length of the block for the current level size.
   * First divides the game size into chunks according to the grid size
   * then the padding is subtracted from each to account for it in the drawing
   * function.
   */
  getBlockSize() {
    const size = Math.floor((this.gameSize / this.getGridSize()) - 5);

    if (size < 0) {
      return -1; // indicates error
    }
    return size;
  }

  /*
   * getBlockScale
   *
   * The source image for the spritesheet determines the physical pizel size
   * of the blocks. This function determines what scale factor is needed for
   * the size of the game. Will change dynamically depending of game size, even
   * when scaled.
   */
  getBlockScale() {
    return (this.getBlockSize() / this.spriteSize);
  }
}
