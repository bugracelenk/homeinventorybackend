const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

mongoose.connect(
  "mongodb+srv://yogi:1234qwerasdf@cluster-dev.oyzzx.mongodb.net/home-inventory?retryWrites=true&w=majority",
  { useCreateIndex: true, useFindAndModify: true, useUnifiedTopology: true, useNewUrlParser: true },
  () => {
    console.log(`Connected to MongoDB`);
  }
);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Credentials", true);
  if (req.method === "OPTIONS") {
    console.log("hello");
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

const auth = require("./middlewares/auth");
const ItemRouter = require("./item/routes");
const UserRouter = require("./user/routes");
const ManufacturerRouter = require("./manufacturer/routes");
const LocationRouter = require("./location/routes");
const ReceiptRouter = require("./receipt/routes");
const SLRouter = require("./shopping-list/routes");

app.use("/api/v1/user", UserRouter);
// app.use(auth);
app.use("/api/v1/item", ItemRouter);
app.use("/api/v1/manufacturer", ManufacturerRouter);
app.use("/api/v1/location", LocationRouter);
app.use("/api/v1/receipt", ReceiptRouter);
app.use("/api/v1/sl", SLRouter);

module.exports = app;
