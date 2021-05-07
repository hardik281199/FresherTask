const generateTreeNodeValue = () => (Math.floor(Math.random() * 100) + 1);
const getTotalNumberOfNodesOnGivenDepth = (depth) => Math.pow(2, depth);
​
function generateTree(){
    const tree = { value: generateTreeNodeValue(), depth: 1, children: {} };
    const depth = 4;
    for (let i = 2; i <= depth; i++) {
        const totalNodes = getTotalNumberOfNodesOnGivenDepth(i);
        for (let j = 1; j <= totalNodes; j++) {
            insertNode(tree, i);
        }
    }
    console.log('Tree JSON', JSON.stringify(tree, null, 2));
    console.log('======================== Printing The Tree Nodes ========================');
    printTree(tree);
}
​
const insertNode = (tree, depth) => {
    if (tree.depth === depth - 1) {
        if (!tree.children.left) {
            const nodeValue = generateTreeNodeValue();
            tree.children.left = { value: nodeValue, depth, children: {} };
            return true;
        }
        if (!tree.children.right) {
            const nodeValue = generateTreeNodeValue();
            tree.children.right = { value: nodeValue, depth, children: {} };
            return true;
        }
    } else {
        const isInserted = insertNode(tree.children.left, depth);
        if (!isInserted) {
            return insertNode(tree.children.right, depth);
        }
    }
}
​
const printTree = (tree) => {
    const treeClone = JSON.parse(JSON.stringify(tree));
    if (treeClone.children.left && treeClone.children.right) {
        console.log(`${tree.value} ==> ${treeClone.children.left.value}, ${treeClone.children.right.value}`);
        printTree(treeClone.children.left);
        printTree(treeClone.children.right);
    }
}
​
generateTree();
