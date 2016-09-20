# GRID GRIND
<img src="http://i.imgur.com/WSyzRU2.png" width="800px">

## Table of Contents
* [Game Info](#game) <br>
* [Demo](#demo) <br>
* [Usage](#usage) <br>
* [Updates & To-do](#todo)

<h2>
	<a name="game" aria-hidden="true" class="anchor"></a>
	Game Info
</h2>
This game works by matching chains of color tiles. I'm still working out some of the finer details, but the main idea is that in each level you must accrue a certain number of points to continue on. If you don't obtain enough points by the time your tries are up, then you lose the game. 

Another aspect is that the order in which the blocks rotate will be different for each level

<h2>
	<a name="demo" aria-hidden="true" class="anchor"></a>
	Demo
</h2>
This game is still under construction, but a demo version of the game will be available at apps.alexmdodge.ca/gridgrind

<h2>
	<a name="usage" aria-hidden="true" class="anchor"></a>
	Usage
</h2>
This game leverages Phaser, jQuery, and a couple of other pieces to make it go!

```
npm install
bower install
```

To get started. Then use your gulpfile to run the build and try it out yourself,

```
gulp
```

<h2>
	<a name="todo" aria-hidden="true" class="anchor"></a>
	Updates & To-do
</h2>
There are a number of upcoming features listed here!

* Finish first level game state
  * Number of tries
  * Intro screen with game name
  * Progress points bar or similar
  * Block patter hint in bottom
  * Point chain for certain color chain lengths
* Multi level game states
  * Accumulated total
  * Player name on end message
  * Simple db for storing wins and score
  * Random pattern frame each level
  * Explosion tile hidden in pattern
  * Obstacles in later levels
  * Timer for later levels
