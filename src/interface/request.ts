export interface IPaginationOpts {
  all?: boolean;
  limit: number;
  offset: number;
  sortBy: string;
  sortOrder: string;
  totalCount?: number;
}
