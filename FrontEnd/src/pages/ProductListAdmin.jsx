import React, { useState, useEffect, useMemo } from 'react';
import SideMenu from '../components/SideMenu';
import Pagination from '../components/Pagination';
import AddProductForm from '../components/AddProductForm';
import { useAuth } from '../context/AuthContext';
import { fetchProducts } from '../services/productService';
import { deleteProduct, createProduct, updateProduct } from '../services/adminService'; 

export default function ProductListAdmin() {
    const { getAuthHeader, user } = useAuth();
    const isAdmin = user && user.role === 'admin';

    const [products, setProducts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    

    const [editingProduct, setEditingProduct] = useState(null);

    const loadProducts = async () => {
        try {
            const data = await fetchProducts();
            setProducts(data);
        } catch (error) { console.error(error); }
    };

    useEffect(() => { loadProducts(); }, []);


    const handleSaveProduct = async (productData) => {
        try {

            const payload = {
                ...productData,
                price: parseFloat(productData.price),
                stock: parseInt(productData.stock, 10),

                categoryId: productData.categoryId || productData.category?._id
            };

            if (editingProduct) {
                // UPDATE
                await updateProduct(editingProduct._id, payload, getAuthHeader());
                alert('Producto actualizado correctamente.');
            } else {
                // CREATE
                await createProduct(payload, getAuthHeader());
                alert('Producto creado correctamente.');
            }
            
            setIsModalOpen(false);
            setEditingProduct(null);
            loadProducts();
            
        } catch (error) { 
            alert(`Error: ${error.message}`); 
        }
    };

    const handleOpenCreate = () => {
        setEditingProduct(null); 
        setIsModalOpen(true);
    };

    const handleOpenEdit = (product) => {

        setEditingProduct(product); 
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('¿Eliminar este producto?')) return;
        try {
            await deleteProduct(id, getAuthHeader());
            loadProducts();
        } catch (error) { alert(error.message); }
    };

    const filtered = useMemo(() => {
        return products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }, [products, searchTerm]);

    const styles = {
        container: { display: 'flex', minHeight: '100vh', background: '#F0F2F5' },
        content: { flex: 1, padding: '20px', display: 'flex', flexDirection: 'column' },
        header: { display: 'flex', justifyContent: 'space-between', marginBottom: '20px' },
        table: { width: '100%', borderCollapse: 'collapse', background: 'white', borderRadius: '8px', overflow: 'hidden' },
        th: { background: '#eee', padding: '12px', textAlign: 'left' },
        td: { padding: '12px', borderBottom: '1px solid #eee' },
        btn: { background: '#2e9b1f', color: 'white', border: 'none', padding: '10px', borderRadius: '5px', cursor: 'pointer' },
        actionBtn: { background: 'transparent', border:'none', cursor:'pointer', marginRight: '10px', fontSize: '16px' }
    };

    if (!isAdmin) return <div>Acceso denegado</div>;

    return (
        <div style={styles.container}>
            <SideMenu />
            <div style={styles.content}>
                <div style={styles.header}>
                    <h2>Gestión de Productos</h2>
                    <button style={styles.btn} onClick={handleOpenCreate}>+ Nuevo Producto</button>
                </div>
                
                <input 
                    placeholder="Buscar producto..." 
                    style={{padding: '10px', marginBottom: '20px', borderRadius: '5px', border: '1px solid #ddd'}}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.th}>Nombre</th>
                            <th style={styles.th}>Precio</th>
                            <th style={styles.th}>Categoría</th>
                            <th style={styles.th}>Stock</th>
                            <th style={styles.th}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map(p => (
                            <tr key={p._id}>
                                <td style={styles.td}>{p.name}</td>
                                <td style={styles.td}>S/ {p.price}</td>
                                <td style={styles.td}>{p.category?.name || 'General'}</td>
                                <td style={styles.td}>{p.stock}</td>
                                <td style={styles.td}>
                                    <button onClick={() => handleOpenEdit(p)} style={styles.actionBtn} title="Editar">✏️</button>
                                    <button onClick={() => handleDelete(p._id)} style={styles.actionBtn} title="Eliminar">🗑️</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            <AddProductForm 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                onSave={handleSaveProduct} 
                initialData={editingProduct} 
            />
        </div>
    );
}