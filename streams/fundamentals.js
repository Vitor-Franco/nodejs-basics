// WritableStream and ReadableStream
// WritableStream is a stream that can be written to (e.g. a socket)
// ReadableStream is a stream that can be read from (e.g. a file)

// process
//   .stdin
//   .pipe(process.stdout)

import { Readable } from 'node:stream'

// Criando uma stream de leitura
class OneToHundredStream extends Readable {
  index = 1;

  // Método obrigatório de uma stream
  _read() {
    const i = this.index++;

    setTimeout(() => {
      if(i > 100) {
        // Push envia o dado para quem esta consumindo a stream.
        this.push(null)
      } else {
        // Não podemos enviar para uma stream um tipo primitivo.
        // O buffer é um tipo de dado que pode ser enviado para uma stream.
        const buf = Buffer.from(`${i}\n`)
        
        this.push(buf)
      }
    }, 500);  
  }
}

new OneToHundredStream()
  .pipe(process.stdout)