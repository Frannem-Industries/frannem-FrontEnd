import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { sanityClient } from '../utils/sanity';
import Lazy from '../components/ui/Lazy';

const CategoryDisplay = () => {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      setIsLoading(true);
      try {
        // First, fetch the category details
        const categoryQuery = `*[_type == "category" && slug.current == $slug][0]{
          _id,
          name,
          description
        }`;
        
        const categoryData = await sanityClient.fetch(categoryQuery, { slug: id });
        
        if (!categoryData) {
          throw new Error("Category not found");
        }
        
        setCategory(categoryData);
        
const productsQuery = `*[_type == "product" && category->slug.current == $slug]{
  _id,
  title,
  slug,
  price,
  availability,
  featured,
  "imageUrl": mainImage.asset->url
}`;

        
        const productsData = await sanityClient.fetch(productsQuery, { slug: id });
        setProducts(productsData);
      } catch (err) {
        console.error("Error fetching category products:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    
    if (id) {
      fetchCategoryProducts();
    }
  }, [id]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Lazy items={8} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <Icon icon="mdi:alert-circle-outline" className="text-5xl text-red-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Category Not Found</h2>
        <p className="text-gray-600 mb-6">{error}</p>
        <Link
          to="/"
          className="inline-flex items-center px-4 py-2 bg-primary-blue text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <Icon icon="mdi:arrow-left" className="mr-2" />
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex mb-6 text-sm">
        <ol className="flex items-center space-x-2">
          <li>
            <Link to="/" className="text-gray-500 hover:text-primary-blue">Home</Link>
          </li>
          <li className="flex items-center">
            <Icon icon="mdi:chevron-right" className="text-gray-400 mx-1" />
            <span className="text-gray-800 font-medium">{category?.name || id}</span>
          </li>
        </ol>
      </nav>

      {/* Category Header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{category?.name || id}</h1>
        {category?.description && (
          <p className="text-gray-600">{category.description}</p>
        )}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product._id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <Link to={`/product/${product.slug.current}`}>
                <div className="relative h-48 overflow-hidden">
                  {product.featured && (
                    <div className="absolute top-2 left-2 bg-primary-blue text-white text-xs font-bold px-2 py-1 rounded-full z-10">
                      Featured
                    </div>
                  )}
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
          <div className="col-span-full text-center py-16 text-gray-500">
            <Icon icon="mdi:package-variant" className="text-5xl text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium mb-2">No Products Found</h3>
            <p>There are no products available in this category at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryDisplay;
