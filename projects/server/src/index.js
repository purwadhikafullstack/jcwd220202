const express = require("express");
const cors = require("cors");
const { join } = require("path");
const db = require("../models");
const fs = require("fs");
const startVoucherScheduler = require("../lib/startVoucherScheduler");
const endVoucherScheduler = require("../lib/endVoucherSchedule");
const salesReportScheduler = require("../lib/salesReportScheduler");
const path = require("path");
const dotenv = require("dotenv").config({
  path: path.resolve(__dirname, "../.env"),
});

const PORT = process.env.PORT || 8000;
const app = express();
app.use(cors());

app.use(express.json());

//#region API ROUTES

// ===========================
// NOTE : Add your routes here
const registerRoute = require("./routes/registerRoute");
const loginRoute = require("./routes/loginRoute.js");
const profileRoute = require("./routes/userProfileRoute.js");
const loginAdminRoute = require("./routes/loginAdminRoute.js");
const categoryRoute = require("./routes/categoryRoute");
const adminProductRoute = require("./routes/adminProductRoute");
const productRoute = require("./routes/productRoute.js");
const geocodeRoute = require("./routes/geocodeRoute");
const createAdminRoute = require("./routes/createAdminRoute");
const adminBranchRoute = require("./routes/adminBranchRoute");
const productHistoryRoute = require("./routes/productHistoryRoute");
const adminTransactionRoute = require("./routes/adminTransactionRoute");
const passwordRoute = require("./routes/passwordRoute.js");
const voucherAdminRoute = require("./routes/voucherAdminRoute.js");
const transactionRoute = require("./routes/transactionRoute.js");
const adminSalesRoute = require("./routes/adminSalesRoute");

app.use("/api/user", loginRoute);
app.use("/api/profile", profileRoute);
app.use("/api/admin", loginAdminRoute);
app.use("/api/register", registerRoute);
app.use("/api/category", categoryRoute);
app.use("/api/admin-product", adminProductRoute);
app.use("/api/product", productRoute);
app.use("/api/geocode", geocodeRoute);
app.use("/api/create-admin", createAdminRoute);
app.use("/api/admin-branch", adminBranchRoute);
app.use("/api/product-history", productHistoryRoute);
app.use("/api/admin-transaction", adminTransactionRoute);
app.use("/api/password", passwordRoute);
app.use("/api/admin-voucher", voucherAdminRoute);
app.use("/api/transaction", transactionRoute);
app.use("/api/admin-sales", adminSalesRoute);

app.use("/api/public", express.static("public"));

app.get("/api", (req, res) => {
  res.send(`Hello, this is my API`);
});

app.get("/api/greetings", (req, res, next) => {
  res.status(200).json({
    message: "Hello, Student !",
  });
});

// ===========================

// not found
app.use((req, res, next) => {
  if (req.path.includes("/api/")) {
    res.status(404).send("Not found !");
  } else {
    next();
  }
});

// error
app.use((err, req, res, next) => {
  if (req.path.includes("/api/")) {
    console.error("Error : ", err.stack);
    res.status(500).send("Error !");
  } else {
    next();
  }
});

//#endregion

//#region CLIENT
const clientPath = "../../client/build";
app.use(express.static(join(__dirname, clientPath)));

// Serve the HTML page
app.get("*", (req, res) => {
  res.sendFile(join(__dirname, clientPath, "index.html"));
});

//#endregion

app.listen(PORT, async (err) => {
  db.sequelize.sync({ alter: true });

  if (!fs.existsSync("public")) {
    fs.mkdirSync("public");
  }

  if (err) {
    console.log(`ERROR: ${err}`);
  } else {
    console.log(`APP RUNNING at ${PORT} ✅`);
  }
});

startVoucherScheduler.invoke();
endVoucherScheduler.invoke();
salesReportScheduler.invoke();
