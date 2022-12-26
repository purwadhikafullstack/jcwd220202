import React, { useState } from "react";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { useEffect } from "react";
import { axiosInstance } from "../api";

const LineChartSuperAdmin = () => {
  const [graphData, setGraphData] = useState([]);
  const [graphLabel, setGraphLabel] = useState([]);

  const fetchGraphData = async () => {
    try {
      const response = await axiosInstance.get("/admin-sales/gross-income");

      setGraphData(response.data.dataSet);
      setGraphLabel(response.data.label);
    } catch (error) {
      console.log(error);
    }
  };

  const labels = graphLabel;

  const data = {
    labels: labels,
    datasets: [
      {
        label: "All Branch Average Gross Income (In Rupiah)",
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        data: graphData,
      },
    ],
  };

  useEffect(() => {
    fetchGraphData();
  }, []);

  return (
    <Line
      data={data}
      options={{
        responsive: true,
        maintainAspectRatio: false,
      }}
    />
  );
};

export default LineChartSuperAdmin;
