const Joi = require('joi');
const express = require('express');
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

const courses =[
    {id:1, name: 'course1'},
    {id:2, name: 'course2'},
    {id:3, name: 'course3'}
];

app.get('/', (req,res) =>{
    res.send('Hello World :)');
});

app.get('/api/courses', (req, res) =>{
    res.send(courses);
});

app.get('/api/courses/:id', (req,res) =>{
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course){ // 404 Response
        res.status(404).send('Course not found :(');
    }
    else{
        res.send(course);
    }
})

app.get('/api/posts/:year/:month', (req,res) =>{
    res.send(req.params); // Return request parameters object. Used for essential or required values.
    // res.send(req.query); // Return the query string parameters, query string parameters are used to provide additional data to backend services.
})

app.post('/api/courses', (req,res) =>{
      
    // Validate the the course exists.
    const { error } = validateCourse(req.body); // result.error (Object deconstruction syntax.)
    if (error){
        return res.status(400).send(error.details[0].message);
    }
    
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

app.put('/api/courses/:id', (req, res) =>{

    // Lookup course to update
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course){ 
        return res.status(404).send('Course not found :(');
    }

    // Validate the the course exists.
    const { error } = validateCourse(req.body); // result.error (Object deconstruction.)
    if (error){
        return res.status(400).send(error.details[0].message);
    }
    
    course.name = req.body.name;
    res.send(course);
    // Otherwise validate course , if invalid then 400 otherwise update the course and return it to the client.  
})

app.delete('/api/courses/:id', (req, res) => {

    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course){ 
        res.status(404).send('Course not found :(');
    }

    // Delete
    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course);
    // Return the same course
})

 // Joi schema input validation: https://www.npmjs.com/package/joi
function validateCourse(course){
      // Validate that course exists.
      const schema = Joi.object({
        name: Joi.string().min(3).required()
    });

    return schema.validate(course);
}

app.listen(port, hostname, () => console.log(`Listening on port ${port}...`));
