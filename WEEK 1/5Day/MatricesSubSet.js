class Matric{
    constructor(){
        this.cols = null;
        this.rows = null;
        this.matrices = [];
        this.subMatrices = [];
        this.foundMatrices = [];
        this.mapMat = {};
    }

    randomInt(low, high) {
        return Math.floor(Math.random() * (high - low + 1) + low)
    }


    printMatrics(cols, rows){
        this.cols = cols;
        this.rows = rows;
    
        if(cols == null && rows == null ){
          return;
        }
        for(var i = 0 ;i < rows; i++ ){
            var matrices = []
            var str='';
            for(var j = 0; j < cols; j++){
              var rndm = this.randomInt(1,25);
              matrices[j] = rndm;
              if (rndm.toString().length == 1) {
                  rndm = "0" + rndm;
              }
              str = str + rndm + '  ';
            }
            console.log(str);
            this.mapMat[i] = matrices
            this.matrices[i] = matrices
        }
        //  console.log(this.mapMat);
    }

    setSubMatrices(subMat){
        if(this.subMatrices !== []){
            this.subMatrices = []
        }
        this.subMatrices = subMat;
        console.log(this.subMatrices);
      }
    check(){
        var arrayFound = this.checkBoth();
        var rowsSub1 = this.subMatrices.length;
        var colsSub1= this.subMatrices[0].length;
        var lastMat = this.subMatrices[rowsSub1-1];
        if(typeof arrayFound[0] == 'undefined'){
            console.log("its not a subset");
        }else{
            var mar = this.matrices[arrayFound[0]];
            var val = mar[arrayFound[1]];
            if(val === lastMat[colsSub1-1]){
              console.log("Hurray its a sub matrices");
            } else {
              console.log("its not a subset");
            }
        }
    
    
    }
    
    checkBoth(){
        var x,y;
        var a = null;
        var b = null;  // a indicate row and b indicate column
        var fp = this.subMatrices[0];
        var firstPoint = fp[0];
        console.log(firstPoint);
        var rowsSub = this.subMatrices.length;
        var colsSub = this.subMatrices[0].length;
        for(var i = 0 ;i < this.rows; i++ ){
          var matrSub = this.matrices[i];
          for(var j=0;j< this.cols;j++){
                if(firstPoint == matrSub[j]) {
                  x = i;
                  y = j;
                  console.log(x +"   "+y);
                  for(var m = 0;m<this.rows;m++){
                    // same j
                      var fs = this.matrices[m];
                      for(var k = 0;k<rowsSub;k++){
                          var fk = this.subMatrices[k];
                          if(k==0){
                            continue;
                          }
                          if(fk[0] == fs[j]){
                            a = m;
                          } else {
                            continue;
                          }
                        }
                  }
                  for(var n = 0; n<this.cols;n++){
                    var as = this.matrices[i]; //same i
                      for(var l = 0;l<colsSub;l++){
                        if(l==0){
                          continue;
                        }
                        if(fp[l] == as[n]){
                          b = n;
                        } else {
                          continue;
                        }
                      }
                  }
                  if(a !== null && b != null){
                    this.foundMatrices[0] = a;
                    this.foundMatrices[1] = b;
                  }
                } else {
                  continue;
                }
          }
        }
        return this.foundMatrices;
      }
    
      
}
// console.log("jiji");
const matrices = new Matric();
// console.log(hiih);
matrices.printMatrics(3,5);
matrices.setSubMatrices([[13,18],[12,15]]);
matrices.check();
