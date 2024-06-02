document.getElementById('userForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })
    .then(response => response.json())
    .then(data => {
        // Cambia el contenido del contenedor
        document.getElementById('content').innerHTML = `<h1>Welcome, ${data.username}!</h1>`;
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});