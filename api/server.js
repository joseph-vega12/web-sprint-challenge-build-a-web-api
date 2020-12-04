const express = require('express');
const server = express();
const actionsRouter = require('./actions/actions-router');
const projectsRouter = require('./projects/projects-router');

server.use(express.json());
server.use('/api/actions', actionsRouter);
server.use('/api/projects', projectsRouter);

// Complete your server here!
// Do NOT `server.listen()` inside this file!
server.get('/', (req, res) => {
    res.json({message: `Hello from ${req.url}${req.method}`});
});

module.exports = server;
