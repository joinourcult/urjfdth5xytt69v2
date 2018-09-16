const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()
const requestIp = require('request-ip');
 
server.use(middlewares)
port = Number(process.env.PORT || 3000);


// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser)
server.use((req, res, next) => {
  // if (req.method === 'POST') {
  //   req.body.createdAt = Date.now()
  // }
  // console.log('request: ')
  // console.log(req)

  let refferer = req.headers['referer'];
  if (refferer)
      res.cookie('referrer2', refferer);

  const ipAddress = requestIp.getClientIp(req);
  if (ipAddress)
      res.cookie('ipAddress', ipAddress);

  console.log('ipAddress = ' + ipAddress);
  console.log('referrer2 = ' + refferer);

  // Continue to JSON Server router
  next()
})

server.use(router)
server.listen(port, () => {
  console.log('JSON Server is running on port: ' + port)
})