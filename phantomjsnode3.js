page.property('onResourceRequested', function(request) {
   console.log('onResourceRequested: ' );
   console.log( request );
}).then(function() {
   console.log('success set onResourceRequested');
});

page.property('onResourceReceived', function(res) {
   console.log('onResourceReceived: ' + res.stage );
   if (res.stage === 'start') {
      harResources[res.id].startReply = res;
   }
   if (res.stage === 'end') {
      harResources[res.id].endReply = res;
   }
}).then(function() {
   console.log('success set onResourceReceived');
});

page.setContent('<!DOCTYPE html><html><head></head><body style="margin: 0px; padding: 0px"><div>'  + renderConfig.tag +  '</div></body></html>', renderConfig.headers.Referer)
.then( function() {
   console.log('start on load success');
   setTimeout(function() {
      onLoadSuccess();
   }, 10000);
});