// create mongoose
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const { randomInt } = require("crypto");

// create a schema
var UserSchema = new Schema(
  {
    name: {
      type: String,
      minlength: [2, "name must be at least 2 characters long"],
      maxlength: [50, "name must be at least 2-50 characters long"],
      required: true,
    },
    address: {
      type: String,
      default: "address: xxx - xx, xxxxx, xxxxx",
      required: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    description: {
      type: String,
      default: "Description about to be displayed, about yourself",
    },
    image: {
      type: String,
    },
    role: {
      type: String,
      enum: ["user", "actor", "manager", "admin"],
      require: [true, "role is required"],
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    suspended: {
      type: Boolean,
      default: false,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    passwordResetToken: {
      type: String,
    },
    passwordResetTokenExpiresIn: {
      type: String,
    },
  },
  { timestamps: true }
);

UserSchema.methods.createResetToken = function () {
  const otp = randomInt(100000, 999999);
  return otp;
};

UserSchema.methods.createResetToken = function () {
  const otp = randomInt(100000, 999999);
  return otp;
};

module.exports = mongoose.model("User", UserSchema);
