const express = require('express');

const app = express();

app.use(express.static('build'));

app.get('*', function(req,res){
    res.sendFile(__dirname + '/index.html');
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log('The server has started.');
});