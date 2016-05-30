var MailListener = require("mail-listener2");
var MailParser = require("mailparser").MailParser,
    mailparser = new MailParser();

var mailListener = new MailListener({
  username: "get@getmush.com.br",
  password: "1234qwerasdf",
  host: "imap.gmail.com",
  port: 993, // imap port 
  tls: true,
  tlsOptions: { rejectUnauthorized: false },
  mailbox: "INBOX", // mailbox to monitor 
  searchFilter: ["UNSEEN"], // the search filter being used after an IDLE notification has been retrieved 
  markSeen: true, // all fetched email willbe marked as seen and not fetched next time 
  fetchUnreadOnStart: true, // use it only if you want to get all unread email on lib start. Default is `false`, 
  mailParserOptions: {streamAttachments: false}, // options to be passed to mailParser lib. 
  attachments: false, // download attachments as they are encountered to the project directory 
  attachmentOptions: { directory: "attachments/" } // specify a download directory for attachments 
});
 
mailListener.start(); // start listening 
 
// stop listening 
//mailListener.stop(); 
 
mailListener.on("server:connected", function(){
  console.log("imapConnected");
});
 
mailListener.on("server:disconnected", function(){
  console.log("imapDisconnected");
});
 
mailListener.on("error", function(err){
  console.log(err);
});
 
mailListener.on("mail", function(mail, seqno, attributes){
  // do something with mail object including attachments 
  console.log("##----------------------------##");
  console.log("NAME: ", mail.from[0].name);
  console.log("EMAIL: ", mail.from[0].address);
  console.log("SUBJECT: ", mail.subject);
  console.log("##----------------------------##");
});
 
mailListener.on("attachment", function(attachment){
  //console.log(attachment.path);
});
 
// it's possible to access imap object from node-imap library for performing additional actions. E.x. 
//mailListener.imap.move(:msguids, :mailboxes, function(){})