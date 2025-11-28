import React, { useState, useEffect, useMemo } from 'react';
import SideMenu from '../components/SideMenu';
import Pagination from '../components/Pagination';
import AddProductForm from '../components/AddProductForm';
import { useAuth } from '../context/AuthContext';
import { fetchProducts } from '../services/productService';
// Importamos updateProduct también
import { deleteProduct, createProduct, updateProduct } from '../services/adminService'; 

export default function ProductListAdmin() {
    const { getAuthHeader, user } = useAuth();
    const isAdmin = user && user.role === 'admin';

    const [products, setProducts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    
    // Estado para saber qué producto estamos editando (null = modo crear)
    const [editingProduct, setEditingProduct] = useState(null);

    const loadProducts = async () => {
        try {
            const data = await fetchProducts();
            setProducts(data);
        } catch (error) { console.error(error); }
    };

    useEffect(() => { loadProducts(); }, []);

    // Función unificada para Guardar (Crear o Editar)
    const handleSaveProduct = async (productData) => {
        try {
            if (editingProduct) {
                // MODO EDICIÓN: PUT /api/products/:id
                await updateProduct(editingProduct._id, productData, getAuthHeader());
                alert('Producto actualizado correctamente.');
            } else {
                // MODO CREACIÓN: POST /api/products
                await createProduct(productData, getAuthHeader());
                alert('Producto creado correctamente.');
            }
            
            // Cerrar modal y recargar tabla
            setIsModalOpen(false);
            setEditingProduct(null); // Limpiar selección
            loadProducts();
            
        } catch (error) { 
            alert(error.message); 
        }
    };

    // Abrir modal en modo "Crear"
    const handleOpenCreate = () => {
        setEditingProduct(null); // Aseguramos que no hay producto seleccionado
        setIsModalOpen(true);
    };

    // Abrir modal en modo "Editar"
    const handleOpenEdit = (product) => {
        setEditingProduct(product); // Pasamos el producto completo al formulario
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
                                <td style={styles.td}>{p.category?.name || '-'}</td>
                                <td style={styles.td}>{p.stock}</td>
                                <td style={styles.td}>
                                    {/* Botón EDITAR */}
                                    <button 
                                        onClick={() => handleOpenEdit(p)} 
                                        style={styles.actionBtn} 
                                        title="Editar"
                                    >
                                        ✏️
                                    </button>
                                    
                                    {/* Botón ELIMINAR */}
                                    <button 
                                        onClick={() => handleDelete(p._id)} 
                                        style={styles.actionBtn} 
                                        title="Eliminar"
                                    >
                                        🗑️
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Pagination currentPage={1} totalPages={1} onPageChange={()=>{}} />
            </div>
            
            <AddProductForm 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                onSave={handleSaveProduct} 
                initialData={editingProduct} // Pasamos el producto a editar (o null)
            />
        </div>
    );
}