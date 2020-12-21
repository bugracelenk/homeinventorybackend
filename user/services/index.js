const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const { UserModel } = require("../models");

const register = async (args) => {
  return await UserModel.create(args);
};

const login = async (type, value, password) => {
  const user = await UserModel.findOne({ [type]: value }).exec();
  console.log(user);
  if (!user) throw new Error("Giriş yapılamadı!");

  const comparedHash = await bcrypt.compare(password, user.password);
  if (!comparedHash) throw new Error("Giriş Yapılamadı");

  const token = await jwt.sign(
    {
      userId: user._id,
      username: user.username,
      name: user.name,
      surName: user.surName,
      email: user.email,
    },
    "HH5ZfXCgpkzruvrKUoww",
    { expiresIn: "365d" }
  );

  return { token };
};

const getUserById = async (userId) => {
  return await UserModel.findById(userId).exec();
};

const updateUser = async (userId, args) => {
  return await UserModel.findByIdAndUpdate(userId, args);
};

const forgotPassword = async (type, value) => {
  const user = await UserModel.findOne({ [type]: value });
  if (!user) throw new Error("Kullanıcı bulunamadı!");

  const token = crypto.randomBytes(6).toString("hex");
  const expDate = Date.now() + 86400000;

  user.resetPasswordToken = token;
  user.resetPasswordExpires = expDate;

  await user.save();

  return { token, expDate, name: user.name, surName: user.surName, email: user.email };
};

const changePassword = async (token, password) => {
  const user = await UserModel.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gte: Date.now() } });
  if (!user) throw new Error("Kod geçersiz veya süresi geçmiş!");

  const newPassword = await bcrypt.hash(password, 10);

  user.password = newPassword;
  user.resetPasswordExpires = undefined;
  user.resetPasswordToken = undefined;

  await user.save();

  return { email: user.email, name: user.name, surName: user.surName };
};

module.exports = {
  register,
  getUserById,
  updateUser,
  login,
  forgotPassword,
  changePassword,
};
