
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
class Node{
    constructor(value){
      this.value = value;
        this.left = null;
        this.right = null;
        this.parent = null;
    }
}
class BinaryTree{
    constructor()
    {
        this.depth = null;
        this.size = null;     //this.size = Math.pow(2, depth) - 1;
        this.map = [];
        this.root = null;
        this.parent = null;
        this.child = null;
        this.jsonformat = {  }
    }

      randomInt(low, high) {
        return Math.floor(Math.random() * (high - low + 1) + low)
      }

      createTree(depth) {
        this.depth = depth;
        this.size =  Math.pow(2, depth) - 1;   //Size count using (2)(N times) - 1
        var it = 0;

        while(it<this.size){
          this.parent = this.root;
          it++;
          var rndmInt = this.randomInt(1,100);  //Node value vary between 1 to 100
          var node = new Node(rndmInt);
          if(this.root == null){
            this.root = node;
            this.parent = node;
            node.parent = null;
          } else {
            var node1 = this.recursiveCall(node);
            if(node.value <= node1.value){
                node1.left = node;
            }
            if(node.value > node1.value) {
                node1.right = node;
            }
              node.parent = node1;
          }
          this.map[it- 1] = node.value;
        }
        console.log(this.root, this.map);
        return this.root;
      }

      recursiveCall(node) {
        if(this.parent.value < node.value){
          if(this.parent.right === null){
            this.child = this.parent;
            return this.child;
          }
          this.parent = this.parent.right;
        }
        if(this.parent.value >= node.value){
          if(this.parent.left === null){
            this.child = this.parent;
            return this.child;
          }
          this.parent = this.parent.left;
        }
        return this.recursiveCall(node);
      }

      print(){
        console.log(this.map);
      }

      printSumHerarcy(node, sum, numArray, finalSum) {
        if(node === null) {
          if(sum === 0) {
            console.log('Path from root to leaf with sum is',numArray);
          } else {
            console.log(`path ${numArray} is not a root to leaf path with sum ${finalSum}`)
          }
        } else {
          let subSum = sum - node.value;
          
          if(node.parent === null) {
            numArray.push(node.value);
          }

          if(subSum === 0) {
            console.log('Path from root to leaf with sum is',numArray);
          }

          if(node.left) {
            const leftArray = [...numArray];
            leftArray.push(node.left.value);
            this.printSumHerarcy(node.left, subSum, leftArray, finalSum);
          }

          if(node.right) {
            const rightArray = [...numArray];
            rightArray.push(node.right.value);
            this.printSumHerarcy(node.right, subSum, rightArray, finalSum);
          }

        }
      }
}

const binaryTree = new  BinaryTree();
const node = binaryTree.createTree(3);
rl.question('enter sumation \n',(sum)=>{ 
  binaryTree.printSumHerarcy(node, sum, [], sum);
  rl.close();        
})