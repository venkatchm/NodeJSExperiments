var express = require('express')
var app = express()

var mongoose = require('mongoose');
mongoose.connect('mongodb://admin:root@ds161026.mlab.com:61026/akshara');

var bodyParser = require('body-parser')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

var AksharaDictionary = mongoose.model('Dictionary', {word: String, meaning: String});

app.set('port', process.env.PORT || 3000);

app.get('/home', function(req, res) {
    console.log("Hello world!");
    res.send("Hello world!");    
});

app.get('/all', function(req, res) {
    AksharaDictionary.find(function(err, words){
        if (err)  return res.status(500).send("Failed to fetch all words");
        res.status(200).send(words);
    });

});

app.delete('/delete/:id', function(req, res) {
    console.log(req.params.id);
    AksharaDictionary.findByIdAndRemove(req.params.id, function(err, akshara) {

        if (err) return res.status(500).send("Failed to delete");
        let response = {
            message: "AksharaDictionary",
            id: akshara._id
        };
        res.status(200).send(response);
    });

});

app.post('/add', function(req, res) {
    var newWord = new AksharaDictionary({word: req.body.word, meaning: req.body.meaning});
    newWord.save(function (err) {
        if (err) return res.send("failure")
        return res.send("success")
    });

});


app.listen(app.get('port'), function(req, res) {
    console.log("Server has started "+app.get('port'));
});





