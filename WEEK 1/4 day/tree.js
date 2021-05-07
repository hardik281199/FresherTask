
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

class Node {
    constructor(data, left = null, right = null) {
      this.data = data;
      this.left = left;
      this.right = right;
    }
}

class BST {
    constructor() {
      this.root = null;
    }
    
    add(data) { 
      const node = this.root;
      if (node === null) 
      {
        this.root = new Node(data);
        return;
      } else {
        const searchTree = function(node) {
          if (node.left === null) {
            node.left = new Node(data);
          } else if(node.right === null) {
            node.right = new Node(data);
          }
          return node.left;
          // if (data < node.data) {
          //   if (node.left === null) {
          //     node.left = new Node(data);
          //     return;
          //   } else if (node.left !== null) {
          //     return searchTree(node.left);
          //   }
          // } else if (data > node.data) {
          //   if (node.right === null) {
          //     node.right = new Node(data);
          //     return;
          //   } else if (node.right !== null) {
          //     return searchTree(node.right);
          //   }
          // } else {
          //   return null;
          // }
        };
        this.root = searchTree(node);
        return;
      }
    };
    
    dfsPostOrder() {
      let result = []
  
      const traverse = node => {
        
        if (node.left){
          traverse(node.left)
        }
        if (node.right) {
          traverse(node.right)
        }
        
        result.push(node.value)
      }
  
      traverse(this.root)
  
      return result   
    };
    
    levelOrder() {
      let result = [];
      let Q = []; 
      if (this.root != null) {
          Q.push(this.root);
          while(Q.length > 0) {
              let node = Q.shift();
              result.push(node.data);
              if (node.left != null) {
                  Q.push(node.left);
              };
              if (node.right != null) {
                  Q.push(node.right);
              };
          };
          return result;
      } else {
          return null;
      };
  };

  // addAuto(){
  //   rl.question('enter level tree \n',(level)=>{
  //     let l = parseInt(Math.pow(2,level)) - 1 ;
  //     let i = 1;
  //     const node = this.root;
  //     for(i;i <= l ;i++){
  //       var data = i;
  //       console.log(data);
  //       if ( node === null){
  //         this.root = new Node(data);
  //         return;
  //       }
  //       else{
  //         const searchAutoTree = function(node){
  //           // if (node.left === null) {
  //           //   node.left = new Node(data);
  //           //   return;
  //           // } else if (node.left !== null) {
  //           //   return searchAutoTree(node.left);
  //           // }else if(node.right === null) {
  //           //   node.right = new Node(data);
  //           //   return;
  //           // } else if (node.right !== null) {
  //           //   return searchAutoTree(node.right);
  //           // }
  //           // else {
  //           //   return null;
  //           // }

  //           if (node.left === null){
  //             node.left = new Node(data);
  //             return ;
  //           }
  //           else if (node.right === null){
  //             node.right = new Node(data);
  //             return;
  //           }
  //           else{
  //             return null;
  //           }
  //         };
  //         return searchAutoTree(node);
  //       }

  //     }
  //   })
  // };



  autoInsert(data){
    const node = this.root;
      if (node === null) 
      {
        this.root = new Node(data);
        return;
      }else{

        let newNode = new Node(data);
        const searchAutoInsertTree = function(node) {
          if(node.left ===null){
            node.left = newNode;
          }
        }

      }

  }
}

const bst = new BST();
// bst.add(22);
// bst.add(23);
// bst.add(21);
// bst.add(24);
// bst.add(25);
// bst.add(20);
// bst.add(13);
rl.question('enter level tree \n',(level)=>{
  let l = parseInt(Math.pow(2,level)) - 1 ;
  // console.log(l);
  let i = 1;  
  for(i;i <= l ;i++){
    bst.add(i);
  }
  bst.levelOrder();
  rl.close();
});