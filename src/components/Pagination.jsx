// Pagination.jsx
import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const paginationContainerStyles = {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: '10px 20px',
        fontFamily: 'Arial, sans-serif'
    };

    const pageButtonStyles = {
        border: '1px solid #DDD',
        padding: '8px 12px',
        margin: '0 4px',
        borderRadius: '5px',
        backgroundColor: 'white',
        cursor: 'pointer',
        color: '#333'
    };

    const activePageButtonStyles = {
        ...pageButtonStyles,
        backgroundColor: '#4CAF50', 
        color: 'white',
        borderColor: '#4CAF50'
    };

    const arrowButtonStyles = {
        ...pageButtonStyles,
        color: '#666'
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
            pages.push(<span key="dots" style={{margin: '0 5px'}}>...</span>);
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
            <button style={arrowButtonStyles} onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
                &lt;
            </button>
            {generatePageNumbers()}
            <button style={arrowButtonStyles} onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                &gt;
            </button>
        </div>
    );
};

export default Pagination;