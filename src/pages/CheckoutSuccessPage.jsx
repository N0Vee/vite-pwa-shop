import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const CheckoutSuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const orderData = location.state;

  useEffect(() => {
    // If no order data is available (direct navigation), redirect to home
    if (!orderData) {
      navigate('/');
    }
  }, [orderData, navigate]);

  // If no order data, don't render anything (will redirect)
  if (!orderData) {
    return null;
  }

  const { itemCount, total } = orderData;

  const handleContinueShopping = () => {
    navigate('/');
  };

  const handleViewOrders = () => {
    // Future feature - navigate to orders page
    navigate('/');
  };

  // Generate a mock order number
  const orderNumber = `PWA-${Date.now().toString().slice(-6)}`;

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Success Header */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Success Icon and Message */}
            <div className="bg-gradient-to-r from-green-500 to-green-600 p-8 text-center">
              <div className="mb-4">
                <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h1 className="text-3xl font-bold text-white mb-2">Order Confirmed!</h1>
                <p className="text-green-100 text-lg">
                  Thank you for your purchase. Your order has been successfully placed.
                </p>
              </div>
            </div>

            {/* Order Details */}
            <div className="p-8">
              <div className="border-b border-gray-200 pb-6 mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Details</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm text-gray-600 mb-1">Order Number</div>
                    <div className="text-lg font-semibold text-gray-900">{orderNumber}</div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm text-gray-600 mb-1">Order Date</div>
                    <div className="text-lg font-semibold text-gray-900">
                      {new Date().toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm text-gray-600 mb-1">Items Ordered</div>
                    <div className="text-lg font-semibold text-gray-900">{itemCount} items</div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm text-gray-600 mb-1">Total Amount</div>
                    <div className="text-lg font-semibold text-orange-600">
                      ${(total + (total >= 50 ? 0 : 5.99)).toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>

              {/* What happens next */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">What happens next?</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center mt-1">
                      <span className="text-xs font-semibold text-orange-600">1</span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">Order Confirmation</div>
                      <div className="text-sm text-gray-600">You&apos;ll receive an email confirmation shortly with your order details.</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center mt-1">
                      <span className="text-xs font-semibold text-orange-600">2</span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">Processing</div>
                      <div className="text-sm text-gray-600">We&apos;ll prepare your order and send you tracking information.</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center mt-1">
                      <span className="text-xs font-semibold text-orange-600">3</span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">Delivery</div>
                      <div className="text-sm text-gray-600">
                        {total >= 50 
                          ? 'Your order qualifies for free shipping and will arrive in 2-3 business days.'
                          : 'Your order will arrive in 3-5 business days.'
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Customer Support */}
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-8">
                <div className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-orange-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <div className="font-medium text-orange-900 mb-1">Need Help?</div>
                    <div className="text-sm text-orange-800">
                      If you have any questions about your order, please contact our customer support team. 
                      Your order number is <strong>{orderNumber}</strong>.
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={handleContinueShopping}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-200"
                >
                  Continue Shopping
                </button>
                
                <button
                  onClick={handleViewOrders}
                  className="w-full border border-gray-300 text-gray-700 hover:bg-gray-50 py-3 px-6 rounded-lg font-semibold transition-colors duration-200"
                >
                  View Orders
                </button>
              </div>

              {/* Newsletter Signup */}
              <div className="mt-8 pt-8 border-t border-gray-200 text-center">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Stay Updated</h4>
                <p className="text-gray-600 mb-4">
                  Subscribe to our newsletter for exclusive deals and new arrivals!
                </p>
                <div className="max-w-md mx-auto flex">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                  <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-r-lg font-semibold transition-colors duration-200">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSuccessPage;