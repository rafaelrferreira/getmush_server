var phantom = require('phantom');

var sitepage = null;
var phInstance = null;
var resourceWait  = 300,                                                    //Tempo de espera de carregamento de um recurso
    maxRenderWait = 10000,                                                  //Tempo máximo de espera de renderização
    url           = 'https://www.tsestoque.com.br';  //URL da página requisitada
    title         = 'default',                   //Titulo da página
    count         = 0,                           //Contagem de itens sendo carregados
    forcedRenderTimeout = null,                         //Timeout de renderização forçado
    renderTimeout = null;                               //Timeout de renderização

//Pagina Teste: http://projteste02.azurewebsites.net/HtmlPage1.html
var async = require('async');
var calls = [];

phantom.create()
    .then(instance => {
        phInstance = instance;
        return instance.createPage();
    })
    .then(page => {
        page.property('viewportSize', {width: 1920, height: 2000});
        //page.set('clipRect', valsFromPage.rect);

        sitepage = page;
        
        return sitepage.open(url);
    })
    .then(status => {
        var b64 = sitepage.renderBase64('PNG');

        return b64;
    })
     .then(b64 => {
          sendEmail(b64);
          cleanup();
     })
    .then(content => {

    })
    .catch(error => {
        console.log(error);
        phInstance.exit();
    });

    function cleanup() {
        sitepage.close();
        phInstance.exit();
    } 

    //Envia o email
    function sendEmail(fileBase64) {
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

        //  objeto email com algumas configurações
        var email = {
          from: 'get@getmush.com.br', // Quem enviou
          to: 'rafaelrferreira@gmail.com, rodrigorf33@gmail.com, edjosteneslp@gmail.com', // Quem receberá
          subject: 'Your image is ready. Take it, its yours! ^^',  // Assunto  
          forceEmbeddedImages: false,
           attachments: [  
                {   
                    filename: "pageImage.png",    
                    content: new Buffer(fileBase64, 'base64'),   
                    cid: 'get@getmush.com.br',
                    encoding: 'base64'    
                },
                {   // encoded string as an attachment
                    filename: 'pageImage.png',
                    content: new Buffer(fileBase64, 'base64'),
                    encoding: 'base64'
                }   
              ],   
          html: '<img src="cid:get@getmush.com.br" />' // O conteúdo do e-mail
        };

        // Pronto, tudo em mãos, basta informar para o transporte
        // que desejamos enviar este e-mail
        transporte.sendMail(email, function(err, info){
          if(err)
            throw err; // Oops, algo de errado aconteceu.

          console.log('Email enviado! Leia as informações adicionais: ', info);
        });
    }

