const express = require('express');
const bodyParser = require("body-parser");
const server = express();

// Route handlers
const userRouter = require('./router/userRouter') 

server.use(logger);
server.use(bodyParser.json());

server.use('/api/users', userRouter);

server.get('/', (req, res) => {
  res.status(200);
  res.json({
    message: "Server live"
  });
});

function logger(req, res, next) {
  console.log(`[${Date.now()} | ${req.method} | ${req.url}]`);
  next();
}

module.exports = server;
