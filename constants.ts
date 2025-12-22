import { BudgetCategory } from './types';

// Palette for the categories
export const CHART_COLORS = [
  '#0ea5e9', // Sky 500
  '#22c55e', // Green 500
  '#eab308', // Yellow 500
  '#f97316', // Orange 500
  '#ef4444', // Red 500
  '#8b5cf6', // Violet 500
  '#ec4899', // Pink 500
  '#14b8a6', // Teal 500
  '#6366f1', // Indigo 500
  '#64748b', // Slate 500
];

const generateId = () => Math.random().toString(36).substr(2, 9);

export const DEFAULT_DATA: BudgetCategory[] = [
  {
    id: generateId(),
    name: '飲食',
    color: CHART_COLORS[0],
    items: [
      { id: generateId(), name: '日常飲食', monthlyBudget: 12000, monthlyActual: 12000 },
      { id: generateId(), name: '超市採買', monthlyBudget: 3000, monthlyActual: 3000 },
    ],
  },
  {
    id: generateId(),
    name: '成長學習',
    color: CHART_COLORS[1],
    items: [
      { id: generateId(), name: '購書', monthlyBudget: 500, monthlyActual: 500 },
      { id: generateId(), name: '上課進修', monthlyBudget: 2000, monthlyActual: 2000 },
      { id: generateId(), name: '線上課程', monthlyBudget: 600, monthlyActual: 600 },
      { id: generateId(), name: '考試', monthlyBudget: 0, monthlyActual: 0 },
    ],
  },
  {
    id: generateId(),
    name: '休閒娛樂',
    color: CHART_COLORS[2],
    items: [
      { id: generateId(), name: '健身', monthlyBudget: 1500, monthlyActual: 1500 },
      { id: generateId(), name: '玩樂', monthlyBudget: 3000, monthlyActual: 3000 },
      { id: generateId(), name: '訂閱 (Netflix/Spotify)', monthlyBudget: 400, monthlyActual: 400 },
      { id: generateId(), name: '聚餐', monthlyBudget: 2000, monthlyActual: 2000 },
      { id: generateId(), name: '電影', monthlyBudget: 500, monthlyActual: 500 },
      { id: generateId(), name: '旅遊 (短程)', monthlyBudget: 2000, monthlyActual: 2000 },
      { id: generateId(), name: '寵物', monthlyBudget: 0, monthlyActual: 0 },
      { id: generateId(), name: '奢侈品', monthlyBudget: 2000, monthlyActual: 0 },
    ],
  },
  {
    id: generateId(),
    name: '日常生活',
    color: CHART_COLORS[3],
    items: [
      { id: generateId(), name: '生活用品', monthlyBudget: 1000, monthlyActual: 1000 },
      { id: generateId(), name: '3C維護', monthlyBudget: 1000, monthlyActual: 500 },
      { id: generateId(), name: '置裝', monthlyBudget: 2000, monthlyActual: 1500 },
      { id: generateId(), name: '理髮', monthlyBudget: 800, monthlyActual: 800 },
    ],
  },
  {
    id: generateId(),
    name: '行車交通',
    color: CHART_COLORS[4],
    items: [
      { id: generateId(), name: 'TPASS/通勤', monthlyBudget: 1280, monthlyActual: 1280 },
      { id: generateId(), name: '計程車', monthlyBudget: 500, monthlyActual: 500 },
      { id: generateId(), name: '油資', monthlyBudget: 1000, monthlyActual: 1000 },
      { id: generateId(), name: '停車', monthlyBudget: 0, monthlyActual: 0 },
    ],
  },
  {
    id: generateId(),
    name: '固定支出',
    color: CHART_COLORS[5],
    items: [
      { id: generateId(), name: '水電瓦斯', monthlyBudget: 1500, monthlyActual: 1500 },
      { id: generateId(), name: '電話網路', monthlyBudget: 999, monthlyActual: 999 },
      { id: generateId(), name: '保險', monthlyBudget: 3500, monthlyActual: 3500 },
      { id: generateId(), name: '稅金攤提', monthlyBudget: 1000, monthlyActual: 1000 },
    ],
  },
  {
    id: generateId(),
    name: '醫療保健',
    color: CHART_COLORS[6],
    items: [
      { id: generateId(), name: '看診掛號', monthlyBudget: 500, monthlyActual: 200 },
      { id: generateId(), name: '保健食品', monthlyBudget: 1000, monthlyActual: 1000 },
      { id: generateId(), name: '勞健保', monthlyBudget: 1200, monthlyActual: 1200 },
    ],
  },
  {
    id: generateId(),
    name: '長期旅遊/大額',
    color: CHART_COLORS[7],
    items: [
      { id: generateId(), name: '旅遊基金', monthlyBudget: 5000, monthlyActual: 5000 },
      { id: generateId(), name: '高單價存錢', monthlyBudget: 3000, monthlyActual: 3000 },
    ],
  },
  {
    id: generateId(),
    name: '人情往來',
    color: CHART_COLORS[8],
    items: [
      { id: generateId(), name: '送禮/紅包', monthlyBudget: 2000, monthlyActual: 2000 },
      { id: generateId(), name: '孝親費', monthlyBudget: 5000, monthlyActual: 5000 },
      { id: generateId(), name: '捐款', monthlyBudget: 500, monthlyActual: 500 },
    ],
  },
  {
    id: generateId(),
    name: '其他雜項',
    color: CHART_COLORS[9],
    items: [
      { id: generateId(), name: '緩衝資金', monthlyBudget: 2000, monthlyActual: 0 },
    ],
  },
];