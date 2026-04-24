const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-3 flex flex-col hover:shadow-md transition">

      {/* Image */}
      <div className="relative w-full h-36">
        <img
          src={`${product.img}?w=400&q=75`}
          srcSet={`
            ${product.img}?w=200&q=70 200w,
            ${product.img}?w=400&q=75 400w,
            ${product.img}?w=800&q=80 800w
          `}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover rounded-lg"
        />

        {/* Badge */}
        <span className="absolute top-2 left-2 bg-green-600 text-white text-[10px] px-2 py-1 rounded">
          10 min
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 mt-2">
        <h3 className="text-sm font-semibold line-clamp-2">
          {product.name}
        </h3>

        <p className="text-xs text-gray-500">{product.weight}</p>

        {/* Bottom Row */}
        <div className="flex items-center justify-between mt-auto gap-2">
          
          <span className="font-bold text-sm">₹{product.price}</span>

          <button className="px-3 py-1 text-xs font-semibold 
                             bg-green-500 text-white rounded-lg 
                             hover:bg-green-600 whitespace-nowrap">
            ADD
          </button>

        </div>
      </div>
    </div>
  );
};

export default ProductCard;