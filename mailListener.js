var queueManager = require("./queue.js");
var phManager = require("./phantomManager.js");
var eventController = require("./EventController.js");

var MailListener = require("mail-listener2");
var colors = require('colors');

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
  mailParserOptions: { streamAttachments: false }, // options to be passed to mailParser lib. 
  attachments: false, // download attachments as they are encountered to the project directory 
  attachmentOptions: { directory: "attachments/" } // specify a download directory for attachments 
});

var title = 'default',
  msg = 'Hold the door! - Hodor';

colors.setTheme({
  silly: 'rainbow',
  input: 'grey',
  verbose: 'cyan',
  prompt: 'grey',
  info: 'green',
  data: 'grey',
  help: 'cyan',
  warn: 'yellow',
  debug: 'blue',
  error: 'red'
});

function OnPushCallback() {
  var listeners = eventController.ListenerCountByEvent("OnPop");
  console.log(listeners + " listener(s) registrados".warn);
  if (listeners == 1) {
    eventController.EmitEvent("OnPop");
  }
}

mailListener.start(); // start listening 

mailListener.on("server:connected", function () {
  console.log("#IMAP Connected: ".silly);
  phManager.RegisterEvent();
});

mailListener.on("server:disconnected", function () {
  console.log("IMAP Disconnected.".silly);
});

mailListener.on("error", function (err) {
  console.log(err);
});

mailListener.on("mail", function (mail, seqno, attributes) {
  var url = mail.subject;
  if (validUrl(url)) {
    console.log("URL Válida: ".info, url);
    queueManager.PushRequest(url, mail.from[0].address, OnPushCallback());
  }
});