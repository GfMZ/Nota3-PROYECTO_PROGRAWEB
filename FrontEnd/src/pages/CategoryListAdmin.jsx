import React, { useState, useEffect, useMemo, useCallback } from 'react';
import SideMenu from '../components/SideMenu';
import CategoryTable from '../components/CategoryTable';
import Pagination from '../components/Pagination';
import AddCategoryForm from '../components/AddCategoryForm';
import { useAuth } from '../context/AuthContext';
import { fetchCategories } from '../services/productService'; 
import { createCategory, deleteCategory, updateCategory } from '../services/adminService'; 

export default function CategoryListAdmin() {
    const { user, getAuthHeader } = useAuth();
    const isAdmin = user && user.role === 'admin';

    const [isModalOpen, setIsModalOpen] = useState(false); 
    const [categories, setCategories] = useState([]); 
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 10; 
    
    const [editingCategory, setEditingCategory] = useState(null); 

    const loadCategories = useCallback(async () => {
        try {
            const data = await fetchCategories();
            setCategories(data);
        } catch (error) {
            console.error("Error cargando categorías:", error);
        }
    }, []);

    useEffect(() => { loadCategories(); }, [loadCategories]);

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
    const handleOpenEdit = (category) => {
        setEditingCategory(category);
        setIsModalOpen(true);
    };
    const handleOpenCreate = () => {
        setEditingCategory(null);
        setIsModalOpen(true);
    };
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingCategory(null);
    };

    
    const handleSaveCategory = async (categoryData) => {
        if (!isAdmin) return alert("No tienes permisos.");
        try {
            if (editingCategory) {
                
                await updateCategory(editingCategory._id, categoryData, getAuthHeader());
                alert('Categoría actualizada correctamente.');
            } else {
                
                await createCategory(categoryData, getAuthHeader());
                alert('Categoría creada correctamente.');
            }
            
            loadCategories(); 
            handleCloseModal();
            
        } catch (error) {
            console.error("Error al guardar categoría:", error);
            alert(`Error al guardar categoría: ${error.message}`);
        }
    };

    
    const handleDeleteCategory = async (categoryId) => {
        if (!isAdmin) return alert("No tienes permisos.");
        try {
            await deleteCategory(categoryId, getAuthHeader());
            loadCategories(); 
        } catch (error) {
            console.error(error);
            alert("Error al eliminar categoría.");
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
                        
                        onAddCategoryClick={isAdmin ? handleOpenCreate : undefined} 
                        onEditCategory={isAdmin ? handleOpenEdit : undefined}     
                        
                        onDeleteCategory={isAdmin ? handleDeleteCategory : undefined}
                        isAdmin={isAdmin}
                    />      
                </div>
            </div>
            {isAdmin && (
                <AddCategoryForm 
                    isOpen={isModalOpen} 
                    onClose={handleCloseModal} 
                    onSave={handleSaveCategory} 
                    initialData={editingCategory} 
                />
            )}
        </div>
    );
}