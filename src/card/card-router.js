const express = require('express')

const cardRouter = express.Router()
const bodyParser = express.json()

const cards = [{
    id: 1,
    title: 'Task One',
    content: 'This is card one'
}];

cardRouter
    .route('/card')
    .get((req, res) => {
        res
            .json(cards);
    })
    .post(bodyParser, (req, res) => {

        const { title, content } = req.body;

        if(!title) {
            logger.error(`Title is required`);
            return res
                .status(400)
                .send('Invalid data');
        }

        if(!content) {
            logger.error(`Content is required`);
            return res
                .status(400)
                .send('Invalid data');

        }

        const id = uuid();

        const card = {
            id, 
            title, 
            content
        };

        cards.push(card); //pushes to card array

        logger.info(`Card with ${id} created`);

        res
            .status(201)
            .location(`http://localhost:8000/card/${id}`)
            .json(card);

    })

cardRouter
    .route('/card/:id')
    .get((req, res) => {

    })
    .delete((req, res) => {

    })

module.exports = cardRouter