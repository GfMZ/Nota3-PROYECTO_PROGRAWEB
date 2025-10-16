import React, { useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import FilterSidebar from '../components/FilterSidebar';
import SortControls from '../components/SortControls';
import ProductList from '../components/ProductList';


const allProducts = [
  { id: 1, name: 'God Of War Ragnarok', price: 149.90, category: 'Videojuegos', brand: 'Sony', series: 'God of War', imageUrl: '/src/img/gow.jpg' },
  { id: 2, name: 'PlayStation 5', price: 2299.90, category: 'Consolas', brand: 'Sony', series: 'PlayStation', imageUrl: '/src/img/play5.jpg' },
  { id: 3, name: 'Mouse Logitech G502', price: 335.90, category: 'Periféricos', brand: 'Logitech', series: 'G Series', imageUrl: '/src/img/G502.JPG' },
  { id: 4, name: 'Funko Pop Spiderman', price: 59.90, category: 'Coleccionables', brand: 'Funko', series: 'Marvel', imageUrl: '/src/img/spidermanfunko.jpg' },
  { id: 5, name: 'The Last of Us Part II', price: 119.90, category: 'Videojuegos', brand: 'Sony', series: 'The Last of Us', imageUrl: '/src/img/tlou2.jpg' },
  { id: 6, name: 'Consola Xbox Series X', price: 2199.90, category: 'Consolas', brand: 'Microsoft', series: 'Xbox', imageUrl: '/src/img/consolas.jpg'},
];

const allCategories = ['Videojuegos', 'Consolas', 'Periféricos', 'Coleccionables'];

const pageStyles = {
  display: 'flex',
  gap: '24px',
  maxWidth: '1200px',
  margin: '32px auto',
  padding: '0 16px',
};

const mainContentStyles = {
  flex: 1,
};

export default function SearchResultsPage() {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('q') || '';
  
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [sortOrder, setSortOrder] = useState('default');

  const filteredProducts = useMemo(() => {
    let products = allProducts.filter(p =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.brand.toLowerCase().includes(query.toLowerCase()) ||
      p.series.toLowerCase().includes(query.toLowerCase())
    );

    if (selectedCategory) {
      products = products.filter(p => p.category === selectedCategory);
    }
    return products;
  }, [query, selectedCategory]);

  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts];
    switch (sortOrder) {
      case 'price-asc':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        sorted.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }
    return sorted;
  }, [filteredProducts, sortOrder]);

  return (
    <div style={pageStyles}>
      <FilterSidebar
        categories={allCategories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      <main style={mainContentStyles}>
        <h2>Resultados para "{query}"</h2>
        <SortControls onSortChange={setSortOrder} />
        <ProductList products={sortedProducts} />
      </main>
    </div>
  );
}