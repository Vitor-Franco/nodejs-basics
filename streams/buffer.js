// buffer
// representação de um espaço na memória do PC, utilizado para transitar dados de maneira performática
// Os dados são armazedos/lidos em memória utilizando o formato binário, ao invés de um texto por exemplo que precisaria sofrer um handler.

const buf = Buffer.from('ok');

console.log(buf);
// <Buffer 6f 6b>
// 6f = o
// 6b = k