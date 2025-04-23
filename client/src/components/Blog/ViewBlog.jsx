import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import { format } from 'date-fns';
import { PortableText } from '@portabletext/react';
import { sanityClient } from '../../utils/sanity';
import Lazy from '../ui/Lazy';

const ViewBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      setIsLoading(true);
      try {
        // Fetch the blog post by slug
        const query = `*[_type == "blog" && slug.current == $slug][0]{
          _id,
          title,
          slug,
          "coverImageUrl": coverImage.asset->url,
          publishedAt,
          body
        }`;
        
        const blogData = await sanityClient.fetch(query, { slug: id });
        
        if (!blogData) {
          throw new Error("Blog post not found");
        }
        
        setBlog(blogData);
        
        // Fetch related blog posts
        const relatedQuery = `*[_type == "blog" && slug.current != $slug][0...3]{
          _id,
          title,
          slug,
          "coverImageUrl": coverImage.asset->url,
          publishedAt
        }`;
        
        const relatedData = await sanityClient.fetch(relatedQuery, { slug: id });
        setRelatedBlogs(relatedData);
      } catch (err) {
        console.error("Error fetching blog:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchBlog();
    }
    
    // Reset scroll position when blog changes
    window.scrollTo(0, 0);
  }, [id]);

  const components = {
    block: {
      h1: ({children}) => <h1 className="text-3xl font-bold my-4">{children}</h1>,
      h2: ({children}) => <h2 className="text-2xl font-bold my-4">{children}</h2>,
      h3: ({children}) => <h3 className="text-xl font-bold my-3">{children}</h3>,
      h4: ({children}) => <h4 className="text-lg font-bold my-3">{children}</h4>,
      normal: ({children}) => <p className="text-gray-700 my-4 leading-relaxed">{children}</p>,
      blockquote: ({children}) => (
        <blockquote className="border-l-4 border-primary-blue pl-4 italic my-6 text-gray-600">
          {children}
        </blockquote>
      ),
    },
    list: {
      bullet: ({children}) => <ul className="list-disc pl-6 my-4 space-y-2">{children}</ul>,
      number: ({children}) => <ol className="list-decimal pl-6 my-4 space-y-2">{children}</ol>,
    },
    listItem: {
      bullet: ({children}) => <li className="text-gray-700">{children}</li>,
      number: ({children}) => <li className="text-gray-700">{children}</li>,
    },
    marks: {
      strong: ({children}) => <strong className="font-bold">{children}</strong>,
      em: ({children}) => <em className="italic">{children}</em>,
      link: ({value, children}) => (
        <a href={value.href} target="_blank" rel="noopener noreferrer" className="text-primary-blue hover:underline">
          {children}
        </a>
      ),
    },
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
        <Icon icon="mdi:alert-circle-outline" className="text-5xl text-red-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Blog Post Not Found</h2>
        <p className="text-gray-600 mb-6">{error}</p>
        <Link
          to="/blog"
          className="inline-flex items-center px-4 py-2 bg-primary-blue text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <Icon icon="mdi:arrow-left" className="mr-2" />
          Back to Blog
        </Link>
      </div>
    );
  }

  if (!blog) return null;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Breadcrumb */}
      <motion.nav 
        className="flex mb-6 text-sm"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <ol className="flex items-center space-x-2">
          <li>
            <Link to="/" className="text-gray-500 hover:text-primary-blue">Home</Link>
          </li>
          <li className="flex items-center">
            <Icon icon="mdi:chevron-right" className="text-gray-400 mx-1" />
            <Link to="/blog" className="text-gray-500 hover:text-primary-blue">Blog</Link>
          </li>
          <li className="flex items-center">
            <Icon icon="mdi:chevron-right" className="text-gray-400 mx-1" />
            <span className="text-gray-800 font-medium truncate">{blog.title}</span>
          </li>
        </ol>
      </motion.nav>

      {/* Blog Header */}
      <motion.div 
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{blog.title}</h1>
        <div className="flex items-center text-gray-600 mb-6">
          <div className="flex items-center">
            <Icon icon="mdi:calendar" className="mr-2" />
            <span>
              {blog.publishedAt ? 
                format(new Date(blog.publishedAt), 'MMMM dd, yyyy') : 
                'Recently Published'}
            </span>
          </div>
          <span className="mx-3">•</span>
          <div className="flex items-center">
            <Icon icon="mdi:account" className="mr-2" />
            <span>Frannem Industries</span>
          </div>
        </div>
      </motion.div>

      {/* Cover Image */}
      {blog.coverImageUrl && (
        <motion.div 
          className="mb-8 rounded-xl overflow-hidden shadow-lg"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <img 
            src={blog.coverImageUrl} 
            alt={blog.title}
            className="w-full h-auto object-cover"
          />
        </motion.div>
      )}

      {/* Blog Content */}
      <motion.div 
        className="prose prose-lg max-w-none mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {blog.body && <PortableText value={blog.body} components={components} />}
      </motion.div>

      {/* Share Buttons */}
      <motion.div 
        className="border-t border-b py-6 mb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <div className="flex flex-col sm:flex-row items-center justify-between">
          <div className="mb-4 sm:mb-0">
            <h3 className="font-medium text-gray-700 mb-2">Share this article</h3>
            <div className="flex space-x-3">
              <button className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-colors">
                <Icon icon="mdi:facebook" className="text-xl" />
              </button>
              <button className="w-10 h-10 rounded-full bg-blue-400 text-white flex items-center justify-center hover:bg-blue-500 transition-colors">
                <Icon icon="mdi:twitter" className="text-xl" />
              </button>
              <button className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center hover:bg-green-600 transition-colors">
                <Icon icon="mdi:whatsapp" className="text-xl" />
              </button>
              <button className="w-10 h-10 rounded-full bg-blue-700 text-white flex items-center justify-center hover:bg-blue-800 transition-colors">
                <Icon icon="mdi:linkedin" className="text-xl" />
              </button>
            </div>
          </div>
          <div className="flex">
            <button 
              onClick={() => navigate('/blog')}
              className="flex items-center text-primary-blue hover:underline"
            >
              <Icon icon="mdi:arrow-left" className="mr-2" />
              Back to all articles
            </button>
          </div>
        </div>
      </motion.div>

      {/* Related Articles */}
      {relatedBlogs.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedBlogs.map((relatedBlog) => (
              <Link 
                key={relatedBlog._id} 
                to={`/blog/${relatedBlog.slug.current}`}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
              >
                <div className="h-48 overflow-hidden">
                  {relatedBlog.coverImageUrl ? (
                    <img 
                      src={relatedBlog.coverImageUrl} 
                      alt={relatedBlog.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <Icon icon="mdi:image-outline" className="text-4xl text-gray-400" />
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <div className="text-xs text-gray-500 mb-2">
                    {relatedBlog.publishedAt ? 
                      format(new Date(relatedBlog.publishedAt), 'MMMM dd, yyyy') : 
                      'Recently Published'}
                  </div>
                  <h3 className="font-bold text-lg mb-2 line-clamp-2">{relatedBlog.title}</h3>
                  <div className="flex items-center text-primary-blue text-sm font-medium">
                    Read Article
                    <Icon icon="mdi:arrow-right" className="ml-1 text-xs" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ViewBlog;

  