// Write your "actions" router here!
const express = require('express');
const Actions = require('./actions-model');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const getActions = await Actions.get();
        res.json(getActions);
    } catch (err) {
        res.json(err.message);
    }
});

router.get('/:id', validateUserId, async (req, res) => {
    try {
        const { id } = req.params;
        const actionsByid = await Actions.get(id);
        res.json(actionsByid);
    } catch (err) {
        res.json(err.message);
    }
});

router.post('/', validatePost, async (req, res) => {
    try {
        const { description, notes, project_id } = req.body;
        const createUser = await Actions.insert({ description, notes, project_id });
        res.json(createUser);
    } catch (err) {
        res.json(err.message);
    }
});

router.put('/:id', validatePost, async (req, res) => {
    try {
        const { id } = req.params;
        const { description, notes, project_id, completed } = req.body;
        const updateActionById = await Actions.update(id, { description, notes, project_id, completed});
        res.json(updateActionById);
    } catch (err) {
        res.json(err.message);
    }
})

router.delete('/:id', validateUserId, async (req, res) => {
    try {
        const { id } = req.params;
        const remove = await Actions.remove(id);
        res.json(remove);
    } catch (err) {
        res.json(err.message);
    }
})

function validatePost(req, res, next) {
    // do your magic
        if (!req.body.description || !req.body.notes || !req.body.project_id){
        res.status(400).json({ message: 'missing required fields name and description' });
    } else {
        next();
    }
}

async function validateUserId(req, res, next) {
    // do your magic!  
    try {
        const User = await Actions.get(req.params.id);
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