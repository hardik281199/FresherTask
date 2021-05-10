class Palindrome {
    constructor() {
      this.map = new Map();
      this.stringMap = new Map();
      this.start = null;
      this.end = null;
      this.string = null;
    }
  
  
    checkPalindrome(string,start,end){
        this.string = string;
        this.start = start;
        this.end = end;
        var remainString = "";
        var generatedString = "";
        var allEven = true;
        var oddChar = null;
  
        for(var i = start; i< end;i++){
          var char = string.charAt(i);
          if(this.map.has(char)){
            var j = this.map.get(char) + 1;
            this.map.set(char,j);
          } else {
            this.map.set(char,1);
          }
          var c = i-start;
          this.stringMap.set(c,char);
        }
  
        for(var [key,value] of this.map){
          if((this.map.get(key) % 2) === 0){
            this.map.set(key,this.map.get(key)/2);
            remainString = remainString + key;
            continue;
          } else {
            if(allEven){
              this.map.set(key,this.map.get(key)/2-0.5);
              if(this.map.get(key)/2 >0){
                remainString = remainString + key;
              }
              allEven = false
              oddChar = key;
              continue;
            } else {
              return "This String "+ this.string +" can not make Palindrome String";
            }
          }
        }
        //console.log(remainString);
  
        var j = 0;
        if(allEven){
            j = (end-start)/2;
        } else {
          j = (end-start)/2 + 0.5;
        }
        for(var i = 0; i< j;i++){
          var rndm = this.randomInt(0,remainString.length);
          char = remainString.charAt(rndm);
          if(this.map.get(char) < 1){
            i = i-1;
            continue;
          } else {
            this.map.set(char,this.map.get(char)-1);
            generatedString = generatedString + char;
          }
        }
  
        if(allEven){
          generatedString = generatedString + generatedString.split("").reverse().join("");
        } else {
          generatedString = generatedString + oddChar + generatedString.split("").reverse().join("");
        }
        // console.log(generatedString);
        //
        //
        // console.log(this.map);
        //
        // console.log(this.stringMap);
        return "Palindrome String - "+ generatedString + " For input String " + this.string;
    }
  
    randomInt(low, high) {
      return Math.floor(Math.random() * (high - low + 1) + low)
    }
  }
  
  const palindromeStartToEnd = new Palindrome();
 
  var pl =  palindromeStartToEnd.checkPalindrome("aaaabbbbccccddd",0,15);
  console.log(pl);

  var pl1 =palindromeStartToEnd.checkPalindrome("geeksforgeeks",0,10);
  console.log(pl1);
  