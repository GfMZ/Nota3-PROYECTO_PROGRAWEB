

import Product from '../models/Product.js';
import Category from '../models/Category.js'; 

export const createProduct = async (req, res) => {
  const { name, description, price, categoryId, imageUrl, stock } = req.body;

  try {
    const categoryExists = await Category.findById(categoryId);
    if (!categoryExists) {
      return res.status(404).json({ message: 'La Categoría especificada no existe.' });
    }

    const newProduct = new Product({
      name, description, price, imageUrl, stock,
      category: categoryId,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el producto', error: error.message });
  }
};

export const getProducts = async (req, res) => {
  try {
    
    const products = await Product.find().populate('category', 'name').sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error al listar productos', error: error.message });
  }
};

export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('category', 'name');
        
        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado.' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el producto', error: error.message });
    }
};


export const updateProduct = async (req, res) => {
    res.status(501).json({ message: 'Ruta de actualización pendiente.' });
};

export const deleteProduct = async (req, res) => {
    res.status(501).json({ message: 'Ruta de eliminación pendiente.' });
};