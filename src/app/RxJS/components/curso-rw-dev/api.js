const http = require('http')

http.createServer((req, res) => {

  // res.writeHead(200, {
  //   'Content-Type': 'application/json',
  //   'Access-Control-Allow-Origin': '*',
  //   'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
  //   'Access-Control-Allow-Headers':'*'
  // })

  const allowCORS = function(req, res, next) {
    var origin = req.get('origin');
    res.header("Access-Control-Allow-Origin", origin);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
};


  const matchUrl = /^\/response\/(.+)\/delay\/(\d+)\/?$/
  // http://localhost:5200/response/{"data": "Hello World"}/delay/1000/
  if(!matchUrl.test(req.url)) return res.end()

  const [, response, delay] = matchUrl.exec(req.url)
  const jsonResponse = decodeURIComponent(response)

  setTimeout(() => {
    res.write(jsonResponse)
    res.end()
  }, +delay);
}).listen(5200)
