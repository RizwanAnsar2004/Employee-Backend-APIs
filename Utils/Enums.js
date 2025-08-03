const status ={
    PENDING: 0,
    VERIFIED: 1
}
const role ={
    OWNER: 0,
    EMPLOYEE: 1
}
const organizationStatus={
    PENDING: 0,
    VERIFIED: 1
}

const OrgTypeEnum = {
  COMPANY: 'Company',
  SCHOOL: 'School',
  NGO: 'NGO',
  HOSPITAL: 'Hospital',
  OTHER: 'Other'
};

module.exports= { status,role,organizationStatus,OrgTypeEnum };