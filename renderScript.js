// This example shows how to render pages that perform AJAX calls
// upon page load.
//
// Instead of waiting a fixed amount of time before doing the render,
// we are keeping track of every resource that is loaded.
//
// Once all resources are loaded, we wait a small amount of time
// (resourceWait) in case these resources load other resources.
//
// The page is rendered after a maximum amount of time (maxRenderTime)
// or if no new resources are loaded.
//
//GETMUSH - v1.0.0 (getmush.com.br)

//var phantom = require('phantomjs');

var resourceWait  = 300,                                                    //Tempo de espera de carregamento de um recurso
    maxRenderWait = 10000,                                                  //Tempo máximo de espera de renderização
    url           = 'http://projteste02.azurewebsites.net/HtmlPage1.html';  //URL da página requisitada

var page          = require('webpage').create(), //Criar objeto da página usando o PhantomJS
    title         = 'default',                   //Titulo da página
    count         = 0,                           //Contagem de itens sendo carregados
    forcedRenderTimeout,                         //Timeout de renderização forçado
    renderTimeout;                               //Timeout de renderização
//var pilhaImagens = [];                         //Pilha para empilhar imagens



//Tamanho da tela de visualização
page.viewportSize = { width: 1280, height : 1024 };

//Finaliza a renderização e salva o arquivo
function doRender() {
    //Recorte da Imagem
	//page.clipRect = {top: 0, left: 0, width: width, height: height};

    //Retira espaços em branco, limita o tamanho do titulo e coloca tudo minusculo   
    var str = title.replace(/\s/g, '').substring(0, 25).toLowerCase();

    page.render(str + '.png');
    var imgBase64 = page.renderBase64('PNG');
    //pilhaImagens.push('<img src="data:image/png;base64,' + imgBase64 + '">');

    phantom.exit();
}

//Evento de requisição dos recursos
page.onResourceRequested = function (req) {
    count += 1; //incrementa o contado de recursos da pagina
    console.log('> ' + req.id + ' - ' + req.url);
    clearTimeout(renderTimeout); //limpa o tempo de timeout
};

//No recebimento do recurso requisitado
page.onResourceReceived = function (res) {
    if (!res.stage || res.stage === 'end') {
        count -= 1;
        console.log(res.id + ' ' + res.status + ' - ' + res.url);
        if (count === 0) {
            renderTimeout = setTimeout(doRender, resourceWait);
        }
    }
};

//Abertura da página, verificação do status, verificação do Titulo e geração dos logs
page.open(url, function (status) {
    title = page.evaluate(function() {
        console.log(document.title);
        return document.title;
    });

    if (status !== "success") {
        console.log('Não foi possível carregar a URL. Status: ' + status);
        phantom.exit();
    } else {
        forcedRenderTimeout = setTimeout(function () {
            console.log(count);
            doRender();
        }, maxRenderWait);
    }
});