export type SortDir = "asc" | "desc";

export type PropertyDto = {
  id: string;
  idOwner: string;
  name: string;
  address: string;
  price: number;
  imageUrl: string | null;
};

export type PagedResult<T> = {
  items: T[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
};

export type PropertyFilter = {
  name?: string;
  address?: string;
  minPrice?: number;
  maxPrice?: number;
  page?: number;      
  pageSize?: number;  
  sortBy?: "CreatedAt" | "Price" | "Name";
  sortDir?: SortDir;
};