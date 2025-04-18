import { useEffect, useState } from 'react'
import { getProducts } from '../utils/sanity';

const ProductPage = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    getProducts().then(setProducts)
  }, [])

  return (
    <div>
     <span className='font-2xl font-bold'>Shop By Category</span>
      {/* {products.map(product => (
        <div key={product._id}>
          <img src={product.imageUrl} alt={product.title} />
          <h2>{product.title}</h2>
          <p>{product.price} NGN</p>
          <p>{product.description}</p>
        </div>
      ))} */}
    </div>
  )
}

export default ProductPage
