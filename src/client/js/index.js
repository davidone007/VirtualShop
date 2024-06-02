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
								<img src="${product.imageUrl}" class="img-fluid" alt="Free html5 bootstrap 4 template">
							</a>
							<div class="desc">
								<h2><a href="#">${product.name}</a></h2>
								<span class="price">$${product.price}</span>
                                <span class="descripttion">${product.description}</span>
							</div>
						</div>
            `;

            productsContainer.appendChild(productElement);

            productsContainer.appendChild(productElement);
        }
    })
    .catch(error => {
        console.error('Error:', error);
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