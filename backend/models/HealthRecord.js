const mongoose = require("mongoose");

const HealthRecordSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  weight: { type: Number, required: true },
  height: { type: Number, required: true },
  bloodPressure: { type: String, required: true },
  sugarLevel: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("HealthRecord", HealthRecordSchema);
