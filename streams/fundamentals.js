// WritableStream and ReadableStream
// WritableStream is a stream that can be written to (e.g. a socket)
// ReadableStream is a stream that can be read from (e.g. a file)

// process
//   .stdin
//   .pipe(process.stdout)

import { Readable, Transform, Writable } from 'node:stream'

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

class InverseNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const number = Number(chunk.toString())
    const inverse = number * -1

    // this.push(Buffer.from(`${inverse}\n`))

    callback(null, Buffer.from(`${inverse}\n`))
  }
}

class MultiplyByTenStream extends Writable {
  // Método obrigatório de WritableStreams
  // chunk -> pedaço que a gente leu da stream de leitura
  // encoding -> codificação da informação
  // callback -> função que deve ser chamada quando a gente terminar de processar o chunk
  _write(chunk, encoding, callback){
    console.log(Number(chunk.toString()) * 10);
    callback()
  }
}



new OneToHundredStream()
  .pipe(new InverseNumberStream())
  .pipe(new MultiplyByTenStream())