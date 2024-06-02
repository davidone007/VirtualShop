
    fetch('http://localhost:3000/cart')
        .then(response => response.json())
        .then(products => {
            const checkoutContainer = document.getElementById('checkout-cart');
            console.log("lo que obtuve" + products);
            
            // Aquí se limpia
            checkoutContainer.innerHTML = '';

            let subtotal = 0;   
            console.log("lo que obtuve" + products);
            products.forEach(product => {
                const itemTotal = product.price * product.quantity;
                subtotal += itemTotal;

                const productElement = document.createElement('li');
                productElement.innerHTML = `<span>${product.quantity} x ${product.name}</span> <span>$${itemTotal.toFixed(2)}</span>`;
                checkoutContainer.appendChild(productElement);
            });

            const subtotalElement = document.createElement('li');
            subtotalElement.innerHTML = `<span>Subtotal</span> <span>$${subtotal.toFixed(2)}</span>`;
            checkoutContainer.appendChild(subtotalElement);

            const totalElement = document.createElement('li');
            totalElement.innerHTML = `<span>Order Total</span> <span>$${subtotal.toFixed(2)}</span>`;
            checkoutContainer.appendChild(totalElement);

            document.getElementById('checkout-button').addEventListener('click', function() {
                fetch('http://localhost:3000/purchase', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ total: subtotal.toFixed(2) })
                })
                .then(response => response.json())
                .then(data => {
                    // Redirect to the history page after purchase
                    //window.location.href = 'order-complete.html';
                })
                .catch(error => {
                    console.error('Error:', error);
                });
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
    
