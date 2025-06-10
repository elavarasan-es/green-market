import { useNavigate } from 'react-router-dom';
import { categories } from '../assets/assets';

function Categories() {
    const navigate = useNavigate()
  return (
    <div className="mt-16">
      <p className="text-2xl md:text-3xl font-medium">Categories</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-6 mt-6">
        {categories.map((item, index) => (
          <div
          onClick={()=>navigate(`/products/${item.path.toLowerCase()}`)}
            style={{ backgroundColor: item.bgColor }}
            key={index}
            className="group flex flex-col items-center justify-center rounded-lg gap-2 cursor-pointer px-3 py-5"
          >
            <img
              className="group-hover:scale-110 transition max-w-28"
              src={item.image}
              alt=""
            />
            <p className="text-sm font-medium">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Categories;
