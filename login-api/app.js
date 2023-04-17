var express = require('express')
var cors = require('cors')
var app = express()
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
const bcrypt = require('bcrypt');
const saltRounds = 10;
var jwt = require('jsonwebtoken');
const secret = 'tokenlogin'

app.use(cors())
const mysql = require('mysql2');
// create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'helpdesk'
  });

app.post('/register', jsonParser, function (req, res, next) {
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        // execute will internally call prepare and query
        connection.execute(
            'INSERT INTO users(email, password, fullname) VAlUES(?,?,?)',
            [req.body.email, hash, req.body.fullname],
            function(err, results, fields) {
            if(err){res.json({status:'error',message:err})}
            res.json({status: 'ok'})
            }
        );
    });
})

app.post('/login', jsonParser,function (req, res, next) {
    connection.execute(
        'SELECT * FROM users WHERE email=?',
        [req.body.email],
        function(err, users, fields) {
        if(err){res.json({status:'error',message:err}); return }
        if(users.length == 0){res.json({status:'error',message:'no user found'}); return }
        bcrypt.compare(req.body.password, users[0].password, function(err, isLogin) {
            if(isLogin){
                var token = jwt.sign({ email: users[0].email }, secret, { expiresIn: '1h' });
                res.json({status:'ok', message: 'login success', token})
            }else{
                res.json({status:'err', message: 'login fail'})
            }
        });
        }
    );
})

app.post('/authen', jsonParser,function (req, res, next) {
    try {
        const token = req.headers.authorization.split(' ')[1]
        var decoded = jwt.verify(token, secret);
        res.json({status: 'ok',decoded})
    } catch (err) {
        res.json({status: 'error', message: err.message})
    }
})

app.get('/create', jsonParser, function (req, res, next) {
    connection.execute(
        'SELECT * FROM `ticket`',
        function(err, results, fields){
        res.json(results);
        }
    );
})

app.post('/create', jsonParser, function (req, res, next) {
        // execute will internally call prepare and query
        connection.execute(
            'INSERT INTO ticket(username, title, description, email, contact, status, lastupdate) VAlUES(?,?,?,?,?,?,?)',
            [req.body.username, req.body.title, req.body.description, req.body.email, req.body.contact, req.body.status, req.body.lastupdate],
            function(err, results, fields) {
            if(err){res.json({status:'error',message:err})}
            res.json({status: 'ok'})
            }
        );
})

app.put('/edit', jsonParser, function (req, res, next) {
    connection.query(
        'UPDATE `ticket` SET `username`=?, `title`=?, `description`=?, `email`=?, `contact`=?, `status`=?, `lastupdate`=? WHERE id = ?',
        [req.body.username, req.body.title, req.body.description, req.body.email, req.body.contact, req.body.status, req.body.lastupdate,req.body.id],
        function(err, results, fields) {
        if(err){res.json({status:'error',message:err})}
        res.json({status:'ok', results});
        }
    );
})

app.get('/edit/:id', jsonParser, function (req, res, next) {
    const id = req.params.id;
    connection.query(
        'SELECT * FROM `ticket` WHERE id = ?',[id],
        function(err, results, fields){
        res.json({status:'ok', user:results});
        }
    );
})
app.listen(3333, function () {
  console.log('CORS-enabled web server listening on port 80')
})