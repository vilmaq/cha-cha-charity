const mongoose = require("mongoose");

const { hashPassword, validatePassword } = require("../utils/password");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  type: {
    type: String,
    enum: ["Volunteer", "Business", "Charity"],
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
  postcode: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  bio: {
    type: String,
  },
  animals: {
    type: Boolean,
    default: false,
  },
  environmental: {
    type: Boolean,
    default: false,
  },
  international: {
    type: Boolean,
    default: false,
  },
  health: {
    type: Boolean,
    default: false,
  },
  education: {
    type: Boolean,
    default: false,
  },
  artCulture: {
    type: Boolean,
    default: false,
  },
  events: [
    {
      type: Schema.Types.ObjectId,
      ref: "Event",
    },
  ],
});

const User = mongoose.model("User", userSchema);

//hook password before creating the user

userSchema.pre("save", hashPassword);

//method to validate the password

userSchema.methods.validatePassword = validatePassword;

module.exports = User;
