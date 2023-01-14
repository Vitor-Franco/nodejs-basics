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

// Vamos utilizar stream, em exemplos de vídeo, música, texto e etc.
// Em JSON, n faz sentido utilizar stream, pois um JSON parcial é pouco informativo
const server = http.createServer(async (req, res) => {
  if(req.method === 'POST') {
    const buffers = []

    // aguarda todos os chunks chegarem
    for await (const chunk of req) {
      buffers.push(chunk)
    }

    const fullStreamContent = Buffer.concat(buffers).toString()

    return res.end(fullStreamContent)
    // return req
    //     .pipe(new InverseNumberStream())
    //     .pipe(res)
  }
})

server.listen(3334)