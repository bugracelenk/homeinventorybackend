const nodemailer = require("nodemailer");
const neh = require("nodemailer-express-handlebars");
const handlebars = require("handlebars");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const path = require("path");
const fs = require("fs");

const UserService = require("../services");

const { validFields } = require("../user.module");

const { returnError } = require("../../utilities");
const { validateBody } = require("../../utilities/validateQuery");
const promiseHandler = require("../../utilities/promiseHandler");

const smtpTransport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: "2525",
  auth: {
    user: process.env.NODEMAILER_USER || "bb5741ba3538e0",
    pass: process.env.NODEMAILER_PASS || "49c7c80b3f47a3",
  },
});

const login = async (req, res, next) => {
  const { email, username, password } = req.body;
  let type = "";
  let value = "";

  if (!password) return res.json(returnError("Giriş bilgileriniz eksik!"));

  if (email) {
    type = "email";
    value = email;
  } else if (username) {
    type = "username";
    value = username;
  } else {
    return res.json(returnError("Giriş bilgileriniz eksik!"));
  }

  const [loginErr, token] = await promiseHandler(UserService.login(type, value, password));
  if (loginErr) return res.json(returnError(loginErr));

  return res.json({
    status: true,
    token,
  });
};

const register = async (req, res, next) => {
  const args = await validateBody(Object.keys(req.body), req.body, validFields);
  if (args.error) {
    return res.json(returnError(args));
  }
  const hashedPassword = await bcrypt.hash(args.password, 10);
  args.password = hashedPassword;

  const [registerErr] = await promiseHandler(UserService.register(args));
  if (registerErr) return res.json(returnError(registerErr));

  const [loginErr, token] = await promiseHandler(UserService.login("email", args.email, hashedPassword));
  if (loginErr) return res.json(returnError(loginErr));

  return res.json({ status: true, token });
};

const forgotPassword = async (req, res, next) => {
  const { email, username } = req.query;

  let type = "";
  let value = "";

  if (email) {
    type = "email";
    value = email;
  } else if (username) {
    type = "username";
    value = username;
  } else {
    return res.json(returnError("Şifre değiştirme isteği için lütfen bir email adresi veya kullanıcı adı giriniz."));
  }

  const [error, tokenAndExpDate] = await promiseHandler(UserService.forgotPassword(type, value));
  if (error) return res.json(returnError(error));

  const filePath = path.join(__dirname, "../../assets/forgot_password.html");
  const source = fs.readFileSync(filePath, "utf-8").toString();
  const template = handlebars.compile(source);
  const htmlToSend = template({ token: tokenAndExpDate.token, name: tokenAndExpDate.name, surName: tokenAndExpDate.surName });

  const emailData = {
    from: "support@homeinventoryapp.com",
    to: tokenAndExpDate.email,
    subject: "Home Inventory App Password Change Request",
    html: htmlToSend,
  };

  await smtpTransport.sendMail(emailData);

  return res.json({
    status: true,
    expDate: tokenAndExpDate.expDate,
  });
};

const changePassword = async (req, res, next) => {
  const { token } = req.query;
  const { password } = req.body;

  if (!token || !password) return res.json(returnError("Gerekli bilgilerin tamamı sağlanmadı!"));

  const [changePassErr] = await promiseHandler(UserService.changePassword(token, password));
  if (changePassErr) return res.json(returnError(changePassErr));

  return res.json({
    status: true,
    message: "Şifre başarılı bir şekilde değiştirildi.",
  });
};

module.exports = {
  register,
  login,
  forgotPassword,
  changePassword,
};
