const express = require("express")
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const rutaCliente = require("./routes/apiCliente")
const { Auth } = require("./middleware/Auth");
const rutaLog = require("./routes/apiLog")
const cookie = require("cookie-parser");
const cors = require("cors");
const morgan = require("morgan");
dotenv.config();
const app = express();

var corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
  credentials: true,
};

mongoose
  .connect(
    "mongodb+srv://" +
      process.env.DB_USERNAME +
      ":" +
      process.env.DB_PASSWORD +
      "@" +
      process.env.DB_HOST +
      "/" +
      process.env.DB_NAME +
      "?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Conectado a MongoDb");
    app.listen(process.env.PORT || 5000);
    console.log("Escuchando en puerto: " + process.env.PORT);
  })
  .catch((error) => {
    console.log(error);
  });
app.use(cookie());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use("/cliente", Auth, rutaCliente);
app.use("/auth", rutaLog)








