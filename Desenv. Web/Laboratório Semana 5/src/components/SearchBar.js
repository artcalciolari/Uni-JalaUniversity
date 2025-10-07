import React, { useCallback } from 'react';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { setSearchTerm } from '../store/slices/filterSlice';

const SearchBar = React.memo(() => {
  console.log('SearchBar rendered');

  const dispatch = useAppDispatch();
  const searchTerm = useAppSelector(state => state.filter.searchTerm);

  // Otimização: useCallback para cache da função de mudança
  const handleChange = useCallback((e) => {
    dispatch(setSearchTerm(e.target.value));
  }, [dispatch]);

  return (
    <input
      type="text"
      placeholder="Search products..."
      value={searchTerm}
      onChange={handleChange}
    />
  );
});

export default SearchBar;
