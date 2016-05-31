var events = require('events');
var eventEmitter = new events.EventEmitter();

exports.AddListenerToEvent = function (eventName, callback){
    eventEmitter.addListener(eventName, callback);
}

exports.RemoveListenerOfEvent = function (eventName, callback){
    eventEmitter.removeListener(eventName, callback);
}

exports.EmitEvent = function (eventName){
    eventEmitter.emit(eventName);
}

exports.ListenerCountByEvent = function (eventName){
    return events.listenerCount(eventEmitter, eventName);
}