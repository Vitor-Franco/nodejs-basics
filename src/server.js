import http from 'node:http'

// CommonJS => utiliza require
// ESModule => Novo padrão.. import/export.

// Por padrão o node não suporta o ESModule.
// Portanto adicionamos ao package.json o "type": "module".

const users = []

const server = http.createServer((req, res) => {

  const { method, url } = req;

  if(method === 'GET' && url === '/users') {
    return res.setHeader('Content-type', 'application/json').end(JSON.stringify(users))
  }

  if(method === 'POST' && url === '/users') {
    users.push({
      name: 'John doe',
      email: 'pej@poscivuco.jp',
      id: 1
    })

    return res.writeHead(201).end()
  }
  
  return res.writeHead(404).end()
})

server.listen(3333)