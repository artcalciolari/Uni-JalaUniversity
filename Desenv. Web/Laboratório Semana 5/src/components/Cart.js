import React, { useMemo } from 'react';
import { useAppSelector } from '../store/hooks';
import CartItem from './CartItem';

const Cart = React.memo(() => {
  console.log('Cart rendered');

  const cart = useAppSelector(state => state.cart.items);
  const user = useAppSelector(state => state.user);

  // Otimização: useMemo para cache do cálculo do total
  const total = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.price, 0);
  }, [cart]);

  return (
    <div className="card">
      <h2>Shopping Cart</h2>
      <p>User: {user.name}</p>
      
      {cart.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <>
          {cart.map(item => (
            <CartItem 
              key={item.id}
              item={item}
            />
          ))}
          <div style={{ marginTop: '10px', fontWeight: 'bold' }}>
            Total: ${total}
          </div>
        </>
      )}
    </div>
  );
});

export default Cart;
