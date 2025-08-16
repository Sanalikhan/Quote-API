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

quoteRouter.get('/all', (req,res,next)=>{
    console.log("all quotes print request coming!", quotes);
    res.status(200).send({quotes: quotes});
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
        console.log('Received quote:', quote);
        quotes.push(newQuote);
        res.status(200).send({quote:newQuote});
    }
    else{
        res.status(400).send({error: "both person and quote are required"});//bad request if missing field
    }
});



