const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const accountSid = "AC8da00d32b4e1bb96cdea4402f974ddbb";
const authToken = "885b3e4818db378ad07c5854f3ee78c0";
const client = require("twilio")(accountSid, authToken);

app.use(bodyParser.json());
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Welcome to my node-api");
});

app.post("/order", (req, res) => {
  console.log(req.body);

  const newOrder = {
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    order: req.body.order,
  };

  bodyMessage =
    "there is new order form " +
    newOrder.name +
    "\n" +
    "here's his/her number " +
    newOrder.phoneNumber +
    "\n" +
    "here's his/her order { " +
    newOrder +
    " }";

  client.messages
    .create({
      from: "whatsapp:+14155238886",
      body: bodyMessage.toString(),
      to: "whatsapp:+201207606621",
    })
    .then((message) => {
      res.send(200);
    });
});

app.listen(port, () => {
  console.log("Listening on port " + port);
});
