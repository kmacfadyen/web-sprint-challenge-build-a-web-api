// Write your "projects" router here!
const express = require('express');

const Project = require('./projects-model');

const router = express.Router();

router.get ('/', (req, res, next) => {
    Project.get()
        .then(projects => {
            res.status(200).json(projects)
        })
        .catch(next)
});

router.get ('/:id', (req, res, next) => {
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

router.post ('/', (req, res, next) => {
    Project.insert({
        name: req.body.name,
        description: req.body.description,
        completed: req.body.completed
    })
        .then(newProjects => {
            res.status(201).json(newProjects)
        })
        .catch(next)
});

router.put (() => {

});

// router.delete () => {};

// router.get () => {};

module.exports = router;