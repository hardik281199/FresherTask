class StringFrequency {
    constructor() {
        this.freq = {}
        this.string = null;
    }
    
    getFrequency(string) {
        this.string = string.trim();
        // console.log(string.trim());
        var freq = this.freq;
        // console.log(string.length);
        for (var i=0; i<string.length;i++) {
            var character = string.charAt(i);
            console.log(string.charAt(i));
            console.log(freq[character]);
            if (freq[character]) {
               freq[character]++;
            } else {
               freq[character] = 1;
            }
        }
          return this.checkEqual()
    }
    
    checkEqual(){
        var character = this.string.charAt(0);
        var frequency = this.freq[character];
        for(var key in this.freq){
          if(frequency === this.freq[key]){
            continue;
          }
          return false
        }
        return true;
    }
}

const f = new StringFrequency();
var a = f.getFrequency("bbbbaaaaccccdddd");
if(a === true){
    console.log("Given String has equal number of frequency");
} else {
    console.log("Given String has not equal number of frequency");
}
  