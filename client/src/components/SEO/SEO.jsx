import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';

/**
 * Reusable SEO component for managing all meta tags
 */
const SEO = ({
  title,
  description,
  image,
  type = 'website',
  url,
  canonicalUrl,
  children,
}) => {
  // Default values
  const siteName = 'Franemm';
  const defaultDescription = 'Quality products from Franemm Industries';
  const defaultImage = 'https://franemm.netlify.app/svg.png'; // Replace with your default image
  const baseUrl = 'https://franemm.netlify.app';
  
  // Use provided values or fallbacks
  const metaTitle = title ? `${title} | ${siteName}` : siteName;
  const metaDescription = description?.slice(0, 150) || defaultDescription;
  const metaImage = image || defaultImage;
  const metaUrl = url ? `${baseUrl}${url}` : baseUrl;
  const canonical = canonicalUrl ? `${baseUrl}${canonicalUrl}` : metaUrl;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />
      <link rel="canonical" href={canonical} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={metaUrl} />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={metaImage} />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={metaUrl} />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaImage} />

      {/* Additional meta tags can be passed as children */}
      {children}
    </Helmet>
  );
};

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  type: PropTypes.string,
  url: PropTypes.string,
  canonicalUrl: PropTypes.string,
  children: PropTypes.node,
};

export default SEO;
