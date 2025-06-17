import React from "react";
import "../styles/Extra.css";

const chartExamples = [
  {
    title: "Sales Line Chart",
    description: "Track monthly sales trends using a clear and simple line chart. Ideal for visualizing continuous data over time.",
    image: "https://cdn.pixabay.com/photo/2018/02/27/17/40/graph-3186081_1280.png"
  },
  {
    title: "Product Comparison Bar Chart",
    description: "Compare performance across multiple products using bar charts. Helps in identifying top performers.",
    image: "https://cdn.pixabay.com/photo/2017/12/22/08/01/business-3033199_1280.jpg"
  },
  {
    title: "Market Share Pie Chart",
    description: "Display category-wise distribution of market share in a visual pie chart format.",
    image: "https://cdn.pixabay.com/photo/2022/12/15/20/10/pie-chart-7658449_1280.jpg"
  }
];

const ExtraContent = () => {
  return (
    <div className="extra-container">
      <h1 className="extra-title">Excel Analytics - Chart Examples</h1>
      {chartExamples.map((chart, index) => (
        <div key={index} className="chart-card">
          <h2>{chart.title}</h2>
          <img src={chart.image} alt={chart.title} />
          <p>{chart.description}</p>
        </div>
      ))}
    </div>
  );
};

export default ExtraContent;
