const express = require("express");
const app = express();
const morgan = require("morgan");
const withdraw = require("./withdraw")
const R = require("ramda")
const bodyParser = require('body-parser')

const PORT = process.env.PORT || 3000

app.use(morgan("tiny"));
app.use(bodyParser.json())

app.use("/", express.static("../build"))

app.post("/withdraw", function (req, res) {
  const amount = R.path(["body", "amount"], req)
  console.log("amount ::: ", amount)
  res.json(withdraw(amount))
});

app.listen(PORT, () => {
  console.log(`I am listening on ${PORT}`);
});
