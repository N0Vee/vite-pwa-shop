import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { totalItems } = useCart();

  const navItems = [
    {
      id: 'home',
      label: 'Home',
      path: '/',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    },
    {
      id: 'categories',
      label: 'Categories',
      path: '/',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      )
    },
    {
      id: 'search',
      label: 'Search',
      path: '/',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      )
    },
    {
      id: 'cart',
      label: 'Cart',
      path: '/cart',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2 8h15M9 19a2 2 0 100 4 2 2 0 000-4zm8 0a2 2 0 100 4 2 2 0 000-4z" />
        </svg>
      ),
      badge: totalItems > 0 ? totalItems : null
    },
    {
      id: 'menu',
      label: 'Menu',
      path: '/',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      )
    }
  ];

  const handleNavigation = (item) => {
    if (item.id === 'search') {
      // Scroll to top and focus search (will implement search focus)
      navigate('/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (item.id === 'categories' || item.id === 'menu') {
      // Navigate to home and scroll to categories section
      navigate('/');
      setTimeout(() => {
        const categoriesSection = document.querySelector('[data-section="categories"]');
        if (categoriesSection) {
          categoriesSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      navigate(item.path);
    }
  };

  const isActive = (item) => {
    if (item.id === 'home' && location.pathname === '/') return true;
    if (item.id === 'cart' && location.pathname === '/cart') return true;
    return false;
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-1 z-50 md:hidden shadow-lg">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {navItems.map((item) => {
          const active = isActive(item);
          return (
            <button
              key={item.id}
              onClick={() => handleNavigation(item)}
              className={`flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-all duration-200 relative min-w-[60px] ${
                active
                  ? 'text-orange-600 bg-orange-50'
                  : 'text-gray-600 hover:text-orange-600 hover:bg-gray-50'
              }`}
              aria-label={item.label}
            >
              <div className="relative">
                {item.icon}
                {item.badge && (
                  <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold">
                    {item.badge > 99 ? '99+' : item.badge}
                  </span>
                )}
              </div>
              <span className="text-xs mt-1 font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavigation;