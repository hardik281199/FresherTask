const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var arrData = new Array(10000).fill({
    "number": 0
});

let update=1;
let del=2;

/**
 * 
 */
rl.question('What is update (1) ya delete(2) \n',(user)=>{
    console.log(user.trim());
    if(user.trim() == update)
    {
        rl.question('enter posision and enter data \n',(position)=>{
            rl.question(`Update position ${position} with number value ? \n`, (numData) => {
                arrData[position] = {
                    "number": numData 
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
});
