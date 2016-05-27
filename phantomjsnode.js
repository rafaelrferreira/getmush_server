var phantom = require('phantom');

var sitepage = null;
var phInstance = null;
var resourceWait  = 300,                              //Tempo de espera de carregamento de um recurso
    maxRenderWait = 10000,                            //Tempo máximo de espera de renderização
    url           = 'http://spazioacqua.pe.hu/';   //URL da página requisitada
    title         = 'default',                   //Titulo da página
    count         = 0,                           //Contagem de itens sendo carregados
    forcedRenderTimeout = null,                   //Timeout de renderização forçado
    renderTimeout = null;                         //Timeout de renderização
    msg = 'Hold the door! - Hodor';

    //Pagina Teste 1: http://projteste02.azurewebsites.net/HtmlPage1.html
    //Pagina Teste 2: http://spazioacqua.pe.hu

    //Execução do Phantom
    phantom.create()
        .then(instance => {
            phInstance = instance;
            return instance.createPage();
        })
        .then(page => {
           page.property('viewportSize', {width: 1920, height: 2000});

            //RESOURCE REQUEST 
            page.property("onResourceRequested", requestData => console.log('requesting', requestData.url));

            //RESOURCE RECEIVED  
            page.property('onResourceReceived', function(res) {
               console.log('onResourceReceived: ' + res.stage );
               if (res.stage === 'start') {
                  harResources[res.id].startReply = res;
               }
               if (res.stage === 'end') {
                  harResources[res.id].endReply = res;
               }

               if (!res.stage || res.stage === 'end') {
                    count -= 1;
                    console.log(res.id + ' ' + res.status + ' - ' + res.url);
                    if (count === 0) {
                        renderTimeout = setTimeout(doRender, resourceWait);
                    }
                }
            }).then(function() {
               console.log('success set onResourceReceived');
            });
                     
            sitepage = page;
            
            return sitepage.open(url);
        })
        .then(status => {

            if (status !== "success") {
                msg = 'Não foi possível carregar a URL. Status: ' + status;
                console.log(msg);
                //sendEmail(msg, 'simpleText');

                phantom.exit();
            } else {
                var b64 = null;

                //forcedRenderTimeout = setTimeout(function () {
                    //console.log(count);
                    //b64 = sitepage.renderBase64('PNG');
                //}, maxRenderWait);

                //Gera a imagem no formato Base64
                b64 = sitepage.renderBase64('PNG');
                return b64;
            }
        })
         .then(b64 => {
            //sendEmail(b64, 'fileBase64');
            //cleanup();
         })
        .then(content => {

        })
    .catch(error => {
        console.log(error);
        //sendEmail(error, 'simpleText');

        phInstance.exit();
    });

    //
    function doRender(page) {

    }

    //Fecha e finaliza as variáveis do Phantom
    function cleanup() {
        sitepage.close();
        phInstance.exit();
    } 

    //Envia o email
    function sendEmail(msg, flag) {
        var nodemailer = require('nodemailer');

        // O primeiro passo é configurar um transporte para este
        // e-mail, precisamos dizer qual servidor será o encarregado
        // por enviá-lo:
        var transporte = nodemailer.createTransport({
          service: 'Gmail', // servidor do Gmail
          auth: {
            user: 'get@getmush.com.br',
            pass: '1234qwerasdf'             
          } 
        });

        if (flag == 'fileBase64')
        {
            //Objeto email com algumas configurações
            var email = {
              from: 'get@getmush.com.br', // Quem enviou
              to: 'rafaelrferreira@gmail.com', // Quem receberá
              subject: 'Your image is ready. Take it, its yours! ^^',  // Assunto  
              forceEmbeddedImages: false,
               attachments: [  
                    {   
                        filename: "pageImage.png",    
                        content: new Buffer(msg, 'base64'),   
                        cid: 'get@getmush.com.br',
                        encoding: 'base64'    
                    },
                    {   // encoded string as an attachment
                        filename: 'pageImage.png',
                        content: new Buffer(msg, 'base64'),
                        encoding: 'base64'
                    }   
                  ],   
              html: '<img src="cid:get@getmush.com.br" />' // O conteúdo do e-mail
            };
        }else if (flag == 'simpleText')
        {
            //Objeto email com algumas configurações (sem anexo)
            var email = {
              from: 'get@getmush.com.br', // Quem enviou
              to: 'rafaelrferreira@gmail.com', // Quem receberá
              subject: 'Oops!',  // Assunto  
              html: '<span>'+msg+'</span>' // O conteúdo do e-mail
            };
        }

        // Pronto, tudo em mãos, basta informar para o transporte
        // que desejamos enviar este e-mail
        transporte.sendMail(email, function(err, info){
          if(err)
            throw err; // Oops, algo de errado aconteceu.

          console.log('Email enviado! Leia as informações adicionais: ', info);
        });
    }

