const express = require('express');
const app = express();
var port = process.env.PORT || 8080;
const pug = require('pug');
var fs = require('fs');
var path = require('path');
var reqCount = require('./reqCount');
var rateModule = require('./rateModule');

app.set('view engine', 'pug');
app.set('views', 'view');

app.get('/', function (req, res) {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    return res.end("<h1 class='text-center'>Not found! Please specify which province you want to visit.</h1>");
})
app.get('/province/:name', function (req, res) {
    reqCount.reqCount();
    var file = './province/' + req.params.name + ".json"
    fs.readFile(file, function (err, data) {
        var content = JSON.parse(data);
        res.render('province', {
            name: content.name,
            shortname: content.shortname,
            image1: content.images[0],
            image2: content.images[1],
            image3: content.images[2],
            group: content.group,
            population: content.population,
            delicacies: content.list_of_delicacies,
            write_up: content.write_up,
            rating: content.rating
        });
        if (err) {
            res.sendStatus(404);
        }
    });
})

app.all('/rate', function (req, res) {
    rateModule.rateModule(req, res)
    reqCount.reqCount();
})
app.all('*', function (req, res, next) {
    reqCount.reqCount();
    next();
})

app.use(express.static(path.resolve('public')));
app.use(express.static(path.resolve('province')));
app.listen(port, function () {
    console.log(`Initializing port ${port}!`)
})