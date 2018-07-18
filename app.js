var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongojs = require('mongojs');
var db= mongojs('test',['test']);
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var bodyparser = require('body-parser')
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.get('/contactlist',function(req,res){
  db.test.find(function (err, docs) {
    console.log(docs);
    res.json(docs);
  });

});

app.post('/contactlist',function (req,res) {

    db.test.insert(req.body,function (err,doc) {
        res.json(doc);
    })
});


app.delete('/contactlist/:id',function (req,res) {

     var id=req.params.id;
     console.log(id);
     db.test.remove({_id: mongojs.ObjectID(id)},function (err,doc) {
         res.json(doc);

     });
});


app.get('/contactlist/:id',function (req,res) {

    var id=req.params.id;
    console.log(id);
    db.test.findOne({_id: mongojs.ObjectID(id)},function (err,doc) {
        res.json(doc);

    })
});

app.put('/contactlist/:id',function (req,res) {

    var id=req.params.id;
    console.log(id);
    db.test.findAndModify({query: {_id: mongojs.ObjectID(id)},
        update: {$set:{name:req.body.name,email:req.body.email, number:req.body.number}},
        new: true}, function (err,doc) {
        res.json(doc);

    });
});

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
