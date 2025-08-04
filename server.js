const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;
//serve static files from "public" folder 
app.use(express.static('public'));

app.listen(PORT, ()=>{
    console.log(`Server is listening on port ${PORT}`);
});


//create a router instance
const quoteRouter = express.Router();
//mount the router on api/quotes
app.use('/api/quotes', quoteRouter);
//define the GET /api/quotes/random route
quoteRouter.get('/random',(req,res,next)=>{
    //will give the random quote
    const randomQuote = getRandomElement(quotes);
    res.status(200).send({quote: randomQuote});
});

quoteRouter.get('/', (req,res,next)=>{
    const person = req.query.person;
    if (person){
        const personQuotes = quotes.filter((quote)=> quote.person.toLowerCase() === person.toLowerCase());
        res.status(200).send({quotes: personQuotes});
    }
    else{
        res.status(200).send([]);
    }
});
let nextId = quotes.length +1; //for new quotes
quoteRouter.post('/',(req,res,next)=>{
    const person = req.query.person;
    const quote = req.query.quote;
    if (person && quote){
        const newQuote = {
            id: nextId++,
            person,
            quote
        };
        quotes.push(newQuote);
        res.status(200).send({quote:newQuote});
    }
    else{
        res.status(400).send({error: "both person and quote are required"});//bad request if missing field
    }
});

quoteRouter.put('/:id', (req,res,next)=>{
    const changedPerson = req.query.person;
    const changedQuote =  req.query.quote;
    const id = Number(req.params.id);
    if (!changedPerson || !changedQuote){
        return res.status(400).send({error: 'Both person and quote are required.'});
    }

    //find quote by id
    const quoteIndex = quotes.findIndex((q)=> q.id === id);
    if (quoteIndex !== -1){
    quotes[quoteIndex] = {
        id,
        person: changedPerson,
        quote: changedQuote
    };
    res.status(200).send({
       quote: quotes[quoteIndex]
    });
}else{
    res.status(404).send({error: "Quote not found"});
}});

