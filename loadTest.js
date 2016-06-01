var mailSender = require('./mailSenderManager.js');
var sender = "";
var receiver = "get@getmush.com.br";

console.log("Iniciando teste de carga:");

//TESTE LEVE
mailSender.sendEmailLoadTest("loadtest..." ,sender, receiver, "www.google.com");
mailSender.sendEmailLoadTest("loadtest..." ,sender, receiver, "https://www.tsestoque.com.br");
mailSender.sendEmailLoadTest("loadtest..." ,sender, receiver, "http://www.universidadeestoque.com.br");

//TESTE MÉDIO
// mailSender.sendEmailLoadTest("loadtest..." ,sender, receiver, "www.google.com");
// mailSender.sendEmailLoadTest("loadtest..." ,sender, receiver, "https://www.tsestoque.com.br");
// mailSender.sendEmailLoadTest("loadtest..." ,sender, receiver, "http://www.yahoo.com");
// mailSender.sendEmailLoadTest("loadtest..." ,sender, receiver, "www.google.com");
// mailSender.sendEmailLoadTest("loadtest..." ,sender, receiver, "https://www.tsestoque.com.br");
// mailSender.sendEmailLoadTest("loadtest..." ,sender, receiver, "http://www.yahoo.com");
// mailSender.sendEmailLoadTest("loadtest..." ,sender, receiver, "www.google.com");
// mailSender.sendEmailLoadTest("loadtest..." ,sender, receiver, "https://www.tsestoque.com.br");
// mailSender.sendEmailLoadTest("loadtest..." ,sender, receiver, "http://www.yahoo.com");

//TESTE PESADO

