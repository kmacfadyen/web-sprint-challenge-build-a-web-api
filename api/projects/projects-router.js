// Write your "projects" router here!
const express = require('express');
const {
    validateProjectId,
    validateText,
    validateCompleted
} = require('../projects/projects-middleware');

const Project = require('./projects-model');

const router = express.Router();

router.get ('/', (req, res, next) => {
    Project.get()
        .then(projects => {
            res.status(200).json(projects)
        })
        .catch(next)
});

router.get ('/:id', validateProjectId, (req, res, next) => {
    Project.get(req.params.id)
        .then(project => {
            res.status(200).json(project)
        })

        // .catch(err => {
        //     res.status(404).json({
        //         message: err.message
        //     })
        // })
        .catch(next)
});

router.post ('/', validateText, (req, res, next) => {
    // try {    
    Project.insert({
        name: req.body.name,
        description: req.body.description,
        completed: req.body.completed
    })
        .then(newProjects => {
            res.status(201).json(newProjects)
        })
    // }   
        .catch(next)
});

router.put ('/:id', validateCompleted, (req, res, next) => {
    Project.update(req.params.id, {
        description: req.body.description,
        name: req.body.name,
        completed: req.body.completed
    })
        .then(updated => {
            res.status(200).json(updated)
        })
        .catch(next)
});

router.delete ('/:id', validateProjectId, (req, res, next) => {
    Project.remove(req.params.id)
        .then(deletedProject => {
            res.status(200).json(deletedProject)
        })
        .catch(next)
});

router.get ('/:id/actions', (req, res, next) => {
    Project.getProjectActions(req.params.id)
        .then(actions => {
            res.status(200).json(actions)
        })
        .catch(next)
});

module.exports = router;