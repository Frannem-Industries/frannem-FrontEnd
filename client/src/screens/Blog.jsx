import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';
import { format } from 'date-fns';
import { getBlogs } from '../utils/sanity';
import Lazy from '../components/ui/Lazy';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const searchInputRef = useRef(null);
  
  const categories = ['all'];

  // Scroll animations
  const { scrollYProgress } = useScroll();
  const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0.8]);
  const headerScale = useTransform(scrollYProgress, [0, 0.1], [1, 0.98]);

  useEffect(() => {
    const fetchBlogs = async () => {
      setIsLoading(true);
      try {
        const blogData = await getBlogs();
        setBlogs(blogData);
        setFilteredBlogs(blogData);
      } catch (err) {
        console.error('Error fetching blogs:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  useEffect(() => {
    if (showSearchBar && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [showSearchBar]);

  useEffect(() => {
    let filtered = blogs;
    
    // Filter by category if not 'all'
    if (activeCategory !== 'all') {
      // This is a placeholder - you'll need to adjust based on your actual data structure
      filtered = blogs.filter(blog => 
        blog.categories?.includes(activeCategory) || 
        blog.title.toLowerCase().includes(activeCategory.toLowerCase())
      );
    }
    
    // Then filter by search query
    if (searchQuery.trim() !== '') {
      filtered = filtered.filter(blog => 
        blog.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    setFilteredBlogs(filtered);
  }, [searchQuery, blogs, activeCategory]);

  const toggleSearchBar = () => {
    setShowSearchBar(!showSearchBar);
    if (showSearchBar) {
      setSearchQuery('');
    }
  };

  const openBlogPreview = (blog) => {
    setSelectedBlog(blog);
    document.body.style.overflow = 'hidden';
  };

  const closeBlogPreview = () => {
    setSelectedBlog(null);
    document.body.style.overflow = 'auto';
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-12 pb-20">
        <div className="container mx-auto px-4">
          <div className="flex justify-center mb-12">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: [0.5, 1, 0.5],
                scale: [0.98, 1, 0.98]
              }}
              transition={{ 
                repeat: Infinity,
                duration: 2
              }}
              className="w-48 h-12 bg-gray-200 rounded-lg"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Lazy items={6} />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-md"
        >
          <motion.div
            animate={{ 
              rotate: [0, 5, -5, 0],
              scale: [1, 1.05, 0.95, 1]
            }}
            transition={{ 
              duration: 0.5,
              repeat: 3,
              repeatType: "reverse"
            }}
          >
            <Icon icon="mdi:alert-circle-outline" className="text-6xl text-red-500 mx-auto mb-4" />
          </motion.div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Oops! Something went wrong</h2>
          <p className="text-gray-600 mb-8">{error}</p>
          <motion.button 
            onClick={() => window.location.reload()}
            className="inline-flex items-center px-6 py-3 bg-primary-blue text-white rounded-full hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Icon icon="mdi:refresh" className="mr-2 text-xl" />
            Refresh Page
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-12 pb-20">
      {/* Hero Section */}
      <motion.div 
        style={{ opacity: headerOpacity, scale: headerScale }}
        className="container mx-auto px-4 mb-16"
      >
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center relative z-10"
        >
          <motion.h1 
            className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 relative inline-block"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <span className="relative z-10">Our Blog</span>
            <motion.span 
              className="absolute -bottom-3 left-0 w-full h-3 bg-primary-blue/20 rounded-full -z-10"
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 0.7, delay: 0.6 }}
            />
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-600 max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            Discover beauty secrets, product insights, and expert tips to enhance your self-care routine.
          </motion.p>
          
          {/* Search and Filter Controls */}
          <motion.div 
            className="flex flex-wrap justify-center items-center gap-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <AnimatePresence>
              {showSearchBar ? (
                <motion.div 
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 'auto', opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="relative"
                >
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search articles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-64 px-4 py-2 pl-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                  />
                  <Icon 
                    icon="mdi:magnify" 
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
                  />
                  <button 
                    onClick={toggleSearchBar}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <Icon icon="mdi:close" />
                  </button>
                </motion.div>
              ) : (
                <motion.button 
                  onClick={toggleSearchBar}
                  className="flex items-center px-4 py-2 rounded-full border border-gray-300 hover:border-primary-blue text-gray-700 hover:text-primary-blue transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon icon="mdi:magnify" className="mr-2" />
                  Search
                </motion.button>
              )}
            </AnimatePresence>
            
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeCategory === category
                      ? 'bg-primary-blue text-white shadow-md'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      <div className="container mx-auto px-4">
        {filteredBlogs.length > 0 ? (
          <>
            {/* Featured Blog Post */}
            {filteredBlogs.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-16"
              >
                <div className="relative overflow-hidden rounded-2xl shadow-2xl group">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />
                  
                  <motion.div 
                    className="relative h-[70vh] max-h-[600px] w-full overflow-hidden"
                    whileHover="hover"
                  >
                    <motion.img 
                      src={filteredBlogs[0].coverImageUrl || 'https://via.placeholder.com/1200x800'} 
                      alt={filteredBlogs[0].title}
                      className="w-full h-full object-cover"
                      variants={{
                        hover: { scale: 1.05 }
                      }}
                      transition={{ duration: 0.8 }}
                    />
                  </motion.div>
                  
                  <motion.div 
                    className="absolute bottom-0 left-0 right-0 p-6 md:p-10 z-20"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <div className="flex items-center mb-4">
                      <span className="bg-primary-blue text-white text-sm font-medium px-3 py-1 rounded-full">
                        Featured
                      </span>
                      <span className="mx-3 text-white/80">•</span>
                      <span className="text-white/80 text-sm">
                        {filteredBlogs[0].publishedAt ? 
                          format(new Date(filteredBlogs[0].publishedAt), 'MMMM dd, yyyy') : 
                          'Recently Published'}
                      </span>
                    </div>
                    
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 max-w-3xl">
                      {filteredBlogs[0].title}
                    </h2>
                    
                    <p className="text-white/90 mb-6 max-w-2xl line-clamp-2 md:line-clamp-3">
                      {filteredBlogs[0].body && filteredBlogs[0].body[0]?.children?.[0]?.text || 
                        'Discover the latest insights and tips in this featured article...'}
                    </p>
                    
                    <div className="flex flex-wrap gap-4">
                      <Link 
                        to={`/blog/${filteredBlogs[0].slug.current}`}
                        className="inline-flex items-center px-6 py-3 bg-white text-primary-blue rounded-full font-medium hover:bg-primary-blue hover:text-white transition-colors shadow-lg"
                      >
                        Read Article
                        <Icon icon="mdi:arrow-right" className="ml-2" />
                      </Link>
                      
                      <motion.button 
                        onClick={() => openBlogPreview(filteredBlogs[0])}
                        className="inline-flex items-center px-6 py-3 bg-white/20 text-white rounded-full font-medium backdrop-blur-sm hover:bg-white/30 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Quick Preview
                        <Icon icon="mdi:eye-outline" className="ml-2" />
                      </motion.button>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* Blog Posts Grid */}
            <div className="mb-16">
              <motion.h2 
                className="text-2xl font-bold mb-8 inline-block"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                Latest Articles
                <motion.div 
                  className="h-1 bg-primary-blue mt-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                />
              </motion.h2>

              <motion.div 
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {filteredBlogs.slice(1).map((blog, index) => (
                  <motion.div 
                    key={blog._id} 
                    variants={item}
                    className="group"
                    whileHover={{ y: -8 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                      <div className="relative h-56 overflow-hidden">
                        {blog.coverImageUrl ? (
                          <img 
                            src={blog.coverImageUrl} 
                            alt={blog.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                            <Icon icon="mdi:image-outline" className="text-4xl text-gray-400" />
                          </div>
                        )}
                        <div className="absolute top-3 right-3">
                          <motion.button 
                            onClick={() => openBlogPreview(blog)}
                            className="w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm text-gray-700 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Icon icon="mdi:eye-outline" />
                          </motion.button>
                        </div>
                        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      
                      <div className="p-6 flex flex-col flex-grow">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xs text-primary-blue font-medium px-3 py-1 bg-primary-blue/10 rounded-full">
                            {/* {index % 4 === 0 ? 'Skincare' : 
                             index % 4 === 1 ? 'Haircare' : 
                             index % 4 === 2 ? 'Beauty Tips' : 'Product Guides'} */}
                          </span>
                          <span className="text-xs text-gray-500">
                            {blog.publishedAt ? 
                              format(new Date(blog.publishedAt), 'MMM dd, yyyy') : 
                              'Recently Published'}
                          </span>
                        </div>
                        
                        <h3 className="font-bold text-xl text-gray-900 mb-3 line-clamp-2 group-hover:text-primary-blue transition-colors">
                          {blog.title}
                        </h3>
                        
                        <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
                          {blog.body && blog.body[0]?.children?.[0]?.text || 'Read this interesting article...'}
                        </p>
                        
                        <div className="flex justify-between items-center mt-auto">
                          <Link 
                            to={`/blog/${blog.slug.current}`}
                            className="flex items-center text-primary-blue font-medium group-hover:underline"
                          >
                            Read More
                            <motion.span
                              initial={{ x: 0 }}
                              whileHover={{ x: 5 }}
                              transition={{ type: "spring", stiffness: 400 }}
                            >
                              <Icon icon="mdi:arrow-right" className="ml-1" />
                            </motion.span>
                          </Link>
                          
                          <div className="flex items-center text-gray-500 text-sm">
                            <Icon icon="mdi:clock-outline" className="mr-1" />
                            <span>{Math.floor(Math.random() * 10) + 3} min read</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
            
            {/* Newsletter Section */}
            <motion.div 
              className="bg-gradient-to-r from-primary-blue to-blue-700 rounded-2xl p-8 md:p-12 text-white shadow-xl overflow-hidden relative"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mt-20 -mr-20 blur-3xl" />
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/10 rounded-full -mb-10 -ml-10 blur-2xl" />
              
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="md:max-w-md">
                  <motion.h3 
                    className="text-2xl md:text-3xl font-bold mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    Subscribe to Our Newsletter
                  </motion.h3>
                  <motion.p 
                    className="text-white/90 mb-0 md:mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    viewport={{ once: true }}
                  >
                    Get the latest beauty tips, product updates, and exclusive offers delivered straight to your inbox.
                  </motion.p>
                </div>
                
                <motion.div 
                  className="w-full md:w-auto"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input 
                      type="email" 
                      placeholder="Your email address" 
                      className="px-4 py-3 rounded-lg border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white placeholder-white/60 focus:outline-none focus:border-white w-full sm:w-64"
                    />
                    <motion.button 
                      className="bg-white text-primary-blue px-6 py-3 rounded-lg font-medium hover:bg-white/90 transition-colors"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      Subscribe
                    </motion.button>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-20 max-w-md mx-auto"
          >
            <motion.div
              animate={{ 
                y: [0, -10, 0],
              }}
              transition={{ 
                repeat: Infinity,
                duration: 3,
                ease: "easeInOut"
              }}
              className="mb-6"
            >
              <Icon icon="mdi:file-search-outline" className="text-7xl text-gray-300 mx-auto" />
            </motion.div>
            <h3 className="text-2xl font-bold mb-3 text-gray-800">No Articles Found</h3>
            <p className="text-gray-600 mb-8">
              {searchQuery ? 
                `We couldn't find any articles matching "${searchQuery}"` : 
                'There are no blog posts available in this category.'}
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {searchQuery && (
                <motion.button 
                  onClick={() => setSearchQuery('')}
                  className="px-5 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors flex items-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon icon="mdi:close" className="mr-1" />
                  Clear search
                </motion.button>
              )}
              {activeCategory !== 'all' && (
                <motion.button 
                  onClick={() => setActiveCategory('all')}
                  className="px-5 py-2 bg-primary-blue text-white rounded-full hover:bg-blue-700 transition-colors flex items-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon icon="mdi:refresh" className="mr-1" />
                  View all articles
                </motion.button>
              )}
            </div>
          </motion.div>
        )}
      </div>

      {/* Blog Preview Modal */}
      <AnimatePresence>
        {selectedBlog && (
          <motion.div 
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeBlogPreview}
          >
            <motion.div 
              className="bg-white rounded-xl overflow-hidden max-w-2xl w-full max-h-[90vh] flex flex-col"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-56 overflow-hidden">
                {selectedBlog.coverImageUrl ? (
                  <img 
                    src={selectedBlog.coverImageUrl} 
                    alt={selectedBlog.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <Icon icon="mdi:image-outline" className="text-4xl text-gray-400" />
                  </div>
                )}
                <button 
                  onClick={closeBlogPreview}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
                >
                  <Icon icon="mdi:close" />
                </button>
              </div>
              
              <div className="p-6 overflow-y-auto">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs text-primary-blue font-medium px-3 py-1 bg-primary-blue/10 rounded-full">
                    Preview
                  </span>
                  <span className="text-xs text-gray-500">
                    {selectedBlog.publishedAt ? 
                      format(new Date(selectedBlog.publishedAt), 'MMMM dd, yyyy') : 
                      'Recently Published'}
                  </span>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{selectedBlog.title}</h3>
                
                <div className="text-gray-600 mb-6 line-clamp-6">
                  {selectedBlog.body && selectedBlog.body[0]?.children?.[0]?.text || 
                    'This is a preview of the article. Click the button below to read the full content.'}
                </div>
                
                <Link 
                  to={`/blog/${selectedBlog.slug.current}`}
                  className="inline-flex items-center px-5 py-2 bg-primary-blue text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Read Full Article
                  <Icon icon="mdi:arrow-right" className="ml-2" />
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Blog;
