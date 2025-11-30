import Product from '../Models/Products.js';      
import Category from '../Models/Categories.js'; 

export const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({ ...product.toJSON(), _id: product.id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [{ model: Category, as: 'category', attributes: ['name', 'id'] }],
      order: [['createdAt', 'DESC']]
    });
    const formatted = products.map(p => {
        const json = p.toJSON();
        return { ...json, _id: p.id, category: { name: json.category?.name, _id: json.category?.id } };
    });
    res.json(formatted);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [{ model: Category, as: 'category', attributes: ['name'] }]
    });
    if (!product) return res.status(404).json({ message: 'No encontrado' });
    
    const json = product.toJSON();
    res.json({ ...json, _id: json.id, category: { name: json.category?.name } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProduct = async (req, res) => {
    try {
        const [updated] = await Product.update(req.body, { where: { id: req.params.id }});
        if (updated) {
            const p = await Product.findByPk(req.params.id);
            res.json({ ...p.toJSON(), _id: p.id });
        } else {
            res.status(404).json({ message: 'No encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const deleted = await Product.destroy({ where: { id: req.params.id }});
        if (!deleted) return res.status(404).json({ message: 'No encontrado' });
        res.json({ message: 'Eliminado' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};