const readline = require('readline');
var util = require('util');

var RL = readline.createInterface(process.stdin, process.stdout);
RL.question('What is your name? ', (name)=>{
    RL.setPrompt(`${name} How old are you? `);
    RL.prompt();
    RL.on('line', (age)=>{
        if(age<18)
        {
            console.log(`${name.trim()} because you are ${age} years old, you cannot procees`);
            RL.close();
        }
        else
        {
            console.log(`${name.trim()} is great because you are ${age} years old, you can enjoy our services`);		
            RL.close();
        }
    })
});