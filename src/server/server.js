import cors from 'cors';
import express from 'express';
import multer from 'multer';
import Product from './model/Product.js';


const app = express();
const port = 3000;

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../client/images') //Ruta
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

const upload = multer({ storage: storage });


// In-memory user list
let users = [];

let products=[];

let cart=[];

// Middleware
app.use(express.json());
app.use(cors());

// Endpoint para agregar un producto y subir una imagen
app.post('/products', upload.single('image'), (req, res) => {
    const { name, description, price, stock } = req.body;
    const imageUrl = `/images/${req.file.filename}`;

    if (!name || !description || !price || !stock || !req.file) {
        console.log("Missing fields");
        return res.status(400).json({ error: 'All fields are required' });
    }

    const product = new Product(name, description, price, stock, imageUrl);
    products.push(product);
    console.log("Added");
    console.log(products);
    res.json(product);
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});





// Login
app.get('/', (req, res) => {
    res.json({"message": "Inicio de sesión"});
});

// Ruta para procesar el inicio de sesión
app.post('/', (req, res) => {
    const { username, password } = req.body;

    // Aquí puedes realizar la lógica de autenticación, como verificar las credenciales en una base de datos

    // Ejemplo de verificación de credenciales
    if (username === 'admin' && password === 'admin') {
        // Si las credenciales son válidas, redirige al usuario a la página de inicio
        res.json({ message: 'TRUE' });
    } else {
        // Si las credenciales son inválidas, muestra un mensaje de error
        res.json({ message: 'FALSE' });
    }
});

// Endpoint to register a new client
app.post('/signup', (req, res) => {
    const { fullName, username, email, password } = req.body;

    if (!fullName || !username || !email || !password) {
        console.log("Missing fields")
        return res.status(400).json({ error: 'All fields are required' });
    }

    // Check if the user already exists
    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
        console.log("User already exists")
        return res.status(400).json({ error: 'Username already exists' });
    }

    const user = { fullName, username, email, password };
    users.push(user);
    console.log("User registered");
    console.log(users);
    res.json(user);
});



// Endpoint to get the list of users
app.get('/products', (req, res) => {
    res.json(products);
});

// Agregar nuevo producto
app.post('/products', (req, res) => {
    const { name, description, price, stock, imageUrl } = req.body;

    if (!name || !description || !price || !stock || !imageUrl) {
        console.log("Missing fields")
        return res.status(400).json({ error: 'All fields are required' });
    }

    const product = new Product(name, description, price, stock, imageUrl);
    products.push(product);
    console.log("Added");
    console.log(products);
    res.json(product);
});