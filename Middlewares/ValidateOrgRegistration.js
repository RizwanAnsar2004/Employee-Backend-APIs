const { RegisterOrganization } = require("../DTO/OrganizationRegistrationDTO");

function validateOrgDTO(req, res, next) {
    try {
        const dto = new RegisterOrganization(req.body.orgData);
        req.orgData = dto;
        next();
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

module.exports = { validateOrgDTO };
