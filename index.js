let Node = function (data){
  this.left=null;
  this.right=null;
  this.data=data;
};

let Tree = function (array){
  this.array=this.removeDuplicates(array.sort((a,b)=>{return a-b}));
  this.root=this.buildTree(this.array, 0 , (this.array.length)-1);
};

Tree.prototype.buildTree = function (array, start, end){

  //base case
  if (start>end) return null;

  //get the middle index and round it 
  let mIndex= Math.round((start+(end))/2);

  //create a root node with the middle index
  let root = new Node(array[mIndex]);

  //recursively obtain the left node
  root.left= this.buildTree(array,start,mIndex-1);

  //recursively obtain the right node
  root.right= this.buildTree(array,mIndex+1,end);

  //return the root node
  return root;
};

Tree.prototype.find = function (value, root){
   //base case 1
   if (root==null) return null;
   //base case 2
   if (value==root.data){
     return root;
   }else if (value>root.data){
     return this.find(value, root.right);
   }else if (value<root.data){
     return this.find(value, root.left);
   };
};

Tree.prototype.insert = function (value, root){
  //Traverse tree to find the next available spot
  //if the value is higher than the current root we need to go to the right of
  //the tree
  if (value>root.data){
    //base case check
    if (root.right==null){
      root.right= new Node(value)
    }else{
      //recursive call still finding an available spot
      this.insert(value, root.right);
    }
  //if the value is lower than the current root we need to go to the left of
  //the tree
  }else if (value<root.data){
    //base case check
    if (root.left==null){
      root.left= new Node(value);
    }else{
      //recursive call still finding an available spot
      this.insert(value, root.left);
    };
  }
  return root;
};

Tree.prototype.delete = function (value, root){
  //check to see if the value being deleted is the root
  if (root.data==value){
    if (root.left!=null && root.right!=null){
      //check to see if the root has two children
      let tempNode = this.nextBiggest(root.right);
      //delete node recursively
      this.delete(tempNode.data, root);
      tempNode.left=root.left;
      tempNode.right=root.right;
      this.root=tempNode;

    } else if (root.left!=null || root.right!=null){
      //check to see if the root has one child
      if (root.left!=null) this.root=root.left;
      if (root.right!=null) this.root=root.right;
    };
  } else if (root.left.data==value && root.left.left==null && root.left.right==null){
    //delete a leaf node
    root.left=null;
  } else if (root.right.data==value && root.right.left==null && root.right.right==null){
    //delete a leaf node
    root.right=null;
    
  }else if (root.left.data==value && root.left.left!=null && root.left.right!=null){
    //delete node with two children
    let tempNode=this.nextBiggest(root.left.right);
    //delete node recursively
    this.delete(tempNode.data, root)
    tempNode.left=root.left.left;
    tempNode.right=root.left.right;
    root.left=tempNode;
  } else if (root.right.data==value && root.right.left!=null && root.right.right!=null){
    //delete node with two children
    let tempNode=this.nextBiggest(root.right.right);
    //delete node recursively
    this.delete(tempNode.data, root)
    tempNode.left=root.right.left;
    tempNode.right=root.right.right;
    root.right=tempNode;
  } else if (root.left.data==value && (root.left.left!=null || root.left.right!=null)){
    //delete node with one child
    if (root.left.left !=null) root.left=root.left.left;
    if (root.left.right !=null) root.left=root.left.right;

  } else if (root.right.data==value && (root.right.left!=null || root.right.right!=null)){
    //delete node with one child
    if (root.right.left!=null && root.right.right==null) root.right=root.right.left;
    if (root.right.right!=null && root.right.left==null) root.right=root.right.right;
    
  }else if (value>root.data){
    //traverse tree
    this.delete(value, root.right);
  }else if (value<root.data){
    this.delete(value, root.left);
  };
};
Tree.prototype.depth = function (node, root, counter=0){
  if (node==root) return counter;
  //If the root is null there is no more depth to recurse through
  if (root==null) return 0;
  return Math.max(this.depth(node,root.left, counter+=1),this.depth(node, root.right, counter+=1));
};
Tree.prototype.height = function (node, counter=0){
  if (node==null) return counter;
  return Math.max(this.height(node.left, counter), this.height(node.right, counter))+1;
};
Tree.prototype.isBalanced = function (){

};
Tree.prototype.rebalance = function (){
  //push each "data" value from every array element to a new array so it can be used in build tree
  this.array=[];
  this.inorder(this.root).forEach((item)=>{
    this.array.push(item.data);
  });
  //remove duplicates from the array
  this.array=this.removeDuplicates(this.array);
  //build new tree
  this.root=this.buildTree(this.array, 0 , (this.array.length)-1);

};
Tree.prototype.levelOrder = function (queue,func){
  if (queue.length==0) return;
  //initalize newQueue
  let newQueue=[];
  while (queue.length>0){
    //get next item in queue
    let first = queue.shift();
    //call the function provided as an argument on the next item
    func(first);
    //add children to the queue
    if (first.left!=null) newQueue.push(first.left);
    if (first.right!=null) newQueue.push(first.right);
  }
  //recursively call level order again with the new queue (next level depth of the tree)
  this.levelOrder(newQueue, func);
};
Tree.prototype.nextBiggest = function (root){
  if (root.left==null) return root;
  return this.nextBiggest(root.left);
};
Tree.prototype.removeDuplicates = function (array){
  let newArray = [];
  array.forEach(item=>{
    if (!newArray.includes(item)){
      newArray.push(item);
    }
  });
  return newArray;
};
Tree.prototype.inorder = function (root, array=[]){
  if (root==null) {
    return;
  }
  this.inorder(root.left, array);
  array.push(root);
  this.inorder(root.right, array);

  return array;
};
Tree.prototype.preorder = function (root, array=[]){
  if (root==null) {
    return;
  }
  array.push(root);
  this.inorder(root.left, array);
  this.inorder(root.right, array);

  return array;
};
Tree.prototype.postorder = function (root, array=[]){
  if (root==null) {
    return;
  }
  this.inorder(root.left, array);
  this.inorder(root.right, array);
  array.push(root);

  return array;
};
//////////////////////////////////////
//Pretty print function is from the assignment
const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
}
///////////////////////////////////

//Test build tree method
let DEFAULTTREE= new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
DEFAULTTREE.insert(14, DEFAULTTREE.root);
DEFAULTTREE.insert(11, DEFAULTTREE.root);
prettyPrint(DEFAULTTREE.root);
console.log(DEFAULTTREE.isBalanced());
DEFAULTTREE.rebalance();

//prints tree nicely (leave at the end of this script)
prettyPrint(DEFAULTTREE.root);