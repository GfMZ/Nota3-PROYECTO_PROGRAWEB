import React, { useState, useEffect } from 'react';
import { fetchCategories } from '../services/productService';

export default function AddProductForm({ isOpen, onClose, onSave, initialData }) {
    if (!isOpen) return null;

    const [formData, setFormData] = useState({
        name: '', 
        description: '', 
        brand: '', 
        price: '', 
        stock: '', 
        imageUrl: '', 
        categoryId: ''
    });
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const loadCats = async () => {
            try {
                const data = await fetchCategories();
                setCategories(data);
                // Si es crear nuevo y hay categorías, pre-seleccionar la primera
                if (!initialData && data.length > 0) {
                    setFormData(prev => ({ ...prev, categoryId: data[0]._id }));
                }
            } catch (error) { console.error(error); }
        };
        loadCats();
    }, [initialData]); 

    useEffect(() => {
        if (initialData) {
            setFormData({
                name: initialData.name || '',
                description: initialData.description || '',
                brand: initialData.brand || '', 
                price: initialData.price || 0,
                stock: initialData.stock || 0,
                imageUrl: initialData.imageUrl || '',
                // Manejo robusto de categoría anidada vs ID plano
                categoryId: initialData.category?._id || initialData.category?.id || initialData.categoryId || ''
            });
        } else {
            // Limpiar si es modo crear
            setFormData({ 
                name: '', description: '', brand: '', 
                price: '', stock: '', imageUrl: '', 
                categoryId: categories[0]?._id || '' 
            });
        }
    }, [initialData, categories]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Conversión estricta para PostgreSQL
        onSave({
            ...formData,
            price: parseFloat(formData.price),
            stock: parseInt(formData.stock, 10)
        }); 
    };
    

    const modalStyles = {
        overlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 },
        content: { background: 'white', padding: '30px', borderRadius: '8px', width: '500px', maxHeight: '90vh', overflowY: 'auto' },
        input: { width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc' },
        label: { display: 'block', marginBottom: '5px', fontWeight: 'bold' },
        btn: { background: '#2e9b1f', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', float: 'right' }
    };

    return (
        <div style={modalStyles.overlay}>
            <div style={modalStyles.content}>
                <h2>{initialData ? 'Editar Producto' : 'Nuevo Producto'}</h2>
                <form onSubmit={handleSubmit}>
                    <label style={modalStyles.label}>Nombre</label>
                    <input name="name" value={formData.name} style={modalStyles.input} onChange={handleChange} required />


                    <label style={modalStyles.label}>Marca</label>
                    <input name="brand" value={formData.brand} style={modalStyles.input} onChange={handleChange} placeholder="Ej: Sony, Razer..." />

                    <label style={modalStyles.label}>Descripción</label>
                    <textarea name="description" value={formData.description} style={{...modalStyles.input, height: '80px'}} onChange={handleChange} required />

                    <div style={{display: 'flex', gap: '10px'}}>
                        <div style={{flex: 1}}>
                            <label style={modalStyles.label}>Precio (S/)</label>
                            <input name="price" type="number" step="0.01" value={formData.price} style={modalStyles.input} onChange={handleChange} required />
                        </div>
                        <div style={{flex: 1}}>
                            <label style={modalStyles.label}>Stock</label>
                            <input name="stock" type="number" value={formData.stock} style={modalStyles.input} onChange={handleChange} required />
                        </div>
                    </div>

                    <label style={modalStyles.label}>Categoría</label>
                    <select name="categoryId" value={formData.categoryId} style={modalStyles.input} onChange={handleChange}>
                        {categories.map(cat => (
                            <option key={cat._id} value={cat._id}>{cat.name}</option>
                        ))}
                    </select>

                    <label style={modalStyles.label}>URL Imagen</label>
                    <input name="imageUrl" value={formData.imageUrl} style={modalStyles.input} onChange={handleChange} placeholder="https://..." required />

                    <div style={{marginTop: '20px', display: 'flex', justifyContent: 'flex-end', gap: '10px'}}>
                        <button type="button" onClick={onClose} style={{...modalStyles.btn, background: '#ccc'}}>Cancelar</button>
                        <button type="submit" style={modalStyles.btn}>
                            {initialData ? 'Actualizar' : 'Guardar'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}