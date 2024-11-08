"use client";
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExpand, faTimes } from '@fortawesome/free-solid-svg-icons';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";

class Custom_div extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: false,
            chart: null, // Store the amCharts chart instance
        };
    }

    componentDidUpdate(prevProps) {
        // Check if chartConfig prop has changed
        if (prevProps.chartConfig !== this.props.chartConfig) {
            this.renderChart();
        }
    }

    componentWillUnmount() {
        // Dispose of the chart instance on unmount
        if (this.state.chart) {
            this.state.chart.dispose();
        }
    }

    renderChart = () => {
        const { chartConfig } = this.props;
        const chartId = `chartdiv-${this.props.divIndex}`;

        // Dispose of existing chart instance if any
        if (this.state.chart) {
            this.state.chart.dispose();
        }

        if (chartConfig) {
            let chart;
            const baseColor = am4core.color(chartConfig.color); // Use selected color as base

            if (chartConfig.chartType === "line") {
                chart = am4core.create(chartId, am4charts.XYChart);
                if (chart.logo) {
                    chart.logo.disabled = true;
                }
                const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
                categoryAxis.dataFields.category = "category";

                const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

                const series = chart.series.push(new am4charts.LineSeries());
                series.dataFields.valueY = "value";
                series.dataFields.categoryX = "category";
                series.stroke = baseColor;

            } else if (chartConfig.chartType === "bar") {
                chart = am4core.create(chartId, am4charts.XYChart);
                if (chart.logo) {
                    chart.logo.disabled = true;
                }
                const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
                categoryAxis.dataFields.category = "category";

                const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

                const series = chart.series.push(new am4charts.ColumnSeries());
                series.dataFields.valueY = "value";
                series.dataFields.categoryX = "category";

                // Apply color variations using ColorSet
                const colorSet = new am4core.ColorSet();
                colorSet.baseColor = baseColor;
                colorSet.stepOptions = { lightness: 0.2, hue: 0 }; // Adjust lightness
                colorSet.passOptions = {}; // Use same hue
                series.columns.template.adapter.add("fill", (fill, target) => colorSet.getIndex(target.dataItem.index));

            } else if (chartConfig.chartType === "pie") {
                chart = am4core.create(chartId, am4charts.PieChart);
                if (chart.logo) {
                    chart.logo.disabled = true;
                }
                const pieSeries = chart.series.push(new am4charts.PieSeries());
                pieSeries.dataFields.value = "value";
                pieSeries.dataFields.category = "category";

                // Apply color variations using ColorSet
                const colorSet = new am4core.ColorSet();
                colorSet.baseColor = baseColor;
                colorSet.stepOptions = { lightness: 0.2, hue: 0 }; // Adjust lightness for variations
                colorSet.passOptions = {};
                pieSeries.slices.template.adapter.add("fill", (fill, target) => colorSet.getIndex(target.dataItem.index));
            }

            // Add data
            chart.data = [
                { category: "2021-01", value: 120 },
                { category: "2021-02", value: 200 },
                { category: "2021-03", value: 150 },
            ];

            this.setState({ chart, title: chartConfig.title });
        }
    };


    toggleExpand = () => {
        this.setState((prevState) => ({
            expanded: !prevState.expanded,
        }));
    };

    render() {
        const { expanded, title } = this.state;
        const { openChartPopup, chartConfig, removeChart } = this.props;
        const chartId = `chartdiv-${this.props.divIndex}`;

        return (
            <div
                className="border border-gray-300 rounded-lg shadow-md flex flex-col justify-start items-center p-4 w-full sm:w-full md:w-[49%] relative bg-white h-[42vh] opacity-70"
                style={{
                    height: expanded ? '81.8%' : '',
                    width: expanded ? '83%' : '',
                    position: expanded ? 'fixed' : '',
                    zIndex: expanded ? '999' : '',
                    opacity: expanded ? '1' : '',
                }}
            >
                <div className="absolute top-2 left-4 text-gray-500 font-semibold text-lg mb-2">{title}</div>
                <div
                    className="absolute top-2 right-8 mt-2 mr-4 cursor-pointer text-black z-50"
                    onClick={this.toggleExpand}
                >
                    <FontAwesomeIcon icon={faExpand} />
                </div>
                <div
                    className="absolute top-2 right-4 mt-2 cursor-pointer text-black z-50"
                    onClick={removeChart}
                >
                    <FontAwesomeIcon icon={faTimes} />
                </div>

                {/* Center the "+" button and text */}
                {!chartConfig && (
                    <div className="absolute flex flex-col items-center justify-center h-[90%] w-full">
                        <div
                            className="w-20 h-20 flex items-center justify-center bg-gray-200 rounded-full text-6xl text-gray-400 mb-4 pb-2 cursor-pointer"
                            onClick={openChartPopup}
                        >
                            +
                        </div>
                        <div className="text-gray-400 italic">To view a Chart, select a Chart</div>
                    </div>
                )}

                {/* Render the chart container */}
                <div id={chartId} className="w-[100%] h-[95%] mt-5"></div>
            </div>
        );
    }
}

export default Custom_div;
