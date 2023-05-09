// add middlewares here related to projects
const Project = require('../projects/projects-model')

async function validateProjectId (req, res, next) {
    try {
    const project = await Project.get(req.params.id)
    if (!project) {
        res.status(404).json({
            message: 'project not found'
        })
    }
    else {
        req.project = project
        next()
    }
    }
    catch (err) {
        res.status(500).json({
            message: 'Problem finding project!'
        })
    }
}

function validateText (req, res, next) {
    // try {
    const { name, description, completed } = req.body;
    if ( !name || !description ||
         !name.trim() || !description.trim()  
        ) {
        res.status(400).json({
            message: 'missing required text field'
        })
        // next()
    }
    else {
        req.name = name.trim()
        req.description = description.trim()
        req.completed = completed
        next()
    }
// } catch (err) {
    // res.status(500).json(err)
}
// }

function validateCompleted (req, res, next) {
    // try {
    const { name, description, completed } = req.body;
    if ( name && description &&
         (completed === true || completed === false)  
        ) {
            req.name = name.trim()
            req.description = description.trim()
            req.completed = completed
        next()
    }
    else {
        res.status(400).json({
            message: 'missing required text field'
        })
        // next()
    }
// } catch (err) {
    // res.status(500).json(err)
}

module.exports = {
    validateProjectId,
    validateText,
    validateCompleted
}
