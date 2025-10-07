import React, { useMemo } from 'react';
import { useAppSelector } from '../store/hooks';
import ProductCard from './ProductCard';

const ProductList = React.memo(({ products }) => {
  console.log('ProductList rendered');

  const searchTerm = useAppSelector(state => state.filter.searchTerm);
  const selectedCategory = useAppSelector(state => state.filter.selectedCategory);

  // Otimização: useMemo para cache da operação de filtro custosa
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      
      // Removemos a operação custosa desnecessária
      return matchesSearch && matchesCategory;
    });
  }, [products, searchTerm, selectedCategory]);

  return (
    <div className="product-grid">
      {filteredProducts.map(product => (
        <ProductCard 
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
});

export default ProductList;
