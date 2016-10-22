/* globals console */
/* jshint esversion: 6 */

/*
 * Node
 *
 * The node object has a data element and an array which
 * contains an array with all of the connected child nodes
 *
 */
export class ColorNode {
   
   constructor(data) {
      this.data = data;
      this.children = [];
   }
}

/*
 * ColorTree
 *
 * The main tree objects which contains a number of helpful
 * methods for adding, removing, and manipulating nodes.
 *
 */
export class ColorTree {
   
   constructor() {
      this.nodeCount = 0;
      this.root = null;
   }

   /*
    * add
    *
    * This function adds nodes to the tree
    *
    */
   add(data, toNodeData) {
      
      // Creates a node with the data stored and uses the
      // breadth first search
      var node = new ColorNode(data);
      var parent = toNodeData ? this.findBFS(toNodeData) : null;
      
      // As a reminder null will return false, and any object
      // will return true, even with no data assigned.
      if(parent) {
         parent.children.push(node);
      } else {

         // If this is the top level and a root hasn't been assigned
         // the node will be assigned to it
         if(!this.root) {
            this.root = node;
         } else {
            return 'Root node is already assigned';
         }
      }
   }

   /*
    * remove
    *
    * searches the tree for the node with the particular data
    * and removes it.
    *
    */
   remove(data) {
     
      // Checks if the data in the root is the requested
      // data to delete, not that it does not remove references
      if(this.root.data === data) {
         this.root = null;
      }

      // Initializes array named queue with node object which
      // contains a sub array of all child nodes
      var queue = [this.root];

      // While there are entries in the queue then continue
      // At most is O(n) where n is the number of nodes in
      // the tree
      while(queue.length) {

         // Removes the node in the queue at index 0
         var node = queue.shift();
         
         // Iterate through the child nodes in the current
         // array and check if they contain the data.
         for(var i = 0; i < node.children.length; i++) {

            if(node.children[i].data === data) {

               // If data found splice it from current child node
               // array
               node.children.splice(i, 1);

            } else {

               // If data not found add the child node to the queue
               // and the search continues
               queue.push(node.children[i]);
            }
         }
      }
   }

   /*
    * contains
    *
    * searches the tree for the data using the breadth first
    * search
    *
    */
   contains(data) {
     return this.findBFS(data) ? true : false;
   }

   /*
    * findBFS
    *
    * uses a breadth first search to find the node
    * associated with the data
    *
    */
   findBFS(data) {

      // Grab the root node to start the search
      var queue = [this.root];
      
      // Initiate same search as in the remove method
      while(queue.length) {

       var node = queue.shift();

       if(node.data === data) {
         return node;
       }
       for(var i = 0; i < node.children.length; i++) {
         queue.push(node.children[i]);
       }
     }

     // If no node found then it will return null by default
     return null;
   }

   /*
    * _preOrder
    *
    * Uses a recursive approach to search the tree depth first
    * Will execute the function of the highest node first
    *
    */
   _preOrder(node, fn) {
      if(node) {
         if(fn) {
            fn(node);
         }

         // For each element in the child array it will
         // continue to dive deeper until null is returned
         for(var i = 0; i < node.children.length; i++) {
            this._preOrder(node.children[i], fn);
         }
      }
   }

   /*
    * _postOrder
    *
    *  Uses a recursive approach to search the tree depth first
    *  Will execute the function of the lowest node first
    *
    */
   _postOrder(node, fn) {
     if(node) {
       for(var i = 0; i < node.children.length; i++) {
         this._postOrder(node.children[i], fn);
       }
       if(fn) {
         fn(node);
       }
     }
   }

   /*
    * traverseDFS
    *
    * Traverses the tree in a depth first search implementing a custom
    * function for each of the nodes visited
    *
    */
   traverseDFS(fn, method) {
     var current = this.root;


     if(method) {
       this['_' + method](current, fn);
     } else {
       this._preOrder(current, fn);
     }
   }

   /*
    * traverseBFS
    *
    * Traverses the tree in a breadth first search implementing a custom
    * function for each of the nodes visited. Uses same queue searching method
    *
    */
   traverseBFS(fn) {
     var queue = [this.root];
     while(queue.length) {
       var node = queue.shift();
       if(fn) {
         fn(node);
       }
       for(var i = 0; i < node.children.length; i++) {
         queue.push(node.children[i]);
       }
     }
   }
}
