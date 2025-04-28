import { useState, useEffect } from "react";
import { getProductsByCategory } from "../../utils/sanity";
import FacialCleaner from "../categories/FacialCleaner";
import BathAndLaundry from "../categories/BathAndLaundry";
import HairProduct from "../categories/HairProduct";
import Lotion from "../categories/Lotion";
import KidsProducts from "../categories/KidsProducts";
import Lazy from "../ui/Lazy";

const Category = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [categoryProducts, setCategoryProducts] = useState({
    facial: [],
    bath: [],
    hair: [],
    lotion: [],
    kids: [],
  });

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      setIsLoading(true);
      try {
        const [
          facialProducts,
          bathProducts,
          hairProducts,
          lotionProducts,
          kidsProducts,
        ] = await Promise.all([
          getProductsByCategory("facial-cleanser"),
          getProductsByCategory("bath-and-laundry"),
          getProductsByCategory("hair-product"),
          getProductsByCategory("lotion"),
          getProductsByCategory("kids-products"),
        ]);
        setCategoryProducts({
          facial: facialProducts,
          bath: bathProducts,
          hair: hairProducts,
          lotion: lotionProducts,
          kids: kidsProducts,
        });
      } catch (error) {
        console.error("Error fetching category products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategoryProducts();
  }, []);

  return (
    <section className='mt-4 p-4 flex flex-col gap-4 justify-center items-center'>
      <div className='flex justify-center mb-4'>
        <span className='text-xl font-semibold'>Shop By Category</span>
      </div>
      {isLoading ? (
        <Lazy items={12} />
      ) : (
        <>
          <Lotion products={categoryProducts.lotion} />
          <FacialCleaner products={categoryProducts.facial} />
          <BathAndLaundry products={categoryProducts.bath} />
          <KidsProducts products={categoryProducts.kids} />
          <HairProduct products={categoryProducts.hair} />
        </>
      )}
    </section>
  );
};

export default Category;
