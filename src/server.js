const express = require('express');
const mongoose= require('mongoose');

const Response = require('./models/Response');
const app = express();

app.use(express.json());

mongoose.connect('',{useNewUrlParser: true, useUnifiedTopology: true})
.then(()=> console.log('connected to db'))
.catch((err)=> console.log(err))


app.post('/responses', async (req, res) => {
     const {prompt, response} = req.body;
     const newResponse = new Response({prompt, response});
     await newResponse.save();
     res.status(201).send(newResponse);
});


app.get('responses' , async (req, res) => {
    const responses = await Response.find();
    res.send(responses);
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));