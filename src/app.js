require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')
const uuid = require('uuid/v4')
const cardRouter = require('./card/card-router')
const listRouter = require('./list/list-router');


const app = express()

const morganOption = (NODE_ENV === 'production')
    ? 'tiny'
    : 'common';

app.use(morgan(morganOption))
app.use(helmet())
app.use(cors())
app.use(express.json());

app.use(function validateBearerToken(req, res, next) {
    const apiToken = process.env.API_TOKEN
    const authToken = req.get('Authorization') //gets the value put into the authorization header

    if (!authToken || authToken.split(' ')[1] !== apiToken) {
        logger.error(`Unauthorized request to path: ${req.path}`) //logs the failed request to the console using Winston logger
        return res.status(401).json({error: 'Unauthorized request' })
    }

    next();
})

app.use(cardRouter)
app.use(listRouter)

app.get('/', (req, res) => {
    res.send('Hello, boilerplate!')
})

app.use(function errorHandler(error, req, res, next) {
    let response
    if (NODE_ENV === 'production') {
        response = { error: { message: 'server error'} }
    } else {
        console.error(error)
        response = { message: error.message, error }
    }
    res.status(500).json(response)
})

module.exports = app