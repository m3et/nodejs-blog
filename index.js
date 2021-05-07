const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");

const Post = require("./database/models/Post");

const app = express();
const port = 4000;

mongoose
	.connect("mongodb://localhost/node-blog", {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => "You are now connected to Mongo!")
	.catch((err) => console.error("Something went wrong", err));
    
app.use(express.static("public"));

const { config, engine } = require("express-edge");
// Configure Edge if need to
//config({ cache: process.env.NODE_ENV === 'production' });

// Automatically sets view engine and adds dot notation to app.render
app.use(engine);
app.set("views", `${__dirname}/views`);
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(fileUpload())


app.get("/", async (req, res) => {
	const posts = await Post.find({}).sort({createdAt: -1});
	res.render("index", { posts });
});

app.get("/about", function (req, res) {
	res.sendFile(path.resolve(__dirname, "pages/about.html"));
});

app.get("/contact", function (req, res) {
	res.sendFile(path.resolve(__dirname, "pages/contact.html"));
});

app.get("/post/:id", async (req, res) => {
	const post = await Post.findById(req.params.id);
	res.render("post", { post });
});

app.get("/posts/new", function (req, res) {
	res.render("create");
});

app.post("/posts/store", (req, res) => {
    const {
        image
    } = req.files

    image.mv(path.resolve(__dirname, 'public/posts', image.name), (error) => {
        Post.create({
            ...req.body,
            image: `/posts/${image.name}`
        }, (error, post) => {
            console.error(error, post);
            res.redirect('/');
        });
    })
});


app.listen(port, () => {
	console.log("App listening on port:", port);
});
