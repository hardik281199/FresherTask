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

      
}
console.log("jiji");
const matrices = new Matric();
// console.log(hiih);
matrices.printMatrics(3,5);
matrices.setSubMatrices([[13,18],[12,15]]);
// matrices.check();
