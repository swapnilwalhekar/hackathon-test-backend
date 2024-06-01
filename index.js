const express = require("express");
const cors = require("cors");
require("./db/config");
const User = require("./db/User");
const Roles = require("./db/Roles");
const Jwt = require("jsonwebtoken");
const AppUser = require("./db/AppUser");
const jwtKey = "test";
const app = express();

app.use(express.json());
app.use(cors());

app.get("/swapnil", (req, res) => {
  res.send("Getting a msg from Server...");
});

app.post("/register", async (req, resp) => {
  let user = new User(req.body);
  let result = await user.save();
  result = result.toObject();
  delete result.password;
  Jwt.sign({ result }, jwtKey, { expiresIn: "2h" }, (err, token) => {
    if (err) {
      resp.send("Something went wrong");
    }
    resp.send({ result, auth: token });
  });
});

app.post("/login", async (req, resp) => {
  if (req.body.password && req.body.email) {
    let user = await User.findOne(req.body).select("-password");
    if (user) {
      Jwt.sign({ user }, jwtKey, { expiresIn: "2h" }, (err, token) => {
        if (err) {
          resp.send("Something went wrong");
        }
        resp.send({ user, auth: token });
      });
    } else {
      resp.status(400).send({
        message: "No User found, Please enter valid email and password",
      });
    }
  } else {
    resp.send({ result: "Please enter valid email and password" });
  }
});

// -------------Users-------------------

app.get("/app-users", async (req, resp) => {
  const users = await AppUser.find();
  if (users.length > 0) {
    resp.send(users);
  } else {
    resp.send({ result: "No Users found" });
  }
});

app.post("/add-appuser", async (req, resp) => {
  let newUser = new AppUser(req.body);
  let result = await newUser.save();
  resp.send(result);
});

app.delete("/appuser/:id", async (req, resp) => {
  let selectedRole = await AppUser.findOne({ _id: req.params.id });
  let result = await AppUser.deleteOne({ _id: req.params.id });
  if (result.acknowledged === true) {
    resp.send(selectedRole);
  } else {
    resp.send({ result: "No Record Found." });
  }
});

app.get("/appuser/:id", async (req, resp) => {
  let result = await AppUser.findOne({ _id: req.params.id });
  if (result) {
    resp.send(result);
  } else {
    resp.send({ result: "No Record Found." });
  }
});

app.put("/appuser/:id", async (req, resp) => {
  let selectedRole = await AppUser.findOne({ _id: req.params.id });
  let result = await AppUser.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  );
  if (result.acknowledged === true) {
    resp.send(selectedRole);
  } else {
    resp.send({ result: "Error when updating." });
  }
});

app.get("/appuser-search/:key", async (req, resp) => {
  let result = await AppUser.find({
    $or: [
      {
        name: { $regex: req.params.key },
      },
    ],
  });
  resp.send(result);
});

// --------------Roles------------------

app.post("/add-role", async (req, resp) => {
  let newRole = new Roles(req.body);
  let result = await newRole.save();
  resp.send(result);
});

app.get("/roles", async (req, resp) => {
  const products = await Roles.find();
  if (products.length > 0) {
    resp.send(products);
  } else {
    resp.send({ result: "No Roles found" });
  }
});

app.delete("/role/:id", async (req, resp) => {
  let selectedRole = await Roles.findOne({ _id: req.params.id });
  let result = await Roles.deleteOne({ _id: req.params.id });
  if (result.acknowledged === true) {
    resp.send(selectedRole);
  } else {
    resp.send("error: " + error.message);
  }
});

app.get("/role/:id", async (req, resp) => {
  let result = await Roles.findOne({ _id: req.params.id });
  if (result) {
    resp.send(result);
  } else {
    resp.send({ result: "No Record Found." });
  }
});

app.put("/role/:id", async (req, resp) => {
  let selectedRole = await Roles.findOne({ _id: req.params.id });
  let result = await Roles.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  );
  if (result.acknowledged === true) {
    resp.send(selectedRole);
  } else {
    resp.send({ result: "Error when updating." });
  }
});

app.get("/search/:key", async (req, resp) => {
  let result = await Roles.find({
    $or: [
      {
        name: { $regex: req.params.key },
      },
    ],
  });
  resp.send(result);
});

const port = 9000;
app.listen(port, () => {
  console.log("Server is running on port:", port);
});
