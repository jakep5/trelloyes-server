const express = require('express')

const cardRouter = express.Router()
const bodyParser = express.json()

cardRouter
    .route('/card')
    .get((req, res) => {

    })
    .post(bodyParser, (req, res) => {

    })

cardRouter
    .route('/card/:id')
    .get((req, res) => {

    })
    .delete((req, res) => {

    })

module.exports = cardRouter