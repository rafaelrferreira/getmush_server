var Imap = require('imap'),
log = require("winston"),
inspect = require('util').inspect;

var MailParser = require("mailparser").MailParser,
    mailparser = new MailParser();

var imap = new Imap({
    user: 'get@getmush.com.br',
    password: '1234qwerasdf',
    host: 'imap.gmail.com',
    port: 993,
    tls: true,
    markSeen: true,
    markRead : true,
    tlsOptions: { rejectUnauthorized: false }
});

var emsg = '';

function openInbox(cb) {
    imap.openBox('INBOX', false, cb);
}

imap.once('ready', function() {
	 openInbox(function(err, box) {
	 	 if (err) throw err;
	 	 imap.search([ 'UNSEEN', ['SINCE', 'May 28, 2016'] ], function(err, results) {
	 	 	if (err) {
                console.log(err);
            }

		    //var f = imap.fetch(results, { bodies: ['HEADER.FIELDS (TO FROM SUBJECT CC)', '1', '1.1'], struct: true });
            var f = imap.fetch(results, { bodies: ["HEADER.FIELDS (FROM SUBJECT)", ""], markSeen:false });
            //var f = imap.fetch(results, {bodies: ["HEADER.FIELDS (FROM SUBJECT)", ""]});

 			f.on("message", processMessage);

            f.once('error', function(err) {
                console.log('Fetch error: ' + err);
            });

            f.once('end', function() {
                console.log('Done fetching all messages!');
                imap.end();
            });
	 	 });
	 });	
});

imap.connect();

function processMessage(msg, seqno) {
    log.info("Processing msg #" + seqno);

    //var mailparser = new MailParser();
    mailparser.on("headers", function(headers) {
      // log.info("Header: " + JSON.stringify(headers));
    });

    msg.on('body', function(stream, info) {
        //log.info(stream);
        log.info(info);
    });

    mailparser.on("end", function(msg) {
    	//var obj = JSON.parse(msg);
    	var stdata = JSON.stringify(msg);
		var sdata = JSON.parse(stdata);

		//log.info(sdata);
        //log.info("From: " + sdata.from);
        //log.info("Subject: " + obj.subject);
        //log.info("Text: " + obj.text);
        //log.info("Html: " + obj.html);
    });
    msg.once("end", function () {
        log.info("Finished msg #" + seqno);
        mailparser.write(msg);
        mailparser.end();
    });
}