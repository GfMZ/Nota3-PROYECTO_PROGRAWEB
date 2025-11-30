
const API_BASE_URL = 'http://localhost:4000/api';


export const fetchCategories = async () => {
    const response = await fetch(`${API_BASE_URL}/categories`);
    if (!response.ok) throw new Error('Error al cargar categorías.');
    return response.json();
};


export const fetchProducts = async () => {
    const response = await fetch(`${API_BASE_URL}/products`);
    if (!response.ok) throw new Error('Error al cargar productos.');
    return response.json();
};


export const fetchProductById = async (productId) => {
    const response = await fetch(`${API_BASE_URL}/products/${productId}`);
    if (response.status === 404) throw new Error('Producto no encontrado.');
    if (!response.ok) throw new Error('Error al obtener detalle del producto.');
    return response.json();
};