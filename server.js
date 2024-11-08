const express = require("express");
const path = require('path');
const app = express();

app.use(express.static('public'));

app.get('/default',(req,res)=>{
    res.sendFile(path.join(__dirname,'public/default/default.html'));
})

app.listen(5000, function(){
    console.log("server runnig on http://localhost:5000/default/?colors=%23000005-%23fbfbfe-%232f27ce-%23dedcff-%23433cff");
});

