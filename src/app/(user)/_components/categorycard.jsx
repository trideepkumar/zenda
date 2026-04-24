const CategoryCard = ({ name, img }) => {
  return (
    <div className="group flex flex-col items-center min-w-[90px] cursor-pointer">
      
      <div className="relative w-20 h-20 rounded-2xl overflow-hidden shadow-md bg-gray-100 
                      transition-all duration-300 group-hover:shadow-xl group-hover:scale-105">

        <img
          src={img}
          alt={name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent 
                        opacity-0 group-hover:opacity-100 transition duration-300" />
      </div>

      <p className="text-xs text-center mt-2 font-medium text-gray-700 group-hover:text-black">
        {name}
      </p>
    </div>
  );
};

export default CategoryCard;