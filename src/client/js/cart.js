/*<div class="product-cart d-flex">
							<div class="one-forth">
								<div class="product-img" style="background-image: url(images/item-6.jpg);">
								</div>
								<div class="display-tc">
									<h3>Product Name</h3>
								</div>
							</div>
							<div class="one-eight text-center">
								<div class="display-tc">
									<span class="price">$68.00</span>
								</div>
							</div>
							<div class="one-eight text-center">
								<div class="display-tc">
									<input type="text" id="quantity" name="quantity" class="form-control input-number text-center" value="1" min="1" max="100">
								</div>
							</div>
							<div class="one-eight text-center">
								<div class="display-tc">
									<span class="price">$120.00</span>
								</div>
							</div>
							<div class="one-eight text-center">
								<div class="display-tc">
									<a href="#" class="closed"></a>
								</div>
							</div>
						</div>
*/

fetch('http://localhost:3000/cart')
    .then(response => response.json())
    .then(products => {
        console.log(products);
        const productsContainer = document.getElementById('product-cart');

        for (let i = 0; i < products.length; i++) {
            const product = products[i];
            const productElement = document.createElement('div');
            productElement.classList.add('product-cart', 'd-flex');

            productElement.innerHTML = `
            <div class="one-forth">
				<div class="product-img" style="background-image: url(${product.imageUrl});">
				</div>
								<div class="display-tc">
									<h3>${product.name}</h3>
								</div>
							</div>
							<div class="one-eight text-center">
								<div class="display-tc">
									<span class="price">$${product.price}</span>
								</div>
							</div>
							<div class="one-eight text-center">
								<div class="display-tc">
									<input type="text" id="quantity" name="quantity" class="form-control input-number text-center" value="1" min="1" max="100">
								</div>
							</div>
							<div class="one-eight text-center">
								<div class="display-tc">
									<span class="price">${product.price * product.quantity}</span>
								</div>
							</div>
							<div class="one-eight text-center">
								<div class="display-tc">
									<a href="#" class="closed"></a>
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

