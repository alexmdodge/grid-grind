/*

Best Practices --
As more developers migrated to ECMAScript 6, an alternate approach gained popular-
ity: use const by default and only use let when you know a variable’s value needs to change.
The rationale is that most variables should not change their value after initialization because
unexpected value changes are a source of bugs. This idea has a significant amount of traction
and is worth exploring in your code as you adopt ECMAScript 6.

*/

function hasCollided {

   if (player.getPos() == obstacle.getPos()) {
      var isDead = true;
      return isDead;
   } else {
      return null;
   }

   // This actually is generated as

   var isDead;

   if (. . .) {
      isDead = true;
      return isDead;
   } else {
      return null;
   }

   /* So the variables exists but is undefined. This is known as HOISTING
    * LET allows you to define the scope inside of block level statements
    * CONST declarations are not hoisted.
    */

   // Notice how you can use the var outside, and the local declaration inside
   var isDead = false;

   // You also have the ability to define constants now, must be given value
   // upon declaration.
   const isAlwaysDead = true;

   if (player.getPos() == obstacle.getPos()) {

      let isDead = true;
      return isDead;

   } else {

      return null;
      // isDead undefined here
   }

   // Objects can also be defined using the constant declaration, and will become immutable.
   const player {
      alive: true;
   }

   // NOTE : You cannot reference CONST and LET declared objects until after their declaration,
   // similar to procedural programming languages.
   console.log(player.alive);



   /*  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *
    * Block Bindings in Loops
    * 
    * Another tricky situation. Typically the loop counter displays block level behaviour, but
    * in traditional ES5 it doesn't.
    *
    *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  */

   for (var i = 0; i <= currentObs.length() - 1; i++) {
      console.log("Obstacle " + (i+1) + " is " + currentObs[i]);
   }

   // Crazy thing is that after you can still do. It will output whatever the final value is.
   console.log(i);

   // You can now define the variable with the LET declaration
   for (let i = 0; i <= currentObs.length() - 1; i++) {
      console.log("Obstacle " + (i+1) + " is " + currentObs[i]);
   }


   // It was also more tedious when assigning a for loop index to stored variables, as they all
   // became aliases of one another due to the same reference.


   var checkObs = [];

   for (var i = 0; i <= currentObs.length(); i++) {
      checkObs.push ( ( function(value) {
         return function() {
            console.log("Object" + (value+1) " is checked.")
         } 
      }(i)));
   }

   // These are known as immediately invoked function expressions and cause a new instance
   // of the variable to be returned each time due to the return feature.
   checkObs.forEach (function(singleObs) {
      singleObs(); // Will output true if object is currently on the playing field
   });

   // ES6 CHANGES : This becomes so much easier with the let declaration
   
   var checkObs = [];

   for (let i = 0; i <= currentObs.length(); i++) {
      checkObs.push ( function() {
         console.log("Object" + (i+1) " is checked.")
      });
   }

   // These are known as immediately invoked function expressions and cause a new instance
   // of the variable to be returned each time due to the return feature.
   checkObs.forEach (function(singleObs) {
      singleObs(); // Will output true if object is currently on the playing field
   });






   // It is also more efficient to use the LET declaration in for-in loops
   var readPlayers = [],
       playerStat = {
         life: 120; // Out of 200
         name: "alex";
         level: 4;
       };

   for (let key in playerStat) {
      readPlayers.push ( function() {
         console.log(key);
      })
   }

   readPlayers.forEach(function(readPlayer) {
      readPlayer();
   }


   // Note that you can use CONST declarations in these loops as well. In a FOR loop
   // it only executes once. In a for-in or for-of, a new binding is created each time
   // so you can use a const variable.
}