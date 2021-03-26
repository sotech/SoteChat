const express = require('express');
const app = express();
const path = require('path');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const socketPort = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, './public')));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/cliente.html"));
});

let cantidadClientes = 0;

io.on('connection', socket => {
    console.log("Cliente conectado: " + socket.id);
    cantidadClientes++;
    socket.emit('bienvenida', "Conexión exitosa al servidor de Sote");
    io.emit('nuevo-cliente',cantidadClientes);

    socket.on('cliente-envia-mensaje', payload => {
        io.emit('servidor-reenvia-mensaje', payload);
    })
})

http.listen(socketPort, () => {
    console.log("Http: Servidor iniciado en el puerto: " + socketPort);
}).on('error', (err) => {
    console.log(err);
})