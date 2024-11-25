"use client";
import React, { useState } from 'react';

function ChartOptionsPopup({ closePopup, applyChartConfig, chartType }) {
  const [title, setTitle] = useState('');
  const [color, setColor] = useState('#4CAF50');
  const [selectedMeter, setSelectedMeter] = useState([]);
  const [selectedParameter, setSelectedParameter] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [periodOption, setPeriodOption] = useState('');
  const [showMeters, setShowMeters] = useState(false);
  const [showParameters, setShowParameters] = useState(false);

  const meters = ['Main LT', 'Water Treatment', 'Turbine 1', 'Syrup Room'];
  let parameters;
  const periodOptions = ['Today over Yesterday', 'This Week over Last Week', 'This Month over Last Month'];

  let meterMapping;
  let parameterMapping;
  meterMapping = {
    "Main LT": "U_2",
    "Water Treatment": "U_3",
    "Turbine 1": "U_4",
    "Syrup Room": "U_5"
  };
  if (chartType === "pie" || chartType === "bar" || chartType === "groupedBar") {
    parameters = ['Consumption'];
    parameterMapping = {
      "Consumption": "ACTIVE_ENERGY_IMPORT_KWH",
      // "Current": "CURRENT_TOTAL_A",
      // "Power": "POWER_TOTAL_A",
      // "Power Factor": "POWER_FACTOR_TOTAL_A",
    };
  } else {
    parameters = ['Consumption', 'Current', 'Power', 'Power Factor', 'Energy Losses'];
    parameterMapping = {
      "Consumption": "ACTIVE_ENERGY_IMPORT_KWH",
      "Current": "CURRENT_TOTAL_A",
      "Power": "POWER_TOTAL_A",
      "Power Factor": "POWER_FACTOR_TOTAL_A",
      "Energy Losses": "ENERGY_TOTAL_A"
    };
  }

  const handleMeterChange = (e) => {
    const meter = e.target.value;
    setSelectedMeter(prev =>
      prev.includes(meter) ? prev.filter(m => m !== meter) : [...prev, meter]
    );
  };

  const handleParameterChange = (e) => {
    setSelectedParameter(e.target.value);
  };

  const applyChart = () => {
    const chartConfig = {
      title,
      color,
      chartType,
      selectedMeter: selectedMeter.map(meter => meterMapping[meter]),
      selectedParameter: parameterMapping[selectedParameter],
      startDate,
      endDate,
      periodOption,
    };

    applyChartConfig(chartConfig);
    closePopup();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[400px] max-w-lg relative">
        <h2 className="text-center text-gray-700 font-semibold mb-4">Select Options for Chart</h2>

        {/* Title and color picker */}
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

        {/* Meters and Parameters dropdowns side by side */}
        <div className="flex justify-between gap-4 mb-4">
          {/* Meters Dropdown */}
          <div className="w-1/2">
            <h3 className="text-gray-600 font-semibold text-sm mb-2">Select Meters</h3>
            <div
              className="border border-gray-300 rounded p-2 w-full text-black relative"
              onMouseEnter={() => setShowMeters(true)}
              onMouseLeave={() => setShowMeters(false)}
            >
              <button className="w-full text-left flex items-center justify-between">
                {selectedMeter.length > 0 ? selectedMeter.join(', ') : 'Select Meters'}
                <span className='text-[13px]'>{showMeters ? '△' : '▽'}</span>
              </button>
              {showMeters && (
                <div className="absolute top-full left-0 w-full bg-white border mt-0 z-10">
                  {meters.map((meter) => (
                    <label key={meter} className="block p-2 hover:bg-gray-100">
                      <input
                        type={`${chartType === "groupedBar" ? "radio" : "checkbox"}`}
                        value={meter}
                        checked={selectedMeter.includes(meter)}
                        onChange={(e) => {
                          if (chartType === "groupedBar") {
                            // Only allow one meter to be selected for groupedBar charts
                            setSelectedMeter([meter]);
                          } else {
                            // Toggle selection for checkboxes
                            handleMeterChange(e);
                          }
                        }}
                      />
                      {meter}
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Parameters Dropdown */}
          <div className="w-1/2">
            <h3 className="text-gray-600 font-semibold text-sm mb-2">Select Parameters</h3>
            <div
              className="border border-gray-300 rounded p-2 w-full text-black relative"
              onMouseEnter={() => setShowParameters(true)}
              onMouseLeave={() => setShowParameters(false)}
            >
              <button className="w-full text-left flex items-center justify-between">
                {selectedParameter || 'Select Parameter'}
                <span className='text-[13px]'>{showParameters ? '△' : '▽'}</span>
              </button>
              {showParameters && (
                <div className="absolute top-full left-0 w-full bg-white border mt-0 z-10">
                  {parameters.map((param) => (
                    <label key={param} className="block p-2 hover:bg-gray-100">
                      <input
                        type="radio"
                        name="parameter"
                        value={param}
                        checked={selectedParameter === param}
                        onChange={handleParameterChange}
                      />
                      {param}
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Show period options for groupedBar chart only */}
        {chartType === "groupedBar" ? (
          <div className="mb-4">
            <h3 className="text-gray-600 font-semibold text-sm mb-2">Select Period Comparison</h3>
            <select
              className="border border-gray-300 rounded p-2 w-full text-black"
              onChange={(e) => setPeriodOption(e.target.value)}
              value={periodOption}
            >
              <option value="">Select a Period</option>
              {periodOptions.map((option, index) => (
                <option key={index} value={option}>{option}</option>
              ))}
            </select>
          </div>
        ) : (
          // Start and End Date Pickers for other charts
          <div className="flex justify-between gap-4 mb-4">
            <div className="w-1/2">
              <h3 className="text-gray-600 font-semibold text-sm mb-2">Start Date</h3>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="border border-gray-300 rounded p-2 w-full text-black"
              />
            </div>
            <div className="w-1/2">
              <h3 className="text-gray-600 font-semibold text-sm mb-2">End Date</h3>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="border border-gray-300 rounded p-2 w-full text-black"
              />
            </div>
          </div>
        )}

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
