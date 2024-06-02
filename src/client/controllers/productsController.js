document.getElementById('productForm').addEventListener('submit', function (event) {
  event.preventDefault();
  const formData = new FormData(this);

  fetch('http://localhost:3000/products', {
    method: 'POST',
    body: formData,
  })
    .then(response => response.json())
    .then(result => {
      console.log('Success:', result);
      alert('Product successfully added!');
    })
    .catch(error => {
      console.error('Error:', error);
      alert('There was an error adding the product!');
    });
});

document.getElementById('logout').addEventListener('click', function () {
  window.location.href = 'html/login.html';
});