import React from 'react';
import { domainImageURL } from '../../constants/apiURL';

export const MenuItemCard = ({ item }) => {
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

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 rounded-lg  mb-4">
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

        <h3 className="text-lg font-semibold">{name}</h3>

        <div className="flex items-center mt-1">
          <p className="text-base font-semibold">
            ₹{(defaultPrice || price) / 100}
          </p>
          {firstOfferTag && (
            <div className="ml-2 flex items-center">
              <span className="text-gray-500">{firstOfferTag.title}</span>
              <span className="uppercase text-xs font-bold ml-1">
                {firstOfferTag.subTitle}
              </span>
            </div>
          )}
        </div>

        {rating && rating.rating && (
          <div className="flex items-center mt-2 text-green-600 text-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 fill-current"
              viewBox="0 0 24 24"
            >
              <path d="M12 2l2.971 6.021 6.625.959-4.798 4.68 1.132 6.606-5.93-3.118-5.93 3.118 1.132-6.606-4.798-4.68 6.625-.959z" />
            </svg>
            <span className="ml-1">{rating.rating}</span>
            <span className="ml-2 text-gray-500">({rating.ratingCountV2})</span>
          </div>
        )}

        <p className="text-sm text-gray-600 mt-2">{description}</p>
      </div>

      <div className="flex flex-col items-center mt-4 md:mt-0">
        <div className="relative">
          <img
            src={`${domainImageURL}/${imageId}`}
            alt={name}
            className="w-[156px] h-[144px] object-cover rounded-xl"
          />

          <button
            style={{ color: 'rgba(27, 166, 114, 1)' }}
            className="absolute bottom-0 right-4 w-[120px] bg-white text-[18px] font-[800] px-4 py-2 rounded-md cursor-pointer text-center uppercase shadow-xl"
          >
            ADD
          </button>
          <p
            className="mt-4 text-[13px] font-[200] text-center"
            style={{ color: 'rgba(2, 6, 12, 0.45);' }}
          >
            Customisable
          </p>
        </div>

        {isCustomisable && (
          <p className="text-xs text-gray-500 mt-1">Customisable</p>
        )}
      </div>
    </div>
  );
};
