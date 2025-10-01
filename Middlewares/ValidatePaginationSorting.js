const { PaginationSortingDTO } = require("../DTO/PaginationSortingDTO");

function validatePaginationSortingDTO(req, res, next) {
    try 
    {
        const dto = new PaginationSortingDTO(req.query);
        req.pagination = dto;
        next();
    }
    catch (err)
    {
        res.status(400).json({ message: err.message });
    }
}

module.exports = { validatePaginationSortingDTO };