var http = require('http');
var fs = require('fs');

var beatles = [{
  name: "John Lennon",
  birthdate: "09/10/1940",
  profilePic: "https://blogs.correiobraziliense.com.br/trilhasonora/wp-content/uploads/sites/39/2020/10/CBNFOT081020100047-550x549.jpg"
},
{
  name: "Paul McCartney",
  birthdate: "18/06/1942",
  profilePic: "http://gazettereview.com/wp-content/uploads/2016/06/paul-mccartney.jpg"
},
{
  name: "George Harrison",
  birthdate: "25/02/1946",
  profilePic: "https://canaldosbeatles.files.wordpress.com/2012/02/george-george-harrison-8321345-438-600.jpg"
},
{
  name: "Richard Starkey",
  birthdate: "07/08/1940",
  profilePic: "http://cp91279.biography.com/BIO_Bio-Shorts_0_Ringo-Starr_SF_HD_768x432-16x9.jpg"
}
]

http.createServer((req, res) => {
  const pathArray = req.url.split('/');

  if (req.method === 'GET' && req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });

    const html = fs.readFileSync('./index.html', 'utf-8')
    return res.end(html);
  }

  else if (req.method === 'GET' && pathArray.length === 2) {
    const beatle = beatles.find((beatle) => beatle.name.toLowerCase() === decodeURI(pathArray[1].toLowerCase()));

    if (beatle) {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      const html = fs.readFileSync("./beatle.html", "utf-8")
        .replace("{name}", beatle.name)
        .replace("{birthdate}", beatle.birthdate)
        .replace("{profilePic}", beatle.profilePic)
      return res.end(html);
    }
  }

  else if (req.method === "GET" && req.url === '/api') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify(beatles));
  }

  else if (req.method === "GET" && pathArray.length === 3 && pathArray[1] === "api") {
    const beatle = beatles.find((beatle) => encodeURI(beatle.name.toLowerCase()) === pathArray[2].toLowerCase());

    if (beatle) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify(beatle))
    }
  }

  res.writeHead(404, { 'Content-Type': 'text/html' });
  res.end("<h1>Not Found</h1>");
}).listen(3001, '127.0.0.1')