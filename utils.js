const { quotes } = require('./data');

let quoteIdCounter = quotes.length
const getQuoteById = (id, quotes) => {
  const quote = quotes.find(quote => {
    return quote.id === id
  })
  return quote
}

const getIndexById = (id, quotes) => {
  return quotes.findIndex(quote => {
    return quote.id === id
  })
}

const getRandomElement = arr => {
  if (!Array.isArray(arr)) throw new Error('Expected an array');
  return arr[Math.floor(Math.random() * arr.length)];
}

const getAllQuotesByPerson = (person, arr) => {
  const allQuotes = []
  arr.forEach(quoteObj => {
    if(quoteObj.person === person){
      allQuotes.push(quoteObj)
    }
  })
  return allQuotes
}

const addQuote = (queryObject) => {
  if(queryObject.hasOwnProperty('quote') && queryObject.hasOwnProperty('person')){
    let currentQuoteId
    quoteIdCounter += 1
    currentQuoteId = quoteIdCounter
    return {
      id: currentQuoteId,
      quote: queryObject.quote,
      person: queryObject.person
    }
  }else{
    return false
  }
}

const updateQuote = (id, quotes, queryObj) => {
  quotes.forEach(quote => {
    if(quote.id === id){
      quote.quote = queryObj.quote
      quote.person = queryObj.person
    }
  })
}

module.exports = {
  getRandomElement,
  getAllQuotesByPerson,
  addQuote,
  getQuoteById,
  getIndexById,
  updateQuote
};
