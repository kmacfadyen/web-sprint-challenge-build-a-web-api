// Write your "actions" router here!
const express = require('express');
const {
    validateActionText,
    validateActionCompleted,
    validateActionId
} = require('../actions/actions-middlware');

const Action = require('./actions-model');

const router = express.Router();


router.get ('/', (req, res, next) => {
    Action.get()
        .then(actions => {
            res.status(200).json(actions)
        })
        .catch(next)
});

router.get ('/:id', validateActionId, (req, res, next) => {
    Action.get(req.params.id)
        .then(action => {
            res.status(200).json(action)
        })

        // .catch(err => {
        //     res.status(404).json({
        //         message: err.message
        //     })
        // })
        .catch(next)
});

router.post ('/', validateActionText, (req, res, next) => {   
    Action.insert({
        notes: req.body.notes,
        description: req.body.description,
        project_id: req.body.project_id,
        completed: req.completed
    })
        .then(newActions => {
            res.status(201).json(newActions)
        })
        .catch(next)
});

router.put ('/:id', validateActionText, (req, res, next) => {
    Action.update(req.params.id, {
        description: req.body.description,
        notes: req.body.notes,
        project_id: req.body.project_id,
        completed: req.body.completed
    })
        .then(updatedAction => {
            res.status(200).json(updatedAction)
        })
        .catch(next)
});

router.delete ('/:id', validateActionId, (req, res, next) => {
    Action.remove(req.params.id)
        .then(deletedAction => {
            res.status(200).json(deletedAction)
        })
        .catch(next)
});



module.exports = router;

