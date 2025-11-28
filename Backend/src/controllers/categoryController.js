

import Category from '../models/Category.js';

export const createCategory = async (req, res) => {
  const { name, description } = req.body;

  try {
    const newCategory = new Category({ name, description });
    const savedCategory = await newCategory.save();
    res.status(201).json(savedCategory); 

  } catch (error) {
    if (error.code === 11000) { 
        return res.status(400).json({ message: 'Esa categoría ya existe.' });
    }
    res.status(500).json({ message: 'Error al crear la categoría', error: error.message });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    res.status(200).json(categories);
    
  } catch (error) {
    res.status(500).json({ message: 'Error al listar categorías', error: error.message });
  }
};

export const deleteCategory = async (req, res) => {
    const { id } = req.params; 

    try {
        const deletedCategory = await Category.findByIdAndDelete(id);

        if (!deletedCategory) {
            return res.status(404).json({ message: 'Categoría no encontrada.' });
        }
        res.status(200).json({ message: 'Categoría eliminada con éxito', deletedCategory });

    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la categoría', error: error.message });
    }
};