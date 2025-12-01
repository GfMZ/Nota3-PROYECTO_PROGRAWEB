import Cart from '../dbModels/Cart';
import { CartItem } from '../dbModels/Cart';
import Product from '../dbModels/CartProducts.js.js.js'; 

export const getUserCart = async (req, res) => {
  try {
    const [cart] = await Cart.findOrCreate({ 
        where: { userId: req.user.id },
        defaults: { userId: req.user.id }
    });

    const items = await CartItem.findAll({
        where: { cartId: cart.id },
        include: [{ model: Product, as: 'product' }]
    });
    
    const formattedItems = items.map(item => ({
        product: { _id: item.product.id, ...item.product.toJSON() },
        productId: item.product.id,
        id: item.product.id,
        name: item.product.name,
        imageUrl: item.product.imageUrl,
        price: item.product.price,
        quantity: item.quantity
    }));

    res.json({ items: formattedItems });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addOrUpdateCartItem = async (req, res) => {
    const { productId, quantity } = req.body;
    const userId = req.user.id;
    try {
        const [cart] = await Cart.findOrCreate({ where: { userId }, defaults: { userId } });
        const item = await CartItem.findOne({ where: { cartId: cart.id, productId } });

        if (item) {
            if (quantity <= 0) await item.destroy();
            else await item.update({ quantity });
        } else if (quantity > 0) {
            await CartItem.create({ cartId: cart.id, productId, quantity });
        }
        res.json({ message: 'Carrito actualizado' }); 
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const clearCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ where: { userId: req.user.id }});
        if (cart) await CartItem.destroy({ where: { cartId: cart.id } });
        res.json({ message: 'Carrito vaciado', items: [] });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};