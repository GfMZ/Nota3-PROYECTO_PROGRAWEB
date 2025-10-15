// CategoryListAdmin.jsx
import React, { useState } from 'react';
import Header from '../components/Header';
import SideMenu from '../components/SideMenu';
import CategoryTable from '../components/CategoryTable';
import Pagination from '../components/Pagination';

const CategoryListAdmin = () => {

    const [categories, setCategories] = useState([
        { id: 1, name: 'Videojuegos', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ...' },
        { id: 2, name: 'Consolas', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ...' },
        { id: 3, name: 'Periféricos', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ...' },
        { id: 4, name: 'Juguetes', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ...' },
        { id: 5, name: 'Ropa', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ...' },
        { id: 6, name: 'Merch', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ...' },
        { id: 7, name: 'Componentes PC', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ...' },
    ]);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(10); 

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
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
                    <CategoryTable categories={categories} />
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
        </div>
    );
};

export default CategoryListAdmin;