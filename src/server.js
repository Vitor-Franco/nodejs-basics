const http = require('http');

// CommonJS => utiliza require
// ESModule => Novo padrão.. import/export.

// Por padrão o node não suporta o ESModule.
// Portanto adicionamos ao package.json o "type": "module".

console.log(http);