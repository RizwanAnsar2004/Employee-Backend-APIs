const orgService = require("../Services/OrganizationService")
const { mapStatus } = require("../Utils/statusMapper")

async function getOrgsController(req, res) {
  try
  {
    const orgStatus = req.query.status ? mapStatus(req.query.status) : null
    const paginatedResult = await orgService.getOrganization(orgStatus, req.pagination)

    res.status(200).json({
      success: true,
      data: paginatedResult,
    })
  }
  catch (err)
  {
    res.status(400).json({
      success: false,
      message: err.message,
    })
  }
}

async function updateOrgStatusController(req, res) {
  try
  {
    const { orgId, status } = req.params
    const mappedStatus = mapStatus(status)
    if (!mappedStatus)
    {
      return res.status(400).json({ message: "Invalid organization status" })
    }
    const updated = await orgService.updateOrganizationStatus(orgId, mappedStatus)
    res.status(200).json({
      success: true,
      message: "Organization status updated",
      org: updated,
    })
  }
  catch (err)
  {
    res.status(400).json({
      success: false,
      message: err.message,
    })
  }
}

module.exports = { getOrgsController, updateOrgStatusController }