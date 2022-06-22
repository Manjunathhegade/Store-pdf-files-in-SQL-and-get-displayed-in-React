const express = require("express");
const app = express();
ProtectedRoutes = express.Router();
responseTime = require("response-time");
const sequelize = require("./config/db");
bodyParser = require("body-parser");
cors = require("cors");
const fileUpload = require('express-fileupload');
var port = process.env.PORT || 3001;


app.get("/", (request, response) => {
  response.status(200).send("server API is Running");
});

// DB connection
sequelize.authenticate().then(result => {
  console.log(result);
})
.catch(err => {
  console.log(err);
});


app.use(cors());
app.use(bodyParser.urlencoded({ limit: "200mb", extended: true }));
app.use(bodyParser.json({ limit: "200mb" }));
app.use(responseTime());
app.use(fileUpload());
ProtectedRoutes.use(bodyParser.json({ limit: "200mb" }));
ProtectedRoutes.use(bodyParser.urlencoded({ limit: "200mb", extended: true }));
ProtectedRoutes.use(responseTime());

require('./routes/test-expense-blob')(app, ProtectedRoutes);

app.listen(port, () => console.log("CSConnect API is Running on port ", +port));
