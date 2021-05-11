const input = document.querySelector("#add");
const  btn = document.querySelector("#btn");
const list = document.querySelector("#list");
var el = document.getElementsByTagName('li');
document.getElementById("date").innerHTML = formatAMPM();



// this function will allow us to add elements when we click the button
btn.onclick = function(){
    
    var txt = input.value;
    if(txt ==''){
        alert('you must write something');
    }else{
        li = document.createElement('li');
        li.innerHTML = txt;
        list.insertBefore(li,list.childNodes[0]);
        input.value = '';
    }
    
};

//this function will allow us to check the clicked elements
list.onlclick = function(ev){
    
         li.removeChild();
    
};

list.ondblclick = function(ev){
    if(ev.target.tagName == 'LI'){
    var editValue = prompt('edit the select item', li.firstChild.nodeValue);
    li.firstChild.nodeValue = editValue;
    }
};


function formatAMPM(){
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    ampm = today.getHours() >= 12 ? 'pm' : 'am';
    return 'DATE :'+ date +' TIME : ' + time +' '+ampm;
};