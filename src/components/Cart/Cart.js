import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { MenuItemCard } from '../MenuItemCard';
import { clearCart } from '../../redux/slices/cartSlice';

export const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  //console.log('cartItems', cartItems);
  const dispatch = useDispatch();
  const [isClearing, setIsClearing] = useState(false);

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear the cart?')) {
      setIsClearing(true);
      setTimeout(() => {
        dispatch(clearCart());
        setIsClearing(false);
      }, 500);
    }
  };

  return (
    <div className="m-4 p-4">
      <h2 className="text-2xl font-bold">Cart</h2>
      {cartItems.length > 0 ? (
        <>
          <button
          data-testid="clear-cart"
            onClick={handleClearCart}
            className="bg-red-500 text-white font-semibold px-4 py-2 rounded-md shadow-lg hover:bg-red-600 transition-colors duration-200"
          >
            {isClearing ? 'Clearing...' : 'Clear Cart'}
          </button>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {cartItems.map((item) => (
              <MenuItemCard key={item?.card?.info?.id || item.id} item={item} />
            ))}
          </div>
        </>
      ) : (
        <p className="text-center text-gray-500 mt-4">Your cart is empty.</p>
      )}
    </div>
  );
};
