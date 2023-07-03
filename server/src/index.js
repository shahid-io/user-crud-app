import express from "express";
import cors from "cors";
import { ServerConfig } from "./config/server-config.js";
import connect from "./database/connection.js";
import UserModel from "./model/user-model.js";

/** express app */
const app = express();

/** middlewares */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

/** api check end point */
app.get("/", (req, res) => {
  res.status(201).json({ message: "Up" });
});
 
app.post("/createuser", async (req, res) => {
  try {
    const { firstName, lastName, email, phone, address, profile } = req.body;
    console.log(req.body);
    const user = new UserModel({
      firstName,
      lastName,
      email,
      phone,
      address,
      profile,
    });
    await user.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to create user" });
  }
});

/** Get users */
app.get("/users", async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

/** delete user */
app.delete("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await UserModel.findByIdAndDelete({ _id: id }).exec();

    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(deletedUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to delete User" });
  }
});

/** update user */
app.patch("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUserData = req.body;

    const updatedUser = await UserModel.findByIdAndUpdate(id, updatedUserData, {
      new: true,
    });
    res.json(updatedUser);
  } catch (error) {
    console.log("Error while updating User", error);
    res.status(500).json({ error: "Error while updating User" });
  }
});

/** server start listening when the mongoose gets connected */
connect()
  .then(() => {
    try {
      app.listen(ServerConfig.PORT, () => {
        console.log(`DB Connected`);
        console.log(`http://localhost:${ServerConfig.PORT}`);
      });
    } catch (error) {
      console.log("Couldn't Connected to DB", error);
    }
  })
  .catch((err) => {
    console.log("Coudn't Connected to DB -- catch()", err);
  });
