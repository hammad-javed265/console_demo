"use client";
import React, { useState } from 'react';

function ChartOptionsPopup({ closePopup, applyChartConfig, chartType }) {
  const [title, setTitle] = useState('');
  const [color, setColor] = useState('#4CAF50');
  const [selectedMeter, setSelectedMeter] = useState('');
  const [selectedParameter, setSelectedParameter] = useState('');

  const meters = ['Select All', 'Main LT', 'Water Treatment', 'Turbine 1', 'Syrup Room'];
  const parameters = ['Active Energy', 'Current', 'Power', 'Power Factor', 'Energy Losses'];

  const applyChart = () => {
    const chartConfig = {
      title,
      color,
      chartType, // Include the selected chart type
      selectedMeter,
      selectedParameter,
    };

    // Pass the configuration to the parent component to apply it to the selected div
    applyChartConfig(chartConfig);
    closePopup();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[400px] max-w-lg relative">
        <h2 className="text-center text-gray-700 font-semibold mb-4">Select Options for Chart</h2>
        
        <div className="mb-4">
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            placeholder="Add Title..." 
            className="border border-gray-300 rounded p-2 w-full mb-2 text-black"
          />
          <input 
            type="color" 
            value={color} 
            onChange={(e) => setColor(e.target.value)} 
            className="w-full h-10 p-1 rounded"
          />
        </div>

        <div className="flex justify-between gap-4 mb-4">
          <div className="w-1/2">
            <h3 className="text-gray-600 font-semibold text-sm mb-2">Select Meters</h3>
            <select 
              className="border border-gray-300 rounded p-2 w-full text-black" 
              onChange={(e) => setSelectedMeter(e.target.value)}
              value={selectedMeter}
            >
              {meters.map((meter, index) => (
                <option key={index} value={meter}>{meter}</option>
              ))}
            </select>
          </div>
          <div className="w-1/2">
            <h3 className="text-gray-600 font-semibold text-sm mb-2">Select Parameters</h3>
            <select 
              className="border border-gray-300 rounded p-2 w-full text-black" 
              onChange={(e) => setSelectedParameter(e.target.value)}
              value={selectedParameter}
            >
              {parameters.map((param, index) => (
                <option key={index} value={param}>{param}</option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={applyChart}
          className="w-full bg-blue-500 text-white font-semibold py-2 rounded mt-2 hover:bg-blue-600"
        >
          OK
        </button>
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

export default ChartOptionsPopup;
