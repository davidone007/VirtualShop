document.getElementById('productForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData();

    // Obtener los valores del formulario
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const price = document.getElementById('price').value;
    const stock = document.getElementById('stock').value;
    const imageFile = document.getElementById('image').files[0];

    fetch('http://localhost:3000/products', {
        method: 'POST',
        body: JSON.stringify({ name, description, price, stock }),
    })
    .then(response => response.json())
    .then(result => {
        console.log('Success:', result);
        alert('Producto agregado exitosamente!');
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Hubo un error al agregar el producto.');
    });
});
