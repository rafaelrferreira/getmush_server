var phManager = require('./Phantom.js');
var requests = []

exports.PushRequest = function(url, email, cb){
    requests.push(OnMushProcessCallback(url, email));
    if(cb){
      cb();
    }
}

exports.PopRequest = function(){
    if(requests.length > 0){
        requests.pop();
    }
}

exports.GetRequests = function(){
    return requests;
}

function OnMushProcessCallback(url, email){
  phManager.mushMushProcess(url, email);
}