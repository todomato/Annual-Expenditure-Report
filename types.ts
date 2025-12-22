export interface BudgetSubItem {
  id: string;
  name: string;
  monthlyBudget: number;
  monthlyActual: number;
}

export interface BudgetCategory {
  id: string;
  name: string;
  items: BudgetSubItem[];
  color: string; // Hex color for chart
}

export interface DashboardSummary {
  totalAnnualBudget: number;
  totalAnnualActual: number;
  variance: number;
}

export enum Tab {
  PLANNING = 'PLANNING',
  OVERVIEW = 'OVERVIEW'
}