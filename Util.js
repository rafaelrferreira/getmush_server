exports.validateUrl = function (url) {
    if(!url.includes("http://") || !url.includes("https://")){
        if(url.includes("www.")){
            url = "http://" + url;
        } else if(url.includes("wwws.")){
            url = url.replace("wwws.", "www.");
            url = "https://" + url;
        } else {
            url = "http://www." + url;
        }
    }
    
    var urlPattern = new RegExp("(http|https)://[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:/~+#-]*[\w@?^=%&amp;/~+#-])?");
    
    if (url.match(urlPattern)){
        return url;
    }
    else{
        return "";
    }
}