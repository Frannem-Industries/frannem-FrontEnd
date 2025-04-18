import { useState } from "react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { details } from "../utils/data";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    try {
      // Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSubmitStatus({
        success: true,
        message: "Your message has been sent successfully!",
      });
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      setSubmitStatus({
        success: false,
        message: "Failed to send message. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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

  return (
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
      <div className='grid grid-cols-1 md:grid-cols-2 gap-12 items-start'>
        {/* Contact Information */}
        <motion.div
          className='bg-white rounded-xl shadow-lg p-8'
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
              {[
                { icon: "mdi:facebook", label: "Facebook" },
                { icon: "mdi:twitter", label: "Twitter" },
                { icon: "mdi:instagram", label: "Instagram" },
                { icon: "mdi:linkedin", label: "LinkedIn" },
              ].map((social) => (
                <motion.a
                  key={social.label}
                  href='#'
                  aria-label={social.label}
                  className='bg-primary-blue text-white p-3 rounded-full hover:bg-blue-700 transition-colors'
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon icon={social.icon} className='text-xl' />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Map or Image */}
          <motion.div
            className='mt-10 rounded-lg overflow-hidden h-64 bg-gray-200'
            variants={fadeIn}
          >
            {/* Replace with actual map or image */}
            <div className='w-full h-full flex items-center justify-center text-gray-500'>
              <p>Map location will be displayed here</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          className='bg-white rounded-xl shadow-lg p-8'
          variants={fadeIn}
          whileHover={{
            y: -5,
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          }}
        >
          <h3 className='text-2xl font-bold text-primary-blue mb-6'>
            Send Us a Message
          </h3>

          <form onSubmit={handleSubmit} className='space-y-6'>
            <motion.div variants={fadeIn}>
              <label
                htmlFor='name'
                className='block text-sm font-medium text-gray-700 mb-1'
              >
                Your Name <span className='text-red-500'>*</span>
              </label>
              <input
                type='text'
                id='name'
                name='name'
                value={formData.name}
                onChange={handleChange}
                required
                className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-primary-blue transition-colors'
                placeholder='Enter your full name'
              />
            </motion.div>

            <motion.div variants={fadeIn}>
              <label
                htmlFor='email'
                className='block text-sm font-medium text-gray-700 mb-1'
              >
                Email address <span className='text-red-500'>*</span>
              </label>
              <input
                type='email'
                id='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                required
                className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-primary-blue transition-colors'
                placeholder='Enter your email address'
              />
            </motion.div>

            <motion.div variants={fadeIn}>
              <label
                htmlFor='subject'
                className='block text-sm font-medium text-gray-700 mb-1'
              >
                Subject
              </label>
              <input
                type='text'
                id='subject'
                name='subject'
                value={formData.subject}
                onChange={handleChange}
                className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-primary-blue transition-colors'
                placeholder='What is this regarding?'
              />
            </motion.div>

            <motion.div variants={fadeIn}>
              <label
                htmlFor='message'
                className='block text-sm font-medium text-gray-700 mb-1'
              >
                Message <span className='text-red-500'>*</span>
              </label>
              <textarea
                id='message'
                name='message'
                value={formData.message}
                onChange={handleChange}
                required
                rows='5'
                className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-primary-blue transition-colors'
                placeholder='How can we help you?'
              ></textarea>
            </motion.div>

            {submitStatus && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-3 rounded-lg ${
                  submitStatus.success
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {submitStatus.message}
              </motion.div>
            )}

            <motion.button
              type='submit'
              disabled={isSubmitting}
              className={`w-full bg-primary-blue text-white font-medium py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 transition-colors ${
                isSubmitting ? "opacity-70 cursor-not-allowed" : ""
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              variants={fadeIn}
            >
              {isSubmitting ? (
                <span className='flex items-center justify-center'>
                  <Icon
                    icon='eos-icons:loading'
                    className='animate-spin mr-2'
                  />
                  Sending...
                </span>
              ) : (
                "Send Message"
              )}
            </motion.button>
          </form>

          <motion.p
            className='text-sm text-gray-500 mt-6'
            variants={fadeIn}
          >
            By submitting this form, you agree to our privacy policy and
            terms of service.
          </motion.p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Contact;
