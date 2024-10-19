export interface User {
  username: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AnalyticsData {
  feature: string;
  totalTimeSpent: number;
  date: Date;
}

export interface FilterOptions {
  ageRange: [number, number];
  gender: "male" | "female";
  dateRange: { start: Date; end: Date };
}
