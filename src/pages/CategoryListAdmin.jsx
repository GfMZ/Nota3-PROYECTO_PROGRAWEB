// CategoryListAdmin.jsx
import React, { useState, useMemo } from 'react';
import Header from '../components/Header';
import SideMenu from '../components/SideMenu';
import CategoryTable from '../components/CategoryTable';
import Pagination from '../components/Pagination';
import AddCategoryForm from '../components/AddCategoryForm';

export default function CategoryListAdmin() {

    const [isModalOpen, setIsModalOpen] = useState(false); 

    // CAMBIO 1: Se añade 'setCategories' para poder actualizar la lista
    const [categories, setCategories] = useState([ 
        { id: 1, name: 'Videojuegos', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ...' },
        { id: 2, name: 'Consolas', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ...' },
        { id: 3, name: 'Periféricos', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ...' },
        { id: 4, name: 'Juguetes', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ...' },
        { id: 5, name: 'Ropa', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ...' },
        { id: 6, name: 'Merch', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ...' },
        { id: 7, name: 'Componentes PC', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ...' },
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 10; 

    const filteredCategories = useMemo(() => {
        if (!searchTerm) return categories;
        const lowerCaseSearch = searchTerm.toLowerCase();
        return categories.filter(category => (
            String(category.id).includes(lowerCaseSearch) ||
            category.name.toLowerCase().includes(lowerCaseSearch) ||
            category.description.toLowerCase().includes(lowerCaseSearch)
        ));
    }, [categories, searchTerm]);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };
    
    // Funciones para la Modal
    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);


//-------------------------------AÑADIR-----------------------------------------
    const handleAddCategory = (newCategoryData) => {

        const newId = categories.length > 0 ? categories[categories.length - 1].id + 1 : 1;
        
        const newCategory = { 
            id: newId, 
            name: newCategoryData.name, 
            description: newCategoryData.description 
        };
        
        // Actualizar
        setCategories(prevCategories => [...prevCategories, newCategory]);
    };
//-------------------------------ELIMINAR-----------------------------------------

    const handleDeleteCategory = (categoryId) => {
        // Actualizar
        setCategories(prevCategories => 
            // Filtramos la lista, manteniendo solo las categorías cuyo ID no coincida
            prevCategories.filter(category => category.id !== categoryId)
        );
    };


    const mainLayoutStyles = {
        display: 'flex',
        minHeight: 'calc(100vh - 60px)', 
        backgroundColor: '#F0F2F5' 
    };

    const contentAreaStyles = {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column'
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100vw', margin: 0, padding: 0 }}>
            <Header />
            <div style={mainLayoutStyles}>
                <SideMenu />
                <div style={contentAreaStyles}>
                    <CategoryTable 
                        categories={filteredCategories} 
                        searchTerm={searchTerm} 
                        setSearchTerm={setSearchTerm} 
                        onAddCategoryClick={handleOpenModal} 
                        onDeleteCategory={handleDeleteCategory}
                    />
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
            
            <AddCategoryForm 
                isOpen={isModalOpen} 
                onClose={handleCloseModal} 
                onSave={handleAddCategory} 
            />
        </div>
    );
}