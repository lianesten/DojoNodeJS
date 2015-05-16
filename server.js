var http = require("http");
var path = require("path");//hacemos un llamado a la libreria
var fs = require("fs");//hacemos referencia al fileSystem
function requestEvent(req , res){
	var contentType = "text/html";
	var resource = req.url;//Sacamos la url para saber que recurso vamos a tratar
	var ext = path.extname(resource); //variable que va a ser la extension
	if(resource === "/"){//revisamos el la ruta es la raiz
		resource = "/index.html";
	}

	resource = "."+resource;


	switch(ext){
		case ".css":
			contentType = "text/css";
			break;
		case ".js":
			contentType = "text/javascript";
			break;

	}
	
	fs.exists(resource,function(exist){
		if(exist){
			fs.readFile(resource,function(err,data){
				if(err){
					res.writeHead(500);
					res.end("Internal Error");
				}else{
					res.writeHead(200,{"content-type":contentType});
					res.end(data);
				}
			});
		}else{
			res.writeHead(404);
			resp.end("Not Found");
			}
	});	
/*
	res.writeHead(200,{"content-type":"html"});
	res.header("Content-Type", "application/json; charset=utf-8");
	res.end("<h1>Fin de la petición :)</h1>");*/
}

var server = http.createServer(requestEvent);
server.listen(8882);
console.log("server running...");
