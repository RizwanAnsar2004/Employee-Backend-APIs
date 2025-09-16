const status ={
    PENDING: 0,
    VERIFIED: 1,
    BLOCKED: 2
}
const role ={
    OWNER: 0,
    EMPLOYEE: 1
}
const organizationStatus={
    PENDING: 0,
    VERIFIED: 1,
    BLOCKED: 2
}

const OrgTypeEnum = {
  COMPANY: 1,
  SCHOOL: 2,
  NGO: 3,
  HOSPITAL: 4,
  OTHER: 5
};

module.exports= { status,role,organizationStatus,OrgTypeEnum };