import { useState, useEffect } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { wav1, wav2, wav3 } from "../../assets";

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [wav1, wav2, wav3];

  // Auto-rotate carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [images.length]);

  // Manual navigation
  const goToSlide = (index) => {
    setCurrentImageIndex(index);
  };

  const nextSlide = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <section className="flex flex-col md:flex-row h-[550px] w-full overflow-hidden px-8 md:px-16">
      {/* Left side - Flash Sale */}
      <div className="w-full md:w-1/2 bg-primary-blue flex items-center justify-center">
        <div className="text-center px-8 py-12 max-w-md">
          <div className="inline-block bg-white text-primary-blue font-bold px-4 py-1 rounded-full mb-4 animate-pulse">
            Limited Time Offer
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Flash Sale
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-white/90 mb-6">
            Enjoy up to <span className="text-primary-orange">50% OFF</span> all skincare products
          </h2>
          <p className="text-white/80 mb-8">
            Revitalize your skin with our premium collection. Hurry, offer ends soon!
          </p>
          <button className="bg-primary-orange hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full transition-all transform hover:scale-105 flex items-center mx-auto">
            Shop Now
            <Icon icon="mdi:arrow-right" className="ml-2 text-xl" />
          </button>
          
          <div className="mt-8 flex justify-center space-x-6">
            <div className="text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg w-16 h-16 flex items-center justify-center mb-2">
                <span className="text-2xl font-bold text-white">24</span>
              </div>
              <span className="text-white/70 text-sm">Hours</span>
            </div>
            <div className="text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg w-16 h-16 flex items-center justify-center mb-2">
                <span className="text-2xl font-bold text-white">36</span>
              </div>
              <span className="text-white/70 text-sm">Minutes</span>
            </div>
            <div className="text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg w-16 h-16 flex items-center justify-center mb-2">
                <span className="text-2xl font-bold text-white">59</span>
              </div>
              <span className="text-white/70 text-sm">Seconds</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Carousel (now on the right) */}
      <div className="w-full md:w-1/2 relative">
        {/* Carousel container */}
        <div className="h-full relative overflow-hidden">
          {/* Images */}
          {images.map((image, index) => (
            <div
              key={index}
              className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
                index === currentImageIndex ? "opacity-100" : "opacity-0"
              }`}
            >
              <img
                src={image}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}

          {/* Navigation arrows with orange background */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-primary-orange hover:bg-orange-600 rounded-full p-2.5 transition-all shadow-lg"
            aria-label="Previous slide"
          >
            <Icon icon="mdi:chevron-left" className="text-2xl text-white" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-primary-orange hover:bg-orange-600 rounded-full p-2.5 transition-all shadow-lg"
            aria-label="Next slide"
          >
            <Icon icon="mdi:chevron-right" className="text-2xl text-white" />
          </button>

          {/* Dots indicator */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  index === currentImageIndex
                    ? "bg-primary-orange scale-125"
                    : "bg-white/70 hover:bg-white"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
