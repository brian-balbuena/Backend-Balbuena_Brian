const socket = io();


const listContainer = document.getElementById('listContainer');

 

socket.on('productsRealtime', data => {
    while (listContainer.firstChild) {
        listContainer.removeChild(listContainer.firstChild);
    }
   
    data.forEach(products => {
        
        let nuevaLi = document.createElement('li');
        nuevaLi.classList.add('d-flex', 'justify-content-center', 'mb-3');
        listContainer.appendChild(nuevaLi);

        let nuevaDivCard = document.createElement('div');
        nuevaDivCard.classList.add('card');
        nuevaDivCard.style.width = '18rem';
        nuevaLi.appendChild(nuevaDivCard);

        let nuevaImg = document.createElement('img');
        nuevaImg.src = products.thumbnail;
        nuevaImg.classList.add('card-img-top');
        nuevaImg.alt = 'imagen producto';
        nuevaDivCard.appendChild(nuevaImg);

        let nuevaDivCardBody = document.createElement('div');
        nuevaDivCardBody.classList.add('card-body');
        nuevaDivCard.appendChild(nuevaDivCardBody);

        let nuevaTitulo = document.createElement('h5');
        nuevaTitulo.classList.add('card-title');
        nuevaTitulo.textContent = 'Titulo: ' + products.title;
        nuevaDivCardBody.append(nuevaTitulo);

        let nuevoCodigo = document.createElement('p');
        nuevoCodigo.textContent = 'Codigo: ' + products.code;
        nuevaDivCardBody.appendChild(nuevoCodigo);

        let nuevaDescripcion = document.createElement('p');
        nuevaDescripcion.classList.add('card-text');
        nuevaDescripcion.textContent = 'Descripción: ' + products.description;
        nuevaDivCardBody.appendChild(nuevaDescripcion);

        let nuevoStock = document.createElement('p');
        nuevoStock.classList.add('card-text');
        nuevoStock.textContent = 'Stock: ' + products.stock;
        nuevaDivCardBody.appendChild(nuevoStock);

        let nuevoPrecio = document.createElement('p');
        nuevoPrecio.textContent = '$' + products.price;
        nuevaDivCardBody.appendChild(nuevoPrecio);
        

    });
    
    
});

