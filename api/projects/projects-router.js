// Write your "projects" router here!
const express = require('express');
const Projects = require('./projects-model');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const getProjects = await Projects.get();
        res.json(getProjects);
    } catch (err) {
        res.json(err.message);
    }
});

router.get('/:id', validateUserId, async (req, res) => {
    try {
        const { id } = req.params;
        const actionsByid = await Projects.get(id);
        res.json(actionsByid);
    } catch (err) {
        res.json(err.message);
    }
});

router.post('/', validateUser, async (req, res) => {
    try {
        const { name, description, completed } = req.body;
        const createPost = await Projects.insert({ name, description, completed });
        res.json(createPost);
    } catch (err) {
        res.json(err.message);
    }
});

router.put('/:id', validateUser, async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, completed } = req.body;
        const updateProjectById = await Projects.update(id, { name, description, completed });
        res.json(updateProjectById);
    } catch (err) {
        res.json(err.message);
    }
})

router.delete('/:id', validateUserId, async (req, res) => {
    try {
        const { id } = req.params;
        const remove = await Projects.remove(id);
        res.json(remove);
    } catch (err) {
        res.json(err.message);
    }
})

router.get('/:id/actions', validateUserId, async (req, res) => {
    try {
        const { id } = req.params;
        const actions = await Projects.getProjectActions(id);
        res.json(actions);
    } catch (err) {
        res.json(err.message);
    }
})



function validateUser(req, res, next) {
    // do your magic
    if (!req.body.name || !req.body.description || !req.body.completed) {
        res.status(400).json({ message: 'missing required field' });
    } else {
        next()
    }
}

async function validateUserId(req, res, next) {
    // do your magic!  
    try {
        const User = await Projects.get(req.params.id);
        if (!User) {
            res.status(404).json({ message: 'invalid user id' });
        } else {
            next();
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving the hub',
        });
    }
}



module.exports = router;