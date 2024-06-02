// src/client/js/signUp.js
document.getElementById('signUpForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const firstName = document.getElementById('fullName').value;
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fullName, username, email, password }),
    })
    .then(response => {
        if (response.ok) {
            window.location.href = "../index.html";
        } else {
            return response.json();
        }
    })
    .then(data => {
        if (data) {
            document.getElementById('error').innerHTML = "Error: " + data.error;
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});