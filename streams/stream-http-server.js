import http from 'node:http';
import { Transform } from 'node:stream';

class InverseNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const number = Number(chunk.toString())
    const inverse = number * -1
    console.log("🚀 ~ _transform ~ inverse", inverse)

    callback(null, Buffer.from(`${inverse}\n`))
  }
}

// req -> ReadableStream (ler dados da requisição)
// res -> WritableStream (escrever dados na resposta)

const server = http.createServer((req, res) => {
  if(req.method === 'POST') {
    return req
        .pipe(new InverseNumberStream())
        .pipe(res)
  }
})

server.listen(3334)