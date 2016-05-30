var Imap = require('imap');
var util = require('util');

var imap = new Imap({
    user: 'get@getmush.com.br',
    password: '1234qwerasdf',
    host: 'imap.gmail.com',
    port: 993,
    tls: true,
    tlsOptions: { rejectUnauthorized: false }
});

 
  function show(obj) {
    return util.inspect(obj, false, Infinity);
  }
 
  function die(err) {
    console.log('Uh oh: ' + err);
    process.exit(1);
  }

function openInbox(cb) {
  imap.openBox('INBOX', true, cb);
}

imap.once('ready', function() {
    openInbox(function(err, box) {
         if (err) die(err);
        imap.search([ 'UNSEEN', ['SINCE', 'May 25, 2016'] ], function(err, results) {
          if (err) die(err);
          var fetch = imap.fetch(results, {
            request: {
              headers: ['from', 'to', 'subject', 'date']
            }
          });
          fetch.on('message', function(msg) {
            console.log('Got a message with sequence number ' + msg.seqno);
            msg.on('end', function() {
              // msg.headers is now an object containing the requested headers ... 
              console.log('Finished message. Headers ' + show(msg.headers));
            });
          });
          fetch.on('end', function() {
            console.log('Done fetching all messages!');
            imap.end();
          });
        });
    });
});

imap.once('error', function(err) {
  console.log(err);
});

imap.once('end', function() {
  console.log('Connection ended');
});

imap.connect();