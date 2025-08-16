const submitButton = document.getElementById('submit-quote');
const newQuoteContainer = document.getElementById('new-quote');

submitButton.addEventListener('click', () => {
  const quote = document.getElementById('quote').value;
  const person = document.getElementById('person').value;

  fetch(`/api/quotes?quote=${quote}&person=${person}`, {
    method: 'POST',
  })
  .then(response => response.json())
  .then(({quote}) => {
    const newQuote = document.createElement('div');
    newQuote.innerHTML = `
    <h3 style ="font-family: 'Montserrat'; 
    font-size: 35px;">Congrats, your quote was added!</h3>
    <div class="quote-text" style="font-family: 'Montserrat'; 
    font-size: 40px;">${quote.quote}</div>
    <div class="attribution" class="quote-text" style="font-family: 'Montserrat'; 
    font-size: 25px;">- ${quote.person}</div>
    <p class="quote-text" style="font-family: 'Montserrat'; 
    font-size: 20px;">Go to the <a href="index.html">home page</a> to request and view all quotes.</p>
    `
    newQuoteContainer.appendChild(newQuote);
  });
});
