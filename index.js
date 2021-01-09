const path = require('path')

const express = require('express');
const app = express();

const { config, engine } = require('express-edge');

// Configure Edge if need to
config({ cache: process.env.NODE_ENV === 'production' });

const port = 4000;

app.use(express.static(__dirname + '/public'));
app.use(engine);
app.set('views', __dirname + '/views');

app.get('/', function (req,res) {
    console.log('rendering...')
    res.render('index');
});

// app.get('/', function (req,res) {
//     res.sendFile(path.resolve(__dirname, 'pages/index.html'));
// });

app.get('/about', function  (req, res) {
    res.sendFile(path.resolve(__dirname, 'pages/about.html'));
});

app.get('/contact', function  (req, res) {
    res.sendFile(path.resolve(__dirname, 'pages/contact.html'));
});

app.get('/post', function  (req, res) {
    res.sendFile(path.resolve(__dirname, 'pages/post.html'));
});

app.listen(port, () =>{
    console.log('App listening on port 4000');
    console.log('App listening on port 4000');
});