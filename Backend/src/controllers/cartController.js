

import Cart from '../models/Cart.js';
import Product from '../models/Product.js'; 

export const getUserCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id }).populate('items.product', 'stock');

        if (cart) {
            res.status(200).json(cart);
        } else {
            res.status(200).json({ user: req.user._id, items: [] });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el carrito', error: error.message });
    }
};

export const addOrUpdateCartItem = async (req, res) => {
    const { productId, quantity } = req.body;
    const userId = req.user._id;

    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado.' });
        }
        
        let cart = await Cart.findOne({ user: userId });
        if (!cart) {
            cart = new Cart({ user: userId, items: [] });
        }

        const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);

        if (itemIndex > -1) {
            // Actualizar cantidad (o eliminar si es <= 0)
            cart.items[itemIndex].quantity = quantity; 
            if (cart.items[itemIndex].quantity <= 0) {
                 cart.items.splice(itemIndex, 1);
            }
        } else if (quantity > 0) {
            // Agregar nuevo ítem
            cart.items.push({
                product: productId,
                name: product.name,
                imageUrl: product.imageUrl,
                price: product.price,
                quantity: quantity
            });
        }
        
        const updatedCart = await cart.save();
        res.status(200).json(updatedCart);

    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el carrito', error: error.message });
    }
};

export const clearCart = async (req, res) => {
    try {
        const deletedCart = await Cart.findOneAndDelete({ user: req.user._id });

        if (!deletedCart) {
            return res.status(200).json({ message: 'El carrito ya estaba vacío.', items: [] });
        }
        res.status(200).json({ message: 'Carrito vaciado con éxito.', items: [] });
    } catch (error) {
        res.status(500).json({ message: 'Error al vaciar el carrito', error: error.message });
    }
};