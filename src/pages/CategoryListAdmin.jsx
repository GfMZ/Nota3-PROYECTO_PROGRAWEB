import React, { useState, useMemo } from 'react';
import SideMenu from '../components/SideMenu';
import CategoryTable from '../components/CategoryTable';
import Pagination from '../components/Pagination';
import AddCategoryForm from '../components/AddCategoryForm';
import { useAuth } from '../context/AuthContext';

export default function CategoryListAdmin() {
    const { user } = useAuth();
    const isAdmin = user && user.isAdmin;

    const [isModalOpen, setIsModalOpen] = useState(false); 
    const [categories, setCategories] = useState([ 
        { id: 1, name: 'Videojuegos', description: 'Lorem ipsum dolor sit amet...' },
        { id: 2, name: 'Consolas', description: 'Lorem ipsum dolor sit amet...' },
        { id: 3, name: 'Periféricos', description: 'Lorem ipsum dolor sit amet...' },
        { id: 4, name: 'Juguetes', description: 'Lorem ipsum dolor sit amet...' },
        { id: 5, name: 'Ropa', description: 'Lorem ipsum dolor sit amet...' },
        { id: 6, name: 'Merch', description: 'Lorem ipsum dolor sit amet...' },
        { id: 7, name: 'Componentes PC', description: 'Lorem ipsum dolor sit amet...' },
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
    
    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    const handleAddCategory = (newCategoryData) => {
        const newId = categories.length > 0 ? categories[categories.length - 1].id + 1 : 1;
        const newCategory = { id: newId, ...newCategoryData };
        setCategories(prevCategories => [...prevCategories, newCategory]);
    };

    const handleDeleteCategory = (categoryId) => {
        setCategories(prevCategories => 
            prevCategories.filter(category => category.id !== categoryId)
        );
    };

    const mainLayoutStyles = {
        display: 'flex',
        minHeight: 'calc(100vh - 120px)', 
        backgroundColor: '#F0F2F5' 
    };

    const contentAreaStyles = {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column'
    };

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
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
            {isAdmin && (
                <AddCategoryForm 
                    isOpen={isModalOpen} 
                    onClose={handleCloseModal} 
                    onSave={handleAddCategory} 
                />
            )}
        </div>
    );
}