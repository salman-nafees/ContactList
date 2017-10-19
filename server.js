/**
 * Created by salman.nafees on 10/10/2017.
 */
var express = require('express');
var mongojs = require('mongojs');
var bodyParser = require('body-parser');


var db = mongojs('contactList', ['contactList']);
var app = express();

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.get('/contactList', function (req, res) {

    console.log("I got a request");

    db.contactList.find(function (err, docs) {
        console.log(docs);
        res.json(docs);
    });
});

app.post('/contactList', function (req, res) {
    console.log(req.body);

    db.contactList.insert(req.body, function (err, doc) {
        res.json(doc);
    });

});

app.delete('/contactList/:id', function (req, res) {
    var id = req.params.id;
    console.log(id);
    db.contactList.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
        res.json(doc);
    });
});

app.get('/contactList/:id', function (req, res) {
    var id = req.params.id;
    db.contactList.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
        console.log(doc);
        res.json(doc);
    });
});

app.put('/contactList/:id', function (req, res) {
    var id = req.params.id;
    db.contactList.findAndModify({
        query: {_id: mongojs.ObjectId(id)},
        update: {$set: {name: req.body.name, email: req.body.email, number: req.body.number}},
        new: true}, function (err, doc) {
        res.json(doc);
    });
});

app.listen(3000);

console.log("Server Running on port 3000");