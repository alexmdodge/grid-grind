// A node container object which wraps the current tile with information
// about whether it has already been stored in the color tree
export class ColorNodeContainer {
  constructor(colorTile) {
    this.tile = colorTile;
    this.matched = false;
  }
}

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
    const node = new ColorNode(data);
    const parent = toNodeData ? this.findBFS(toNodeData) : null;

    // As a reminder null will return false, and any object
    // will return true, even with no data assigned.
    if (parent) {
      parent.children.push(node);
    } else if (!this.root) {
      // If this is the top level and a root hasn't been assigned
      // the node will be assigned to it
      this.root = node;
    } else {
      return 'Root node is already assigned';
    }

    return 'Success';
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
    if (this.root.data === data) {
      this.root = null;
    }

    // Initializes array named queue with node object which
    // contains a sub array of all child nodes
    const queue = [this.root];

    // While there are entries in the queue then continue
    // At most is O(n) where n is the number of nodes in
    // the tree
    while (queue.length) {
      // Removes the node in the queue at index 0
      const node = queue.shift();

      // Iterate through the child nodes in the current
      // array and check if they contain the data.
      for (let i = 0; i < node.children.length; i += 1) {
        if (node.children[i].data === data) {
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
    return !!this.findBFS(data);
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
    const queue = [this.root];

    // Initiate same search as in the remove method
    while (queue.length) {
      const node = queue.shift();

      if (node.data === data) {
        return node;
      }
      for (let i = 0; i < node.children.length; i += 1) {
        queue.push(node.children[i]);
      }
    }

    // If no node found then it will return null by default
    return null;
  }

  /*
   * preOrder
   *
   * Uses a recursive approach to search the tree depth first
   * Will execute the function of the highest node first
   *
   */
  preOrder(node, fn) {
    if (node) {
      if (fn) {
        fn(node);
      }

      // For each element in the child array it will
      // continue to dive deeper until null is returned
      for (let i = 0; i < node.children.length; i += 1) {
        this.preOrder(node.children[i], fn);
      }
    }
  }

  /*
   * postOrder
   *
   *  Uses a recursive approach to search the tree depth first
   *  Will execute the function of the lowest node first
   *
   */
  postOrder(node, fn) {
    if (node) {
      for (let i = 0; i < node.children.length; i += 1) {
        this.postOrder(node.children[i], fn);
      }
      if (fn) {
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
    const current = this.root;

    if (method) {
      this[method](current, fn);
    } else {
      this.preOrder(current, fn);
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
    const queue = [this.root];
    while (queue.length) {
      const node = queue.shift();
      if (fn) {
        fn(node);
      }
      for (let i = 0; i < node.children.length; i += 1) {
        queue.push(node.children[i]);
      }
    }
  }
}
