import { useEffect, useState } from 'react';
import { useAppContext } from '../hooks/useAppContext';
import { Product } from '../types/type';
import ProductCard from '../components/ProductCard';

function AllProducts() {
  const { products, searchQuery } = useAppContext();
  const [filteredProduct, setFilteredProduct] = useState<Product[]>([]);

  useEffect(() => {
    if (searchQuery.length > 0) {
      setFilteredProduct(
        products.filter((product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setFilteredProduct(products);
    }
  }, [products, searchQuery]);

  return (
    <div className="flex flex-col mt-16">
      <div className="flex flex-col items-end w-max">
        <p className="text-2xl font-medium uppercase">All Products</p>
        <div className="w-16 h-0.5 bg-primary rounded-full"></div>
      </div>

      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-6 mt-6 '>{filteredProduct.filter((product) => product.inStock).map((item,index)=>(
        <ProductCard key={index} product={item}/>
      ))}</div>
    </div>
  );
}

export default AllProducts;
