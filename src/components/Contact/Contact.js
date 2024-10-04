import React from 'react';

export const Contact = () => {
  return (
    <div>
      <h1 className="font-bold text-3xl p-4 m-4">Contact</h1>
      <form className="p-4 m-4 flex flex-col w-full md:flex-row ">
        <input type="text" placeholder="Name" className="border p-2 m-2" />
        <input type="email" placeholder="Email" className="border p-2 m-2" />
        <textarea placeholder="Message" className="border p-2 m-2"></textarea>
        <button type="submit" className="border p-2 m-2 bg-gray-100 rounded-lg ">
          Submit
        </button>
      </form>
    </div>
  );
};
