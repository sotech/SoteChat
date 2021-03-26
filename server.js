const express= require('express');
const app = express();
const path = require('path');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = 8080;
const socketPort = 3000;

app.use(express.static(path.join(__dirname, '/public')));

app.get("/",(req,res) => {
    res.sendFile(path.join(__dirname,"/public/cliente.html"));
})
io.on('connection', socket =>{
    console.log("Cliente conectado: " + socket.id);
    socket.emit('bienvenida', "Bienvenido al servidor");

    socket.on('cliente-envia-mensaje', payload => {
        io.emit('servidor-reenvia-mensaje', payload);
    })
})

app.listen(port, () => {
    console.log("App: Servidor iniciado en el puerto: " + port);
}).on('error', (err) => {
    console.log(err);
})

http.listen(socketPort, () => {
    console.log("Http: Servidor iniciado en el puerto: " + socketPort);
}).on('error',(err) => {
    console.log(err);
})