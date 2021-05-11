const mysql =require('mysql');
const express = require('express');
const path = require('path');
const ejs = require('ejs');
var app = express();
const bodyParser = require('body-parser');

// app.use(bodyparser.json());


var mysqlConn = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Hardik@123',
    database:'project_db'
});

mysqlConn.connect((err)=>{

    if(!err){
        console.log('db connection success');
    }
    else{
        console.log('db connection failed \n');
    }
}); 

app.listen(3000,()=> console.log('Exapress server is runing at port no :3000'));

function formatAMPM(){
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    ampm = today.getHours() >= 12 ? 'pm' : 'am';
    return 'DATE :'+ date +' TIME : ' + time +' '+ampm;
};

//set views file
app.set('views',path.join(__dirname,'views'));
			
//set view engine
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


/**
 * get all element
 */
app.get('/',(req, res) => {
    // res.send('CRUD Operation using NodeJS / ExpressJS / MySQL');
    let sql = "SELECT * FROM employee";
    let query = mysqlConn.query(sql, (err, rows) => {
        if(err) throw err;
        res.render('user_index', {
            title : 'CRUD Operation using NodeJS'+' '+ formatAMPM(),
            employee : rows
        });
    });
});

app.get('/add',(req, res) => {
    res.render('user_add', {
        title : 'CRUD Operation using NodeJS'+' '+ formatAMPM(),
    });
});
 
app.post('/save',(req, res) => { 
    let data = {emp_name: req.body.name, emp_salary: req.body.salary,emp_city: req.body.city};
    let sql = "INSERT INTO employee SET ?";
    let query = mysqlConn.query(sql, data,(err, results) => {
      if(err) throw err;
      res.redirect('/');
    });
});
 
app.get('/edit/:id',(req, res) => {
    const eId = req.params.id;
    let sql = `Select * from employee where id = ${eId}`;
    let query = mysqlConn.query(sql,(err, result) => {
        if(err) throw err;
        res.render('user_edit', {
            title : 'CRUD Operation using NodeJS / ExpressJS / MySQL',
            employee : result[0]
        });
    });
});
 
 
app.post('/update',(req, res) => {
    const eId = req.body.id;
    let sql = "update employee SET emp_name='"+req.body.name+"',  emp_salary='"+req.body.salary+"',  emp_city='"+req.body.city+"' where id ="+eId;
    let query = mysqlConn.query(sql,(err, results) => {
      if(err) throw err;
      res.redirect('/');
    });
});
 
 
app.get('/delete/:id',(req, res) => {
    const eId = req.params.id;
    let sql = `DELETE from employee where id = ${eId}`;
    let query = mysqlConn.query(sql,(err, result) => {
        if(err) throw err;
        res.redirect('/');
    });
});







//Get an employess
// app.get('/employees',(req,res)=>{
//     mysqlConn.query('SELECT * FROM employee',(err,rows,fields)=>{
//         if(!err){
//             //console.log(rows);
//             res.send(rows);
//         }
//         else{
//             console.log(err);
//         }
    
//     })
// });


// // app.get('/employees/:id',(req,res)=>{
// //     mysqlConn.query('SELECT * FROM employee where id =?',[req.params.id],(err,rows,fields)=>{
// //         if(!err){
// //             //console.log(rows);
// //             res.send(rows);
// //         }
// //         else{
// //             console.log(err);
// //         }
    
// //     })
// // });

// app.delete('/employees/:id',(req,res)=>{
//     mysqlConn.query('DELETE FROM employee where id =?',[req.params.id],(err,rows,fields)=>{
//         if(!err){
//             //console.log(rows);
//             res.send(rows);
//         }
//         else{
//             console.log(err);
//         }
    
//     })
// });