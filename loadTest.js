var mailSender = require('./mailSenderManager.js');
var sender = "";
var receiver = "get@getmush.com.br";

console.log("Iniciando teste de carga:");

//TESTE LEVE
// mailSender.sendEmailLoadTest("loadtest..." ,sender, receiver, "www.google.com");
// mailSender.sendEmailLoadTest("loadtest..." ,sender, receiver, "https://www.tsestoque.com.br");
// mailSender.sendEmailLoadTest("loadtest..." ,sender, receiver, "http://www.universidadeestoque.com.br");

//TESTE MÉDIO
// mailSender.sendEmailLoadTest("loadtest..." ,sender, receiver, "www.theverge.com");
// mailSender.sendEmailLoadTest("loadtest..." ,sender, receiver, "toque.com.br");
mailSender.sendEmailLoadTest("loadtest..." ,sender, receiver, "http://www.sadasdasd.com");
// mailSender.sendEmailLoadTest("loadtest..." ,sender, receiver, "www..com");
// mailSender.sendEmailLoadTest("loadtest..." ,sender, receiver, "http://projteste02.azurewebsites.net/HtmlPage1.html");
// mailSender.sendEmailLoadTest("loadtest..." ,sender, receiver, "http://spazioacqua.pe.hu");
// mailSender.sendEmailLoadTest("loadtest..." ,sender, receiver, "http://www.bling.com");
// mailSender.sendEmailLoadTest("loadtest..." ,sender, receiver, "http://google.comhttp://google.com");
// mailSender.sendEmailLoadTest("loadtest..." ,sender, receiver, "https://www.estoquevivo.com.br");

//TESTE PESADO

