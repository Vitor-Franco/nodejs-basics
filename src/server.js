import http from 'node:http'

// CommonJS => utiliza require
// ESModule => Novo padrão.. import/export.

// Por padrão o node não suporta o ESModule.
// Portanto adicionamos ao package.json o "type": "module".

const users = []

const server = http.createServer(async (req, res) => {

  const { method, url } = req;

  const buffers = []

  // aguarda todos os chunks chegarem
  for await (const chunk of req) {
    buffers.push(chunk)
  }

  try {
    req.body = JSON.parse(Buffer.concat(buffers).toString())
  } catch {
    req.body = null
  }

  if(method === 'GET' && url === '/users') {
    return res.setHeader('Content-type', 'application/json').end(JSON.stringify(users))
  }

  if(method === 'POST' && url === '/users') {
    const { name, email } = req.body

    users.push({
      name,
      email,
      id: 1
    })

    return res.writeHead(201).end()
  }
  
  return res.writeHead(404).end()
})

server.listen(3333)