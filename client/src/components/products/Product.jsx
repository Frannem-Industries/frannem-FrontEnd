import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { sanityClient } from "../../utils/sanity";
import Lazy from "../ui/Lazy";
import SEO from "../SEO/SEO"; // Import the new SEO component

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [activeTab, setActiveTab] = useState("description");
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [allImages, setAllImages] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      try {
        // Fetch the product by slug
        const query = `*[_type == "product" && slug.current == $slug][0]{
          _id,
          title,
          slug,
          price,
          description,
          availability,
          featured,
          quantity,
          "imageUrl": mainImage.asset->url,
          "additionalImages": additionalImages[]{
            "url": asset->url
          },
          "category": category->name,
          "categorySlug": category->slug.current
        }`;
        
        const product = await sanityClient.fetch(query, { slug: id });
        
        if (!product) {
          throw new Error("Product not found");
        }
        
        setProduct(product);
        
        // Combine main image with additional images
        const images = [
          { url: product.imageUrl },
          ...(product.additionalImages || [])
        ];
        setAllImages(images);
        
        // Fetch related products from the same category
        const relatedQuery = `*[_type == "product" && category->slug.current == $categorySlug && slug.current != $slug][0...4]{
          _id,
          title,
          slug,
          price,
          availability,
          featured,
          "imageUrl": mainImage.asset->url
        }`;
        
        const related = await sanityClient.fetch(relatedQuery, {
          categorySlug: product.categorySlug,
          slug: id
        });
        
        setRelatedProducts(related);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
    
    // Reset scroll position when product changes
    window.scrollTo(0, 0);
    setActiveImageIndex(0); // Reset active image when product changes
  }, [id]);

  const handleQuantityChange = (value) => {
    const newQuantity = Math.max(1, Math.min(product?.quantity || 10, quantity + value));
    setQuantity(newQuantity);
  };

  const handleAddToCart = () => {
    // Implement cart functionality here
    console.log("Added to cart:", { ...product, quantity });
    // Show success message or update cart state
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Lazy items={1} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <SEO title="Product Not Found" description="The requested product could not be found." />
        <Icon icon="mdi:alert-circle-outline" className="text-5xl text-red-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Product Not Found</h2>
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

  if (!product) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* SEO Component */}
      <SEO
        title={product.title}
        description={product.description}
        image={allImages[0]?.url}
        type="product"
        url={`/product/${product.slug.current}`}
        canonicalUrl={`/product/${product.slug.current}`}
      />

      {/* Breadcrumb */}
      <nav className="flex mb-6 text-sm">
        <ol className="flex items-center space-x-2">
          <li>
            <Link to="/" className="text-gray-500 hover:text-primary-blue">Home</Link>
          </li>
          <li className="flex items-center">
            <Icon icon="mdi:chevron-right" className="text-gray-400 mx-1" />
            <Link to={`/category/${product.categorySlug}`} className="text-gray-500 hover:text-primary-blue">
              {product.category}
            </Link>
          </li>
          <li className="flex items-center">
            <Icon icon="mdi:chevron-right" className="text-gray-400 mx-1" />
            <span className="text-gray-800 font-medium truncate">{product.title}</span>
          </li>
        </ol>
      </nav>

      {/* Product Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Product Image Gallery */}
        <motion.div
          className="bg-white rounded-lg overflow-hidden shadow-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative pb-4">
            {product.featured && (
              <div className="absolute top-4 left-4 bg-primary-blue text-white text-xs font-bold px-3 py-1 rounded-full z-10">
                Featured
              </div>
            )}
            <img
              src={allImages[activeImageIndex]?.url}
              alt={product.title}
              className="w-full h-[400px] object-contain"
            />
          </div>
          
          {/* Thumbnail Gallery */}
          {allImages.length > 1 && (
            <div className="flex justify-center gap-2 mt-2">
              {allImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImageIndex(index)}
                  className={`border-2 rounded overflow-hidden w-16 h-16 ${
                    activeImageIndex === index ? 'border-primary-blue' : 'border-gray-200'
                  }`}
                >
                  <img
                    src={image.url}
                    alt={`${product.title} - Image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </motion.div>

        {/* Product Info */}
        <motion.div
          className="flex flex-col"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{product.title}</h1>
          
          <div className="flex items-center mb-4">
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <Icon
                  key={star}
                  icon="mdi:star"
                  className="text-yellow-400 text-xl"
                />
              ))}
            </div>
            <span className="text-gray-500 ml-2">(24 reviews)</span>
          </div>
          
          <div className="mb-6">
            <span className="text-3xl font-bold text-primary-blue">
              ₦{product.price.toLocaleString()}
            </span>
          </div>
          
          <div className="mb-6">
            <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
              product.availability
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}>
              <Icon
                icon={product.availability ? "mdi:check-circle" : "mdi:close-circle"}
                className="mr-1"
              />
              {product.availability ? 'In Stock' : 'Out of Stock'}
            </div>
          </div>
          
          <div className="border-t border-b py-4 mb-6">
            <p className="text-gray-700 mb-4 line-clamp-3">
              {product.description || "No description available for this product."}
            </p>
            <button
              className="text-primary-blue hover:underline flex items-center"
              onClick={() => setActiveTab("description")}
            >
              Read more
              <Icon icon="mdi:chevron-right" className="ml-1" />
            </button>
          </div>
          
          {product.availability && (
            <>
              <div className="flex items-center mb-6">
                <span className="mr-4 text-gray-700">Quantity:</span>
                <div className="flex items-center border rounded-md">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                    disabled={quantity <= 1}
                  >
                    <Icon icon="mdi:minus" />
                  </button>
                  <span className="px-4 py-1 border-x">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                    disabled={quantity >= (product.quantity || 10)}
                  >
                    <Icon icon="mdi:plus" />
                  </button>
                </div>
                <span className="ml-4 text-sm text-gray-500">
                  {product.quantity ? `${product.quantity} available` : ''}
                </span>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  onClick={handleAddToCart}
                  className="flex-1 bg-primary-blue text-white py-3 px-6 rounded-md font-medium flex items-center justify-center hover:bg-blue-700 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon icon="mdi:cart" className="mr-2" />
                  Add to Cart
                </motion.button>
                
                <motion.button
                  className="flex-1 border border-primary-blue text-primary-blue py-3 px-6 rounded-md font-medium flex items-center justify-center hover:bg-blue-50 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon icon="mdi:heart-outline" className="mr-2" />
                  Add to Wishlist
                </motion.button>
              </div>
            </>
          )}
          
          <div className="mt-8">
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center">
                <Icon icon="mdi:truck-delivery-outline" className="mr-2 text-xl" />
                <span>Free delivery</span>
              </div>
              <div className="flex items-center">
                <Icon icon="mdi:refresh" className="mr-2 text-xl" />
                <span>30-day returns</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Product Tabs */}
      <div className="mb-12">
        <div className="border-b mb-6">
          <div className="flex space-x-8">
            {['description', 'reviews', 'shipping'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 font-medium text-sm uppercase tracking-wide border-b-2 transition-colors ${
                  activeTab === tab
                    ? 'border-primary-blue text-primary-blue'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          {activeTab === 'description' && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Product Description</h3>
              <p className="text-gray-700 whitespace-pre-line">
                {product.description || "No description available for this product."}
              </p>
            </div>
          )}
          
          {activeTab === 'reviews' && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Customer Reviews</h3>
              <p className="text-gray-500">No reviews yet. Be the first to review this product.</p>
              <button className="mt-4 text-primary-blue hover:underline flex items-center">
                Write a review
                <Icon icon="mdi:pencil" className="ml-1" />
              </button>
            </div>
          )}
          
          {activeTab === 'shipping' && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Shipping & Returns</h3>
              <div className="space-y-4 text-gray-700">
                <p>
                  <strong>Delivery:</strong> Free standard shipping on all orders within Nigeria.
                  Delivery typically takes 3-5 business days depending on your location.
                </p>
                <p>
                  <strong>Returns:</strong> We offer a 30-day return policy. If you're not satisfied with your purchase,
                  you can return it within 30 days for a full refund or exchange.
                </p>
                <p>
                  <strong>Conditions:</strong> Products must be returned in their original packaging and in unused condition.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-6">Related Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {relatedProducts.map((item) => (
              <Link
                key={item._id}
                to={`/product/${item.slug.current}`}
                className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="relative h-48 overflow-hidden">
                  {item.featured && (
                    <div className="absolute top-2 left-2 bg-primary-blue text-white text-xs font-bold px-2 py-1 rounded-full z-10">
                      Featured
                    </div>
                  )}
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-3">
                  <h3 className="font-medium text-sm truncate">{item.title}</h3>
                  <div className="flex justify-between items-center mt-2">
                    <span className="font-bold text-primary-blue">₦{item.price.toLocaleString()}</span>
                    {item.availability ? (
                      <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded">In Stock</span>
                    ) : (
                      <span className="text-xs text-red-600 bg-red-100 px-2 py-1 rounded">Out of Stock</span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;
