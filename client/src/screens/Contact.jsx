import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { details, socialLinks } from "../utils/data";
import SEO from "../components/SEO/SEO";

const Contact = () => {
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  // Map social media names to their respective icons
  const getSocialIcon = (name) => {
    const iconMap = {
      "Facebook": "mdi:facebook",
      "Instagram": "mdi:instagram",
      "Twitter": "mdi:twitter",
      "LinkedIn": "mdi:linkedin"
    };
    
    return iconMap[name] || "mdi:link";
  };

  return (
    <>
      {/* SEO Component */}
      <SEO
        title="Contact Us"
        description="Get in touch with Franemm Industries. We are willing to do business with you and be sure to always get the best deals. Contact us for more details on how to be part of the Franemm Family."
        url="/contact"
        canonicalUrl="/contact"
      />
      <motion.div
        className='max-w-7xl mx-auto px-4 py-16 md:py-24'
        initial='hidden'
        animate='visible'
        variants={staggerContainer}
      >
        {/* Header Section */}
        <motion.div className='text-center mb-16' variants={fadeIn}>
          <motion.h1
            className='text-3xl md:text-4xl lg:text-5xl font-bold text-primary-blue mb-4'
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 10,
            }}
          >
            YOU'RE WELCOME
          </motion.h1>
          <motion.h2
            className='text-2xl md:text-3xl font-semibold text-gray-800 mb-6'
            variants={fadeIn}
          >
            KEEP IN TOUCH
          </motion.h2>
          <motion.p
            className='text-gray-600 max-w-2xl mx-auto'
            variants={fadeIn}
          >
            We are willing to do business with you, be sure to always get the
            best deals. We are available at all times and we would be glad to
            start a business relationship with you. Contact us for more
            detail on how to be part of the Franemm Family.
          </motion.p>
        </motion.div>
        
        {/* Main Content */}
        <motion.div
          className='bg-white rounded-xl shadow-lg p-8 max-w-3xl mx-auto'
          variants={fadeIn}
          whileHover={{
            y: -5,
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          }}
        >
          <h3 className='text-2xl font-bold text-primary-blue mb-6'>
            Contact Information
          </h3>
          <div className='space-y-6'>
            <motion.div
              className='flex items-start space-x-4'
              variants={fadeIn}
            >
              <div className='bg-primary-blue/10 p-3 rounded-full'>
                <Icon
                  icon='mdi:map-marker'
                  className='text-2xl text-primary-blue'
                />
              </div>
              <div>
                <h4 className='font-semibold text-gray-800 mb-1'>
                  OFFICE ADDRESS
                </h4>
                <p className='text-gray-600'>{details.address}</p>
              </div>
            </motion.div>
            <motion.div
              className='flex items-start space-x-4'
              variants={fadeIn}
            >
              <div className='bg-primary-blue/10 p-3 rounded-full'>
                <Icon
                  icon='mdi:phone'
                  className='text-2xl text-primary-blue'
                />
              </div>
              <div>
                <h4 className='font-semibold text-gray-800 mb-1'>
                  PHONE NUMBERS
                </h4>
                <p className='text-gray-600'>{details.number}</p>
                <p className='text-gray-600'>+234 811 397 9275</p>
              </div>
            </motion.div>
            <motion.div
              className='flex items-start space-x-4'
              variants={fadeIn}
            >
              <div className='bg-primary-blue/10 p-3 rounded-full'>
                <Icon
                  icon='mdi:email'
                  className='text-2xl text-primary-blue'
                />
              </div>
              <div>
                <h4 className='font-semibold text-gray-800 mb-1'>
                  EMAIL ADDRESS
                </h4>
                <p className='text-gray-600'>{details.email}</p>
              </div>
            </motion.div>
          </div>
          
          {/* Social Media Links */}
          <motion.div className='mt-10' variants={fadeIn}>
            <h4 className='font-semibold text-gray-800 mb-4'>
              CONNECT WITH US
            </h4>
            <div className='flex space-x-4'>
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className='bg-primary-blue text-white p-3 rounded-full hover:bg-blue-700 transition-colors'
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon icon={getSocialIcon(social.name)} className='text-xl' />
                </motion.a>
              ))}
            </div>
          </motion.div>
          
          {/* Map */}
          <motion.div
            className='mt-10 rounded-lg overflow-hidden h-80'
            variants={fadeIn}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.7286767086897!2d3.3751328!3d6.4548513!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8b2a74c7f76d%3A0x7ac7e0e5b1520b26!2sLagos%2C%20Nigeria!5e0!3m2!1sen!2s!4v1650000000000!5m2!1sen!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Franemm Industries Location"
            ></iframe>
          </motion.div>
          
          {/* Business Hours */}
          <motion.div className='mt-10' variants={fadeIn}>
            <h4 className='font-semibold text-gray-800 mb-4'>
              BUSINESS HOURS
            </h4>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div className='bg-gray-50 p-4 rounded-lg'>
                <h5 className='font-medium text-gray-700 mb-2'>Weekdays</h5>
                <p className='text-gray-600'>Monday - Friday: 8:00 AM - 6:00 PM</p>
              </div>
              <div className='bg-gray-50 p-4 rounded-lg'>
                <h5 className='font-medium text-gray-700 mb-2'>Weekends</h5>
                <p className='text-gray-600'>Saturday: 9:00 AM - 4:00 PM</p>
                <p className='text-gray-600'>Sunday: Closed</p>
              </div>
            </div>
          </motion.div>
          
          {/* Call to Action */}
          <motion.div 
            className='mt-10 text-center bg-primary-blue/5 p-6 rounded-lg'
            variants={fadeIn}
          >
            <h4 className='font-bold text-xl text-primary-blue mb-3'>Ready to get started?</h4>
            <p className='text-gray-600 mb-4'>Reach out to us today and let's discuss how we can work together.</p>
            <motion.a
              href={`mailto:${details.email}`}
              className='inline-flex items-center px-6 py-3 bg-primary-blue text-white rounded-lg font-medium hover:bg-blue-700 transition-colors'
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon icon="mdi:email-outline" className="mr-2" />
              Email Us Now
            </motion.a>
          </motion.div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default Contact;
