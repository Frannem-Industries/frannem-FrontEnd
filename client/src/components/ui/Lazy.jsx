import React from 'react';

const Lazy = ({ items = 8, gridCols = "grid-cols-2 md:grid-cols-3 lg:grid-cols-4" }) => {
  return (
    <div className={`w-full grid ${gridCols} gap-4 p-4`}>
      {Array(items).fill(0).map((_, index) => (
        <div key={index} className="animate-pulse flex flex-col border rounded-lg overflow-hidden shadow-sm">
          {/* Image placeholder */}
          <div className="h-48 bg-gray-200 w-full"></div>
          
          {/* Content placeholders */}
          <div className="p-3 space-y-3">
            {/* Title placeholder */}
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            
            {/* Price and availability placeholders */}
            <div className="flex justify-between items-center">
              <div className="h-5 bg-gray-200 rounded w-1/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Lazy;
