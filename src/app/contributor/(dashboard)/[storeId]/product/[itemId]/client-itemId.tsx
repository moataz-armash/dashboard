import React from "react";
import Image from "next/image";

export default function ClientItemId({ product }) {
  const {
    availableQuantity,
    discounted,
    discountedPrice,
    imageUrl,
    price,
    productBrand,
    productCategory,
    productName,
  } = product;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex justify-center items-center">
          {/* Product Image */}
          <div className="w-full h-96 bg-gray-200 flex justify-center items-center">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={productName}
                width={400}
                height={400}
                className="object-contain"
              />
            ) : (
              <span className="text-gray-500">No image available</span>
            )}
          </div>
        </div>

        <div className="space-y-6">
          {/* Product Name */}
          <h1 className="text-3xl font-semibold">{productName}</h1>

          {/* Product Brand */}
          <p className="text-lg text-gray-600">{productBrand}</p>

          {/* Product Category */}
          <p className="text-lg text-gray-500">{productCategory}</p>

          {/* Price */}
          <div className="flex items-center space-x-4">
            {discounted ? (
              <>
                <span className="text-xl text-gray-500 line-through">
                  ${price.toFixed(2)}
                </span>
                <span className="text-xl font-semibold text-red-500">
                  ${discountedPrice.toFixed(2)}
                </span>
              </>
            ) : (
              <span className="text-xl font-semibold">${price.toFixed(2)}</span>
            )}
          </div>

          {/* Available Quantity */}
          <p className="text-lg text-gray-600">
            Available Quantity: {availableQuantity}
          </p>

          {/* Add to Cart Button */}
          <button
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
            disabled={availableQuantity === 0}
          >
            {availableQuantity > 0 ? "Add to Cart" : "Out of Stock"}
          </button>
        </div>
      </div>
    </div>
  );
}
