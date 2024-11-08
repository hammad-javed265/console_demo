"use client";
import React from 'react';

function ChartPopup({ closePopup, openOptionsPopup }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-1/2 max-w-lg relative">
        <h2 className="text-center text-gray-700 font-semibold mb-4">Select Any Chart</h2>
        <div className="grid grid-cols-2 gap-4">
          <img
            src="PieChart.png"
            alt="Pie Chart"
            className="h-[160px] cursor-pointer"
            onClick={() => openOptionsPopup("pie")}
          />
          <img
            src="barchart.jpg"
            alt="Bar Chart"
            className="h-[160px] cursor-pointer"
            onClick={() => openOptionsPopup("bar")}
          />
          <img
            src="period.png"
            alt="Period Over Period Bar Chart"
            className="h-[160px] col-span-2 w-[65%] mx-auto cursor-pointer"
            onClick={() => openOptionsPopup("bar")}
          />
          <img
            src="barline1.jpg"
            alt="Comparison Trends Line Chart"
            className="h-[160px] col-span-2 w-[65%] mx-auto cursor-pointer"
            onClick={() => openOptionsPopup("line")}
          />
        </div>
        <button
          onClick={closePopup}
          className="absolute top-2 right-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-1 px-3 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default ChartPopup;
