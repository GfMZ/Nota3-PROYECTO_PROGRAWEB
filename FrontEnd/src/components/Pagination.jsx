import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    
    if (totalPages <= 1) return null;

    const paginationContainerStyles = {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: '20px 0', 
        fontFamily: 'Arial, sans-serif',
        gap: '5px'
    };

    const pageButtonStyles = {
        border: '1px solid #DDD',
        padding: '8px 12px',
        borderRadius: '6px',
        backgroundColor: 'white',
        cursor: 'pointer',
        color: '#374151',
        minWidth: '32px',
        transition: 'all 0.2s'
    };

    const activePageButtonStyles = {
        ...pageButtonStyles,
        backgroundColor: '#2e9b1f', 
        color: 'white',
        borderColor: '#2e9b1f',
        fontWeight: 'bold'
    };

    const arrowButtonStyles = {
        ...pageButtonStyles,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '8px'
    };

    const disabledArrowStyles = {
        ...arrowButtonStyles,
        opacity: 0.5,
        cursor: 'default',
        backgroundColor: '#f9fafb'
    };

    const generatePageNumbers = () => {
        const pages = [];

        for (let i = 1; i <= Math.min(totalPages, 10); i++) {
            pages.push(
                <button
                    key={i}
                    style={i === currentPage ? activePageButtonStyles : pageButtonStyles}
                    onClick={() => onPageChange(i)}
                >
                    {i}
                </button>
            );
        }
        if (totalPages > 10) {
            pages.push(<span key="dots" style={{margin: '0 5px', color: '#888'}}>...</span>);
            pages.push(
                <button
                    key={totalPages}
                    style={totalPages === currentPage ? activePageButtonStyles : pageButtonStyles}
                    onClick={() => onPageChange(totalPages)}
                >
                    {totalPages}
                </button>
            );
        }
        return pages;
    };

    return (
        <div style={paginationContainerStyles}>
            <button 
                style={currentPage === 1 ? disabledArrowStyles : arrowButtonStyles} 
                onClick={() => onPageChange(currentPage - 1)} 
                disabled={currentPage === 1}
            >
                <ChevronLeft size={16} />
            </button>
            
            {generatePageNumbers()}
            
            <button 
                style={currentPage === totalPages ? disabledArrowStyles : arrowButtonStyles} 
                onClick={() => onPageChange(currentPage + 1)} 
                disabled={currentPage === totalPages}
            >
                <ChevronRight size={16} />
            </button>
        </div>
    );
};

export default Pagination;