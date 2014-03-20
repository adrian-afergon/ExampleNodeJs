var http = require('http');
var url = require("url");

var conf = require("./webconf");

function iniciar(route, handle){
	function onRequest (request, response) {
        var dataPosteada = "";
        var pathname = url.parse(request.url).pathname;
        console.log("Peticion para " + pathname + " recibida.");

        request.setEncoding("utf8");

        request.addListener("data", function(trozoPosteado) {
          	dataPosteada += trozoPosteado;
          	console.log("Recibido trozo POST '" + trozoPosteado + "'.");
    	});

    	request.addListener("end", function() {
      		route(handle, pathname, response, dataPosteada);
    	});
  	}
	http.createServer(onRequest).listen(conf.portListen, conf.ipServer);
	console.log("Executing... view browser");
}

exports.iniciar = iniciar; 