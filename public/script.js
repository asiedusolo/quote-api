const fetchAllButton = document.getElementById('fetch-quotes');
const fetchRandomButton = document.getElementById('fetch-random');
const fetchByAuthorButton = document.getElementById('fetch-by-author');

const quoteContainer = document.getElementById('quote-container');
const quoteText = document.querySelector('.quote');
const attributionText = document.querySelector('.attribution');

const updateContainer = document.getElementById('update-container')

const resetQuotes = () => {
  quoteContainer.innerHTML = '';
}

const renderError = response => {
  quoteContainer.innerHTML = `<p>Your request returned an error from the server: </p>
<p>Code: ${response.status}</p>
<p>${response.statusText}</p>`;
}

const renderQuotes = (quotes = []) => {
  resetQuotes();
  if (quotes.length > 0) {
    quotes.forEach(quote => {
      const newQuote = document.createElement('div');
      newQuote.className = 'single-quote';
      newQuote.innerHTML = `<div class="quote-text">${quote.quote}</div>
      <div class="attribution">- ${quote.person}</div><button class="delete-btn" data-id=${quote.id}>Delete Quote</button><button class="update-btn" data-id=${quote.id}>Update Quote</button>`;
      quoteContainer.appendChild(newQuote);
    });
  } else {
    quoteContainer.innerHTML = '<p>Your request returned no quotes.</p>';
  }
}

//Bubbling event for deleting quote
quoteContainer.addEventListener('click', (e) => {
  if(e.target.classList.contains('delete-btn')){
    const id = e.target.dataset.id
    // alert(e.target.dataset.id)
    fetch(`/api/quotes/${id}`, {
      method: 'DELETE'
    })
    .then(response => {
      if(response.ok){
        return response.json()
      }else{
        renderError(response)
      }
    })
    .then(response => {
      renderQuotes(response.quotes)
    })
  }
})



//Bubbling event for updating quote
quoteContainer.addEventListener('click', (e) => {
  if(e.target.classList.contains('update-btn')){
    
    /* const id = e.target.dataset.id
    const quoteToUpdate = getQuoteById(id, quotes)
    const quoteDiv = document.createElement('div')
    const quote = document.createElement('input')
    quote.type = 'text'
    quote.value = quoteToUpdate.quote
    const person = document.createElement('input')
    person.type = 'text'
    person.value = quoteToUpdate.person
    quoteDiv.append(quote)
    quoteDiv.append(person)
    newQuote.append(quoteDiv) */
  }
})

fetchAllButton.addEventListener('click', () => {
  fetch('/api/quotes')
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      renderError(response);
    }
  })
  .then(response => {
    renderQuotes(response.quotes);
  });
});

fetchRandomButton.addEventListener('click', () => {
  fetch('/api/quotes/random')
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      renderError(response);
    }
  })
  .then(response => {
    renderQuotes([response.quote]);
  });
});

fetchByAuthorButton.addEventListener('click', () => {
  const author = document.getElementById('author').value;
  fetch(`/api/quotes?person=${author}`)
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      renderError(response);
    }
  })
  .then(response => {
    renderQuotes(response.quotes);
  });
});
