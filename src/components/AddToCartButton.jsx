/* eslint-disable react/prop-types */
import { useCart } from '../context/CartContext';

const AddToCartButton = ({ product, quantity = 1, className = "", disabled = false }) => {
  const { addToCart, isInCart, getItemQuantity } = useCart();
  
  const handleAddToCart = () => {
    if (!disabled && product.inStock) {
      addToCart(product, quantity);
    }
  };
  
  const itemInCart = isInCart(product.id);
  const cartQuantity = getItemQuantity(product.id);
  
  const isDisabled = disabled || !product.inStock;
  
  return (
    <button
      onClick={handleAddToCart}
      disabled={isDisabled}
      className={`
        ${className}
        ${isDisabled 
          ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
          : itemInCart 
            ? 'bg-green-500 hover:bg-green-600 text-white' 
            : 'bg-orange-500 hover:bg-orange-600 text-white'
        }
        transition-colors duration-200 font-semibold rounded-lg
      `}
    >
      {isDisabled ? (
        'Out of Stock'
      ) : itemInCart ? (
        `In Cart (${cartQuantity})`
      ) : (
        'Add to Cart'
      )}
    </button>
  );
};

export default AddToCartButton;