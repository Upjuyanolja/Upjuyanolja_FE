export type staticsData = {
  total: number;
  used: number;
  stock: number;
};

export type dailyRevenue = {
  day: string;
  couponRevenue: number;
  normalRevenue: number;
};
export type revenueData = {
  revenue: dailyRevenue[];
};
