import React, { useState } from 'react';
import { Plus, Trash2, ChevronDown, ChevronRight, DollarSign, TrendingUp, AlertCircle } from 'lucide-react';
import { BudgetCategory, BudgetSubItem, DashboardSummary } from '../types';
import DonutChart from './DonutChart';

interface PlanningTabProps {
  data: BudgetCategory[];
  onDataChange: (newData: BudgetCategory[]) => void;
}

const PlanningTab: React.FC<PlanningTabProps> = ({ data, onDataChange }) => {
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});

  const toggleCategory = (id: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Helper to generate IDs
  const generateId = () => Math.random().toString(36).substr(2, 9);

  // Update item handlers
  const handleItemChange = (catId: string, itemId: string, field: keyof BudgetSubItem, value: string | number) => {
    const newData = data.map(cat => {
      if (cat.id !== catId) return cat;
      return {
        ...cat,
        items: cat.items.map(item => {
          if (item.id !== itemId) return item;
          return { ...item, [field]: value };
        })
      };
    });
    onDataChange(newData);
  };

  const addItem = (catId: string) => {
    const newData = data.map(cat => {
      if (cat.id !== catId) return cat;
      return {
        ...cat,
        items: [...cat.items, { id: generateId(), name: '新項目', monthlyBudget: 0, monthlyActual: 0 }]
      };
    });
    // Ensure expanded when adding
    setExpandedCategories(prev => ({ ...prev, [catId]: true }));
    onDataChange(newData);
  };

  const deleteItem = (catId: string, itemId: string) => {
    const newData = data.map(cat => {
      if (cat.id !== catId) return cat;
      return {
        ...cat,
        items: cat.items.filter(item => item.id !== itemId)
      };
    });
    onDataChange(newData);
  };

  // Dashboard calculations
  const totalMonthlyBudget = data.reduce((sum, cat) => sum + cat.items.reduce((s, i) => s + i.monthlyBudget, 0), 0);
  const totalMonthlyActual = data.reduce((sum, cat) => sum + cat.items.reduce((s, i) => s + i.monthlyActual, 0), 0);
  const totalAnnualBudget = totalMonthlyBudget * 12;
  const totalAnnualActual = totalMonthlyActual * 12;
  const variance = totalAnnualBudget - totalAnnualActual;

  const formatCurrency = (val: number) => new Intl.NumberFormat('zh-TW', { style: 'currency', currency: 'TWD', maximumFractionDigits: 0 }).format(val);

  return (
    <div className="space-y-6">
      {/* Dashboard Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center space-x-4">
          <div className="p-3 bg-blue-50 rounded-full text-blue-600">
            <DollarSign size={24} />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">年度總預算 (Budget)</p>
            <p className="text-2xl font-bold text-slate-800">{formatCurrency(totalAnnualBudget)}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center space-x-4">
          <div className="p-3 bg-emerald-50 rounded-full text-emerald-600">
            <TrendingUp size={24} />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">預估實際總額 (Actual)</p>
            <p className="text-2xl font-bold text-slate-800">{formatCurrency(totalAnnualActual)}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center space-x-4">
          <div className={`p-3 rounded-full ${variance >= 0 ? 'bg-indigo-50 text-indigo-600' : 'bg-amber-50 text-amber-600'}`}>
            <AlertCircle size={24} />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">預算差異 (Variance)</p>
            <p className={`text-2xl font-bold ${variance >= 0 ? 'text-indigo-600' : 'text-amber-600'}`}>
              {variance > 0 ? '+' : ''}{formatCurrency(variance)}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Editor List */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-bold text-slate-800 flex items-center">
            <span className="w-1 h-6 bg-blue-500 rounded-full mr-2"></span>
            預算細項 (Details)
          </h2>
          
          <div className="space-y-3">
            {data.map((category) => {
              const catTotalBudget = category.items.reduce((acc, curr) => acc + curr.monthlyBudget, 0);
              const catTotalActual = category.items.reduce((acc, curr) => acc + curr.monthlyActual, 0);
              const isExpanded = expandedCategories[category.id];

              return (
                <div key={category.id} className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm transition-shadow hover:shadow-md">
                  {/* Category Header */}
                  <div 
                    className="p-4 bg-slate-50 flex items-center justify-between cursor-pointer select-none"
                    onClick={() => toggleCategory(category.id)}
                  >
                    <div className="flex items-center space-x-3">
                      {isExpanded ? <ChevronDown size={20} className="text-slate-400" /> : <ChevronRight size={20} className="text-slate-400" />}
                      <span className="font-semibold text-slate-700">{category.name}</span>
                      <span className="text-xs px-2 py-1 rounded-full bg-slate-200 text-slate-600 hidden sm:inline-block">
                        {category.items.length} 項目
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm">
                      <div className="text-right hidden sm:block">
                        <span className="text-xs text-slate-500 block">每月預算</span>
                        <span className="font-medium text-slate-700">{formatCurrency(catTotalBudget)}</span>
                      </div>
                       <div className="text-right hidden sm:block">
                        <span className="text-xs text-slate-500 block">每月實際</span>
                        <span className="font-medium text-slate-700">{formatCurrency(catTotalActual)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Items List */}
                  {isExpanded && (
                    <div className="p-4 bg-white animate-in slide-in-from-top-2 duration-200">
                      <div className="space-y-2">
                        {/* Header for items (Desktop) */}
                        <div className="hidden sm:grid grid-cols-12 gap-2 text-xs font-medium text-slate-400 mb-2 px-2">
                          <div className="col-span-5">項目名稱</div>
                          <div className="col-span-3">每月預算</div>
                          <div className="col-span-3">每月實際</div>
                          <div className="col-span-1 text-center">操作</div>
                        </div>

                        {category.items.map((item) => (
                          <div key={item.id} className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-center p-2 rounded hover:bg-slate-50 group">
                            <div className="col-span-1 sm:col-span-5">
                              <label className="text-xs text-slate-400 sm:hidden">名稱</label>
                              <input 
                                type="text" 
                                value={item.name}
                                onChange={(e) => handleItemChange(category.id, item.id, 'name', e.target.value)}
                                className="w-full text-sm font-medium text-slate-700 bg-transparent border-b border-transparent focus:border-blue-500 focus:outline-none focus:ring-0"
                              />
                            </div>
                            <div className="col-span-1 sm:col-span-3">
                              <label className="text-xs text-slate-400 sm:hidden">預算</label>
                              <div className="relative">
                                <span className="absolute left-0 top-1/2 -translate-y-1/2 text-xs text-slate-400">$</span>
                                <input 
                                  type="number" 
                                  value={item.monthlyBudget}
                                  onChange={(e) => handleItemChange(category.id, item.id, 'monthlyBudget', parseFloat(e.target.value) || 0)}
                                  className="w-full pl-3 text-sm text-slate-700 bg-transparent border border-slate-200 rounded px-2 py-1 focus:border-blue-500 focus:outline-none"
                                />
                              </div>
                            </div>
                            <div className="col-span-1 sm:col-span-3">
                              <label className="text-xs text-slate-400 sm:hidden">實際</label>
                              <div className="relative">
                                <span className="absolute left-0 top-1/2 -translate-y-1/2 text-xs text-slate-400">$</span>
                                <input 
                                  type="number" 
                                  value={item.monthlyActual}
                                  onChange={(e) => handleItemChange(category.id, item.id, 'monthlyActual', parseFloat(e.target.value) || 0)}
                                  className="w-full pl-3 text-sm text-slate-700 bg-transparent border border-slate-200 rounded px-2 py-1 focus:border-blue-500 focus:outline-none"
                                />
                              </div>
                            </div>
                            <div className="col-span-1 text-right sm:text-center mt-2 sm:mt-0">
                               <button 
                                onClick={() => deleteItem(category.id, item.id)}
                                className="p-1 text-slate-300 hover:text-red-500 transition-colors"
                                title="刪除"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <button 
                        onClick={() => addItem(category.id)}
                        className="mt-4 flex items-center text-sm text-blue-600 hover:text-blue-700 font-medium px-2 py-1 rounded hover:bg-blue-50 transition-colors"
                      >
                        <Plus size={16} className="mr-1" />
                        新增小項目
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Charts Side */}
        <div className="lg:col-span-1">
          <div className="sticky top-6">
             <DonutChart data={data} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanningTab;