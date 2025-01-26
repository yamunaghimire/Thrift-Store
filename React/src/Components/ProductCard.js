// import React, { useContext } from "react";
// import { CartContext } from "../Features/ContextProvider";


// const ProductCard = ({ product }) => {
//   const {dispatch} = useContext(CartContext)

//   if (!product) return <div>Product data is not available</div>;
  
//   return (
//     <div > 
//       {/* Product Image */}
//       <div className=" overflow-hidden rounded-md">
//         <img
//           src={product.image || "/path/to/default-image.jpg"}
//           alt={product.name}
//           className="w-[330px] h-[300px] object-cover mb-4  transform transition-transform duration-300 hover:scale-105"
//         />
//       </div>

//       {/* Product Details */}
//       <div>
       

//         {/* Product Name */}
//         <h2 className="text-[18px] font-medium uppercase text-gray-800  ">
//           {product.name}
//         </h2>
//          <p>{product.description}</p>
//         {/* Product Price */}
//         <h3 className="text-lg font-semibold text-pink-500 ">Rs. {product.price}</h3>
        

//         {/* Add to Cart Button */}
        
      
//       </div>
//     </div>
//   );
// };

// export default ProductCard;
import React from "react";
import { Link } from "react-router-dom"; // Import Link for navigation


const ProductCard = ({ product }) => {
   if (!product) return <div>Product data is not available</div>;

  return (
    <div>
      {/* Product Image */}
      <div className="overflow-hidden rounded-md">
        <Link to={`/products/${product._id}`}>  

          <img
            src={product.image }
            alt={product.name}
            className="w-[330px] h-[300px] object-cover mb-4 transform transition-transform duration-300 hover:scale-105"
          />
        </Link>
      </div>

      {/* Product Details */}
      <div>
        {/* Product Name */}
        <h2 className="text-[18px] font-medium uppercase text-gray-800">
          {product.name}
        </h2>

        {/* Product Price */}
        <p className="text-lg font-semibold text-pink-500">Rs. {product.price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
