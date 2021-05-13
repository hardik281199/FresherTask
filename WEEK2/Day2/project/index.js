const mysql =require('mysql');
const express = require('express');
const path = require('path');
const ejs = require('ejs');
var app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
var flash = require('express-flash');

/**
 * connection to my sql database
 */
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
    // cookie: { maxAge: 60000},
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

/**
 * get login
 */
 app.get('/login',(req, res) => {
    res.render('login');
});

/**
 * get register
 */
app.get('/register',(req, res) => {
    res.render('register');
});


/**
 * login user data save in database
 */
app.post('/auth', function(req, res) {
	var username = req.body.username;
	var password = req.body.password;
	if (username && password) {
		mysqlConn.query('SELECT * FROM user WHERE email = ? AND password = ?', [username, password], function(err,rows) {
			
            if (rows.length <= 0) {
                req.flash('error', 'Please correct enter email and Password!')
                res.redirect('/login')
            }
            else { 
                console.log(rows[0].id);
                // req.session.loggedin = true;
                // req.session.username = username;
                // req.flash('success', 'Logged In Successfully')
                  
                mysqlConn.query('SELECT * from user_role ur inner join user u on u.id = ur.user_id and ur.user_id = ? inner join role r on r.id = ur.role_id',[rows[0].id] ,function(err,inputs){
                    
                    if(inputs.length <= 0) {
                        req.flash('error', 'No role assigned to this user, contact administration')
                        res.redirect('/login');
                    } else {
                        var role = inputs[0].role;
                        // console.log(role, "Role Name");
                        // console.log(inputs[0].status, "status");
                        var status = inputs[0].status;
                        if (role === 'ADMIN' && status === 'true') { 
                            req.session.loggedin = true;
                            req.session.username = username;
                            req.session.role = role;
                            req.flash('success', 'Logged In Successfully')
                            res.redirect('/admin');
                        } else if (role === 'USER' && status === 'true'){
                            req.session.loggedin = true;
                            req.session.username = username;
                            req.session.role = role;
                            
                            req.flash('success', 'Logged In Successfully')
                            res.redirect('/');
                        }
                        else{
                            req.flash('error', 'you are not login this web sit');
                            res.redirect('/login');
                        }
                    }

                })
                
            }            
		});
	} else {
        req.flash('error', 'Please provide username and password')
        res.redirect("/login");
		
	}
});


/**
 * register user
 */
app.post('/register',(req,res) => {
    var inputData = {email :req.body.email,password :req.body.psw};
    passwordrep =req.body.pswrepeat;
    var sql='SELECT * FROM user WHERE email =?';
    mysqlConn.query(sql, [inputData.email] ,function (err, data) {
        if(err) throw err
        
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
                
                var indata1 ={user_id : data.insertId,role_id : 2};
                var sql1= 'INSERT INTO user_role SET ?';
                mysqlConn.query(sql1,indata1);
                
            });
            req.flash('success','Your are successfully registered');
            res.redirect("/register");
        }
    });
    
});

/**
 * all employee data
 */
app.get('/',(req, res) => {
    
    if (req.session.loggedin && req.session.role == 'USER'){
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


/**
 * add employee data
 */
app.get('/add',(req, res) => {
    if (req.session.loggedin && req.session.role == 'USER'){
        res.render('user_add', {
            title : 'CRUD Operation using NodeJS'+' '+ formatAMPM(),
        });
    }
    else {
		res.redirect('/login');
	}
	res.end();
});
 
/**
 * save employee data
 */
app.post('/save',(req, res) => {
    let data = {emp_name: req.body.name, emp_salary: req.body.salary,emp_city: req.body.city};
    let sql = "INSERT INTO employee SET ?";
    let query = mysqlConn.query(sql, data,(err, results) => {
        if(err) throw err;
        res.redirect('/');
    });
});
 
/**
 * edit employee item
 */
app.get('/edit/:id',(req, res) => {
    if (req.session.loggedin && req.session.role == 'USER'){
        const eId = req.params.id;
        let sql = `Select * from employee where id = ${eId}`;
        let query = mysqlConn.query(sql,(err, result) => {
            if(err) throw err;
            res.render('user_edit', {
                title : 'CRUD Operation using NodeJS / ExpressJS / MySQL',
                employee : result[0]
            });
        });
    }else {
		res.redirect('/login');
	}
    
});

 
 /**
 * update employee
 */
app.post('/update',(req, res) => {
    const eId = req.body.id;
    let sql = "update employee SET emp_name='"+req.body.name+"',  emp_salary='"+req.body.salary+"',  emp_city='"+req.body.city+"' where id ="+eId;
    let query = mysqlConn.query(sql,(err, results) => {
      if(err) throw err;
      res.redirect('/');
    });
});
 
 
/**
 * delete employee
 */
app.get('/delete/:id',(req, res) => {
    if (req.session.loggedin && req.session.role == 'USER'){
        const eId = req.params.id;
        let sql = `DELETE from employee where id = ${eId}`;
        let query = mysqlConn.query(sql,(err, result) => {
            if(err) throw err;
            res.redirect('/');
        });
    }else {
		res.redirect('/login');
	}
});

/**
 * logout
 */
app.get('/logOut',(req,res) =>{
    req.session.destroy();
    // req.flash('success', 'Login Again Here');
    res.redirect('/login');
})

/** 
 * 
 * 
 * Start Admin penle
 * 
 */
app.get('/admin',(req, res) => {
    res.render('admin');
});

/** all logdin user */

app.get('/loginUser',(req,res) =>{
    console.log(req.session);
    if (req.session.role == 'ADMIN' && req.session.loggedin){
        let sql = "SELECT * FROM user";
        let query = mysqlConn.query(sql, (err, rows) => {
            if(err) throw err;
            res.render('loginUser', {
                title : 'CRUD Operation using NodeJS'+' '+ formatAMPM(),
                user : rows
            });
        });
    } else {
		res.redirect('/login');
	}
})


/** upadte */

app.get('/statusUpdate/:id',(req,res)=>{
    if (req.session.role == 'ADMIN' && req.session.loggedin){
        const ID = req.params.id;
        let sql = `Select * from user where id = ${ID}`;
        mysqlConn.query(sql,(err, result) => {
            console.log(result);
            if(err) throw err;
            res.render('status_add', {
                user : result[0]
            });
        });
    }
    else {
		res.redirect('/login');
	}

})


/**upadte Status login user */
app.post('/saveStatus',(req, res) => {
    console.log(req.body.status);
    console.log(req.body.id);
    let sql = "update user SET status= '"+req.body.status+"' where id ="+ req.body.id ;
    let query = mysqlConn.query(sql,(err, results) => {
        if(err) throw err;
        res.redirect('/loginUser');
    });
});