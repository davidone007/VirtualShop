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
let users = [
    { username: '123', password: '123' },
    { username: 'admin', password: 'admin' }
    
];

let products = [];
let cart = [];
let history = [];

// Para pruebasssssssssssss
products.push(new Product(0, 'Mitsubishi Lancer X', 'A rodar!!', '155000000', '1',
    'https://res.cloudinary.com/dxjxgmxq5/image/upload/v1717342981/products/1717342986343-descarga.jpg.png'));

products.push(new Product(1,'Tronquitos','Muñeco de tronquitos ♥','254160','5','https://res.cloudinary.com/dxjxgmxq5/image/upload/v1717352045/products/1717352050767-tronquitos.jpg.png'));

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

    if (user.password === 'admin' && user.username === 'admin') {

        res.json({ message: 'TRUE_ADMIN', user });
    }else{

    if (user) {
        // If the user exists, check if the passwords match
        if (user.password === password) {
            // If the passwords match, send a success message
            res.json({ message: 'TRUE', user });
        } else {
            // If the passwords don't match, send an error message
            res.json({ message: 'FALSE', error: 'Invalid password' });
        }
    } else {
        // If the user doesn't exist, send an error message
        res.json({ message: 'FALSE', error: 'User does not exist' });
    }
}});

// Endpoint to register a new client
app.post('/signup', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        console.log("Missing fields");
        return res.status(400).json({ error: 'Both username and password are required' });
    }

    // Check if the user already exists
    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
        console.log("User already exists");
        return res.status(400).json({ error: 'Username already exists' });
    }

    const user = { username, password };
    users.push(user);
    console.log("User registered");
    console.log(users);
    res.json(user);
});



// History ----------------------------------------------------------------------------------------------------------------------------

// Endpoint to complete checkout and save purchase history
app.post('/purchase', (req, res) => { 
    const { total } = req.body;
    console.log("Total received:" + total ) ;

    // Agrega la compra al historial de compras
    history.push({
        id: Date.now(),
        date: new Date(),
        total: total,
        items: cart
    });

    // Limpia el carrito
    cart = [];
    console.log("Cart after purchase: " + cart);
    console.log("History after purchase: " + history);

    console.log("Checkout complete. Purchase history updated.");
    res.json({ message: 'Checkout complete', history });
});

// Endpoint to get purchase history
app.get('/history', (req, res) => {
    console.log("Sending purchase history");
    console.log(history);
    res.json(history);

});


// Products ----------------------------------------------------------------------------------------------------------------------------

// Endpoint to get the list of products
app.get('/products', (req, res) => {
    res.json(products);
});

app.post('/products', upload.single('image'), (req, res) => {
    const { name, description, price, stock } = req.body;
    const image = req.file.path; // URL de la imagen en Cloudinary
    if (!name || !description || !price || !stock || !req.file) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    let id = products.length;
    const product = new Product(id, name, description, price, stock, image);
    products.push(product);
    console.log("Added");
    console.log(products);
    res.json(product);
});


// Cart ----------------------------------------------------------------------------------------------------------------------------

// Endpoint to get the list of products in cart
app.get('/cart', (req, res) => {
    res.json(cart);
});

// Add a product to the cart
app.post('/cart', (req, res) => {
    const { id, name, description, price, stock, imageUrl } = req.body;

    const product = new Product(id, name, description, price, stock, imageUrl);
    product.quantity = 1;
    cart.push(product);
    console.log("Added to cart");
    console.log(cart);
    res.json(product);
});

// Update the quantity of a product in the cart
app.put('/cart/:productId', (req, res) => {
    console.log("Entramos a put cart");

    const { productId } = req.params;
    const { quantity } = req.body;

    console.log("productId: " + productId);

    // Buscar el producto en el carrito
    console.log(cart);
    console.log(productId);

    const product = cart.find(p => p.id === Number(productId));

    console.log("product de ariibaaaa " + product + " Fin");

    if (!product) {
        // Si el producto no se encuentra en el carrito, enviar un error
        return res.status(404).json({ error: 'Product not found' });
    }

    // Actualizar la cantidad del producto
    product.quantity = quantity;
    console.log("Updated cart with: " + product.quantity + " of " + product.name);
    console.log(cart);
    // Enviar una respuesta con el producto actualizado
    res.json(product);
});

// Delete a product from the cart
app.delete('/cart/:productId', (req, res) => {
    console.log("Entramos a delete cart");
    const { productId } = req.params;
    console.log("Product ID recibido:", productId);
    console.log("Contenido del carrito:", cart);

    // Asegurémonos de que `productId` es del mismo tipo que los `id` en `cart`
    const productIndex = cart.findIndex(p => p.id === Number(productId));
    console.log("Índice del producto a eliminar:", productIndex);

    if (productIndex === -1) {
        // Si el producto no se encuentra en el carrito, enviar un error
        console.log("Producto no encontrado en el carrito.");
        return res.status(404).json({ error: 'Product not found' });
    }

    // Eliminar el producto del carrito
    cart.splice(productIndex, 1);
    console.log("Producto eliminado. Nuevo contenido del carrito:", cart);

    // Enviar una respuesta con un mensaje de éxito
    res.json({ message: 'Product deleted successfully' });
});
