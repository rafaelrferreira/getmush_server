
var MailParser = require("mailparser").MailParser,
  mailparser = new MailParser();

//Envia o email
exports.sendEmail = function (msg, clientEmail, flag) {
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
    if (err)
      throw err; // Oops, algo de errado aconteceu.

    console.log('Email enviado! Leia as informações adicionais: '.info, info);
  });
}

