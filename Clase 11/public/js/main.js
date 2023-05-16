const socket = io();
let user;
const inputMSJ = document.getElementById('msj');

Swal.fire({
    title: 'Bienvenido',
    input: 'text',
    text: 'Indetificate para participar del chat',
    icon: 'success',
    inputValidator: (value) => {
        return !value && 'Tenes que identificarte'
    },
    allowOutsideClick: false,
}).then ((result) => {
    user = result.value;
    socket.emit('sayhello', user)
});

function render(data) {
    const html = data.map((elem, index) => {
        return `<div><strong>${elem.user}:</strong><em>${elem.msj}</em></div>`;
    })
    .join(' ');
    document.getElementById('messages').innerHTML = html;
}
inputMSJ.addEventListener('keyup', event => {
    if (event.key === 'Enter') {
        let msj = inputMSJ.value;
        if (msj.trim().length > 0) {
            socket.emit('message', {user, msj});
            inputMSJ.value = '';
        }
    }
});

socket.on('messages', data => {
    render(data);
});

socket.on('connected', (data) => {
    Swal.fire({
        text: `Se conecto ${data}`,
        toast: true,
        position: 'top-right'
    })
})