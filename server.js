const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

//maintenance
//live
let mode = "live";

let app = express();

// Partial HTML page
hbs.registerPartials(__dirname + "/views/partials");

// helper
hbs.registerHelper('getCurrentYear', () => new Date().getFullYear());
hbs.registerHelper('upCASE', (str) => str.toUpperCase());

// By defaults render from folder named: views
app.set('view engine', 'hbs');

// Middleware
// Where user authentication, logs and db connection is performed
// App wont run until this middleware is completed ie next function is called

app.use((req, res, next) => {
    var now = new Date().toString();
    let log = req.method + " --- " + req.url + ", " + now;

    fs.appendFile('./server.log', log + '\n\n', (err) => {
        if(err) {
            console.log("Failed");
        }
    });

    next();
});

app.use((req, res, next) => {
    if (mode === "live") {

        next();

    } else {
        res.render("maintenance.hbs");
    }
});


app.use(express.static(__dirname + "/public"));


// Routes
app.get('/', (req, res) => {

    res.render('home.hbs', {
        pageTitle: "Home Page",
        welcomeMsg: "Hi, there!"
    });

});

app.get('/about', (req, res) => {

    res.render('about.hbs', {
        pageTitle: "About Page",
    });

});

app.get('/projects', (req, res) => {

    res.render('projects.hbs', {
        pageTitle: "Project Page",
    });

});


app.get('/bad', (req, res) => {

    res.send({request: 404});

});

app.listen(port, () => {
    console.log("Listening on port: 3000");
    console.log("URL: http://localhost:" + port);
});