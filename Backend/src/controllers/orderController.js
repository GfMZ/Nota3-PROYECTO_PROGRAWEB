// backend/controllers/orderController.js

import Order, { OrderItem } from '../Models/Order.js';
import Cart, { CartItem } from '../Models/Cart.js';
import User from '../Models/Users.js';

// --- IMPORTANTE: ESTOS ERAN LOS QUE FALTABAN ---
import Product from '../Models/Products.js';
import Category from '../Models/Categories.js'; 
// -----------------------------------------------

export const createOrder = async (req, res) => {
    const { orderItems, shippingAddress, paymentMethod, totalPrice } = req.body;
    // Validación de seguridad: si no hay items, no creamos nada
    if (!orderItems || orderItems.length === 0) {
        return res.status(400).json({ message: 'No hay ítems en la orden' });
    }

    const userId = req.user.id;

    try {
        const order = await Order.create({
            userId,
            shippingAddress: typeof shippingAddress === 'string' ? shippingAddress : JSON.stringify(shippingAddress),
            paymentMethod,
            total: totalPrice,
            subTotal: totalPrice,
            isPaid: true, // Asumimos pagado para este flujo simplificado
            paidAt: new Date()
        });

        // Mapeamos los items para guardarlos
        const itemsData = orderItems.map(item => ({
            orderId: order.id,
            productId: item.product || item.productId, // Manejamos ambas variantes por seguridad
            name: item.name,
            quantity: item.quantity,
            price: item.price,
            imageUrl: item.imageUrl
        }));
        
        await OrderItem.bulkCreate(itemsData);

        // Limpiamos el carrito del usuario
        const cart = await Cart.findOne({ where: { userId } });
        if (cart) await CartItem.destroy({ where: { cartId: cart.id }});

        // Devolvemos la orden con los items
        const fullOrder = await Order.findByPk(order.id, { include: [{ model: OrderItem, as: 'orderItems' }] });
        
        res.status(201).json({ 
            ...fullOrder.toJSON(), 
            _id: fullOrder.id, 
            totalPrice: fullOrder.total 
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.findAll({
            where: { userId: req.user.id },
            include: [{ model: OrderItem, as: 'orderItems' }],
            order: [['createdAt', 'DESC']]
        });
        const formatted = orders.map(o => ({ 
            ...o.toJSON(), 
            _id: o.id,
            totalPrice: o.total 
        }));
        res.json(formatted);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.findAll({
            include: [
                { 
                    model: User, 
                    as: 'user', 
                    attributes: ['firstName', 'lastName', 'email'] 
                },
                { model: OrderItem, as: 'orderItems' }
            ],
            order: [['createdAt', 'DESC']]
        });

        const formatted = orders.map(o => {
            const json = o.toJSON();
            const u = json.user;
            const fullName = u ? `${u.firstName} ${u.lastName}` : 'Desconocido';

            return { 
                ...json, 
                _id: o.id, 
                totalPrice: o.total,
                user: { ...u, name: fullName }
            };
        });

        res.json(formatted);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// --- FUNCIÓN CORREGIDA FINALMENTE ---
export const getOrderById = async (req, res) => {
    try {
        const order = await Order.findByPk(req.params.id, {
            include: [
                { 
                    model: User, 
                    as: 'user', 
                    attributes: ['firstName', 'lastName', 'email'] 
                },
                { 
                    model: OrderItem, 
                    as: 'orderItems',
                    include: [
                        {
                            model: Product,
                            as: 'product', // <--- ¡ALIAS CORREGIDO A 'product' AÑADIDO AQUÍ!
                            attributes: ['id', 'name', 'imageUrl'],
                            include: [
                                {
                                    model: Category,
                                    as: 'category',
                                    attributes: ['name']
                                }
                            ]
                        }
                    ]
                }
            ]
        });

        if (!order) return res.status(404).json({ message: 'No encontrada' });
        
        const json = order.toJSON();
        const u = json.user;
        const fullName = u ? `${u.firstName} ${u.lastName}` : 'Desconocido';

        res.json({ 
            ...json, 
            _id: order.id, 
            totalPrice: json.total,
            user: { ...u, name: fullName }
        });
    } catch (error) {
        console.error(error); 
        res.status(500).json({ message: error.message });
    }
};