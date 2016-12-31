var express = require('express');

app = express();
app.get('/', function(req, res){
    res.send('GetMushe Browser URL Analyser ON.');
    console.log('#root request');
});
app.get('/GetUrlImage/', function(req, res){
	var url = req.query.url; 
    res.send('Retrieve URL Image Base64: ' + url);
	//res.send('Retrieve URL Image Base64 using params:' + req.params.url);    

    //Processa imagem da URL com Phantom e retorna o Base64 

    console.log('#GetUrlImage request');
});

var server = app.listen(3000);
console.log('Servidor Express iniciado na porta %s', server.address().port);