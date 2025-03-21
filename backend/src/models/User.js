const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },  // ✅ Required field
  lastName: { type: String, required: true },   // ✅ Required field
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
}, { timestamps: true });


module.exports = mongoose.model("User", UserSchema);
