const express = require("express")
const morgan = require("morgan")
const cookieParser = require("cookie-parser");
// const cors =  require("cors")
const cors = require('cors');
const { APP_URL } = require("./src/config")
const APP_PORT = process.env.APP_PORT
const path = require("path") 
const router = require("./src/routes");
const connectDb = require("./src/config/connection");
// import router from "./routes";
const app = express();
var corsOptions = {
  // origin: "http://localhost:3000",
  origin: true,
  credentials: true,
};
app.get("/", (req, res) => {
  res.status(401).send({ status: false, message: "Invalid Credentials" });
});

global.appRoot = path.resolve(__dirname);
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json({ limit: "50mb" }));
app.use("/api",router);
app.use(express.static("./uploads"));
app.use("/uploads", express.static("./uploads"));
app.use((req, res, next) => {
  res.status(404).json({
    status: false,
    message: "Not Found",
  });
});
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    status: false,
    message: err.message,
  });
});
connectDb()
app.listen(APP_PORT || 8081, () => {
  console.log(`Server running on PORT ${APP_PORT}`);
});
