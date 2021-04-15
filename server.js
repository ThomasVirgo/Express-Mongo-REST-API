require('dotenv').config();
const express = require('express');
const cors = require('cors');


const app = express();
const PORT = process.env.PORT || 5000;
const myPath = __dirname + '/views/index.html';

//middleware. If dont send a response, then have to call the next function..
app.use(express.static('public'));
app.use((req,res,next)=>{
    console.log(`Method: ${req.method}\nPath: ${req.path}\nIP: ${req.ip}`);
    next();
})

//serve a html file
app.get('/', (req,res)=>{
    res.sendFile(myPath);
})

//json response for api calls
app.get('/json', (req,res)=>{
    let obj = {
        firstName:'jeff',
        lastName:'bean',
        style:'lower'
    }
    if (process.env.MY_STYLE === 'upper'){
        obj.firstName = obj.firstName.toUpperCase();
        obj.lastName = obj.lastName.toUpperCase();
        obj.style = 'upper';
    }
    res.json(obj);
})

//chaining middleware
// app.get('/now', (req,res,next)=>{
//     req.time = new Date().toString();
//     next(); //moves onto the next function
// }, (req,res) => {
//     res.json({time:req.time});
// })

app.get('/now', (req,res)=>{
    let time = new Date().toString();
    res.json({time});
})

app.get('/:word/echo', (req,res)=>{
    let word = req.params.word;
    console.log(req.params);
    res.send(word);
})

//get route parameter input

app.listen(PORT, () => console.log(`Listening on ${PORT}`));