const mongoose = require("mongoose")
const { organizationStatus,OrgTypeEnum } = require('../Utils/Enums');

const organizationSchema = new mongoose.Schema({
    organizationName: String,
    orgType: {
        type: Number,
        enum: Object.values(OrgTypeEnum)
    },
    orgTypeDetail: {
        type: String,
        required: function () {
            return this.orgType === OrgTypeEnum.OTHER;
        }
    },
    registrationNumber: String,
    industryOrSector: String,
    orgEmail : {
        type: String,
        required: true,
        unique: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ 
    },
    orgPhoneNo: {
        type: String,
        required: true,
        unique: true,
        match: /^\+\d{10,14}$/
    },
    website:  String,
    address: String,
    city: String,
    country:String,
    stablishedDate: Date,
    logo: String,
    orgStatus: {
    type: Number,
    enum: Object.values(organizationStatus),
    default: organizationStatus.PENDING
    },
    description: String,
    numberOfEmployees: {
    type: Number,
    min: 1
    },
    createdAt: {
    type: Date,
    default: Date.now
   }
})
organizationSchema.index({ registrationNumber: 1, organizationName: 1 }, { unique: true });
module.exports = mongoose.model('userOrganization', organizationSchema);