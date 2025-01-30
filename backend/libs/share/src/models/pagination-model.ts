export interface PaginationModel<TData> {
    data: TData;
    page: number;
    pageSize: number;
    totalCount: number;
    lastPage: number;
}
