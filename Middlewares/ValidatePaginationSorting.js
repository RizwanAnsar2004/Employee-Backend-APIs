const { PaginationSortingDTO } = require("../DTO/PaginationSortingDTO")

function validatePaginationSortingDTO(allowedSortColumns) {
  return (req, res, next) => {
    try {
      const dto = new PaginationSortingDTO(req.query, allowedSortColumns)
      req.pagination = dto
      next()
    } catch (err) {
      console.error(err)
      return res.status(400).json({ message: err.message })
    }
  }
}

module.exports = validatePaginationSortingDTO