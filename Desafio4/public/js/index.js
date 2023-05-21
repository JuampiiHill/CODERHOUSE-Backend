const socket = io();

const render = async(data) => {
    const html = document.getElementById('allProducts');
    html.innerHTML = '';
    await data.forEach((element) => {
        const elementHtml = document.createElement('div');
        elementHtml.innerHTML = `<h2>${element.title}</h2>
        <p>Descripcion: ${element.description}</p>
        <p>Codigo: ${element.code}</p>
        <p>Precio: ${element.price}</p>
        <p>Stock: ${element.stock}</p>
        <p>Categoria: ${element.category}</p>`;
        html.appendChild(elementHtml);
    });
};

socket.on("allProducts", (data) => {
    render(data);
});

socket.on('updated_list', (data) => {
    render(data);
});
