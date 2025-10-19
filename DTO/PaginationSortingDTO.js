class PaginationSortingDTO {
  constructor(queryParams = {}, allowedSortColumns = ["createdAt"]) {
    const pageNumber = queryParams.pageNumber || queryParams.page || 1
    const pageSize = queryParams.pageSize || queryParams.limit || 10

    this.pageNumber = Number.parseInt(pageNumber, 10)
    this.pageSize = Number.parseInt(pageSize, 10)
    this.sortColumn = allowedSortColumns.includes(queryParams.sortColumn) ? queryParams.sortColumn : "createdAt"
    this.sortDirection = ["asc", "desc"].includes(queryParams.sortDirection?.toLowerCase())
      ? queryParams.sortDirection.toLowerCase()
      : "desc"
    this.searchTerm = (queryParams.searchTerm || "").trim()
    this.allowedSortColumns = allowedSortColumns
  }
}

class PaginatedOrgResponseDTO {
  constructor({ noOfRecords, pageNumber, pageSize, data }) {
    this.noOfRecords = noOfRecords
    this.pageNumber = pageNumber
    this.pageSize = pageSize
    this.data = data
  }
}

module.exports = { PaginationSortingDTO, PaginatedOrgResponseDTO }
