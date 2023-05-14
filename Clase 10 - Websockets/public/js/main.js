const socket = io();

function sendMessage() {
    const message = document.getElementById('message').value;
    socket.emit('new-message', message);
}

function render(data) {
    const html = data
        .map((elem, index) => {
            return `<div>
                <em>${elem}</em>
            </div>`;
    })
    .join(' ');

    document.getElementById('messages').innerHTML = html;
}

socket.on('messages', (data) => {
    render(data);
});