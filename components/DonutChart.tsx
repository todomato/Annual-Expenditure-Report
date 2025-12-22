import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { BudgetCategory } from '../types';

interface DonutChartProps {
  data: BudgetCategory[];
}

const DonutChart: React.FC<DonutChartProps> = ({ data }) => {
  // Aggregate data for the chart
  const chartData = data.map((category) => {
    const totalBudget = category.items.reduce((sum, item) => sum + item.monthlyBudget, 0);
    return {
      name: category.name,
      value: totalBudget,
      color: category.color,
    };
  }).filter(item => item.value > 0);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('zh-TW', { style: 'currency', currency: 'TWD', maximumFractionDigits: 0 }).format(value);
  };

  return (
    <div className="w-full h-[300px] md:h-[400px] bg-white rounded-xl shadow-sm border border-slate-100 p-4">
      <h3 className="text-lg font-bold text-slate-700 mb-2">預算分佈 (Budget Distribution)</h3>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={2}
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value: number) => formatCurrency(value)}
            contentStyle={{ backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
          />
          <Legend 
            layout="vertical" 
            verticalAlign="middle" 
            align="right"
            wrapperStyle={{ fontSize: '12px' }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DonutChart;