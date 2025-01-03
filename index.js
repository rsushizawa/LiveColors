const express = require("express");
const path = require('path');
const app = express();
require('dotenv').config();

const API_KEY = process.env.API_KEY

app.use(express.static('public'));

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'public/index.html'));
})
app.get('/secondTemplate',(req,res)=>{
    res.sendFile(path.join(__dirname,'public/secondTemplate.html'));
})
app.get('/secondTemplate/secondTemplate.css',(req,res)=>{
    res.sendFile(path.join(__dirname,'public/secondTemplate.css'));
})
app.get('/secondTemplate/secondTemplate.css/assets/img/:id',(req,res)=>{
    var id = req.params.id;
    res.sendFile(path.join(__dirname,`public/assets/img/${id}`));
})

app.get('/popularFonts',(req,res)=>{
    fetch(`https://www.googleapis.com/webfonts/v1/webfonts?key=${API_KEY}&sort=popularity`)
        .then((response) => response.json())
        .then((json) => res.send(json));
})

app.get('/searchFont/:family',(req,res)=>{
    fetch(`https://www.googleapis.com/webfonts/v1/webfonts?key=${API_KEY}&family=${req.params.family}`)
        .then((response) => response.json())
        .then((json) => res.send(json));
})

app.listen(5000, function(){
    console.log("server runnig on http://localhost:5000/?colors=%23000005-%23fbfbfe-%232f27ce-%23dedcff-%23433cff");
});


