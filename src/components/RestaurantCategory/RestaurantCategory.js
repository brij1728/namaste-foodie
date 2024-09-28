import { FaAngleDown, FaAngleUp } from 'react-icons/fa6';

import { MenuItemCard } from '../MenuItemCard';
import React from 'react';

export const RestaurantCategory = ({ title, item, isOpen, onToggle }) => {
	const handleToggle = () => {
		onToggle();
	}
  return (
    <div className="mb-4 bg-white shadow-xl w-full p-4">
      <h1
        className="text-xl font-bold cursor-pointer py-2 flex justify-between items-center"
        onClick={handleToggle}
      >
        <span>
          {title} ({item?.length || 0})
        </span>
        <span>{isOpen ? <FaAngleUp /> : <FaAngleDown />}</span>
      </h1>
      {isOpen && (
        <div className="pl-4">
          {item?.map((menuItem, index) => (
            <div key={menuItem.card.info.id}>
              <MenuItemCard item={menuItem} />
              {index < item.length - 1 && (
                <hr className="border-t border-gray-200 my-4" />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
