

import Order from '../models/Order.js';
import Cart from '../models/Cart.js'; 


export const createOrder = async (req, res) => {
    
    const { orderItems, shippingAddress, paymentMethod, totalPrice } = req.body; 

    
    const userId = req.user._id;

    if (orderItems && orderItems.length === 0) {
        return res.status(400).json({ message: 'No hay productos en la orden.' });
    }

    try {
        
        const order = new Order({
            user: userId, 
            orderItems,
            shippingAddress,
            paymentMethod,
            totalPrice,
            isPaid: true, 
            paidAt: Date.now(),
        });

        const createdOrder = await order.save();
        
        
        await Cart.findOneAndDelete({ user: userId });
        
        
        res.status(201).json(createdOrder);

    } catch (error) {
        res.status(500).json({ message: 'Error al crear la orden', error: error.message });
    }
};


export const getMyOrders = async (req, res) => {
    try {
       
        const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener órdenes', error: error.message });
    }
};


export const getOrderById = async (req, res) => {
    try {
        
        const order = await Order.findById(req.params.id).populate('user', 'name email');

        if (!order) {
            return res.status(404).json({ message: 'Orden no encontrada.' });
        }
        
        
        if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
             return res.status(403).json({ message: 'Acceso denegado.' });
        }

        res.json(order);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la orden', error: error.message });
    }
};


export const getAllOrders = async (req, res) => {
    try {
        
        const orders = await Order.find().populate('user', 'name email').sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener todas las órdenes', error: error.message });
    }
};