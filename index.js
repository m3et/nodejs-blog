const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Post = require('./database/models/Post');
const app = express();

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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static('public'));

app.get('/', async (req,res) => {
    const posts = await Post.find({})
    res.render('index',{posts})
});

app.get('/about', function  (req, res) {
    res.sendFile(path.resolve(__dirname, 'pages/about.html'));
});

app.get('/contact', function  (req, res) {
    res.sendFile(path.resolve(__dirname, 'pages/contact.html'));
});

app.get('/post/:id', async  (req, res) => {
    const post = await Post.findById(req.params.id)
    res.render('post', {post})
});

app.get('/posts/new', function (req, res) {
    res.render('create');
});

app.post('/posts/store', function(req, res){
    Post.create(req.body, function(err, post){
        console.log(post);
        res.redirect('/');
    });
});

app.listen(port, () =>{
    console.log('App listening on port:' , port);
});