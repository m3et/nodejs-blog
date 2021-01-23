const path = require('path');
const express = require('express');
const app = express();
const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/node-blog', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => 'You are now connected to Mongo!')
    .catch(err => console.error('Something went wrong', err));

const port = 4000;

const { config, engine } = require('express-edge');

// Configure Edge if need to
config({ cache: process.env.NODE_ENV === 'production' });

// Automatically sets view engine and adds dot notation to app.render
app.use(engine);
app.set('views', `${__dirname}/views`);

// app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static('public'));

app.get('/', function (req,res) {
    res.render('index');
});

app.get('/about', function  (req, res) {
    res.sendFile(path.resolve(__dirname, 'pages/about.html'));
});

app.get('/contact', function  (req, res) {
    res.sendFile(path.resolve(__dirname, 'pages/contact.html'));
});

app.get('/post', function  (req, res) {
    res.sendFile(path.resolve(__dirname, 'pages/post.html'));
});

app.get('/posts/new', function (req, res) {
    res.render('create');
});

app.listen(port, () =>{
    console.log('App listening on port 4000');
});