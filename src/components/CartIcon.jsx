import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CartIcon = () => {
  const navigate = useNavigate();
  const { totalItems } = useCart();

  const handleCartClick = () => {
    navigate('/cart');
  };
  
  return (
    <button
      onClick={handleCartClick}
      className="relative p-2 text-gray-700 hover:text-orange-600 transition-colors duration-200"
      aria-label="Shopping cart"
    >
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2 8h15M9 19a2 2 0 100 4 2 2 0 000-4zm8 0a2 2 0 100 4 2 2 0 000-4z"
        />
      </svg>
      
      {totalItems > 0 && (
        <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold">
          {totalItems > 99 ? '99+' : totalItems}
        </span>
      )}
    </button>
  );
};

export default CartIcon;