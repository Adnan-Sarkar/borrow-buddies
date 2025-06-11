export type SortOption = "newest" | "price_low" | "price_high" | "rating";

export type FilterOptions = {
  search: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sort: SortOption;
};
