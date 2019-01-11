const express = require('express');
const actionsDb = require('../data/helpers/actionModel');
const projectsDb = require('../data/helpers/projectModel');
const router = express.Router();

//middleware
function checkAction (req,res,next) {
    actionsDb.get(req.params.id)
        .then(action => {
            next();
        })
        .catch(err => {
            res.status(404).json({message: `can not find action of id: ${req.params.id}`})
        })
}

function checkBody (req,res,next) {
    const { project_id, description, notes } = req.body;

    if( project_id ) {
        if ( description && notes ) {
            next();
        }
        else {
            res.status(400).json({message: `please provide both description and notes`})
        }
    }
    else{
        res.status(400).json({message: `please provide a project_id`})
    }
}

function checkProject (req,res,next) {
    projectsDb.get(req.body.project_id)
        .then(project => {
            next();
        })
        .catch(err => {
            res.status(404).json({message: `project of id: ${req.body.project_id} not found`})
        })
}
// routes/endpoints
router.get('/', (req,res) => {
    actionsDb.get()
        .then(actions => {
            res.status(200).json({actions})
        })
        .catch(err => {
            res.status(500).json({message: `error encountered retrieving actions`})
        })
})

router.get('/:id', (req,res) => {
    actionsDb.get(req.params.id)
        .then(action => {
            res.status(200).json({action})
        })
        .catch(err => {
            res.status(404).json({message: `can not find action of id: ${req.params.id}`})
        })
})

router.post('/', checkBody, checkProject, (req,res) => {
    actionsDb.insert(req.body)
        .then(response => {
            res.status(201).json({response})
        })
        .catch(err => {
            res.status(500).json({message: `error encountered adding action`})
        })
})

module.exports = router;