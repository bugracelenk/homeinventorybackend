const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "İsim Girilmedi"],
    },
    surName: {
      type: String,
      required: [true, "Soyisim Girilmedi."],
    },
    username: {
      type: String,
      unique: [true, "Bu kullanıcı adı daha önce alınmış"],
      required: [true, "Kullanıcı adı Girilmedi."],
    },
    email: {
      type: String,
      unique: [true, "Bu kullanıcı adı daha önce alınmış"],
      required: [true, "Kullanıcı adı Girilmedi."],
    },
    password: {
      type: String,
      required: [true, "Şifre girilmedi!"],
    },
    resetPasswordToken: {
      type: String,
      default: undefined,
    },
    resetPasswordExpires: {
      type: Date,
      default: undefined,
    },
    profileImage: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("User", UserSchema);

module.exports = {
  UserSchema,
  UserModel,
};
