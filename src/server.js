import http from 'node:http'
import { Database } from './database.js';
import { json } from './middlewares/json.js';
import { routes } from './router.js';

// CommonJS => utiliza require
// ESModule => Novo padrão.. import/export.

// Por padrão o node não suporta o ESModule.
// Portanto adicionamos ao package.json o "type": "module".
 

const server = http.createServer(async (req, res) => {
  await json(req, res);

  console.log("🚀 ~ server ~ routes", routes)
  console.log(req.url);

  const route = routes.find((route) => {
    return route.method === req.method && route.path.test(req.url)
  })
  
  if (route) {
    const routeParams = req.url.match(route.path)

    req.params = { ...routeParams.groups }

    return route.handler(req, res)
  }

  return res.writeHead(404).end()
})

server.listen(3333)