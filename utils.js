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
    return {
      quote: queryObject.quote,
      person: queryObject.person
    }
  }else{
    return false
  }
}

module.exports = {
  getRandomElement,
  getAllQuotesByPerson,
  addQuote
};
