import { useState, useEffect } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { details, navLinks } from "../utils/data";
import { logo } from "../assets/index";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    // Close search if menu is opened
    if (!isMenuOpen) setIsSearchOpen(false);
  };

  // Toggle search on mobile
  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    // Close menu if search is opened
    if (!isSearchOpen) setIsMenuOpen(false);
  };

  // Toggle account dropdown
  const toggleAccountDropdown = () => {
    setIsAccountDropdownOpen(!isAccountDropdownOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isAccountDropdownOpen && !event.target.closest('.account-dropdown-container')) {
        setIsAccountDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isAccountDropdownOpen]);

  return (
    <header
      className={`flex flex-col sticky top-0 z-50 w-full border-b-2 bg-white transition-all duration-300 ${
        scrolled ? "shadow-md" : ""
      }`}
    >
      {/* Top bar */}
      <div className='w-full bg-primary-blue h-[50px] flex items-center justify-between p-4 px-4 md:px-16'>
        <div className='text-white flex items-center gap-2 text-xs md:text-base'>
          <Icon icon={"ic:outline-phone"} />
          <p className='cursor-pointer hidden sm:block'>
            CALL TO ORDER - {details.number}
          </p>
          <a href={`tel:${details.number}`} className='sm:hidden'>
            {details.number}
          </a>
        </div>
        <div className='text-white flex items-center gap-4'>
          <a
            href='https://instagram.com'
            target='_blank'
            rel='noopener noreferrer'
            aria-label='Instagram'
          >
            <Icon
              className='text-xl hover:text-gray-200 transition-colors'
              icon={"mdi:instagram"}
            />
          </a>
          <a
            href='https://facebook.com'
            target='_blank'
            rel='noopener noreferrer'
            aria-label='Facebook'
          >
            <Icon
              className='text-xl hover:text-gray-200 transition-colors'
              icon={"mdi:facebook"}
            />
          </a>
          <a
            href='https://twitter.com'
            target='_blank'
            rel='noopener noreferrer'
            aria-label='Twitter'
          >
            <Icon
              className='text-xl hover:text-gray-200 transition-colors'
              icon={"mdi:twitter"}
            />
          </a>
        </div>
      </div>

      {/* Main header */}
      <div className='mt-2 flex flex-wrap items-center justify-between px-4 md:px-16 py-2'>
        {/* Logo */}
        <div className='w-[120px] h-[60px] md:w-[180px] md:h-[90px] lg:w-[220px] lg:h-[110px]'>
          <Link to='/'>
            <img
              className='w-full h-full object-contain cursor-pointer'
              src={logo}
              alt='Frannem Logo'
            />
          </Link>
        </div>

        {/* Search bar - hidden on mobile, shown on tablet and up */}
        <div className='hidden md:flex border rounded-2xl w-full md:w-[400px] lg:w-[580px] h-[60px] bg-white items-center justify-center px-4 my-3 md:my-0 order-3 md:order-2'>
          <Icon
            className='text-2xl lg:text-4xl text-gray-300'
            icon={"ic:outline-search"}
          />
          <input
            className='outline-none rounded-xl w-full h-full border-none px-4 lg:px-8 py-4'
            type='text'
            placeholder='Search product, category or brand'
            aria-label='Search'
          />
        </div>

        {/* Account and Cart */}
        <div className='flex items-center gap-4 md:gap-8 order-2 md:order-3'>
          {/* Search icon for mobile */}
          <button
            className='md:hidden text-2xl'
            onClick={toggleSearch}
            aria-label='Search'
          >
            <Icon icon={"ic:outline-search"} />
          </button>
          
          <div className='account-dropdown-container flex items-center gap-2 cursor-pointer relative'>
            <div 
              className='flex items-center gap-2'
              onClick={toggleAccountDropdown}
            >
              <Icon
                className='text-2xl md:text-3xl'
                icon={"codicon:account"}
              />
              <p className='hidden sm:block'>Account</p>
              <Icon
                className={`hidden sm:block transition-transform ${isAccountDropdownOpen ? 'rotate-180' : ''}`}
                icon={"iconamoon:arrow-down-2"}
              />
            </div>
            {/* Dropdown menu for account */}
            {isAccountDropdownOpen && (
              <div className='absolute top-full right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-10'>
                <div className='py-2 px-4 hover:bg-gray-100'>
                  <Link to='/login' className='block' onClick={() => setIsAccountDropdownOpen(false)}>
                    Login
                  </Link>
                </div>
                <div className='py-2 px-4 hover:bg-gray-100'>
                  <Link to='/register' className='block' onClick={() => setIsAccountDropdownOpen(false)}>
                    Register
                  </Link>
                </div>
                <div className='py-2 px-4 hover:bg-gray-100'>
                  <Link to='/profile' className='block' onClick={() => setIsAccountDropdownOpen(false)}>
                    My Profile
                  </Link>
                </div>
                <div className='py-2 px-4 hover:bg-gray-100'>
                  <Link to='/orders' className='block' onClick={() => setIsAccountDropdownOpen(false)}>
                    My Orders
                  </Link>
                </div>
              </div>
            )}
          </div>
          <div className='flex items-center gap-2 cursor-pointer relative'>
            <Icon
              className='text-2xl md:text-3xl'
              icon={"mdi:cart-outline"}
            />
            <p className='hidden sm:block'>Cart</p>
            <span className='absolute -top-2 -right-2 bg-primary-blue text-white text-xs rounded-full w-5 h-5 flex items-center justify-center'>
              0
            </span>
          </div>

          {/* Mobile menu button */}
          <button
            className='md:hidden text-2xl ml-2'
            onClick={toggleMenu}
            aria-label='Toggle menu'
          >
            <Icon icon={isMenuOpen ? "mdi:close" : "mdi:menu"} />
          </button>
        </div>
      </div>

      {/* Mobile search bar - only shown when search icon is clicked */}
      {isSearchOpen && (
        <div className='md:hidden px-4 pb-3 animate-fadeIn'>
          <div className='flex border rounded-2xl h-[50px] bg-white items-center justify-center px-4'>
            <Icon
              className='text-2xl text-gray-300'
              icon={"ic:outline-search"}
            />
            <input
              className='outline-none rounded-xl w-full h-full border-none px-4 py-4'
              type='text'
              placeholder='Search...'
              aria-label='Search'
              autoFocus
            />
            <button 
              onClick={() => setIsSearchOpen(false)}
              aria-label="Close search"
            >
              <Icon icon="mdi:close" className="text-xl text-gray-500" />
            </button>
          </div>
        </div>
      )}

      {/* Navigation links - desktop */}
      <nav className='hidden md:flex justify-center bg-gray-50 py-3 px-4 md:px-16'>
        <ul className='flex space-x-8'>
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                to={link.link}
                className={`font-medium hover:text-primary-blue transition-colors ${
                  location.pathname === link.link
                    ? "text-primary-blue border-b-2 border-primary-blue pb-1"
                    : "text-gray-700"
                }`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile navigation menu */}
      {isMenuOpen && (
        <nav className='md:hidden bg-white border-t animate-slideDown'>
          <ul className='flex flex-col'>
            {navLinks.map((link) => (
              <li key={link.name} className='border-b'>
                <Link
                  to={link.link}
                  className={`block py-3 px-4 ${
                    location.pathname === link.link
                      ? "text-primary-blue font-medium"
                      : "text-gray-700"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
