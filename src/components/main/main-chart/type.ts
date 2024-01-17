export type chart = {
  year: string;
  value: number;
  type: string;
};
export type mainChartProps = {
  revenueData: chart[];
  couponMessage: string | undefined;
};
