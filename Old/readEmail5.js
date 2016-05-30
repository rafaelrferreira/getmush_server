var Imap = require('imap');

var imap = new Imap({
    user: 'get@getmush.com.br',
    password: '1234qwerasdf',
    host: 'imap.gmail.com',
    port: 993,
    tls: true,
    tlsOptions: { rejectUnauthorized: false }
});

function openInbox(cb) {
  imap.openBox('INBOX', true, cb);
}

imap.once('ready', function() {
    openInbox(function(err, box) {
        if (err) throw err;
        imap.search([ 'UNSEEN', ['SINCE', 'May 28, 2016'] ], function(err, results) {
            
            console.log('Connection initiated...');
            //var f = imap.seq.fetch(box.messages.total + ':*', { bodies: ['HEADER.FIELDS     (FROM)','TEXT'] });
            //var f = imap.fetch(results, {bodies: ["HEADER.FIELDS     (FROM)", 'TEXT']});
            var f = imap.fetch(results, { bodies: '', markSeen:true });

            f.on('message', function(msg, seqno) {
                //console.log('Message #%d', seqno);
                //var prefix = '(#' + seqno + ') ';
                msg.on('body', function(stream, info) {
                    //if (info.which === 'TEXT')
                    //console.log(prefix + 'Body [%s] found, %d total bytes', inspect(info.which), info.size);
                    var buffer = '', count = 0;
                    stream.on('data', function(chunk) {
                        //count += chunk.length;
                        buffer += chunk.toString('utf8');
                        //  console.log('BUFFER', buffer)  //HEre i am able to view the body
                        if (info.which === 'TEXT')
                            console.log(prefix + 'Body [%s] (%d/%d)', inspect(info.which), count, info.size);
                    });

                });
                //msg.once('attributes', function(attrs) {
                    //console.log(prefix + 'Attributes: %s', inspect(attrs, false, 8));
                //});
                //msg.once('end', function() {
                    //console.log(prefix + 'Finished');
                //});
            });

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

imap.once('error', function(err) {
  console.log(err);
});

imap.once('end', function() {
  console.log('Connection ended');
});

imap.connect();