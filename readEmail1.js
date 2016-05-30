var Imap = require('imap'),
inspect = require('util').inspect;

var imap = new Imap({
    user: 'get@getmush.com.br',
    password: '1234qwerasdf',
    host: 'imap.gmail.com',
    port: 993,
    tls: true,
    tlsOptions: { rejectUnauthorized: false }
});

var fs = require('fs'), fileStream;

function openInbox(cb) {
    imap.openBox('INBOX', false, cb);
}

imap.once('ready', function() {
    openInbox(function(err, box) {
        if (err) throw err;
        imap.search([ 'UNSEEN', ['SINCE', 'May 28, 2016'] ], function(err, results) {
            if (err) {
                console.log('you are already up to date');
            }
            var f = imap.fetch(results, { bodies: '', markSeen:true });
            f.on('message', function(msg, seqno) {
                console.log('Message #%d', seqno);
                var prefix = '(#' + seqno + ') ';
                msg.on('body', function(stream, info) {
                    console.log(prefix + 'Body');
                    stream.pipe(fs.createWriteStream('msg-' + seqno + '-body.txt'));
                });
                msg.once('attributes', function(attrs) {
                    console.log(prefix + 'Attributes: %s', inspect(attrs, false, 8));
                });
                msg.once('end', function() {
                    console.log(prefix + 'Finished');
                });
            });
            f.once('error', function(err) {
                console.log('Fetch error: ' + err);
            });
            f.once('end', function() {
                console.log('Done fetching all messages!');
            });
        });
    });
});

imap.connect();