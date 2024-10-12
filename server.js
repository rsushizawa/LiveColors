const express = require("express");
const path = require('path');
const app = express();

app.use(express.static('public'));

app.get('/default',(req,res)=>{
    res.sendFile(path.join(__dirname,'public/default/default.html'));
})

// Transforma os parametros query em JSON
app.get('/data', (req, res) => {
    // Extrai os parametros query
    const queryData = req.query;

    // Prepare JSON response
    const jsonData = {
        message: "Hello, this is your JSON data",
        query: queryData
    };

    res.json(jsonData);
});

app.listen(5000, function(){
    console.log("servidor ok!");
});

