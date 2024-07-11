"use client";
import Navbar from "@/components/Navbar";
import React from "react";

const page = () => {
  return (
    <div>
      <Navbar />
      <div className="flex">
        <div className="w-1/4 flex-shrink-0 ">
          <div className="py-5">
            <h1 className="text-3xl text-purple font-bold text-center">Add Data</h1>
            <form className="flex flex-col items-start px-10 py-10">
              <div className="mb-4">
                <label
                  htmlFor="first_name"
                  className="block mb-2 text-sm font-bold text-purple"
                >
                  Enter class name (Ex: 9B)
                </label>
                <input
                  type="text"
                  className="px-4 py-2 border-2 text-black border-purple rounded-lg focus:outline-none focus:ring-2 focus:ring-purple"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="room_capacity"
                  className="block mb-2 text-sm font-bold text-purple"
                >
                  Room Capacity
                </label>
                <select
                  id="room_capacity"
                  className="px-4 py-2 border-2 text-black border-purple rounded-lg focus:outline-none focus:ring-2 focus:ring-purple"
                >
                  <option value="25">25</option>
                  <option value="50">50</option>
                  <option value="75">75</option>
                  <option value="100">100</option>
                </select>
              </div>
              <button
                type="button"
                className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800  rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              >
                Add Data
              </button>
            </form>
          </div>
        </div>
        <div className="w-3/4 flex-shrink-0 bg-blue">Table</div>
      </div>
    </div>
  );
};

export default page;
