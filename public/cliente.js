const socket = io();

socket.on('bienvenida', payload => {
    console.log("Mensaje del servidor: " + payload); 
    document.getElementById('mensajes-servidor').innerHTML = payload;
})

socket.on('nuevo-cliente', payload => {
    document.getElementById('cantidad-clientes').innerHTML = payload;
})

let formChat = document.getElementById('chat-form');
formChat.addEventListener('submit',(event) => {
    event.preventDefault();
    let nicknameInput = document.getElementById('nickname-input');
    let messageInput = document.getElementById('message-input');
    let message = messageInput.value;
    messageInput.value = "";
    let fechaActual = new Date();
    fechaActual = `${fechaActual.getDate()}/${fechaActual.getMonth()}/${fechaActual.getFullYear()} ${fechaActual.getHours()}:${fechaActual.getMinutes()}:${fechaActual.getSeconds()}`;
    //Enviar mensaje al servidor
    socket.emit('cliente-envia-mensaje',{fecha: fechaActual, usuario:nicknameInput.value, mensaje:message});
})

socket.on('servidor-reenvia-mensaje', payload => {
    let mensajeNuevo = crearLineaMensaje(payload.fecha, payload.usuario, payload.mensaje);
    let contenedor = document.getElementById('chat-mensajes');
    contenedor.appendChild(mensajeNuevo);
})

function crearLineaMensaje(fecha, usuario, mensaje){
    let linea = document.createElement('p');
    let fechaSpan = document.createElement('span');
    fechaSpan.innerHTML = "[" + fecha + "] ";
    fechaSpan.classList.add('font-weigth-bold');
    fechaSpan.classList.add('text-primary');
    let usuarioSpan = document.createElement('span');
    usuarioSpan.innerHTML = usuario + ": ";    
    let mensajeSpan = document.createElement('span');
    mensajeSpan.innerHTML = mensaje;
    mensajeSpan.classList.add('font-italic');
    linea.appendChild(fechaSpan);
    linea.appendChild(usuarioSpan);
    linea.appendChild(mensajeSpan);
    return linea;
}