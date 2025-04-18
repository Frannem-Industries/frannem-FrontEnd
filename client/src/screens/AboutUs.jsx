import { motion } from "framer-motion";
import { about } from "../assets";

const AboutUs = () => {
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
        staggerChildren: 0.3,
      },
    },
  };

  const scaleIn = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <motion.div
      className='flex flex-col items-center justify-center gap-10 py-12 md:py-20 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto'
      initial='hidden'
      animate='visible'
      variants={staggerContainer}
    >
      {/* Who are we section */}
      <motion.div
        className='flex flex-col md:flex-row justify-between items-center gap-8 md:gap-16 w-full'
        variants={fadeIn}
      >
        <motion.div
          className='w-full md:w-1/2 order-2 md:order-1'
          variants={fadeIn}
        >
          <motion.h2
            className='text-3xl md:text-4xl lg:text-5xl font-bold text-primary-blue mb-6'
            variants={scaleIn}
          >
            WHO ARE WE?
          </motion.h2>
          <motion.p
            className='text-gray-700 leading-relaxed'
            variants={fadeIn}
          >
            Franemm Industries Limited is a multinational and continental
            consumer home care, cosmetics, food and nutritional production
            company. We manufacture and distribute some of the best loved
            brands in Nigeria and around Africa ranging from Petals product
            lines (Neutralizing Shampoo, Hair Conditioner and Lotion, Lotta
            Bounce Setting Lotion, Petroleum Jelly, Shampoo, Bath and
            Laundry Soap, Hair Oil Moisturizer, Weavon Glossifier, Hair
            Placenta, Herbal Hair Scalp Treatment, Conditioning Crème
            Relaxer, Styling Gel, Hair Food Cream) Including other product
            lines of the Beva brands, Wink Ultra Bath and Laundry product
            line; Supply and distribution of other products, including the
            Extract® Product line, SkinWhite® product line, Maxi-Peel®
            Facial Cleansers and Gypsy Custard; a food and nutritional
            range of product.
          </motion.p>

          <motion.div
            className='mt-8'
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <a
              href='#contact'
              className='bg-primary-blue text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-md inline-block'
            >
              CONTACT US NOW
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          className='w-full md:w-1/2 order-1 md:order-2'
          variants={scaleIn}
        >
          <motion.img
            src={about}
            alt='About Franemm Industries'
            className='w-full h-auto rounded-lg shadow-xl'
            initial={{ filter: "blur(10px)" }}
            animate={{ filter: "blur(0px)" }}
            transition={{ duration: 1 }}
          />
        </motion.div>
      </motion.div>

      {/* Mission, Vision, Experience section */}
      <motion.div
        className='grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 w-full mt-12 md:mt-20'
        variants={staggerContainer}
      >
        <motion.div
          className='bg-white p-8 rounded-lg shadow-lg'
          variants={fadeIn}
          whileHover={{
            y: -10,
            boxShadow:
              "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
          }}
        >
          <motion.h3
            className='text-2xl md:text-3xl font-bold text-primary-blue mb-6'
            variants={scaleIn}
          >
            OUR MISSION
          </motion.h3>
          <motion.p
            className='text-gray-700 leading-relaxed'
            variants={fadeIn}
          >
            Our mission is centered on meeting customer satisfaction across
            board on all our beauty, care and cosmetic brands.
          </motion.p>

          <motion.h3
            className='text-2xl md:text-3xl font-bold text-primary-blue mt-10 mb-6'
            variants={scaleIn}
          >
            OUR VISION
          </motion.h3>
          <motion.p
            className='text-gray-700 leading-relaxed'
            variants={fadeIn}
          >
            Our vision is to be the foremost manufacturer in beauty, care
            and cosmetic products in Nigeria and Africa.
          </motion.p>
        </motion.div>

        <motion.div
          className='bg-white p-8 rounded-lg shadow-lg'
          variants={fadeIn}
          whileHover={{
            y: -10,
            boxShadow:
              "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
          }}
        >
          <motion.h3
            className='text-2xl md:text-3xl font-bold text-primary-blue mb-6'
            variants={scaleIn}
          >
            OUR EXPERIENCE
          </motion.h3>
          <motion.p
            className='text-gray-700 leading-relaxed'
            variants={fadeIn}
          >
            Since year 2000 after Franemm Industries Limited was
            incorporated, we have since grown into producing various kinds
            of cosmetics, hair and home care products, gaining a huge
            market share in the industry in the Republic of Benin, Ghana
            and Nigeria leading the pack where we have the largest
            distribution network. By the year 2020 we should have our
            distribution networks across West Africa.
          </motion.p>
          <motion.p
            className='text-gray-700 leading-relaxed mt-4'
            variants={fadeIn}
          >
            Our culture is what binds us, being able to work together
            achieving a set goal as a family with courage, accountability
            and drive. This is what makes us distinctive from other
            organizations.
          </motion.p>
          <motion.p
            className='text-gray-700 leading-relaxed mt-4'
            variants={fadeIn}
          >
            Our management Team is made up of formidable seasoned
            professionals with foreign experts in charge of production,
            procurement and maintenance in line with global best practice.
          </motion.p>
        </motion.div>
      </motion.div>

      {/* Timeline section */}
      <motion.div className='w-full mt-16 md:mt-24' variants={fadeIn}>
        <motion.h2
          className='text-3xl md:text-4xl font-bold text-primary-blue text-center mb-12'
          variants={scaleIn}
        >
          OUR JOURNEY
        </motion.h2>

        <motion.div className='relative' variants={staggerContainer}>
          {/* Timeline line */}
          <div className='absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary-blue/20 rounded'></div>

          {/* Timeline items */}
          {[
            {
              year: "2000",
              text: "Franemm Industries Limited was incorporated",
            },
            {
              year: "2005",
              text: "Expanded product line to include hair care products",
            },
            {
              year: "2010",
              text: "Established distribution networks in Ghana and Republic of Benin",
            },
            {
              year: "2015",
              text: "Became one of the leading manufacturers in Nigeria",
            },
            {
              year: "2020",
              text: "Expanded distribution networks across West Africa",
            },
          ].map((item, index) => (
            <motion.div
              key={item.year}
              className={`flex items-center mb-12 ${
                index % 2 === 0 ? "flex-row-reverse" : ""
              }`}
              variants={fadeIn}
              initial='hidden'
              whileInView='visible'
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className='w-1/2 px-4 md:px-8'>
                <motion.div
                  className={`bg-white p-6 rounded-lg shadow-md ${
                    index % 2 === 0 ? "text-right" : ""
                  }`}
                  whileHover={{ scale: 1.03 }}
                >
                  <h3 className='text-xl font-bold text-primary-blue mb-2'>
                    {item.year}
                  </h3>
                  <p className='text-gray-700'>{item.text}</p>
                </motion.div>
              </div>

              <div className='absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center'>
                <motion.div
                  className='h-5 w-5 bg-primary-blue rounded-full'
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 15,
                  }}
                ></motion.div>
              </div>

              <div className='w-1/2'></div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default AboutUs;
