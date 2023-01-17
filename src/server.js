import http from 'node:http'
import { Database } from './database.js';
import { json } from './middlewares/json.js';
import { routes } from './router.js';
import { extractQueryParams } from './utils/extract-query-params.js';

// CommonJS => utiliza require
// ESModule => Novo padrão.. import/export.

// Por padrão o node não suporta o ESModule.
// Portanto adicionamos ao package.json o "type": "module".
 

const server = http.createServer(async (req, res) => {
  await json(req, res);

  const route = routes.find((route) => {
    return route.method === req.method && route.path.test(req.url)
  })
  console.log("🚀 ~ route ~ route", route)
  
  if (route) {
    const routeParams = req.url.match(route.path)

    const { query, ...params } = routeParams.groups

    req.params = params
    req.query = query ? extractQueryParams(query) : {}

    return route.handler(req, res)
  }

  return res.writeHead(404).end()
})

server.listen(3333)