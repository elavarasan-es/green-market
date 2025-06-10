/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAppContext } from '../hooks/useAppContext';
import { Product } from '../types/type';
import ProductCard from './ProductCard';

function ProductInfo() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { products, currency, addToCart } = useAppContext();
  const [relatedProducts, setRelatedProducts] = useState<Product[] | null>(
    null
  );
  const product = products.find((product) => product._id === id);

  const [thumbnail, setThumbnail] = React.useState<string>('');

  useEffect(() => {
    if (products.length > 0) {
      let productsCopy = products.slice();
      productsCopy = productsCopy.filter(
        (item) => product?.category === item.category
      );
      setRelatedProducts(productsCopy.slice(0, 5));
    }
  }, [products]);

  useEffect(() => {
    setThumbnail(product?.image[0] ? product?.image[0] : '');
  }, [product]);

  return (
    product && (
      <div className="mt-14">
        <p>
          <Link to={'/'}>Home</Link> /<Link to={'/products'}> Products</Link> /
          <Link to={`/products/${product.category.toLowerCase()}`}>
            {product.category}
          </Link>{' '}
          /<span className="text-primary"> {product.name}</span>
        </p>

        <div className="flex flex-col md:flex-row gap-16 mt-4">
          <div className="flex gap-3">
            <div className="flex flex-col gap-3">
              {product.image.map((image, index) => (
                <div
                  key={index}
                  onClick={() => setThumbnail(image)}
                  className="border max-w-24 border-gray-500/30 rounded overflow-hidden cursor-pointer"
                >
                  <img src={image} alt={`Thumbnail ${index + 1}`} />
                </div>
              ))}
            </div>

            <div className="border border-gray-500/30 max-w-100 rounded overflow-hidden">
              <img src={thumbnail} alt="Selected product" />
            </div>
          </div>

          <div className="text-sm w-full md:w-1/2">
            <h1 className="text-3xl font-medium">{product.name}</h1>

            <div className="flex items-center gap-0.5">
              {Array(5)
                .fill('')
                .map((_, i) => (
                  <img
                    className="md:w-3.5 w-3"
                    key={i}
                    src={i < 4 ? assets.star_icon : assets.star_dull_icon}
                  />
                ))}
              <p>(4)</p>

              <div className="text-red-500">
                {!product.inStock ? 'out of stock' : null}
              </div>
            </div>

            <div className="mt-6">
              <p className="text-gray-500/70 line-through">
                MRP: {currency}
                {product.price}
              </p>
              <p className="text-2xl font-medium">
                MRP: {currency}
                {product.offerPrice}
              </p>
              <span className="text-gray-500/70">(inclusive of all taxes)</span>
            </div>

            <p className="text-base font-medium mt-6">About Product</p>
            <ul className="list-disc ml-4 text-gray-500/70">
              {product.description.map((desc, index) => (
                <li key={index}>{desc}</li>
              ))}
            </ul>

            <div className="flex items-center mt-10 gap-4 text-base">
              <button
                onClick={() => {
                  addToCart(product._id);
                }}
                className="w-full py-3.5 cursor-pointer font-medium bg-gray-100 text-gray-800/80 hover:bg-gray-200 transition"
              >
                Add to Cart
              </button>
              <button
                onClick={() => {
                  addToCart(product._id);
                  navigate('/cart');
                }}
                className="w-full py-3.5 cursor-pointer font-medium bg-primary text-white hover:bg-primary-dull transition"
              >
                Buy now
              </button>
            </div>
          </div>
        </div>
        {/* related products */}
        <div className="mt-24 flex flex-col items-center">
          <div className="flex flex-col items-end w-max">
            <p className="text-2xl md:text-3xl font-medium">Related Products</p>
            <div className="w-20 h-0.5 bg-primary rounded-full mt-2"></div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-6 mt-6 ">
            {relatedProducts?.map((item, index) => (
              <ProductCard key={index} product={item} />
            ))}
          </div>

          <button
            onClick={() => {
              navigate(`/products/${product.category.toLowerCase()}`);
            }}
            className="mx-auto cursor-pointer px-12 py-2.5 text-primary rounded border-2 border-primary transition hover:bg-primary-dull my-16 hover:text-white"
          >
            See more
          </button>
        </div>
      </div>
    )
  );
}

export default ProductInfo;
