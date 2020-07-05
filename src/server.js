const app = require('./app');

class Server {
    start() {
        app.listen(process.env.SERVER_PORT || 3333);
        console.log('Online server on port: ', process.env.SERVER_PORT || 3333, '\n');
    }
}

new Server().start();