const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var i = 0;
var arrData = [...Array(10000)].map(() => {
    i+=1;
    return {
        number: Math.floor(Math.random() * i)
    }
});

let update=1;
let del=2;
let start;
/**
 * 
 */
rl.question('What is update (1) ya delete(2) \n',(user)=>{
    start = Date.now();
    if(user.trim() == update)
    {
        rl.question('enter posision and enter data \n',(position)=>{
            rl.question(`Update position ${position} with number value ? \n`, (numData) => {
                arrData[position] = {
                    "number": parseInt(numData, 10)
                };
                console.log(arrData[position]);
                rl.close();
            })
            // rl.close()
        })
    }
    else if (user.trim() == del) 
    {
        rl.question('enter posision whare is you delete item ? \n',(position)=>{
            arrData.splice(position,1);
            console.log(arrData.length);
            rl.close();
        })
        
    } 
    else {
        rl.close();
    }
});

rl.on("close", function() {
    console.log(arrData);
    console.log(`Time taken by current operation ${Math.floor((Date.now() - start) / 1000)} second or ${Date.now() - start} millisecond.`);
    
});
