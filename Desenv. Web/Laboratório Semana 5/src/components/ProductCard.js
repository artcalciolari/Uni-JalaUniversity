import React, { useMemo, useCallback } from 'react';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { addToCart } from '../store/slices/cartSlice';

const ProductCard = React.memo(({ product }) => {
  console.log(`ProductCard ${product.name} rendered`);

  const dispatch = useAppDispatch();
  const cart = useAppSelector(state => state.cart.items);

  // Otimização: useMemo para cache da verificação de item no carrinho
  const isInCart = useMemo(() => {
    return cart.some(item => item.id === product.id);
  }, [cart, product.id]);
  
  // Otimização: useMemo para cache do cálculo custoso
  const calculatedValue = useMemo(() => {
    let result = 0;
    for (let i = 0; i < 10000; i++) {
      result += product.price * Math.random();
    }
    return result;
  }, [product.price]); // Só recalcula se o preço mudar

  // Otimização: useCallback para cache da função de adicionar ao carrinho
  const handleAddToCart = useCallback(() => {
    dispatch(addToCart(product));
  }, [dispatch, product]);

  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <p>Price: ${product.price}</p>
      <p>Category: {product.category}</p>
      <p style={{ fontSize: '10px', opacity: 0.5 }}>
        Calc: {calculatedValue.toFixed(2)}
      </p>
      <button 
        onClick={handleAddToCart}
        disabled={isInCart}
      >
        {isInCart ? 'In Cart' : 'Add to Cart'}
      </button>
    </div>
  );
});

export default ProductCard;
