const status ={
    PENDING: 1,
    VERIFIED: 2,
    BLOCKED: 3
}
const role ={
    SUPERADMIN: 1,
    OWNER: 2,
    EMPLOYEE: 3
}
const organizationStatus={
    PENDING: 1,
    VERIFIED: 2,
    BLOCKED: 3
}

const OrgTypeEnum = {
  COMPANY: 1,
  SCHOOL: 2,
  NGO: 3,
  HOSPITAL: 4,
  OTHER: 5
};

module.exports= { status,role,organizationStatus,OrgTypeEnum };