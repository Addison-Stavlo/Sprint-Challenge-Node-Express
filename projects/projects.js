const express = require('express');
const projectsDb = require('../data/helpers/projectModel');
const router = express.Router();

//middleware
function checkBody (req,res,next) {
    const {name, description} = req.body;

    if(name){
        if(description){
            next();
        }
        else{
            res.status(400).json({message: 'please provide a description for the post'})
        }
    }
    else{
        res.status(400).json({message: 'please provide a name for the project'})
    } 
}

function checkProject (req,res,next) {
    projectsDb.get(req.params.id)
        .then(project => {
            next();
        })
        .catch(err => {
            res.status(404).json({message: `project of id: ${req.params.id} not found`})
        })
}
// routes/endpoints
router.get('/', (req, res) => {
    projectsDb.get()
        .then(projects => {
            res.status(200).json({projects})
        })
        .catch(err => {
            res.status(500).json({message: 'Could not retrieve projects...'})
        })
});

router.get('/:id', (req,res) => {
    projectsDb.get(req.params.id)
        .then(project => {
            res.status(200).json({project})
        })
        .catch(err => {
            res.status(404).json({message: `project of id: ${req.params.id} not found`});
        })
});

router.get('/:id/actions', checkProject, (req,res) => {
    projectsDb.getProjectActions(req.params.id)
        .then(actions => {
            res.status(200).json({actions})
        })
        .catch(err => {
            res.status(500).json({message: `error encountered retrieving project's actions`})
        })
})

router.post('/', checkBody, (req,res) => {
    projectsDb.insert(req.body)
        .then(result => {
            res.status(201).json({result})
        })
        .catch(err => {
            res.status(500).json({message: 'error encountered creating project...'})
        })
});

router.put('/:id', checkBody, checkProject, (req,res) => {
    projectsDb.update(req.params.id,req.body)
        .then(updatedProject => {
            res.status(200).json({updatedProject})
        })
        .catch(err => {
            res.status(500).json({message: `error encountered updating project of id ${req.params.id}`})
        })
})

router.delete('/:id', checkProject, (req,res) => {
    projectsDb.remove(req.params.id)
        .then(count => {
            res.status(200).json({message: `post of id ${req.params.id} successfully removed`})
        })
        .catch(err => {
            res.status(500).json({message: `error encountered in trying to remove project...`})
        })
})

module.exports = router;
