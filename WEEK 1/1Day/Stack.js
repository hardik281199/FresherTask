function multiply(a,b){
    return a*b;
}
function squar(n){
    return multiply(n,n)
}
function printSquar(n){
    var sqared =squar(n);
    console.log(sqared);
}
printSquar(4);