import { Icon } from "@iconify/react/dist/iconify.js";
import { logo } from "../assets";
import {
  categories,
  information,
  customerService,
  details,
} from "../utils/data";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='border-t-2 p-2 bg-gray-50'>
      <div className='hidden md:flex flex-col md:flex-row items-center justify-between mt-2 px-8'>
        <div className='w-[120px] h-[50px]'>
          <img
            className='w-full h-full object-cover'
            src={logo}
            alt='Frannem Logo'
          />
        </div>

        <div className='flex flex-col gap-8 mt-4 md:mt-0'>
          <div className='flex justify-end'>
            <span className='text-xl font-light text-gray-400'>
              Get To Know More About Us
            </span>
          </div>

          <div className='w-full md:w-[400px] border h-[60px] rounded-xl flex items-center justify-center overflow-hidden'>
            <input
              type='email'
              className='outline-none w-full h-full border-none rounded-xl px-8 py-4'
              placeholder='Enter your email address'
              aria-label='Email subscription'
            />
            <button className='bg-primary-blue text-white rounded-r-xl px-8 py-4 hover:bg-blue-700 transition-colors'>
              Subscribe
            </button>
          </div>
        </div>
      </div>

      <div className='flex flex-wrap justify-between mt-8 p-8 gap-8'>
        {/* Company Info Section */}
        <div className='flex flex-col gap-6'>
          <div className='w-[120px] h-[50px]'>
            <img
              className='w-full h-full object-cover'
              src={logo}
              alt='Frannem Logo'
            />
          </div>
          <div className='flex gap-4 items-start'>
            <Icon
              icon={"mynaui:location"}
              className='text-primary-blue text-xl mt-1'
            />
            <p className='text-gray-600 max-w-[250px] leading-relaxed'>
              {details.address}
            </p>
          </div>

          <div className='flex gap-4 items-center'>
            <Icon
              icon={"mdi-light:phone"}
              className='text-primary-blue text-xl'
            />
            <p className='text-gray-600'>{details.number}</p>
          </div>
          <div className='flex gap-4 items-center'>
            <Icon
              icon={"material-symbols:mail-outline"}
              className='text-primary-blue text-xl'
            />
            <p className='text-gray-600'>{details.email}</p>
          </div>
          <div className='flex gap-4 mt-2'>
            <a
              href='https://facebook.com'
              target='_blank'
              aria-label='Facebook'
              className='text-primary-blue hover:text-blue-700'
            >
              <Icon icon='mdi:facebook' className='text-2xl' />
            </a>
            <a
              href='https://twitter.com'
              target='_blank'
              aria-label='Twitter'
              className='text-primary-blue hover:text-blue-700'
            >
              <Icon icon='mdi:twitter' className='text-2xl' />
            </a>
            <a
              href='https://instagram.com'
              target='_blank'
              aria-label='Instagram'
              className='text-primary-blue hover:text-blue-700'
            >
              <Icon icon='mdi:instagram' className='text-2xl' />
            </a>
            <a
              href='https://linkedin.com'
              target='_blank'
              aria-label='LinkedIn'
              className='text-primary-blue hover:text-blue-700'
            >
              <Icon icon='mdi:linkedin' className='text-2xl' />
            </a>
          </div>
        </div>

        {/* Categories Section */}
        <div className='flex flex-col gap-4'>
          <span className='font-bold text-lg border-b-2 border-primary-blue pb-2'>
            Categories
          </span>
          {categories.map((item) => (
            <div key={item.name}>
              <Link
                to={item.link}
                className='text-gray-600 hover:text-primary-blue transition-colors'
              >
                <h1 className='text-base'>{item.name}</h1>
              </Link>
            </div>
          ))}
        </div>

        {/* Information Section */}
        <div className='flex flex-col gap-4'>
          <span className='font-bold text-lg border-b-2 border-primary-blue pb-2'>
            Information
          </span>
          {information.map((item) => (
            <div key={item.name}>
              <Link
                to={item.link}
                className='text-gray-600 hover:text-primary-blue transition-colors'
              >
                <h1 className='text-base'>{item.name}</h1>
              </Link>
            </div>
          ))}
        </div>

        {/* Customer Service Section */}
        <div className='flex flex-col gap-4'>
          <span className='font-bold text-lg border-b-2 border-primary-blue pb-2'>
            Customer Service
          </span>
          {customerService.map((item) => (
            <div key={item.name}>
              <Link
                to={item.link}
                className='text-gray-600 hover:text-primary-blue transition-colors'
              >
                <h1 className='text-base'>{item.name}</h1>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Copyright Section */}
      <div className='mt-8 pt-6 border-t text-center text-gray-500'>
        <p>© {currentYear} Frannem Industries. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
