document.getElementById('productForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData();

    // Obtener los valores del formulario
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const price = document.getElementById('price').value;
    const stock = document.getElementById('stock').value;
    const imageUrl = document.getElementById('imageUrl').files[0];

    // Añadir los valores al FormData
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('stock', stock);
    formData.append('image', imageFile);

    fetch('http://localhost:3000/products', {
        method: 'POST',
        body: formData
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
