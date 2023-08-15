const Joi = require('joi');
const express = require('express');
const path = require('path');

const app = express();

app.use(express.json()); // Add middleware to use JSON processing pipeline. Used for parsing JSON objects.

// ENV variable named "PORT" which is appropriate way.
const port = process.env.PORT || 3000;
let hostname = '127.0.0.1'

/*
 Using express, we can define new routes using app.<method>, e.g app.get, rather than using the http module and
 a series of IF statements. Express allows us to easily add new routes to our application, without worrying about
 generating a sprawling mess of IF statements.

 Structure: app._method_(<PATH>, (req,res) =>{
    ... // To-Do: Do something.
 })
*/

const accounts =[
    {id:1, name: 'Jeff', balance: '£2,000,000.01', sortcode: '10-34-22', accountNum: '1643520344'},
    {id:2, name: 'Simon', balance: '£1,234,342.45', sortcode: '10-23-25', accountNum: '164399235'},
    {id:3, name: 'user', balance: '£-50324.54', sortcode: '10-44-77', accountNum: '164399954'}
];

app.get('/', (req,res) =>{
    res.sendFile(path.join(__dirname, '/static/index.html'));
});

app.get('/broken_object_level_access', (req,res) =>{
    res.sendFile(path.join(__dirname, '/static/broken_object_level_access.html'));
})

app.get('/api/accounts', (req, res) =>{
    res.send(accounts);
});

app.get('/api/accounts/:id', (req,res) =>{
    const account = accounts.find(c => c.id === parseInt(req.params.id));
    if (!account){ // 404 Response
        res.status(404).send('account not found :(');
    }
    else{
        res.send(account);
    }
})

app.get('/api/posts/:year/:month', (req,res) =>{
    res.send(req.params); // Return request parameters object. Used for essential or required values.
    // res.send(req.query); // Return the query string parameters, query string parameters are used to provide additional data to backend services.
})

app.post('/api/accounts', (req,res) =>{
      
    // Validate the the account exists.
    const { error } = validateAccount(req.body); // result.error (Object deconstruction syntax.)
    if (error){
        return res.status(400).send(error.details[0].message);
    }
    
    const account = {
        id: accounts.length + 1,
        name: req.body.name,
        balance: "0.00",
        sortcode: '10-41-51',
        accountNum: '1643888234'
    };
    accounts.push(account);
    res.send(account);
});

app.put('/api/accounts/:id', (req, res) =>{

    // Lookup account to update
    const account = accounts.find(c => c.id === parseInt(req.params.id));
    if (!account){ 
        return res.status(404).send('account not found :(');
    }

    // Validate the the account exists.
    const { error } = validateaccount(req.body); // result.error (Object deconstruction.)
    if (error){
        return res.status(400).send(error.details[0].message);
    }
    
    account.name = req.body.name;
    res.send(account);
    // Otherwise validate account , if invalid then 400 otherwise update the account and return it to the client.  
})

app.delete('/api/accounts/:id', (req, res) => {

    const account = accounts.find(c => c.id === parseInt(req.params.id));
    if (!account){ 
        res.status(404).send('account not found :(');
    }

    // Delete
    const index = accounts.indexOf(account);
    accounts.splice(index, 1);

    res.send(account);
    // Return the same account
})

 // Joi schema input validation: https://www.npmjs.com/package/joi
function validateAccount(account){
      // Validate that account exists.
      const schema = Joi.object({
        name: Joi.string().min(3).required()
    });

    return schema.validate(account);
}

app.listen(port, hostname, () => console.log(`Listening on port ${port}...`));
