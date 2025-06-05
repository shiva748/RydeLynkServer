const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");
const Bcrypt = require("bcryptjs");

const adminSchema = new Schema({
  AdminId: {
    type: String,
    unique: true,
    required: true,
  },
  Name: {
    type: String,
    required: true,
    trim: true,
  },
  Password: {
    type: String,
    required: true,
  },
  tokens: [
    {
      token: {
        type: String,
      },
      fcm: {
        type: String,
      },
      expire: {
        type: Number,
      },
    },
  ],
});

adminSchema.pre("save", async function (next) {
  if (this.isModified("Password")) {
    this.Password = await Bcrypt.hash(this.Password, 12);
  }
  next();
});

adminSchema.methods.genrateauth = async function () {
  try {
    let token = jwt.sign({ AdminId: this.AdminId }, process.env.KEY, {
      expiresIn: "1 days",
    });
    this.tokens.push({
      token,
      expire: new Date().getTime() + 1209600000,
    });
    await this.save();
    return token;
  } catch (error) {
    throw error;
  }
};

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
