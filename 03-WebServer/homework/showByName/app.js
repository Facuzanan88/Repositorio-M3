var fs = require("fs")
var http = require("http")

// Escribí acá tu servidor
http.createServer((req, res) => {
    // crear ruta que revise el nombre de un archivo
    // settear headers
    // regresar imagen como respuesta
    fs.readFile(
        `${__dirname}/images/${req.url}.jpg`,
        (err, data) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('Hubo un error!')
            } else {
                res.writeHead(200, { 'Content-Type': 'image/jpg' });
                res.end(data)
            }
        });
}).listen(3000, '127.0.0.1')