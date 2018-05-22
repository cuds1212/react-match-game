const express = require('express');

const app = express();

app.use(express.static('build'));

app.get("*", function(req,res){
    res.sendFile('index.html');
});

app.listen(process.env.port, process.env.ip, function(){
    console.log('The server has started.');
});