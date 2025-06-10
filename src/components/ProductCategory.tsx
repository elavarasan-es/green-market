import { useEffect } from 'react';
import { useAppContext } from '../hooks/useAppContext';
import { useParams } from 'react-router-dom';
import { categories } from '../assets/assets';
import ProductCard from './ProductCard';

function ProductCategory() {
  const { products } = useAppContext();
  const { category } = useParams();

  const searchCategory = categories.find(
    (item) => item.path?.toLowerCase() === category
  );
  const filteredCategory = products.filter(
    (product) => product?.category?.toLowerCase() === category?.toLowerCase()
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      {searchCategory && (
        <div className="flex flex-col mt-16">
          <div className="flex flex-col items-end w-max">
            <p className="text-2xl font-medium uppercase">
              {' '}
              {searchCategory.path.toUpperCase()}
            </p>
            <div className="w-16 h-0.5 bg-primary rounded-full"></div>
          </div>

          {filteredCategory.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-6 mt-6 ">
              {filteredCategory.map((item, index) => (
                <ProductCard key={index} product={item} />
              ))}
            </div>
          ) : (
            <div className='flex items-center justify-center h-[60vh]'>No Products found in this category.</div>
          )}
        </div>
      )}
    </div>
  );
}

export default ProductCategory;
