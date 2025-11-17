export type DataPoint = {
  date: string;
  value: number;
};

export interface Subcategory {
  id: number;
  category: string;
  data: DataPoint[];
}

export interface Category {
  id: number;
  category: string;
  data: DataPoint[];
  subcategories?: Subcategory[];
}

export type DataFile = Category[];
