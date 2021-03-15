var express = require('express');
var router = express.Router();
var cors = require('cors');

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

router.get('/all-events', (req, res, next) => {
    const result = meetingsCollection
        .find()
        .toArray()
        .then(function (result, error) {
            res.send(result);
        })
        .catch((error) => console.error(error));
});

router.post('/event-add', async (req, res) => {
    try {
        const result = await meetingsCollection.insertOne(req.body);
        res.send(result);
    } catch (e) {
        console.log(e);
    }
});

router.put('/event-update', function (req, res) {
    res.send('Got a PUT request');
});

router.delete('/event-delete', function (req, res) {
    res.send('Got a DELETE reques');
});

module.exports = router;
