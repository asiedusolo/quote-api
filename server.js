const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement, getAllQuotesByPerson } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

// const quotesRouter = require('./quotes')
// quotesRouter.use('/api/quotes', quotesRouter)

app.get('/api/quotes/random', (req, res, next) => {
    const randomQuote = getRandomElement(quotes)
    const quoteObj = {
        quote: randomQuote
    }
    res.send(quoteObj)
})

app.get('/api/quotes', (req, res, next) => {
    const quotePerson = req.query.person
    const allQuotesObj = {
        quotes: quotes
    }
    if(!quotePerson){
        res.send(allQuotesObj)
    }else{
        const personQuotes = getAllQuotesByPerson(quotePerson, quotes)
        const allQuotesObj = {
            quotes: personQuotes
        }
        res.send(allQuotesObj)
    }
})

app.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}`)
})