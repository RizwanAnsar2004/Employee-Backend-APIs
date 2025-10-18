const { organizationStatus } = require("../Utils/Enums");

const statusMap = {
  pending: organizationStatus.PENDING,
  approved: organizationStatus.VERIFIED,
  verified: organizationStatus.VERIFIED,
  rejected: organizationStatus.REJECTED,
  blocked: organizationStatus.BLOCKED,
};

function mapStatus(input) {
  return statusMap[input?.toLowerCase()] || null;
}

module.exports = { mapStatus };