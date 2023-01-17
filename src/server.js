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

  const route = routes.find(({ method, path }) => method === req.method && path === req.url)
  
  if (route) {
    return route.handler(req, res)
  }

  return res.writeHead(404).end()
})

server.listen(3333)