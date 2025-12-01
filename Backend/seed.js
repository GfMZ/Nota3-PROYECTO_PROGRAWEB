

import sequelize from './src/Config/database.js';


import Category from './src/Models/Categories.js';
import Product from './src/Models/Products.js';
import User from './src/Models/Users.js';
import Cart from './src/Models/Cart.js';  
import Order from './src/Models/Order.js'; archivo

const seedDatabase = async () => {
  try {

    await sequelize.sync({ force: true });
    console.log('🔄 Base de datos limpiada y tablas creadas.');

    // 2. Crear Usuario Admin
    await User.create({
      firstName: "Super", 
      lastName: "Admin",
      email: "superadmin@test.com",
      password: "securepassword",
      country: "Peru",
      role: "admin",
      username: "superadmin"
    });

    const catConsolas = await Category.create({ 
        name: "Consolas", description: "Hardware de entretenimiento y videojuegos." 
    });
    
    const catPerifericos = await Category.create({ 
        name: "Periféricos", description: "Accesorios y hardware de PC." 
    });

    const catCableados = await Category.create({ 
        name: "Cableados", description: "Cables y conectores de alta velocidad." 
    });
    
    console.log('fyp Categorías creadas.');

    // 4. Crear Productos 
    const products = [

        {
            name: "Xbox Series X 1TB",
            description: "La Xbox más rápida y potente de la historia. 4K/120FPS.",
            price: 2399.00,
            imageUrl: "https://placehold.co/400x400/107C10/ffffff?text=Xbox+Series+X",
            stock: 15,
            categoryId: catConsolas.id
        },
        {
            name: "Nintendo Switch OLED - Blanco",
            description: "Pantalla OLED de 7 pulgadas, soporte ajustable amplio, base con puerto LAN.",
            price: 1699.00,
            imageUrl: "https://placehold.co/400x400/E60012/ffffff?text=Switch+OLED",
            stock: 30,
            categoryId: catConsolas.id
        },
        {
            name: "Valve Steam Deck 512GB",
            description: "Potencia de PC portátil. Pantalla antirreflejo de primera calidad.",
            price: 2890.00,
            imageUrl: "https://placehold.co/400x400/171a21/ffffff?text=Steam+Deck",
            stock: 8,
            categoryId: catConsolas.id
        },
        {
            name: "PlayStation 4 Slim 1TB Mega Pack",
            description: "Increíbles juegos, entretenimiento sin fin. Incluye 3 juegos físicos.",
            price: 1499.00,
            imageUrl: "https://placehold.co/400x400/003791/ffffff?text=PS4+Slim",
            stock: 12,
            categoryId: catConsolas.id
        },


        {
            name: "Razer BlackWidow V3",
            description: "Teclado mecánico gaming con switches verdes táctiles y sonoros.",
            price: 450.00,
            imageUrl: "https://placehold.co/400x400/44d62c/000000?text=Razer+Keyboard",
            stock: 20,
            categoryId: catPerifericos.id
        },
        {
            name: "HyperX Cloud II Wireless",
            description: "Audífonos inalámbricos con sonido envolvente 7.1 y comodidad legendaria.",
            price: 520.00,
            imageUrl: "https://placehold.co/400x400/e52d27/ffffff?text=HyperX+Cloud",
            stock: 25,
            categoryId: catPerifericos.id
        },
        {
            name: "Monitor ASUS TUF Gaming 27''",
            description: "Monitor curvo 165Hz, 1ms respuesta, panel IPS Full HD.",
            price: 1150.00,
            imageUrl: "https://placehold.co/400x400/333333/ffffff?text=Monitor+ASUS",
            stock: 10,
            categoryId: catPerifericos.id
        },
        {
            name: "Silla Gamer Corsair T3 Rush",
            description: "Diseño inspirado en el automovilismo, tejido suave transpirable.",
            price: 1299.00,
            imageUrl: "https://placehold.co/400x400/222222/ffffff?text=Silla+Corsair",
            stock: 5,
            categoryId: catPerifericos.id
        },


        {
            name: "Cable HDMI 2.1 Ultra High Speed 8K",
            description: "Soporta 8K@60Hz y 4K@120Hz. Ideal para PS5 y Xbox Series X.",
            price: 45.00,
            imageUrl: "https://placehold.co/400x400/000000/ffffff?text=Cable+HDMI",
            stock: 100,
            categoryId: catCableados.id
        },
        {
            name: "Cable de Red Ugreen CAT8",
            description: "Cable trenzado de alta velocidad 40Gbps para gaming sin lag.",
            price: 35.90,
            imageUrl: "https://placehold.co/400x400/0057b7/ffffff?text=Cable+LAN",
            stock: 80,
            categoryId: catCableados.id
        },
        {
            name: "Hub USB-C 7 en 1",
            description: "Expande tu conectividad: HDMI 4K, 3x USB 3.0, Lector SD/TF.",
            price: 120.00,
            imageUrl: "https://placehold.co/400x400/666666/ffffff?text=Hub+USB-C",
            stock: 40,
            categoryId: catCableados.id
        },
        {
            name: "Cable DisplayPort 1.4 144Hz",
            description: "Soporta resoluciones hasta 8K y tasas de refresco de 144Hz.",
            price: 55.00,
            imageUrl: "https://placehold.co/400x400/222222/ffffff?text=DisplayPort",
            stock: 60,
            categoryId: catCableados.id
        }
    ];

    await Product.bulkCreate(products);
    console.log('✅ ¡12 Productos cargados exitosamente!');
    
    process.exit(); // Terminar el proceso
  } catch (error) {
    console.error('❌ Error al ejecutar seed:', error);
    process.exit(1);
  }
};

seedDatabase();