const express = require('express');

let app = express();

// Routes
app.get('/', (req, res) => {

    let jsonObj = {
        name: {
            first: "Denieall",
            last: "Joenethen"
        },
        age: 21
    };

    res.send(jsonObj);

});

app.get('/about', (req, res) => {

    res.send("About Page");

});

app.get('/bad', (req, res) => {

    res.send({request: 404});

});

console.log("Listening on port: 3000");
console.log("URL: http://localhost:3000");
app.listen(3000);