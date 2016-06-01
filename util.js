exports.validUrl = function (url) {
    //(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})
    ///([^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})/gi
    var urlPattern = new RegExp("(http|https)://[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:/~+#-]*[\w@?^=%&amp;/~+#-])?");
    if (url.match(urlPattern))
        return true;
    else
        return false;
}