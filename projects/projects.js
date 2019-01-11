const express = require('express');
const projectsDb = require('../data/helpers/projectModel');
const router = express.Router();

//middleware

// routes/endpoints
server.get('/', (req, res) => {
    projectsDb.get()
        .then(projects => {
            res.status(200).json({projects})
        })
        .catch(err => {
            res.status(500).json({message: 'Could not retrieve projects...'})
        })
});

module.exports = router;
