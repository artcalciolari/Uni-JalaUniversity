import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Componente que rola automaticamente para o topo da página
 * quando a rota muda. Útil para melhorar UX em aplicações SPA
 * onde a navegação manteria a posição de scroll anterior.
 * 
 * @returns `null` - Este componente não renderiza nada visível
 * 
 * @example
 * ```tsx
 * // No App.tsx, adicione dentro do Router
 * import ScrollToTop from './components/ScrollToTop';
 * 
 * function App() {
 *   return (
 *     <BrowserRouter>
 *       <ScrollToTop />
 *       <Routes>
 *         <Route path="/" element={<HomePage />} />
 *         <Route path="/book/:id" element={<BookDetails />} />
 *       </Routes>
 *     </BrowserRouter>
 *   );
 * }
 * ```
 * 
 * @category Components
 */
function ScrollToTop(): null 
{
  const { pathname } = useLocation();

  useEffect(() => 
  {
    /**
     * Rola suavemente para o topo da página.
     * Executado sempre que o pathname da rota muda.
     */
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, [pathname]);

  return null;
}

export default ScrollToTop;