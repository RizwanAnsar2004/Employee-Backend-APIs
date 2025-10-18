const Organization = require("../Models/OrganizationModel");
const User = require("../Models/UserModel"); 
const { organizationStatus, status } = require("../Utils/Enums");
const { OrgResponseDTO } = require("../DTO/OrganizationDTO");
const { PaginatedOrgResponseDTO } = require("../DTO/PaginationSortingDTO");
const { mapStatus } = require("../Utils/statusMapper");

async function getOrganization(orgStatus, pagination) {
  let query = {};

  switch (orgStatus?.toLowerCase()) {
    case "pending":
      query.orgStatus = organizationStatus.PENDING;
      break;
    case "approved":
    case "verified":
      query.orgStatus = organizationStatus.VERIFIED;
      break;
    case "rejected":
    case "blocked":
      query.orgStatus = organizationStatus.BLOCKED;
      break;
    default:
      break;
  }

  if (pagination.searchTerm)
  {
    query.organizationName = { $regex: pagination.searchTerm, $options: "i" };
  }

  const sortDirection = pagination.sortDirection === "asc" ? 1 : -1;
  const sortObj = { [pagination.sortColumn || "organizationName"]: sortDirection };
  const skip = (pagination.pageNumber - 1) * pagination.pageSize;

  const totalRecords = await Organization.countDocuments(query);
  const allOrgs = await Organization.find(query)
    .sort(sortObj)
    .skip(skip)
    .limit(pagination.pageSize);

  const response = allOrgs.map((org) => new OrgResponseDTO(org));

  return new PaginatedOrgResponseDTO({
    noOfRecords: totalRecords,
    pageNumber: pagination.pageNumber,
    pageSize: pagination.pageSize,
    data: response,
  });
}

async function updateOrganizationStatus(orgId, newStatus) {
  const org = await Organization.findById(orgId);
  if (!org)
  {
    throw new Error("Organization not found");
  }

  let mappedStatus;
  if (typeof newStatus === "string")
  {
    mappedStatus = mapStatus(newStatus);
  }
  else if (typeof newStatus === "number")
  {
    mappedStatus = newStatus;
  }

  const validStatuses = Object.values(organizationStatus);
  if (!mappedStatus || !validStatuses.includes(mappedStatus))
  {
    throw new Error("Invalid status");
  }

  org.orgStatus = mappedStatus;
  const updatedOrg = await org.save();

  let userStatus;
  if (mappedStatus === organizationStatus.VERIFIED)
  {
    userStatus = status.VERIFIED;
  }
  else if (mappedStatus === organizationStatus.BLOCKED)
  {
    userStatus = status.BLOCKED;
  }
  else
  {
    userStatus = status.PENDING;
  }

  await User.updateMany(
    { organizationId: org._id },
    { $set: { statusID: userStatus } }
  );

  return new OrgResponseDTO(updatedOrg);
}

module.exports = { getOrganization, updateOrganizationStatus };