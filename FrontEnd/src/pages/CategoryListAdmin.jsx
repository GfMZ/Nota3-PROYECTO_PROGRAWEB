import React, { useState, useEffect, useMemo, useCallback } from 'react';
import SideMenu from '../components/SideMenu';
import CategoryTable from '../components/CategoryTable';
import Pagination from '../components/Pagination';
import AddCategoryForm from '../components/AddCategoryForm';
import { useAuth } from '../context/AuthContext';
// IMPORTANTE: Importar servicios
import { fetchCategories } from '../services/productService'; 

export default function CategoryListAdmin() {
    const { user, getAuthHeader } = useAuth();
    const isAdmin = user && user.role === 'admin';

    const [isModalOpen, setIsModalOpen] = useState(false); 
    const [categories, setCategories] = useState([]); // Array vacío inicial
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 10; 

    // CARGAR DESDE API
    const loadCategories = useCallback(async () => {
        try {
            const data = await fetchCategories();
            setCategories(data);
        } catch (error) {
            console.error("Error cargando categorías:", error);
        }
    }, []);

    useEffect(() => {
        loadCategories();
    }, [loadCategories]);

    // FILTRADO
    const filteredCategories = useMemo(() => {
        if (!searchTerm) return categories;
        const lowerCaseSearch = searchTerm.toLowerCase();
        return categories.filter(category => (
            (category._id && String(category._id).includes(lowerCaseSearch)) ||
            category.name.toLowerCase().includes(lowerCaseSearch) ||
            (category.description && category.description.toLowerCase().includes(lowerCaseSearch))
        ));
    }, [categories, searchTerm]);

    const handlePageChange = (page) => setCurrentPage(page);
    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    // AGREGAR (API)
    const handleAddCategory = async (newCategoryData) => {
        if (!isAdmin) return alert("No tienes permisos.");
        try {
            const response = await fetch('http://localhost:4000/api/categories', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
                body: JSON.stringify(newCategoryData)
            });
            if (response.ok) {
                loadCategories(); // Recargar lista
                handleCloseModal();
            } else {
                alert("Error al crear categoría");
            }
        } catch (error) {
            console.error(error);
        }
    };

    // ELIMINAR (API)
    const handleDeleteCategory = async (categoryId) => {
        if (!isAdmin) return alert("No tienes permisos.");
        try {
            const response = await fetch(`http://localhost:4000/api/categories/${categoryId}`, {
                method: 'DELETE',
                headers: getAuthHeader()
            });
            if (response.ok) {
                loadCategories(); // Recargar lista
            } else {
                alert("Error al eliminar");
            }
        } catch (error) {
            console.error(error);
        }
    };

    const mainLayoutStyles = { display: 'flex', minHeight: 'calc(100vh - 120px)', backgroundColor: '#F0F2F5' };
    const contentAreaStyles = { flexGrow: 1, display: 'flex', flexDirection: 'column' };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100vw', margin: 0, padding: 0 }}>
            <div style={mainLayoutStyles}>
                <SideMenu />
                <div style={contentAreaStyles}>
                    <CategoryTable 
                        categories={filteredCategories} 
                        searchTerm={searchTerm} 
                        setSearchTerm={setSearchTerm} 
                        onAddCategoryClick={isAdmin ? handleOpenModal : undefined} 
                        onDeleteCategory={isAdmin ? handleDeleteCategory : undefined}
                        isAdmin={isAdmin}
                    />
                    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                </div>
            </div>
            {isAdmin && (
                <AddCategoryForm isOpen={isModalOpen} onClose={handleCloseModal} onSave={handleAddCategory} />
            )}
        </div>
    );
}