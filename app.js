//set up required modules and port number
const express = require('express');
const app = express();
const port = 3000;

//set up bodyParser to use req.body
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//set up path to point to view
const path = require('path');
app.set('views', path.join(__dirname, '/views'));

//set view engine to pug
app.set('view engine', 'pug');

//use static route to access files in public folder
app.use("/static", express.static("public"));

//set up root and books routes
const routes = require('./routes/index');
const books = require('./routes/books');
app.use('/', routes);
app.use('/books', books);

//error handling 404
app.use(function (req, res, next) {
    res.render("page-not-found");
});

//global error handler
app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.render("error");
});

//log port number to console
app.listen(port, () => {
    console.log(`The application is running on port ${port}!`);
});