const mysql =require('mysql');
const express = require('express');
const path = require('path');
const ejs = require('ejs');
var app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
var flash = require('express-flash');

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
app.use(flash());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

/**
 * get all element
 */
 app.get('/login',(req, res) => {
    res.render('login');
});

app.get('/register',(req, res) => {
    res.render('register');
});

app.post('/auth', function(req, res) {
	var username = req.body.username;
	var password = req.body.password;
	if (username && password) {
		mysqlConn.query('SELECT * FROM user WHERE email = ? AND password = ?', [username, password], function(err,rows, fields) {
			
            if (rows.length <= 0) {
                req.flash('error', 'Please correct enter email and Password!')
                res.redirect('/login')
            }
            else { 
                req.session.loggedin = true;
                req.session.username = username;
                req.flash('success', 'Logged In Successfully')
                res.redirect('/');
            }            
		});
	} else {
        req.flash('error', 'Please provide username and password')
        res.redirect("/login");
		
	}
});

app.post('/register',(req,res) => {
    inputData = {email :req.body.email,password :req.body.psw};
    passwordrep =req.body.pswrepeat;
    var sql='SELECT * FROM user WHERE email =?';
    mysqlConn.query(sql, [inputData.email] ,function (err, data, fields) {
        if(err) throw err
        console.log("hii" + data.length);
        if(data.length>0) {
            req.flash('error',`email was already exist`);
            res.redirect("/register");
        } else if(inputData.password != passwordrep){
            req.flash('error','Password & Confirm Password is not Matched');
            res.redirect("/register");
        } else{

            // save users data into database
            var sql = 'INSERT INTO user SET ?';
            mysqlConn.query(sql, inputData, function (err, data) {
            if (err) throw err;
                });
            req.flash('success','Your are successfully registered');
            res.redirect("/register");
        }
    });
    
});


app.get('/',(req, res) => {
    
    if (req.session.loggedin){
        let sql = "SELECT * FROM employee";
        let query = mysqlConn.query(sql, (err, rows) => {
            if(err) throw err;
            res.render('user_index', {
                title : 'CRUD Operation using NodeJS'+' '+ formatAMPM(),
                employee : rows
            });
        });
    } else {
		res.redirect('/login');
	}
	// res.end();
    
});

app.get('/add',(req, res) => {
    if (req.session.loggedin){
        res.render('user_add', {
            title : 'CRUD Operation using NodeJS'+' '+ formatAMPM(),
        });
    }
    else {
		res.redirect('/login');
	}
	res.end();
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


app.get('/logOut',(req,res) =>{
    req.session.destroy()
    req.flash('success', 'Login Again Here')
    res.redirect('/login')
})
