const express = require('express')
const { quotes } = require('./data');
const { getRandomElement } = require('./utils');



const quotesRouter = express.Router()

quotesRouter.get('/random', (req, res, next) => {
    const randomQuote = getRandomElement(quotes)
    console.log(randomQuote)
    res.send(randomQuote)
})


module.exports = quotesRouter
