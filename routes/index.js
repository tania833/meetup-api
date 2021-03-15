var express = require('express');
var router = express.Router();
var cors = require('cors');

const corsOptions = {
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 200,
    credentials: true,
};

var meetingsCollection;
var MongoClient = require('mongodb').MongoClient;
MongoClient.connect(
    'mongodb+srv://tania833:tania833@cluster0.u3u1g.mongodb.net/Meetup?retryWrites=true&w=majority'
)
    .then((client) => {
        console.log('Connected to Database');
        const db = client.db('meetup');
        meetingsCollection = db.collection('meetings');
    })
    .catch((error) => console.error(error));

router.get('/all-events', cors(corsOptions), (req, res, next) => {
    const result = meetingsCollection
        .find()
        .toArray()
        .then(function (result, error) {
            res.send(result);
        })
        .catch((error) => console.error(error));
});

router.post('/event-add', cors(corsOptions), (req, res) => {
    meetingsCollection
        .insertOne(req.body)
        .catch((error) => console.error(error));
});

router.put('/event-update', cors(corsOptions), function (req, res) {
    res.send('Got a PUT request');
});

router.delete('/event-delete', cors(corsOptions), function (req, res) {
    res.send('Got a DELETE reques');
});

module.exports = router;
