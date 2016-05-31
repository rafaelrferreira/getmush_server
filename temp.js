var url = "http://www.minhacasa.server.com";
console.log(validUrl(url));
console.log(urlRefactor(url));
console.log(validUrl(url));

//Valida a URL
function validUrl(url) {
    //(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})
    ///([^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})/gi
    var urlPattern = new RegExp("(http|https)://[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:/~+#-]*[\w@?^=%&amp;/~+#-])?");
    if (url.match(urlPattern))
        return true;
    else
        return false;
}

//Refatora caso possível
// function urlRefactor(urjObj) {
//     var http = urjObj.substring(0, 7);
//     var https = urjObj.substring(0, 8);
//     console.log(http);
//     console.log(https);

//     if ((http != "http://") && (http != "https://")) {
//         url = "http://" + urjObj;
//         console.log("1"+url);
//     } else if (http != "https://") {
//         url = "https://" + urjObj;
//         console.log("2"+url);
//     }
//     else
//         url = urjObj;

//     return url;
// }
