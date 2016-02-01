var router = require('express').Router();
var four0four = require('./utils/404')();
var data = require('./data');

router.get('/players', getPlayers);
router.get('/people', getPeople);
router.get('/person/:id', getPerson);
router.get('/*', four0four.notFoundMiddleware);

module.exports = router;

//////////////

function getPlayers(req, res, next) {
    res.status(200).send(data.players);
}

function getTrueSelf(req, res, next) {
    res.status(200).send(data.trueSelf);
}

function setPlayers(req, res, next) {

}

function getPeople(req, res, next) {
    res.status(200).send(data.people);
}

function getPerson(req, res, next) {
    var id = +req.params.id;
    var person = data.people.filter(function(p) {
        return p.id === id;
    })[0];

    if (person) {
        res.status(200).send(person);
    } else {
        four0four.send404(req, res, 'person ' + id + ' not found');
    }
}
