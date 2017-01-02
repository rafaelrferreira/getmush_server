var phantom = require('phantom');
var colors = require('colors');

var queueManager = require("./Queue.js");
var mailSender = require("./MailSender.js");
var eventController = require("./EventController.js");

var imgB64 = null;
var sitepage = null;
var phInstance = null;
title = 'default', msg = 'Hold the door! - Hodor';

//Processa a URL de entrada e envia para um email
exports.mushMushProcess = function (url, emailTo) {
    //Execução do Phantom
    phantom.create()
        .then(instance => {
            phInstance = instance;
            return instance.createPage();
        })
        .then(page => {
            page.property('viewportSize', { width: 1920, height: 1800 });

            // //RESOURCE REQUEST 
            // page.property('onResourceRequested', function (request) {
            //    console.log( request.url );
            // }).then(function() {
            //    console.log('success onResourceRequested');
            // });

            //RESOURCE RECEIVED  
            page.property('onResourceReceived', function (res) {
                //console.log(res.id + ' ' + res.status + ' - ' + res.url);
                if (!res.stage || res.stage === 'end') {
                    count -= 1;
                    //console.log(res.id + ' ' + res.status + ' - ' + res.url);
                    if (count === 0) {
                        //renderTimeout = setTimeout(doRender, resourceWait);
                    }
                }
            }).then(function () {
                //console.log("success set onResourceReceived".green);
            });

            sitepage = page;
            return sitepage.open(url);
        })
        .then(status => {
            if (status !== "success") {
                console.log("PHANTOM -----------------------> " + url);
                msg = 'Não foi possível carregar a URL. Status: ' + status;
                console.log(colors.red(msg));
                mailSender.sendEmail(msg, emailTo, 'simpleText');
                phInstance.exit();
                
            } else {
                var b64 = null;
                //Gera a imagem no formato Base64
                b64 = sitepage.renderBase64('PNG');
                return b64;
            }
        })
        .then(b64 => {
            mailSender.sendEmail(b64, emailTo, 'fileBase64');
            cleanup();
        })
        .catch(error => {
            console.log(colors.red(error));
            //sendEmail(error, emailTo, 'simpleText');
            phInstance.exit();
        });
}

//Processa a URL de entrada
exports.mushMushProcessUrl = function  (url) {
    //Execução do Phantom
    phantom.create()
        .then(instance => {
            phInstance = instance;
            return instance.createPage();
        })
        .then(page => {
            page.property('viewportSize', { width: 800, height: 600 });

            //RESOURCE RECEIVED  
            page.property('onResourceReceived', function (res) {
                //console.log(res.id + ' ' + res.status + ' - ' + res.url);
                if (!res.stage || res.stage === 'end') {
                    count -= 1;
                    //console.log(res.id + ' ' + res.status + ' - ' + res.url);
                    if (count === 0) {
                        //renderTimeout = setTimeout(doRender, resourceWait);
                    }
                }
            }).then(function () {
                console.log("success set onResourceReceived".green);
            });

            sitepage = page;
            return sitepage.open(url);
        })
        .then(status => {
            if (status !== "success") {
                console.log("PHANTOM -----------------------> " + url);
                msg = 'Não foi possível carregar a URL. Status: ' + status;
                console.log(colors.red(msg));
                
                phInstance.exit();
                
            } else {
                var b64 = null;
                //Gera a imagem no formato Base64
                b64 = sitepage.renderBase64('PNG');
                return b64;
            }
        })
        .then(b64 => {
            console.log(colors.green('Renderização da url finalizada.'));
            return b64;

            cleanup();
        })
        .then(function(result) {
            //exports.respB64 = function(req, res){
                //console.log('Hello world');
                //res.send('Hello world');
            //};
        })
        .catch(error => {
            console.log(colors.red(error));
            phInstance.exit();
        });
}

//exports.respB64 = imgB64;
//exports.respB64 = mushMushProcessUrl("https://www.google.com.br");

exports.RegisterEvent = function (){
    eventController.AddListenerToEvent("OnPop", ExecuteRequestAndRemoveListener);
    console.log("#Phantom listening, WAITING FOR NEW REQUESTS: ".silly);
}


//Fecha e finaliza as variáveis do Phantom
function cleanup() {
    sitepage.close();
    phInstance.exit();
}

function ExecuteRequestAndRemoveListener(){
    queueManager.PopRequest();
    eventController.RemoveListenerOfEvent("OnPop", ExecuteRequestAndRemoveListener);
}