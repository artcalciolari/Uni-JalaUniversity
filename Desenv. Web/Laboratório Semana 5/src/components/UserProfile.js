import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { updateUser } from '../store/slices/userSlice';

const UserProfile = React.memo(() => {
  console.log('UserProfile rendered');
  
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user);
  const cart = useAppSelector(state => state.cart.items);
  
  const [isEditing, setIsEditing] = useState(false);
  const [tempUser, setTempUser] = useState(user);

  // Sincronizar tempUser quando user mudar
  useEffect(() => {
    setTempUser(user);
  }, [user]);

  // Otimização: useMemo para cache das estatísticas custosas
  const stats = useMemo(() => {
    let operations = 0;
    for (let i = 0; i < 50000; i++) {
      operations += cart.length * Math.random();
    }
    
    return {
      totalItems: cart.length,
      totalValue: cart.reduce((sum, item) => sum + item.price, 0),
      operations: operations.toFixed(2)
    };
  }, [cart]);

  // Otimização: useCallback para cache das funções
  const handleSave = useCallback(() => {
    dispatch(updateUser(tempUser));
    setIsEditing(false);
  }, [dispatch, tempUser]);

  const handleCancel = useCallback(() => {
    setTempUser(user);
    setIsEditing(false);
  }, [user]);

  const handleEdit = useCallback(() => {
    setIsEditing(true);
  }, []);

  const handleNameChange = useCallback((e) => {
    setTempUser(prev => ({...prev, name: e.target.value}));
  }, []);

  const handleEmailChange = useCallback((e) => {
    setTempUser(prev => ({...prev, email: e.target.value}));
  }, []);

  return (
    <div className="card">
      <h2>User Profile</h2>
      
      {isEditing ? (
        <div>
          <input
            value={tempUser.name}
            onChange={handleNameChange}
            placeholder="Name"
          />
          <input
            value={tempUser.email}
            onChange={handleEmailChange}
            placeholder="Email"
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      ) : (
        <div>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <button onClick={handleEdit}>Edit</button>
        </div>
      )}
      
      <div style={{ marginTop: '20px', fontSize: '14px' }}>
        <h3>Stats</h3>
        <p>Items in cart: {stats.totalItems}</p>
        <p>Cart value: ${stats.totalValue}</p>
        <p style={{ fontSize: '10px', opacity: 0.5 }}>
          Operations: {stats.operations}
        </p>
      </div>
    </div>
  );
});

export default UserProfile;
