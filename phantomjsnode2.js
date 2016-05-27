var Q = require("q");
var phantom = require("phantom");

var DomainScraper = function(){	
		
	this.createPhantom = function(){	
		var df = Q.defer();
		phantom.create(function(ph){
			df.resolve(ph);
		});
		return df.promise;		
	};
	
	this.createPage = function(ph){
		var df = Q.defer();
		ph.createPage(function(page, err){
			df.resolve(page);
		});
		return df.promise;
	};
	
	this.openPage = function(page, url){
		var df = Q.defer();
		page.open(url, function(status) {			
			df.resolve( {page: page, status: status} );
		});
		return df.promise;
	};
	
	this.screenshotPage = function( url ){
		
		var domainScraper = this;
		var url = "http://" + 'www.setfive.com';				
		
		console.log( "Processing: " + 'http://www.setfive.com');
		
		var val = domainScraper
		.createPage(domainScraper.ph)
		.then(function(page){
			page.set("viewportSize", { width: 1600, height: 790 });
			return domainScraper.openPage(page, url);
		}).then(function(obj){
			
			if( obj.status == "success" ){											
				obj.page.render( url + ".png" );				
				console.log("Rendered " + url);
			}
			
			return result;
		})
		.done(function(){
			domainScraper.ph.exit();
		});
		
	};
			
	
};

var ds = new DomainScraper();
ds.screenshotPage("http://www.setfive.com");