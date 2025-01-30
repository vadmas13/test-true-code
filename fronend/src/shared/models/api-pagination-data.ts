export interface PaginationDto<TData = unknown> {
  data: TData[];
  page: number;
  pageSize: number;
  totalCount: number;
  lastPage: number;
}
