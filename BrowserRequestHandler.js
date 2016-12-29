var express = require('express');

app = express();
app.get('/', function(req, res){
    res.send('Ola Mundo');
});

var server = app.listen(3000);
console.log('Servidor Express iniciado na porta %s', server.address().port);