import http from 'node:http'

// CommonJS => utiliza require
// ESModule => Novo padrão.. import/export.

// Por padrão o node não suporta o ESModule.
// Portanto adicionamos ao package.json o "type": "module".

const server = http.createServer((req, res) => {

  return res.end('Hello World')

})

server.listen(3333)