const cors = require("cors");
const express = require("express");

const app = express();
app.use(express.static("public"));
app.use(express.json());
app.use(cors());

// middleware for routes
app.use("/", require("./routes/api.js"));

//error handler
app.use(function (err, req, res, next) {
  res.status(422).send({ error: err.message });
});

app.listen(process.env.PORT || 4000, function () {
  console.log("Ready to Go!");
});
