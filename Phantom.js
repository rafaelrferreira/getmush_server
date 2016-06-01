var phantom = require('phantom');
var colors = require('colors');

var queueManager = require("./Queue.js");
var mailSender = require("./MailSender.js");
var eventController = require("./EventController.js");

var sitepage = null;
var phInstance = null;
title = 'default', msg = 'Hold the door! - Hodor';

//Processa a URL de entrada
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
                msg = 'Não foi possível carregar a URL. Status: ' + status;
                console.log(colors.red(msg));
                mailSender.sendEmail(msg, emailTo, 'simpleText');
                phantom.exit();
                
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