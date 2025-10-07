import React, { useCallback, useMemo } from 'react';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { setSelectedCategory } from '../store/slices/filterSlice';

const CategoryFilter = React.memo(() => {
  console.log('CategoryFilter rendered');

  const dispatch = useAppDispatch();
  const selectedCategory = useAppSelector(state => state.filter.selectedCategory);

  // Otimização: useMemo para cache do array de categorias
  const categories = useMemo(() => ['All', 'Electronics', 'Education'], []);

  // Otimização: useCallback para cache da função de mudança
  const handleChange = useCallback((e) => {
    dispatch(setSelectedCategory(e.target.value));
  }, [dispatch]);

  return (
    <select 
      value={selectedCategory} 
      onChange={handleChange}
    >
      {categories.map(category => (
        <option key={category} value={category}>
          {category}
        </option>
      ))}
    </select>
  );
});

export default CategoryFilter;
