import { addToCart, removeFromCart } from '../../redux/slices/cartSlice';
import { useDispatch, useSelector } from 'react-redux';

import React from 'react';
import { domainImageURL } from '../../constants/apiURL';

export const MenuItemCard = ({ item }) => {
  const dispatch = useDispatch();

  // Selector to get the current quantity from the cart
  const cartItems = useSelector((state) => state.cart.items);
  console.log('cartItems', cartItems);
  const quantity = cartItems.length || 0; // Get quantity from Redux store

  const {
    name,
    defaultPrice,
    price,
    description,
    imageId,
    isCustomisable,
    offerTags,
    itemAttribute,
    ratings,
  } = item.card.info;

  const firstOfferTag = offerTags && offerTags.length > 0 ? offerTags[0] : null;
  const vegClassifier = itemAttribute?.vegClassifier;
  const rating = ratings?.aggregatedRating;

  const handleAddItem = () => {
    dispatch(addToCart(item));
  };

  const handleRemoveItem = () => {
    if (quantity > 0) {
      dispatch(removeFromCart(item));
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 rounded-lg mb-4">
      <div className="flex-1">
        <div className="mb-1">
          {vegClassifier === 'VEG' ? (
            <div className="w-4 h-4 border-2 border-green-600 flex items-center justify-center">
              <div className="w-2 h-2 bg-green-600 rounded-full"></div>
            </div>
          ) : (
            <div className="w-4 h-4 border-2 border-red-600 flex items-center justify-center">
              <div className="w-2 h-2 bg-red-600 rounded-full"></div>
            </div>
          )}
        </div>

        <h3 className="text-lg font-semibold cursor-pointer">{name}</h3>

        <div className="flex items-center mt-1">
          <p className="text-base font-semibold cursor-pointer">
            ₹{(defaultPrice || price) / 100}
          </p>
          {firstOfferTag && (
            <div className="ml-2 flex items-center">
              <span className="text-gray-500 cursor-pointer">
                {firstOfferTag.title}
              </span>
              <span className="uppercase text-xs font-bold ml-1 cursor-pointer">
                {firstOfferTag.subTitle}
              </span>
            </div>
          )}
        </div>

        {rating && rating.rating && (
          <div className="flex items-center mt-2 text-green-600 text-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 fill-current cursor-pointer"
              viewBox="0 0 24 24"
            >
              <path d="M12 2l2.971 6.021 6.625.959-4.798 4.68 1.132 6.606-5.93-3.118-5.93 3.118 1.132-6.606-4.798-4.68 6.625-.959z" />
            </svg>
            <span className="ml-1 cursor-pointer">{rating.rating}</span>
            <span className="ml-2 text-gray-500 cursor-pointer">
              ({rating.ratingCountV2})
            </span>
          </div>
        )}

        <p className="text-sm text-gray-600 mt-2 cursor-pointer">
          {description}
        </p>
      </div>

      <div className="flex flex-col items-center mt-4 md:mt-0">
        <div className="relative z-10">
          <img
            src={`${domainImageURL}/${imageId}`}
            alt={name}
            className="w-[156px] h-[144px] object-cover rounded-xl cursor-pointer"
          />

          {/* Conditional rendering for ADD button and + / - buttons */}
          {quantity === 0 ? (
            <button
              className="w-[120px] bg-green-500 text-white text-[18px] font-bold px-4 py-2 rounded-md cursor-pointer text-center uppercase shadow-xl hover:bg-green-600 transition-colors duration-200"
              onClick={handleAddItem}
            >
              ADD
            </button>
          ) : (
            <div className="flex items-center justify-center mt-2">
              <button
                onClick={handleRemoveItem}
                className="bg-gray-300 text-gray-700 font-semibold px-3 py-2 rounded-l-md hover:bg-gray-400"
              >
                -
              </button>
              <div className="px-4 py-2 bg-white font-bold text-lg">
                {quantity}
              </div>
              <button
                onClick={handleAddItem}
                className="bg-gray-300 text-gray-700 font-semibold px-3 py-2 rounded-r-md hover:bg-gray-400"
              >
                +
              </button>
            </div>
          )}

          {isCustomisable && (
            <p
              className="mt-4 text-[13px] font-[200] text-center"
              style={{ color: 'rgba(2, 6, 12, 0.45)' }}
            >
              Customisable
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
