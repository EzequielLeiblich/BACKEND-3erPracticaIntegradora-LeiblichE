const socket = io();
const head = document.getElementById('head');
const ParfCarts = document.getElementById('Parrafo');
const tableCarts = document.getElementById('tableCarts');

function getCartById() {
  fetch('/api/sessions/current')
    .then((response) => response.json())
    .then((data) => {
      let cartID = data.cart;
      fetch(`/api/carts/${cartID}`)
        .then((response) => response.json())
        .then((cart) => {
        
        let htmlHead = "";
        htmlHead += `
                    <h1>Carrito:</h1>
                    `;
        head.innerHTML = htmlHead;
        
        let htmlCartCID = ""
        htmlCartCID += `
          <thead>
            <tr>
              <th>Modelo</th>
              <th>Descripción</th>
              <th>Categoria</th>
              <th>Img</th>
              <th>Precio</th>
              <th>Cantidad</th>
            </tr>
          </thead>`;

        cart.forEach((product) => {
          const {
            title,
            description,
            thumbnail,
            price
          } = product.product;
          const quantity = product.quantity;
          htmlCartCID += `
                          <tr>
                            <td id="${title}">${title}</td>
                            <td class="description">${description}</td>
                            <td><img src="${thumbnail}" alt="${title}" class="Img"></td>
                            <td>$${price}</td>
                            <td>${quantity}</td>
                          </tr>`;
        });
        tableCarts.innerHTML = htmlCartCID;
      });
    })
}

getCartById()