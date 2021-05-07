class StringEqal{
    

    stringMach(str,arry){
        const count =0;
        for (const iterator of arry) {
            if(str === iterator){
                console.log(`string <${iterator}> is equal to other`);
                break;
            }
        }
        // arry.forEach(check);

        // function check(value){
            // console.log(value);

            // else{
            //     console.log("string is not equal to other");
            // }
        // }


    }
    stringRemove(ar){
        const duplicates = new Set();
        for (const valus of ar) {
            if(duplicates.has(valus)){
                continue;
            }else{
                duplicates.add(valus);
            }
            
        }
        console.log(duplicates);

    }

}

const stringeqal = new StringEqal();
const a = ['bhautik','nehil','mihir','bhavin','hardik','hardik','bhautik','nehil','mihir','bhavin'];
stringeqal.stringMach("hardik",a);
stringeqal.stringRemove(a);
