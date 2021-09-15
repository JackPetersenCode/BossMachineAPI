const express = require('express');
const ideasRouter = express.Router();

const {getFromDatabaseById, getAllFromDatabase, addToDatabase, updateInstanceInDatabase, deleteFromDatabasebyId} = require('./db');
const checkMillionDollarIdea = require('./checkMillionDollarIdea');

ideasRouter.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('ideas'));
});

ideasRouter.post('/', checkMillionDollarIdea, (req, res, next) => {
    const newIdea = addToDatabase('ideas', req.body);
    if (newIdea) {
        res.status(201).send(newIdea);
    } else {
        res.status(400).send();
    }
});

ideasRouter.get('/:id', (req, res, next) => {
    const idea = getFromDatabaseById('ideas', req.params.id);
    if (idea) {
        res.send(idea);
    } else {
        res.status(404).send();
    }
});

ideasRouter.put('/:id', (req, res, next) => {
    const newInstance = updateInstanceInDatabase('ideas', req.body);
    if (newInstance) {
        res.send(newInstance);
    } else {
        res.status(404).send();
    }
});

ideasRouter.delete('/:id', (req, res, next) => {
    const booly = deleteFromDatabasebyId('ideas', req.params.id);
    if (booly) {
        res.status(204).send();
    } else {
        res.status(404).send();
    }
});

module.exports = ideasRouter;