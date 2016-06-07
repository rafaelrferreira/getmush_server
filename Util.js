exports.validateUrl = function (url) {
    if(!url.includes("http://") || !url.includes("https://")){
        if(url.indexOf("www.") == 0){
            url = "http://" + url;
        } else if(url.indexOf("wwws.") == 0){
            url = url.replace("wwws.", "www.");
            url = "https://" + url;
        } else {
            url = "http://www." + url;
        }
    }
    
    var urlPattern = new RegExp("(http|https)://[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;/~+#-]*[\w@?^=%&amp;/~+#-])?");
    
    if (url.match(urlPattern)){
        return url;
    }
    else{
        return "";
    }
}