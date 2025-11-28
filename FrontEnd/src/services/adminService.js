

const API_BASE_URL = 'http://localhost:4000/api';


export const deleteCategory = async (categoryId, authHeader) => {
    const response = await fetch(`${API_BASE_URL}/categories/${categoryId}`, {
        method: 'DELETE',
        headers: authHeader,
    });
    
    if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Fallo al eliminar la categoría.');
    }

    return true; 
};


export const fetchAllOrdersAdmin = async (authHeader) => {
    const response = await fetch(`${API_BASE_URL}/orders/admin`, {
        headers: authHeader
    });
    
    if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Acceso denegado o error al listar órdenes.');
    }
    return response.json();
};

export const createProduct = async (productData, authHeader) => {
    const response = await fetch(`${API_BASE_URL}/products`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...authHeader
        },
        body: JSON.stringify(productData)
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Error al crear producto.');
    return data;
};


export const deleteProduct = async (productId, authHeader) => {
    const response = await fetch(`${API_BASE_URL}/products/${productId}`, {
        method: 'DELETE',
        headers: authHeader
    });

    if (!response.ok) throw new Error('Error al eliminar producto.');
    return true;
};
export const updateProduct = async (productId, productData, authHeader) => {
    const response = await fetch(`${API_BASE_URL}/products/${productId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            ...authHeader
        },
        body: JSON.stringify(productData)
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Error al actualizar producto.');
    return data;
};