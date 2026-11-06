package com.example.employee.dto.response;

import java.util.List;

public class PageResponse<T> {
    private final List<T> items;
    private final int page;
    private final int pageSize;
    private final long total;
    private final long totalPages;

    public PageResponse(List<T> items, int page, int pageSize, long total) {
        this.items = items;
        this.page = page;
        this.pageSize = pageSize;
        this.total = total;
        this.totalPages = total / pageSize + (total % pageSize == 0 ? 0 : 1);
    }

    public List<T> getItems() { return items; }
    public int getPage() { return page; }
    public int getPageSize() { return pageSize; }
    public long getTotal() { return total; }
    public long getTotalPages() { return totalPages; }
}
