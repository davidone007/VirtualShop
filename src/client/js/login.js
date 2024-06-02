
/*fetch('http://localhost:3000')
    .then(response => response.json())
    .then(data => {
        const indexMessageElement = document.getElementById('textContent');
        console.log(data)
        console.log(data.message)
        indexMessageElement.innerHTML = data.message;
    })
    .catch(error => {
        console.error('Error:', error);
    });
*/


// POST
document.getElementById('userForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('http://localhost:3000', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })
    .then(response => response.json())
    .then(data => {
        // Cambia el contenido del contenedor
        if (data.message == 'TRUE') {
            window.location.href = "../index.html";
        } else{
            document.getElementById('error').innerHTML = "Credenciales inválidas";
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});