const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");

const userRoutes = require("./routes/user");
const loginRoutes = require("./routes/login");
mongoose.connect("mongodb://127.0.0.1:27017/users");

const app = express();
app.use(bodyparser());




app.use("/api/v1/users", userRoutes);
app.use("/api/v1/", loginRoutes);




app.listen(5000, () => console.log("server started at 5000.."));