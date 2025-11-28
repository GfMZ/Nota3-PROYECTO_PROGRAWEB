import React, { useState, useEffect, useCallback } from "react";
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
// Importamos el servicio que maneja las llamadas a la API
import { fetchCategories, fetchProducts } from '../services/productService'; 



const organizeProducts = (products) => {
    return products.reduce((acc, product) => {

        const categoryName = product.category?.name || 'General'; 
        
        if (!acc[categoryName]) {
            acc[categoryName] = [];
        }
        acc[categoryName].push({
            
            id: product._id, 
            nombre: product.name, 
            precio: product.price, 
            imagen: product.imageUrl,
            category: categoryName
        });
        return acc;
    }, {});
};


export default function Productos() {
    const { addToCart } = useCart();
    
    
    const [productosPorCategoria, setProductosPorCategoria] = useState({}); 
    const [categorias, setCategorias] = useState([]); 
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    
    
    const [categoriaActiva, setCategoriaActiva] = useState(null);
    const [addedProductId, setAddedProductId] = useState(null);

    const navigate = useNavigate();
    
    
    const fetchCatalogData = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            
            const [productsData, categoriesData] = await Promise.all([
                fetchProducts(),
                fetchCategories()
            ]);

            
            const organized = organizeProducts(productsData);
            const categoryNames = categoriesData.map(cat => cat.name);

            setProductosPorCategoria(organized);
            setCategorias(categoryNames);

            
            if (categoryNames.length > 0 && !categoriaActiva) {
                setCategoriaActiva(categoryNames[0]);
            }
            
        } catch (err) {
            console.error("Error al cargar el catálogo:", err);
            setError("No se pudo cargar el catálogo. Verifique el backend.");
        } finally {
            setIsLoading(false);
        }
    }, [categoriaActiva]); 

    
    useEffect(() => {
        fetchCatalogData();
    }, [fetchCatalogData]);

    const handleProductAdd = (productToAdd) => {
        if (addedProductId === productToAdd.id) return;

        const cartProduct = {
            id: productToAdd.id, 
            productId: productToAdd.id, 
            name: productToAdd.nombre,
            price: productToAdd.precio,
            imageUrl: productToAdd.imagen,
            quantity: 1,
        };

        addToCart(cartProduct);
        setAddedProductId(productToAdd.id);

        setTimeout(() => {
            setAddedProductId(null);
        }, 2000);
    };
    
    
    if (isLoading) {
        return <div style={{ textAlign: "center", padding: "4rem" }}>Cargando catálogo dinámico...</div>;
    }
    
    
    if (error) {
        return <div style={{ textAlign: "center", padding: "4rem", color: "red" }}>{error}</div>;
    }

    
    const activeProducts = productosPorCategoria[categoriaActiva] || [];
    if (categorias.length === 0) {
        return <div style={{ textAlign: "center", padding: "4rem" }}>No hay categorías. Agregue productos desde el panel de administrador.</div>;
    }


    return (
        <section style={{ display: "flex", padding: "2rem" }}>
            <aside
                style={{
                    width: "220px",
                    borderRight: "1px solid #ddd",
                    paddingRight: "1rem",
                }}
            >
                <h3 style={{ marginBottom: "1rem" }}>Categorías</h3>
                <ul style={{ listStyle: "none", padding: 0 }}>
                    {categorias.map((cat) => (
                        <li key={cat} style={{ marginBottom: "10px" }}>
                            <button
                                onClick={() => setCategoriaActiva(cat)}
                                style={{
                                    width: "100%",
                                    backgroundColor: categoriaActiva === cat ? "#4CAF50" : "#fff",
                                    color: categoriaActiva === cat ? "#fff" : "#333",
                                    border: "1px solid #4CAF50",
                                    borderRadius: "6px",
                                    padding: "8px 12px",
                                    cursor: "pointer",
                                    fontWeight: "bold",
                                    textAlign: "left",
                                }}
                            >
                                {cat}
                            </button>
                        </li>
                    ))}
                </ul>
            </aside>

            <div style={{ flex: 1, paddingLeft: "2rem" }}>
                <h2 style={{ marginBottom: "1.5rem" }}>{categoriaActiva}</h2>
                
                {activeProducts.length === 0 ? (
                    <p>No hay productos en la categoría "{categoriaActiva}".</p>
                ) : (
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                            gap: "1.5rem",
                        }}
                    >
                        {activeProducts.map((p) => {
                            const isAdded = addedProductId === p.id;
                            return (
                                <div
                                    key={p.id}
                                    style={{
                                        border: "1px solid #ddd",
                                        borderRadius: "12px",
                                        padding: "1rem",
                                        textAlign: "center",
                                        backgroundColor: "#fff",
                                        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                                    }}
                                >
                                    <img
                                      src={p.imagen}
                                      alt={p.nombre}
                                      style={{
                                        width: "100%",
                                        height: "220px",
                                        objectFit: "cover",
                                        borderRadius: "8px",
                                        marginBottom: "10px",
                                      }}
                                    />
                                    <h4 style={{ marginBottom: "5px" }}>{p.nombre}</h4>
                                    <p style={{ color: "#666", marginBottom: "5px" }}>
                                      {p.category}
                                    </p>
                                    <p style={{ fontWeight: "bold", color: "#2E7D32" }}>
                                      S/{p.precio}
                                    </p>
                                    <button 
                                      className="btn-add" 
                                      onClick={() => handleProductAdd(p)}
                                      disabled={isAdded}
                                      style={{ 
                                        backgroundColor: isAdded ? '#6c757d' : '',
                                        cursor: isAdded ? 'not-allowed' : 'pointer'
                                      }}
                                    >
                                      {isAdded ? '¡Producto agregado!' : 'AGREGAR'}
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </section>
    );
}