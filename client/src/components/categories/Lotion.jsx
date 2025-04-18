import { Link } from 'react-router-dom';

const Lotion = ({ products = [] }) => {
  return (
    <div className="w-full max-w-7xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Lotions</h2>
        <Link to="/category/lotion" className="text-primary-blue hover:underline">
          View All
        </Link>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product._id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <Link to={`/product/${product.slug.current}`}>
                <div className="h-48 overflow-hidden">
                  <img 
                    src={product.imageUrl} 
                    alt={product.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-3">
                  <h3 className="font-medium text-sm truncate">{product.title}</h3>
                  <div className="flex justify-between items-center mt-2">
                    <span className="font-bold text-primary-blue">₦{product.price.toLocaleString()}</span>
                    {product.availability ? (
                      <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded">In Stock</span>
                    ) : (
                      <span className="text-xs text-red-600 bg-red-100 px-2 py-1 rounded">Out of Stock</span>
                    )}
                  </div>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-8 text-gray-500">
            No lotion products available at the moment.
          </div>
        )}
      </div>
    </div>
  );
};

export default Lotion;
