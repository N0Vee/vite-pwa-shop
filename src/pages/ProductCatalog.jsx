import { useState, useEffect } from 'react';
import { products, categories, priceRanges } from '../data/products';
import ProductCard from '../components/ProductCard';
import SearchAndFilters from '../components/SearchAndFilters';

const ProductCatalog = () => {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedPriceRange, setSelectedPriceRange] = useState(priceRanges[0]);
  const [sortBy, setSortBy] = useState('featured');
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);


  // Filter and sort products
  useEffect(() => {
    let filtered = [...products];

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filter by category
    if (selectedCategory !== 'All Categories') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filter by price range
    if (selectedPriceRange.label !== 'All Prices') {
      filtered = filtered.filter(product => 
        product.price >= selectedPriceRange.min && 
        product.price <= selectedPriceRange.max
      );
    }

    // Sort products
    switch (sortBy) {
      case 'name-asc':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating-desc':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => b.id - a.id);
        break;
      case 'featured':
      default:
        filtered.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return b.rating - a.rating;
        });
        break;
    }

    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, selectedPriceRange, sortBy]);





  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All Categories');
    setSelectedPriceRange(priceRanges[0]);
    setSortBy('featured');
  };

  return (
    <div className="bg-gradient-to-br from-orange-50 to-white">
      <div className="container mx-auto px-4 py-4 md:py-8">

        {/* Search and Filters Toggle */}
        <div className="mb-6">
          <button
            onClick={() => setIsFiltersOpen(!isFiltersOpen)}
            className="flex items-center justify-between w-full bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-200"
          >
            <div className="flex items-center space-x-3">
              <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z" />
              </svg>
              <span className="text-lg font-semibold text-gray-900">
                Search & Filters
              </span>
              {(searchTerm || selectedCategory !== 'All Categories' || selectedPriceRange.label !== 'All Prices' || sortBy !== 'featured') && (
                <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs font-medium">
                  Active
                </span>
              )}
            </div>
            <svg
              className={`w-5 h-5 text-gray-500 transform transition-transform duration-200 ${
                isFiltersOpen ? 'rotate-180' : ''
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Collapsible Filters */}
          <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isFiltersOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}>
            <div className="mt-4">
              <SearchAndFilters
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                selectedPriceRange={selectedPriceRange}
                setSelectedPriceRange={setSelectedPriceRange}
                sortBy={sortBy}
                setSortBy={setSortBy}
                categories={categories}
                priceRanges={priceRanges}
                onClearFilters={handleClearFilters}
              />
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-gray-600">
            Showing {filteredProducts.length} of {products.length} products
          </div>
          <div className="text-sm text-gray-500">
            {searchTerm && (
              <span>Search results for &ldquo;{searchTerm}&rdquo;</span>
            )}
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="mb-4">
              <svg
                className="mx-auto h-16 w-16 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-500 mb-4">
              Try adjusting your search or filter criteria
            </p>
            <button
              onClick={handleClearFilters}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Clear all filters
            </button>
          </div>
        )}

        {/* Featured Categories Banner */}
        {!searchTerm && selectedCategory === 'All Categories' && (
          <div className="mt-8 md:mt-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-6 md:p-8 text-white" data-section="categories">
            <div className="text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Shop by Category</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4 mt-6 md:mt-8">
                {categories.slice(1).map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg p-3 md:p-4 transition-all duration-200 backdrop-blur-sm"
                  >
                    <div className="text-xs md:text-sm font-medium">{category}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>


    </div>
  );
};

export default ProductCatalog;