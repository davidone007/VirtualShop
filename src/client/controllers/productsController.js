document.getElementById('productForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData(this);

    fetch('http://localhost:3000/products', {
      method: 'POST',
      body: formData,
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

  document.getElementById('logout').addEventListener('click', function() {
    window.location.href = 'html/login.html'; 
});