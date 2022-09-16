var express = require("express");

var app = express();

app.listen(3000);

app.get("/", function (req, res) {
    res.send("Hola");
});

app.get("/api", function (req, res) {
    var obj = {
        nombre: "prueba",
        framework: "express",
        ventaja: "serializó por nosotros",
    };
    res.json(obj);
});

app.get("/ab?cd", function (req, res) {
    res.send("ab?cd");
});

app.get("/ab*cd", function (req, res) {
    res.send("ab*cd");
});

app.get("/api/:id", function (req, res) {
    res.json({ parametro: req.params.id });
});

app.get("/static", function (req, res) {
    res.send(
        '<html><head> \
        <link href="/assets/style.css" rel="stylesheet"> \
        </head><body> \
        <p>Archivos estaticos rapido y facil!!</p>\
        <img src="/assets/imagen.jpg">\
        </body></html>'
    );
});

app.use("/assets/", express.static(__dirname + "/public"));

app.use("/", function (req, res, next) {
    console.log("Hicieron un Request a " + req.url);
    next();
});

app.get("/datos/", function (req, res) {
    res.json(req.query);
});

app.get("/form", function (req, res) {
    res.send(
        '<html><head> \
     <link href="/assets/style.css" rel="stylesheet"> \
     </head><body>\
      <form method="POST" action="/form">\
      Nombre <input name="nombre" type="text"><br>\
      Apellido <input name="apellido" type="text"><br>\
      Curso <input name="curso" type="text"><br>\
      <input type="submit">\
      </form>\
     </body></html>'
    );
});

app.use(express.urlencoded({ extended: false }));
app.post("/form", function (req, res) {
    res.json(req.body);
});

app.use(express.json());
app.post("/formjson", function (req, res) {
    res.json(req.body);
});