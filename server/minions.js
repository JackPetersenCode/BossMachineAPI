const express = require('express');
const minionsRouter = express.Router();

const {getAllFromDatabase, getFromDatabaseById, addToDatabase, createMinion, updateInstanceInDatabase, deleteFromDatabasebyId} = require('./db');

minionsRouter.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('minions'));
});

minionsRouter.post('/', (req, res, next) => {
    const newMinion = addToDatabase('minions', req.body);
    if (newMinion) {
        res.status(201).send(newMinion)
    } else {
        res.status(400).send();
    }
})

minionsRouter.get('/:id', (req, res, next) => {
    const minion = getFromDatabaseById('minions', req.params.id);
    if (minion) {
        res.send(minion);
    } else {
        res.status(404).send();
    }
});

minionsRouter.put('/:id', (req, res, next) => {
    const newInstance = updateInstanceInDatabase('minions', req.body);
    if (newInstance) {
        res.send(newInstance);
    } else {
        res.status(404).send();
    }
});

minionsRouter.delete('/:id', (req, res, next) => {
    const booly = deleteFromDatabasebyId('minions', req.params.id);
    if (booly) {
        res.status(204).send();
    } else {
        res.status(404).send();
    }
});

module.exports = minionsRouter;

