import React from 'react';
import { useParams } from 'react-router-dom';
import ProductDetailView from '../components/ProductDetailView';
import SimilarProducts from '../components/SimilarProducts';

const allProducts = [
  { id: 1, name: 'God Of War Ragnarok', price: 149.90, category: 'Videojuegos', brand: 'Sony', series: 'God of War', imageUrl: '/src/img/gow.jpg' },
  { id: 2, name: 'PlayStation 5', price: 2299.90, category: 'Consolas', brand: 'Sony', series: 'PlayStation', imageUrl: '/src/img/play5.jpg' },
  { id: 3, name: 'Mouse Logitech G502', price: 335.90, category: 'Periféricos', brand: 'Logitech', series: 'G Series', imageUrl: '/src/img/G502.JPG' },
  { id: 4, name: 'Funko Pop Spiderman', price: 59.90, category: 'Coleccionables', brand: 'Funko', series: 'Marvel', imageUrl: '/src/img/spidermanfunko.jpg' },
  { id: 5, name: 'The Last of Us Part II', price: 119.90, category: 'Videojuegos', brand: 'Sony', series: 'The Last of Us', imageUrl: '/src/img/tlou2.jpg' },
  { id: 6, name: 'Consola Xbox Series X', price: 2199.90, category: 'Consolas', brand: 'Microsoft', series: 'Xbox', imageUrl: '/src/img/consolas.jpg'},
];

const pageStyles = {
  maxWidth: '1200px',
  margin: '32px auto',
  padding: '0 16px',
};

export default function ProductDetailPage() {
  const { productId } = useParams();
  const product = allProducts.find(p => p.id === parseInt(productId));
  const similarProducts = allProducts.filter(p => p.category === product?.category && p.id !== product?.id);

  if (!product) {
    return <div style={pageStyles}><h2>Producto no encontrado</h2></div>;
  }

  return (
    <div style={pageStyles}>
      <ProductDetailView product={product} />
      <SimilarProducts products={similarProducts} />
    </div>
  );
}