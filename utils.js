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

module.exports = {
  getRandomElement,
  getAllQuotesByPerson
};
