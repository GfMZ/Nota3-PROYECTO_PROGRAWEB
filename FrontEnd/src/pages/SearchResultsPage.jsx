import React, { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import FilterSidebar from '../components/FilterSidebar';
import SortControls from '../components/SortControls';
import ProductList from '../components/ProductList';
// Importamos los servicios reales
import { fetchProducts, fetchCategories } from '../services/productService';

const pageStyles = {
  display: 'flex',
  gap: '24px',
  maxWidth: '1200px',
  margin: '32px auto',
  padding: '0 16px',
};

const mainContentStyles = { flex: 1 };

export default function SearchResultsPage() {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('q') || '';
  
  // Estados para datos reales
  const [allProducts, setAllProducts] = useState([]);
  const [categoryNames, setCategoryNames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [sortOrder, setSortOrder] = useState('default');

  // Cargar datos al montar
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const [products, categories] = await Promise.all([
          fetchProducts(),
          fetchCategories()
        ]);
        setAllProducts(products);
        setCategoryNames(categories.map(c => c.name)); // Solo necesitamos los nombres para el filtro
      } catch (error) {
        console.error("Error cargando búsqueda:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  // Filtrado
  const filteredProducts = useMemo(() => {
    let products = allProducts.filter(p =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      (p.description && p.description.toLowerCase().includes(query.toLowerCase()))
    );

    if (selectedCategory) {
      // Filtramos por el nombre de la categoría poblada
      products = products.filter(p => p.category?.name === selectedCategory);
    }
    return products;
  }, [query, selectedCategory, allProducts]);

  // Ordenamiento y Mapeo
  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts];
    switch (sortOrder) {
      case 'price-asc': sorted.sort((a, b) => a.price - b.price); break;
      case 'price-desc': sorted.sort((a, b) => b.price - a.price); break;
      case 'name-asc': sorted.sort((a, b) => a.name.localeCompare(b.name)); break;
      case 'name-desc': sorted.sort((a, b) => b.name.localeCompare(a.name)); break;
      default: break;
    }
    
    // Mapear _id a id para los componentes hijos
    return sorted.map(p => ({
        ...p,
        id: p._id,
        category: p.category?.name || 'General'
    }));
  }, [filteredProducts, sortOrder]);

  if (isLoading) return <div style={{textAlign:'center', padding:'40px'}}>Buscando...</div>;

  return (
    <div style={pageStyles}>
      <FilterSidebar
        categories={categoryNames}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      <main style={mainContentStyles}>
        <h2>Resultados para "{query}" ({sortedProducts.length})</h2>
        <SortControls onSortChange={setSortOrder} />
        <ProductList products={sortedProducts} />
      </main>
    </div>
  );
}