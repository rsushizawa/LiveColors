const express = require("express");
const path = require('path');
const app = express();

app.use(express.static('public'));

app.get('default.html',(req,res)=>{
    res.sendFile(path.join(__dirname,'public/default/default.html'));
})

app.listen(5000, function(){
    console.log("servidor ok!");
});