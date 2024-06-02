/*fetch('http://localhost:3000')
    .then(response => response.text())
    .then(data => {
        const indexMessageElement = document.getElementById('indexMessage');
        console.log(data)
        console.log(data.message)
        indexMessageElement.textContent = "Hola mundo!";
    })
    .catch(error => {
        console.error('Error:', error);
    });
*/

fetch('http://localhost:3000/products')
    .then(response => response.json())
    .then(products => {
        console.log(products);
        const productsContainer = document.getElementById('products');

        for (let i = 0; i < products.length; i++) {
            const product = products[i];
            const productElement = document.createElement('div');
            productElement.classList.add('col-lg-3', 'mb-4', 'text-center');

            productElement.innerHTML = `
            <div class="product-entry border">
            <a href="#" class="prod-img">
                <img src="${product.imageUrl}" class="img-fluid" alt="Free html5 bootstrap 4 template" style="width: 200px; height: 200px; object-fit: cover;">
            </a>
            <div class="desc">
                <h2><a href="#">${product.name}</a></h2>
                <span class="price">$${product.price}</span>
                <span class="description">${product.description}</span>
                <br>
                <button class="add-to-cart" style="
                    background-color: #4CAF50; /* Green */
                    border: none;
                    color: white;
                    padding: 15px 32px;
                    text-align: center;
                    text-decoration: none;
                    display: inline-block;
                    font-size: 16px;
                    margin: 4px 2px;
                    cursor: pointer;
                ">Add to Cart</button>
            </div>
        </div>
            `;

            productElement.querySelector('.add-to-cart').addEventListener('click', () => {
                addToCart(product.id, product.name, product.description, product.price, product.stock, product.imageUrl);
            });

            productsContainer.appendChild(productElement);

            productsContainer.appendChild(productElement);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });

/*Agregar al carrito */ 


document.getElementById('logout').addEventListener('click', function() {
    window.location.href = 'login.html'; 
});




async function addToCart(id, name, description, price, stock, imageUrl) {
    try {
        const response = await fetch('http://localhost:3000/cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id, name, description, price, stock, imageUrl })
        });
        const result = await response.json();
        console.log('Product added to cart:', result);
            console.log('Success:', result);
            alert('Product added to cart!');
        
    } catch (error) {
        console.error('Error adding product to cart:', error);
    }
}

document.getElementById('logout').addEventListener('click', function() {
    window.location.href = 'html/login.html'; 
});

    /*
fetch('http://localhost:3000/products')
    .then(response => response.json())
    .then(data => {
        // Handle the data from the /products endpoint
        const indexMessageElement = document.getElementById('indexMessage');
        console.log(data);
        indexMessageElement.textContent = "Productos!!";
    })
    .catch(error => {
        console.error('Error:', error);
    });     */