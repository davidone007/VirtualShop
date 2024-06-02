async function addToCart(name, description, price, stock, imageUrl) {
    try {
        const response = await fetch('http://localhost:3000/cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, description, price, stock, imageUrl })
        });
        const result = await response.json();
        console.log('Product added to cart:', result);
    } catch (error) {
        console.error('Error adding product to cart:', error);
    }
}