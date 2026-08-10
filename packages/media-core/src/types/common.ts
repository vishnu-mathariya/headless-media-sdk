export type MediaType = "photo" | "video";

export interface PaginationParams {
  page?: number;
  perPage?: number;
}

export interface PaginationMeta {
  page: number;
  perPage: number;
  totalResults?: number;
  hasNextPage: boolean;
}