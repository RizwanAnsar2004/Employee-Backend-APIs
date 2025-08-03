const { OrgTypeEnum } = require('../Utils/Enums');
const required = (param) => {
throw new Error(`${param} is required`);
}

class RegisterOrganization {
    constructor({
    organizationName = required('organizationName'),
    orgType = required('orgType'),
    registrationNumber =required('registrationNumber'),
    industryOrSector = required('industryOrSector'),
    orgEmail = required('orgEmail'),
    orgPhoneNo = required('orgPhoneNo'),
    website = required('website'),
    address = required('address'),
    city = required('city'),
    country = required('country'),
    stablishedDate = required('stablishedDate'),
    logoURL =  required('logoURL'),
    description = required('description'),
    numberOfEmployees = required('numberOfEmployees')})
{
    this.organizationName = organizationName;
    if (!Object.values(OrgTypeEnum).includes(orgType)) {
        throw new Error(`Invalid organization type: ${orgType}`);
    }
    this.orgType = orgType;
    this.registrationNumber = registrationNumber;
    this.industryOrSector = industryOrSector;
    this.orgEmail = orgEmail;
    this.orgPhoneNo = orgPhoneNo;
    this.website = website;
    this.address = address;
    this.city = city;
    this.country = country;
    this.stablishedDate =stablishedDate;
    this.logoURL =  logoURL;
    this.description = description;
    this.numberOfEmployees = numberOfEmployees;
}
}

module.exports = { RegisterOrganization };