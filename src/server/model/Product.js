/**
 * Represents a product in the inventory.
 */
class Product {
    /**
     * Create a new Product instance.
     * @param {string} name - The name of the product.
     * @param {number} price - The price of the product.
     * @param {string} imageUrl - The URL of the product image.
     */
    constructor(name, description, price, stock, imageUrl) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.stock = stock;
        this.imageUrl = imageUrl;
    }
}


export default Product;
