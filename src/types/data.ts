export type DataPoint = {
  /** Date string in DD/MM/YYYY format */
  date: string;
  /** Numeric value for the data point */
  value: number;
};

export interface Subcategory {
  category: string;
  data: DataPoint[];
}

export interface Category {
  category: string;
  data: DataPoint[];
  subcategories?: Subcategory[];
}

export type DataFile = Category[];
