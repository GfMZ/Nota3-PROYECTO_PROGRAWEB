

const API_BASE_URL = 'http://localhost:4000/api';



// 1. FUNCIONES PARA CATEGORIES


export const createCategory = async (categoryData, authHeader) => {
    const response = await fetch(`${API_BASE_URL}/categories`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...authHeader
        },
        body: JSON.stringify(categoryData)
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Error al crear categoría.');
    return data;
};

export const updateCategory = async (categoryId, categoryData, authHeader) => {
    const response = await fetch(`${API_BASE_URL}/categories/${categoryId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            ...authHeader
        },
        body: JSON.stringify(categoryData)
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Error al actualizar categoría.');
    return data;
};

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



// 2. FUNCIONES PARA PRODUCTS


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

export const deleteProduct = async (productId, authHeader) => {
    const response = await fetch(`${API_BASE_URL}/products/${productId}`, {
        method: 'DELETE',
        headers: authHeader
    });

    if (!response.ok) throw new Error('Error al eliminar producto.');
    return true;
};



// 3. FUNCIONES PARA ORDERS (ADMIN)


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


// 4. FUNCIONES PARA USUARIOS (ADMIN)


export const fetchUsers = async (authHeader) => {

    const response = await fetch(`${API_BASE_URL}/auth/admin/users`, {
        headers: authHeader
    });
    if (!response.ok) throw new Error('Error al listar usuarios.');
    return response.json();
};

export const updateBlockStatus = async (userId, isBlocked, authHeader) => {

    const response = await fetch(`${API_BASE_URL}/auth/${userId}/block`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            ...authHeader
        },
        body: JSON.stringify({ isBlocked })
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Error al actualizar estado de bloqueo.');
    return data;
};