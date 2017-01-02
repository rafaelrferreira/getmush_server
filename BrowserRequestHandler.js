var express = require('express');
var phManager = require('./Phantom.js');

app = express();

app.get('/', function(req, res){
    res.send('GetMushe Browser URL Analyser ON.');
    console.log('#root request');
});

app.get('/GetUrlImage/', function(req, res){
	var url = req.query.url; 
	console.log('Url to process: '+url);
	//urlResp = JSON.parse(req.params);
	//console.log(req.params.url);

	//res.header('Content-type','application/json');
	//res.header('Charset','utf8');

	//res.send('Retrieve URL Image Base64 using params:' + req.params.url);    

    //Processa imagem da URL com Phantom e retorna o Base64 
    phManager.mushMushProcessUrl(url);
    console.log('base64: ' + phManager.respB64());
    res.send(JSON.stringify(url));
    console.log('Process completed.');
});

var server = app.listen(3000);
console.log('Servidor Express iniciado na porta %s', server.address().port);