class PaginationSortingDTO {
  constructor({
    pageNumber = 1,
    pageSize = 10,
    sortColumn = "createdAt",
    sortDirection = "desc",
    searchTerm = ""} = {}) {
    const allowedSortColumns = ["createdAt", "organizationName", "orgType"];
    this.pageNumber = parseInt(pageNumber, 10);
    this.pageSize = parseInt(pageSize, 10);
    this.sortColumn = allowedSortColumns.includes(sortColumn) ? sortColumn : "createdAt";
    this.sortDirection = ["asc", "desc"].includes(sortDirection?.toLowerCase())? 
    sortDirection.toLowerCase() : "desc";
    this.searchTerm = (searchTerm || "").trim();
  }
}

class PaginatedOrgResponseDTO {
  constructor({ noOfRecords, pageNumber, pageSize, data }) {
    this.noOfRecords = noOfRecords;
    this.pageNumber = pageNumber;
    this.pageSize = pageSize;
    this.data = data;
  }
}

module.exports= { PaginationSortingDTO,PaginatedOrgResponseDTO }