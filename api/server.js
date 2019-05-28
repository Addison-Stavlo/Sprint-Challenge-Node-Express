const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const projectsRouter = require('../projects/projects.js');
const actionsRouter = require('../actions/actions.js');
const server = express();

//middleware
server.use(cors());
server.use(helmet());
server.use(express.json());
server.use(morgan('short'));

//routes
server.use('/api/projects', projectsRouter);
server.use('/api/actions', actionsRouter);

server.get('/', (req, res) => {
    res.send(`
    <h1>Addie's Sprint Challenge API</h1>
    <p>Please use endpoints /api/projects and /api/actions for corresponding requests</p> 
    `)
});

//exports
module.exports = server;