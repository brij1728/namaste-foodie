import { MenuItemCard } from '../MenuItemCard';
import React from 'react';
import { useSelector } from 'react-redux';

export const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  return (
    <div className=" m-4 p-4">
      <h2 className="text-2xl font-bold">Cart</h2>
	  <div>
		{cartItems.map((item) => (
			<MenuItemCard key={item.card.info.id} item={item} />
		))}
	  </div>
    </div>
  );
};
