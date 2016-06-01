
var MailParser = require("mailparser").MailParser;
var nodemailer = require('nodemailer');

var phManager = require("./Phantom.js");
var queueManager = require("./Queue.js");

var mailparser = new MailParser();

//Envia o email
exports.sendEmail = function (msg, clientEmail, flag) {
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

  if (flag == 'fileBase64') {
    //Objeto email com algumas configurações
    var email = {
      from: 'get@getmush.com.br', // Quem enviou
      to: clientEmail, // Quem receberá
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
  } else if (flag == 'simpleText') {
    //Objeto email com algumas configurações (sem anexo)
    var email = {
      from: 'get@getmush.com.br', // Quem enviou
      to: clientEmail, // Quem receberá
      subject: 'Oops!',  // Assunto  
      html: '<span>' + msg + '</span>' // O conteúdo do e-mail
    };
  }

  // Pronto, tudo em mãos, basta informar para o transporte
  // que desejamos enviar este e-mail
  transporte.sendMail(email, function (err, info) {
    if (err) {
      throw err; // Oops, algo de errado aconteceu.
    } else {
      //console.log('Email enviado! Leia as informações adicionais: '.info, info);
      PopNextRequest();
    }
  });
}

function PopNextRequest() {
  if (queueManager.GetRequests().length == 0) {
    phManager.RegisterEvent();
  } else {
    queueManager.PopRequest();
  }
}

//Envia o email de teste de carga
exports.sendEmailLoadTest = function (msg, sender, receiver, url) {
  // O primeiro passo é configurar um transporte para este
  // e-mail, precisamos dizer qual servidor será o encarregado
  // por enviá-lo:
  var transporte = nodemailer.createTransport({
    service: 'Gmail', // servidor do Gmail
    auth: {
      user: 'toad@getmush.com.br',
      pass: '1234qwer!@#$'
    }
  });
  
  //Objeto email com algumas configurações (sem anexo)
  var email = {
    from: sender, // Quem enviou
    to: receiver, // Quem receberá
    subject: url,  // Assunto  
    html: '<span>' + msg + '</span>' // O conteúdo do e-mail
  };

  // Pronto, tudo em mãos, basta informar para o transporte
  // que desejamos enviar este e-mail
  transporte.sendMail(email, function (err, info) {
    if (err) {
      throw err; // Oops, algo de errado aconteceu.
     } else {
      console.log('Email enviado! Leia as informações adicionais: ', info);
       PopNextRequest();
    }
  });
}

