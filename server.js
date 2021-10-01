const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement, getAllQuotesByPerson, addQuote, getQuoteById, getIndexById, updateQuote } = require('./utils');

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

app.post('/api/quotes', (req, res, next) => {
    const newQuote = addQuote(req.query)
    if(newQuote){
        quotes.push(newQuote)
        res.send({
            quote: newQuote
        })
    }else{
        res.status(400).send()
    }
})

app.put('/api/quotes/:id', (req, res, next) => {
    const quoteIndex = getIndexById(req.params.id, quotes)
    // console.log(quoteIndex)
    if(quoteIndex !== -1){
        updateQuote(req.params.id, quotes, req.query)
        // console.log(req.params)
        // console.log(req.query)
        res.send({
            quotes: quotes
        })
    }else{
        res.status(404).send()
    }
})

app.delete('/api/quotes/:id', (req, res, next) => {
    const quoteIndex = getIndexById(req.params.id, quotes)
    if(quoteIndex !== -1){
        quotes.splice(quoteIndex, 1)
        res.send({
            quotes: quotes
        })
    }else{
        res.status(404).send()
    }
})

app.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}`)
})