const express = require('express');

const app = express();
const port = process.env.PORT || 2000;

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.post("/api/marker", (req, res) => {
  res.send({ msg: "Got your post " + req.body});
});

app.listen(port, () => console.log(`Listening on port ${port}`));


var client = require("redis").createClient(process.env.REDIS_URL);
