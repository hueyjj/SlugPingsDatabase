const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 2000;

var client = require("redis").createClient(process.env.REDIS_URL);

var jsonParser = bodyParser.json();

app.use(jsonParser);
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
    res.setHeader('Content-Type', 'text/plain')
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/api/storage', (req, res) => {
    res.send({ express: 'Hello From Express' });
    client.get("foo", function(err, reply) {
        console.log(reply);
    });
});

app.post("/api/marker", (req, res) => {
    console.log(req.body);

    res.send({ msg: "Got your post"});
    res.end(JSON.stringify(req.body, null, 2))

    client.set("foo", req.body.toString());
});

app.listen(port, () => console.log(`Listening on port ${port}`));


