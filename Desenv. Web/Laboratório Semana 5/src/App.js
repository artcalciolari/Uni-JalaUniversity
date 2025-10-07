import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import './App.css';
import Header from './components/Header';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import UserProfile from './components/UserProfile';
import { useAppSelector } from './store/hooks';

const AppContent = () => {
  const [products] = useState([
    { id: 1, name: 'Laptop', price: 999, category: 'Electronics' },
    { id: 2, name: 'Phone', price: 699, category: 'Electronics' },
    { id: 3, name: 'Book', price: 29, category: 'Education' },
    { id: 4, name: 'Headphones', price: 199, category: 'Electronics' },
    { id: 5, name: 'Tablet', price: 399, category: 'Electronics' }
  ]);

  const theme = useAppSelector(state => state.theme.currentTheme);

  return (
    <div className={`app ${theme}`}>
      <Header />
      
      <div className="main-content">
        <ProductList products={products} />
        
        <div className="sidebar">
          <Cart />
          <UserProfile />
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;
