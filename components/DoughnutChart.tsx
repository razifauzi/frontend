'use client'

import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend);

interface DoughnutChartProps {
  income: number;
  expenses: number;
}

const DoughnutChart = ({ income, expenses }: DoughnutChartProps) => {
  const accountNames = ['Income', 'Expenses'];
  const balances = [income, expenses];

  const data = {
    datasets: [
      {
        label: 'Banks',
        data: balances,
        backgroundColor: ['#0747b6', '#2265d8'],
      }
    ],
    labels: accountNames
  };

  return (
    <Doughnut
      data={data}
      options={{
        cutout: '60%',
        plugins: {
          legend: {
            display: false
          }
        }
      }}
    />
  );
};

export default DoughnutChart;
