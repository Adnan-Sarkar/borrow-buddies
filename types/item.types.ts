export type ItemType = {
  id: string;
  title: string;
  dailyPrice: number | string;
  location?: string;
  avgRating: number;
  reviewCount?: number;
  images: string[];
  owner: {
    name: string;
    profilePicture?: string;
    rating?: number;
  };
  distance?: number;
  category?: {
    name: string;
    icon?: string;
  };
};
