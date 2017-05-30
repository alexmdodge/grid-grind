<img src="http://i.imgur.com/QWTyTsK.png" width="900px">

## [Try it out here!](https://www.alexmdodge.ca/games/grid-grind/app/) </h1>
## Table of Contents
* [Game Info](#game) <br>
* [Usage](#usage) <br>
* [Updates & To-do](#todo)

<h2>
	<a name="game" aria-hidden="true" class="anchor"></a>
	Game Info
</h2>
### Version 0.9.0

### *How to Play* <img src="http://image.flaticon.com/icons/png/512/25/25400.png" width="20px">

Click any of the color blocks and watch them change to the next color. Use the **help menu** on the side to determine which order the blocks will change in. The idea is that you have to be **careful** in what order you change the blocks as you might trigger a smaller chain and can't beat the level.

### *Objective* <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Ok_sign_font_awesome.svg/600px-Ok_sign_font_awesome.svg.png" width="25px">
The objective of this game is to obtain points by clicking the blocks and creating chains of the same color. If a chain is only three colors long then only 1 point is given for each block. As the chains get bigger, the points obtained per block get bigger and bigger. You'll need to use this to your advantage in order to beat the levels.

### *Moving to the Next Level* <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Plus_sign_font_awesome.svg/512px-Plus_sign_font_awesome.svg.png" width="25px">
In order to move to the next level you have to achieve a minimum number of points. Your progress is tracked by the experience bar at the top.

<h1>
	<a name="usage" aria-hidden="true" class="anchor"></a>
	Usage
</h1>
This game leverages Phaser, jQuery, and a couple of other pieces to make it go! To get started ensure NodeJS is installed and up to date, then run,

`npm install`

You can then use the gulpfile to run the build and try it out yourself,

`gulp`

If you've made a contribution and want to run the tests use,

`npm test`

The tests are written with Mocha using Chai expect.

<h1>
	<a name="todo" aria-hidden="true" class="anchor"></a>
	Updates & To-do
</h1>
There are a number of upcoming features listed here!

* Finish first level game state
  * ~~Number of tries~~
  * Intro screen with game name
  * ~~Progress points bar or similar~~
  * ~~Block pattern hint in bottom~~
  * Point chain for certain color chain lengths
* Multi level game states
  * ~~Accumulated total~~
  * ~~Player name on end message~~
  * Simple db for storing wins and score
  * ~~Random pattern frame each level~~
  * Explosion tile hidden in pattern
  * Obstacles in later levels
  * Timer for later levels
* User Interface
  * ~~Remove interface from game and bring it into the DOM~~
  * Add help tutorial and instructions on side menu
  * Markup for level success
  * ~~Design percentage bar for level completion~~
