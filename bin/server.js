const app = require('../src/app'); //Se a requisição estiver sem caminho, ele busca direto na node_modules
const debug = require('debug')('balta:server');
const http = require('http');

const port = normalizePort(process.env.PORT || '3000'); 
app.set('port', port);

const server = http.createServer(app);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
console.log('API rodando na porta ' + port);

//Não é interessante manter a porta fixa
//Função para normalização da porta
function normalizePort(val){

    const port = parseInt(val, 10);

    if(isNaN(port)){
        return val;
    }

    if (port >= 0){
        return port;
    }

    return false;
}

//Tratativa simples de erros - servidor
function onError(error){

    if(error.syscall != 'listen'){
        throw error;
    }

    const bind = typeof port === 'string' ?
        'Pipe ' + port :
        'Port ' + port;

    switch(error.code){
        case 'EACCES':
            console.error(bind + ' requires elevated privileges'); //Erro de permissão
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use'); //Erro de uso
            process.exit(1);
            break;
        default:
            throw error;
    }
}

//Pega as informações do servidor e aciona o debug
function onListening(){
    const addr = server.address();
    const bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);
}