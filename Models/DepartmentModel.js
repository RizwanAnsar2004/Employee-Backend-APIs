const mongoose = require("mongoose");
const { Schema } = mongoose;

const departmentSchema = new Schema({
  name:  String,
  organizationId: {
    type: Schema.Types.ObjectId,
    ref: "Organization",
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Department", departmentSchema);