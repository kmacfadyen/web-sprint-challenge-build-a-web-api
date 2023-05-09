// add middlewares here related to actions
const Action = require('../actions/actions-model')

async function validateActionId (req, res, next) {
    try {
    const action = await Action.get(req.params.id)
    if (!action) {
        res.status(404).json({
            message: 'action not found'
        })
    }
    else {
        req.action = action
        next()
    }
    }
    catch (err) {
        res.status(500).json({
            message: 'Problem finding action!'
        })
    }
}

function validateActionText (req, res, next) {
    const { notes, project_id, description, completed } = req.body;
    if ( !notes || !description ||
         !notes.trim() || !description.trim() ||
         !project_id 
        ) {
        res.status(400).json({
            message: 'missing required text field'
        })
    }
    else {
        req.notes = notes.trim()
        req.project_id = project_id
        req.description = description.trim()
        req.completed = completed
        next()
    }
}


function validateActionCompleted (req, res, next) {
    const { notes, project_id, description, completed } = req.body;
    if ( notes && description &&
         (completed === true || completed === false)  
        ) {
            req.notes = notes.trim()
            req.project_id = project_id.trim()
            req.description = description.trim()
            req.completed = completed
        next()
    }
    else {
        res.status(400).json({
            message: 'missing required text field'
        })
    }
}

module.exports = {
    validateActionId,
    validateActionText,
    validateActionCompleted
}

