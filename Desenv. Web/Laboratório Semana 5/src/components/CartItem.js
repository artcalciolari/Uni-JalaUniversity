import React, { useCallback } from 'react';
import { useAppDispatch } from '../store/hooks';
import { removeFromCart } from '../store/slices/cartSlice';

const CartItem = React.memo(({ item }) => {
  console.log(`CartItem ${item.name} rendered`);

  const dispatch = useAppDispatch();

  // Otimização: useCallback para cache da função de remoção
  const handleRemove = useCallback(() => {
    dispatch(removeFromCart(item.id));
  }, [dispatch, item.id]);

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center',
      padding: '10px',
      border: '1px solid #ddd',
      margin: '5px 0'
    }}>
      <div>
        <strong>{item.name}</strong>
        <div>${item.price}</div>
      </div>
      <button onClick={handleRemove}>
        Remove
      </button>
    </div>
  );
});

export default CartItem;
