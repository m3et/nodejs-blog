const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");

const homePageController = require("./controllers/homePage");

const createPostController = require("./controllers/creatPost");
const storePostController = require("./controllers/storePost");
const getPostController = require("./controllers/getPost");

const creatUserController = require("./controllers/registerUser")
const storeUserController = require("./controllers/storeUser")
const loginController = require("./controllers/login")
const loginUserController = require("./controllers/loginUser")


const app = express();

mongoose
	.connect("mongodb://localhost/node-blog", {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true
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
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());

// add new post req validation
const storePost = require("./middleware/storePost");
app.use("/posts/store", storePost);

app.get("/", homePageController);
app.get("/post/:id", getPostController);
app.get("/posts/new", createPostController);
app.post("/posts/store", storePostController);

app.get("/auth/register", creatUserController);
app.post("/users/register", storeUserController);

app.get("/auth/login", loginController);
app.post("/users/login", loginUserController);

const PORT = 8080;
app.listen(PORT, () => {
	console.log("App listening on port:", PORT);
});
