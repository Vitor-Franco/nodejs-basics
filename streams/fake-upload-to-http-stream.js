import { Readable } from 'node:stream';

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
    }, 1000);  
  }
}

fetch('http://localhost:3334', {
  method: 'POST',
  body: new OneToHundredStream(), // Passa uma stream no body da req
})
