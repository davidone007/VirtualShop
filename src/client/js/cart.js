document.getElementById('logout').addEventListener('click', function () {
	window.location.href = 'html/login.html';
});

document.addEventListener('DOMContentLoaded', function () {
	updateProducts();
});

function updateProducts() {
	fetch('http://localhost:3000/cart')
		.then(response => response.json())
		.then(products => {
			const productsContainer = document.getElementById('product-cart');
			productsContainer.innerHTML = ''; // Clear the existing products

			for (let i = 0; i < products.length; i++) {
				const product = products[i];
				const productElement = document.createElement('div');
				productElement.classList.add('product-cart', 'd-flex');
				productElement.innerHTML = `
					<div class="one-forth">
						<div class="product-img" style="background-image: url(${product.imageUrl});">
						</div>
						<div id="productId" style="display:none">${product.id}</div>
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
							<input type="number" class="quantity form-control input-number text-center" data-product-id="${product.id}" value="${product.quantity}" min="1" max="100">
						</div>
					</div>
					<div class="one-eight text-center">
						<div class="display-tc">
							<span class="price totalPrice">$${product.price * product.quantity}</span>
						</div>
					</div>
					<div class="one-eight text-center">
						<div class="display-tc">
							<a href="#" class="closed"></a>
						</div>
					</div>
				`;

				productElement.querySelector('.quantity').addEventListener('change', function (event) {
					const newQuantity = event.target.value;
					const productId = event.target.getAttribute('data-product-id');

					fetch(`http://localhost:3000/cart/${productId}`, {
						method: 'PUT',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({ quantity: newQuantity })
					})
						.then(response => response.json())
						.then(data => {
							productElement.querySelector('.totalPrice').innerText = `$${product.price * newQuantity}`;
							if (newQuantity == 0) {
								deleteFromCart(product.id);
							}
							updateProducts();
						})
						.catch(error => console.error('Error:', error));
				});

				productElement.querySelector('.closed').addEventListener('click', () => {
					deleteFromCart(product.id);
				});

				productsContainer.appendChild(productElement);
			}

			calculateTotal(products);
		})
		.catch(error => {
			console.error('Error:', error);
		});
}

function calculateTotal(products) {
	const total = products.reduce((accumulator, product) => accumulator + product.price * product.quantity, 0);
	document.getElementById('total').innerText = `$${total}`;
}

async function deleteFromCart(id) {
	try {
		const response = await fetch(`http://localhost:3000/cart/${id}`, {
			method: 'DELETE'
		});
		const result = await response.json();
		alert('Product deleted from cart!');
		updateProducts();
	} catch (error) {
		console.error('Error deleting product from cart:', error);
	}
}
