const express = require('express');
const meetingsRouter = express.Router();

const {getAllFromDatabase, createMeeting, addToDatabase, deleteAllFromDatabase} = require('./db');

meetingsRouter.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('meetings'));
});

meetingsRouter.post('/', (req, res, next) => {
    const newMeeting = addToDatabase('meetings', createMeeting());
    res.status(201).send(newMeeting);
});

meetingsRouter.delete('/', (req, res, next) => {
    const emptyMeetings = deleteAllFromDatabase('meetings');
    if (emptyMeetings) {
        res.status(204).send();
    } else {
        res.status(404).send();
    }
});

module.exports = meetingsRouter;