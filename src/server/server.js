import cors from 'cors';
import express from 'express';
import multer from 'multer';
import Product from './model/Product.js';

import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

const app = express();
const port = 3000;


cloudinary.config({     
  cloud_name: 'dxjxgmxq5', 
  api_key: '933861423669761', 
  api_secret: 'KlqQarLzMmniE3FT75SAGuUZ4_Y' 
});


const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'products', // Carpeta en Cloudinary donde se guardarán las imágenes
        format: async (req, file) => 'png', // Formato de la imagen
        public_id: (req, file) => Date.now() + '-' + file.originalname // Nombre único para evitar conflictos
    },
});

const upload = multer({ storage: storage });



// In-memory user list
let users = [];

let products=[];

let cart=[];

// Middleware
app.use(express.json());
app.use(cors());


// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});





// Route to process login
app.post('/', (req, res) => {
    const { username, password } = req.body;

    // Check if the user exists in the users array
    const user = users.find(user => user.username === username);

    if (user) {
        // If the user exists, check if the passwords match
        if (user.password === password) {
            // If the passwords match, send a success message
            res.json({ message: 'TRUE' });
        } else {
            // If the passwords don't match, send an error message
            res.json({ message: 'FALSE', error: 'Invalid password' });
        }
    } else {
        // If the user doesn't exist, send an error message
        res.json({ message: 'FALSE', error: 'User does not exist' });
    }
});

// Endpoint to register a new client
app.post('/signup', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        console.log("Missing fields")
        return res.status(400).json({ error: 'Both username and password are required' });
    }

    // Check if the user already exists
    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
        console.log("User already exists")
        return res.status(400).json({ error: 'Username already exists' });
    }

    const user = { username, password };
    users.push(user);
    console.log("User registered");
    console.log(users);
    res.json(user);
});

// Endpoint para agregar un producto y subir una imagen a Cloudinary
app.post('/products', upload.single('image'), (req, res) => {
    const { name, description, price, stock, imageUrl} = req.body;
    image = req.file.path; // URL de la imagen en Cloudinary

    if (!name || !description || !price || !stock || !req.file) {
        console.log("Missing fields");
        return res.status(400).json({ error: 'All fields are required' });
    }

    let id = products.length;

    const product = new Product(id, name, description, price, stock, image);
    products.push(product);
    console.log("Added");
    console.log(products);
    res.json(product);
});


//Cart

// Endpoint to get the list of products of cart
app.get('/cart', (req, res) => {
    res.json(cart);
});

// Add a product in the cart
app.post('/cart', (req, res) => {
    const { id, name, description, price, stock, imageUrl } = req.body;

    const product = new Product(id, name, description, price, stock, imageUrl);
    products.push(product);
    console.log("Added");
    console.log(products);
    res.json(product);
});