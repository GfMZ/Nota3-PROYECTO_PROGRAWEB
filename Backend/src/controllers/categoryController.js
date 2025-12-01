import Category from '../dbModels/Categories.js'; 

export const createCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json({ ...category.toJSON(), _id: category.id });
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') return res.status(400).json({ message: 'Categoría ya existe' });
    res.status(500).json({ message: error.message });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll({ order: [['name', 'ASC']] });
    const formatted = categories.map(c => ({ ...c.toJSON(), _id: c.id }));
    res.status(200).json(formatted);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const deleted = await Category.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ message: 'No encontrada' });
    res.json({ message: 'Eliminada' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateCategory = async (req, res) => {
    try {
        const [updatedRows] = await Category.update(req.body, {
            where: { id: req.params.id }
        });

        if (updatedRows === 0) {
            return res.status(404).json({ message: 'Categoría no encontrada' });
        }

        const updatedCategory = await Category.findByPk(req.params.id);


        res.json({ ...updatedCategory.toJSON(), _id: updatedCategory.id });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};