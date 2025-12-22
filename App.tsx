import React, { useState } from 'react';
import { LayoutDashboard, Table, Wallet } from 'lucide-react';
import { Tab, BudgetCategory } from './types';
import { DEFAULT_DATA } from './constants';
import PlanningTab from './components/PlanningTab';
import OverviewTab from './components/OverviewTab';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.PLANNING);
  const [budgetData, setBudgetData] = useState<BudgetCategory[]>(DEFAULT_DATA);

  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-900">
      {/* Navbar */}
      <nav className="bg-slate-900 text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="p-2 bg-blue-600 rounded-lg mr-3">
                <Wallet size={24} className="text-white" />
              </div>
              <span className="font-bold text-xl tracking-tight">Annual Budget Planner</span>
            </div>
            <div className="flex space-x-1 bg-slate-800 p-1 rounded-lg">
              <button
                onClick={() => setActiveTab(Tab.PLANNING)}
                className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  activeTab === Tab.PLANNING
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700'
                }`}
              >
                <LayoutDashboard size={16} className="mr-2" />
                規劃填寫
              </button>
              <button
                onClick={() => setActiveTab(Tab.OVERVIEW)}
                className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  activeTab === Tab.OVERVIEW
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700'
                }`}
              >
                <Table size={16} className="mr-2" />
                年度總覽
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow bg-slate-50 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-extrabold text-slate-800">
              {activeTab === Tab.PLANNING ? '年度預算規劃' : '年度財務總覽'}
            </h1>
            <p className="mt-2 text-slate-600">
              {activeTab === Tab.PLANNING 
                ? '調整您的每月預算與實際支出，系統將自動計算年度預測與差異。' 
                : '檢視全年度資金流向，分析支出佔比並匯出報表。'}
            </p>
          </div>

          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {activeTab === Tab.PLANNING ? (
              <PlanningTab data={budgetData} onDataChange={setBudgetData} />
            ) : (
              <OverviewTab data={budgetData} />
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-8 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <blockquote className="italic font-serif text-lg text-slate-300 mb-4">
            "Do not save what is left after spending, but spend what is left after saving."
          </blockquote>
          <p className="font-medium text-sm text-blue-400">— Warren Buffett</p>
          <div className="mt-8 text-xs text-slate-600">
            &copy; {new Date().getFullYear()} Annual Budget Planner System. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;