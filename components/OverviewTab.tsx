import React, { useState } from 'react';
import { Download, Maximize2, Minimize2, ChevronDown, ChevronRight } from 'lucide-react';
import { BudgetCategory } from '../types';

interface OverviewTabProps {
  data: BudgetCategory[];
}

const OverviewTab: React.FC<OverviewTabProps> = ({ data }) => {
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});

  const toggleRow = (id: string) => {
    setExpandedRows(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const expandAll = () => {
    const allIds = data.reduce((acc, cat) => {
      acc[cat.id] = true;
      return acc;
    }, {} as Record<string, boolean>);
    setExpandedRows(allIds);
  };

  const collapseAll = () => {
    setExpandedRows({});
  };

  const formatCurrency = (val: number) => new Intl.NumberFormat('zh-TW', { maximumFractionDigits: 0 }).format(val);
  const formatPercent = (val: number) => new Intl.NumberFormat('zh-TW', { style: 'percent', maximumFractionDigits: 1 }).format(val);

  // HTML Export Logic
  const handleExport = () => {
    const tableRows = data.map(cat => {
      const catMonthlyBudget = cat.items.reduce((sum, i) => sum + i.monthlyBudget, 0);
      const catMonthlyActual = cat.items.reduce((sum, i) => sum + i.monthlyActual, 0);
      const catAnnualBudget = catMonthlyBudget * 12;
      const catAnnualActual = catMonthlyActual * 12;
      const catDiff = catAnnualBudget - catAnnualActual;
      const catRate = catAnnualBudget > 0 ? catAnnualActual / catAnnualBudget : 0;
      
      const subItemsHtml = cat.items.map(item => {
          const annualBudget = item.monthlyBudget * 12;
          const annualActual = item.monthlyActual * 12;
          const diff = annualBudget - annualActual;
          const rate = annualBudget > 0 ? annualActual / annualBudget : 0;
          
          return `
            <tr class="bg-white border-b border-slate-100 text-sm hidden sub-row-${cat.id}">
               <td class="p-3 pl-8 text-slate-600 border-r border-slate-100">${item.name}</td>
               ${Array(12).fill(0).map(() => `<td class="p-2 text-right text-slate-400 border-r border-slate-100">${formatCurrency(item.monthlyBudget)}</td>`).join('')}
               <td class="p-2 text-right font-medium text-slate-700 bg-slate-50 border-r border-slate-100">${formatCurrency(annualBudget)}</td>
               <td class="p-2 text-right font-medium text-slate-700 bg-slate-50 border-r border-slate-100">${formatCurrency(annualActual)}</td>
               <td class="p-2 text-right font-medium ${diff >= 0 ? 'text-green-600' : 'text-red-600'} bg-slate-50 border-r border-slate-100">${formatCurrency(diff)}</td>
               <td class="p-2 text-right text-slate-500 bg-slate-50">${formatPercent(rate)}</td>
            </tr>
          `;
      }).join('');

      return `
        <tr class="bg-slate-50 border-b border-slate-200 hover:bg-slate-100 transition-colors cursor-pointer" onclick="toggleRow('${cat.id}')">
            <td class="p-3 font-bold text-slate-800 border-r border-slate-200 sticky left-0 bg-slate-50 z-10 flex items-center">
                <span id="icon-${cat.id}" class="mr-2 transform transition-transform">▶</span> ${cat.name}
            </td>
            ${Array(12).fill(0).map(() => `<td class="p-2 text-right text-slate-500 border-r border-slate-200">${formatCurrency(catMonthlyBudget)}</td>`).join('')}
            <td class="p-2 text-right font-bold text-slate-800 bg-slate-100 border-r border-slate-200 border-l border-slate-300">${formatCurrency(catAnnualBudget)}</td>
            <td class="p-2 text-right font-bold text-slate-800 bg-slate-100 border-r border-slate-200">${formatCurrency(catAnnualActual)}</td>
            <td class="p-2 text-right font-bold ${catDiff >= 0 ? 'text-green-600' : 'text-red-600'} bg-slate-100 border-r border-slate-200">${formatCurrency(catDiff)}</td>
            <td class="p-2 text-right font-bold text-slate-600 bg-slate-100">${formatPercent(catRate)}</td>
        </tr>
        ${subItemsHtml}
      `;
    }).join('');

    const htmlContent = `
      <!DOCTYPE html>
      <html lang="zh-TW">
      <head>
        <meta charset="UTF-8">
        <title>年度預算報表</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <style>
            @media print { body { -webkit-print-color-adjust: exact; } }
            td, th { white-space: nowrap; }
        </style>
      </head>
      <body class="bg-white p-8 font-sans">
        <h1 class="text-3xl font-bold text-slate-800 mb-2">年度預算總覽報表</h1>
        <p class="text-slate-500 mb-6">Generated on ${new Date().toLocaleDateString()}</p>
        
        <div class="overflow-x-auto border rounded-lg shadow-sm">
            <table class="w-full text-left border-collapse">
                <thead>
                    <tr class="bg-slate-800 text-white">
                        <th class="p-3 sticky left-0 bg-slate-800 z-20">類別 / 項目</th>
                        ${Array.from({length: 12}, (_, i) => `<th class="p-2 text-right text-sm font-light min-w-[80px]">${i+1}月</th>`).join('')}
                        <th class="p-2 text-right font-semibold bg-slate-700 border-l border-slate-600">預算總額</th>
                        <th class="p-2 text-right font-semibold bg-slate-700">實際總額</th>
                        <th class="p-2 text-right font-semibold bg-slate-700">差異</th>
                        <th class="p-2 text-right font-semibold bg-slate-700">支出率</th>
                    </tr>
                </thead>
                <tbody>
                    ${tableRows}
                </tbody>
            </table>
        </div>

        <script>
            function toggleRow(catId) {
                const subRows = document.querySelectorAll('.sub-row-' + catId);
                const icon = document.getElementById('icon-' + catId);
                subRows.forEach(row => {
                    if (row.classList.contains('hidden')) {
                        row.classList.remove('hidden');
                        icon.style.transform = 'rotate(90deg)';
                    } else {
                        row.classList.add('hidden');
                        icon.style.transform = 'rotate(0deg)';
                    }
                });
            }
        </script>
      </body>
      </html>
    `;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Budget_Report_${new Date().toISOString().split('T')[0]}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-slate-100 gap-4">
        <h2 className="text-xl font-bold text-slate-800">年度收支總覽 (Overview)</h2>
        <div className="flex items-center space-x-2">
            <button onClick={expandAll} className="flex items-center px-3 py-1.5 text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded transition-colors">
                <Maximize2 size={14} className="mr-1" /> 全部展開
            </button>
            <button onClick={collapseAll} className="flex items-center px-3 py-1.5 text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded transition-colors">
                <Minimize2 size={14} className="mr-1" /> 全部收合
            </button>
             <div className="h-6 w-px bg-slate-300 mx-2"></div>
            <button onClick={handleExport} className="flex items-center px-4 py-2 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow transition-colors">
                <Download size={16} className="mr-2" /> 匯出 HTML 報表
            </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[1200px]">
                <thead>
                    <tr className="bg-slate-800 text-white">
                        <th className="p-4 sticky left-0 z-20 bg-slate-800 shadow-md w-64">類別 / 項目</th>
                        {Array.from({length: 12}, (_, i) => (
                            <th key={i} className="p-2 text-right text-sm font-light min-w-[80px] text-slate-300">{i + 1}月</th>
                        ))}
                        <th className="p-2 text-right font-semibold bg-slate-700 border-l border-slate-600 min-w-[100px]">預算總額</th>
                        <th className="p-2 text-right font-semibold bg-slate-700 min-w-[100px]">實際總額</th>
                        <th className="p-2 text-right font-semibold bg-slate-700 min-w-[100px]">差異</th>
                        <th className="p-2 text-right font-semibold bg-slate-700 min-w-[80px]">支出率</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(category => {
                        const isExpanded = expandedRows[category.id];
                        const catMonthlyBudget = category.items.reduce((sum, i) => sum + i.monthlyBudget, 0);
                        const catMonthlyActual = category.items.reduce((sum, i) => sum + i.monthlyActual, 0);
                        const catAnnualBudget = catMonthlyBudget * 12;
                        const catAnnualActual = catMonthlyActual * 12;
                        const catDiff = catAnnualBudget - catAnnualActual;
                        const catRate = catAnnualBudget > 0 ? catAnnualActual / catAnnualBudget : 0;

                        return (
                            <React.Fragment key={category.id}>
                                {/* Category Main Row */}
                                <tr 
                                    className="bg-slate-50 border-b border-slate-200 hover:bg-slate-100 transition-colors cursor-pointer group"
                                    onClick={() => toggleRow(category.id)}
                                >
                                    <td className="p-3 font-bold text-slate-800 border-r border-slate-200 sticky left-0 bg-slate-50 group-hover:bg-slate-100 transition-colors z-10 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]">
                                        <div className="flex items-center">
                                            {isExpanded ? <ChevronDown size={16} className="mr-2 text-blue-500" /> : <ChevronRight size={16} className="mr-2 text-slate-400" />}
                                            {category.name}
                                        </div>
                                    </td>
                                    {Array.from({length: 12}, (_, i) => (
                                        <td key={i} className="p-2 text-right text-slate-500 border-r border-slate-200 text-sm">
                                            {formatCurrency(catMonthlyBudget)}
                                        </td>
                                    ))}
                                    <td className="p-2 text-right font-bold text-slate-800 bg-slate-100 border-r border-slate-200 border-l border-slate-300">
                                        {formatCurrency(catAnnualBudget)}
                                    </td>
                                    <td className="p-2 text-right font-bold text-slate-800 bg-slate-100 border-r border-slate-200">
                                        {formatCurrency(catAnnualActual)}
                                    </td>
                                    <td className={`p-2 text-right font-bold ${catDiff >= 0 ? 'text-green-600' : 'text-red-600'} bg-slate-100 border-r border-slate-200`}>
                                        {catDiff > 0 ? '+' : ''}{formatCurrency(catDiff)}
                                    </td>
                                    <td className="p-2 text-right font-bold text-slate-600 bg-slate-100 text-sm">
                                        {formatPercent(catRate)}
                                    </td>
                                </tr>

                                {/* Sub Items Rows */}
                                {isExpanded && category.items.map((item, idx) => {
                                    const annualBudget = item.monthlyBudget * 12;
                                    const annualActual = item.monthlyActual * 12;
                                    const diff = annualBudget - annualActual;
                                    const rate = annualBudget > 0 ? annualActual / annualBudget : 0;

                                    return (
                                        <tr key={item.id} className="bg-white border-b border-slate-100 text-sm animate-in fade-in duration-200">
                                            <td className="p-3 pl-10 text-slate-600 border-r border-slate-100 sticky left-0 bg-white z-10 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)] border-l-4 border-l-blue-500">
                                                {item.name}
                                            </td>
                                            {Array.from({length: 12}, (_, i) => (
                                                <td key={i} className="p-2 text-right text-slate-400 border-r border-slate-100">
                                                    {formatCurrency(item.monthlyBudget)}
                                                </td>
                                            ))}
                                            <td className="p-2 text-right font-medium text-slate-700 bg-slate-50 border-r border-slate-100 border-l border-slate-200">
                                                {formatCurrency(annualBudget)}
                                            </td>
                                            <td className="p-2 text-right font-medium text-slate-700 bg-slate-50 border-r border-slate-100">
                                                {formatCurrency(annualActual)}
                                            </td>
                                            <td className={`p-2 text-right font-medium ${diff >= 0 ? 'text-emerald-600' : 'text-rose-600'} bg-slate-50 border-r border-slate-100`}>
                                                {diff > 0 ? '+' : ''}{formatCurrency(diff)}
                                            </td>
                                            <td className="p-2 text-right text-slate-500 bg-slate-50">
                                                {formatPercent(rate)}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </React.Fragment>
                        );
                    })}
                </tbody>
            </table>
        </div>
      </div>
      <p className="text-right text-xs text-slate-400 italic mt-2">* 預算數據以每月金額推算年度總和</p>
    </div>
  );
};

export default OverviewTab;