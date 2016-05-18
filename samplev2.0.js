var width = 1200;
var height = 2500;
var webpage = require('webpage');

page = webpage.create();
page.viewportSize = {width: width, height: height};
page.open('http://cheesespin.net/', function(status) {
    console.log(status);
    page.evaluate(function(w, h) {
      document.body.style.width = w + "px";
      document.body.style.height = h + "px";
    }, width, height);
    //page.clipRect = {top: 0, left: 0, width: width, height: height};                                                                                                                           
    page.render('cheesespin.jpg');
    phantom.exit();
});