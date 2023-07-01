// // user-routes.js
// import express from "express";
// import UserModel from "../model/user-model.js";

// const router = express.Router();

// // Create a new user
// router.post("/create", async (req, res) => {
//   try {
//     const { firstName, lastName, email, phone, address, profile } = req.body;
//     const user = new UserModel({
//       firstName,
//       lastName,
//       email,
//       phone,
//       address,
//       // profile,
//     });
//     await user.save();
//     res.status(201).json({ message: "User created successfully" });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: "Failed to create user" });
//   }
// });


// // Get all users
// router.get("/users", async (req, res) => {
//   try {
//     const users = await UserModel.find();
//     console.log("server-----"+users)
//     res.status(200).json(users);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: "Failed to fetch users" });
//   }
// });

// // // Update a user
// // router.put("/users/:id", async (req, res) => {
// //   try {
// //     const { id } = req.params;
// //     const { firstName, lastName, email, phone, address } = req.body;
// //     const updatedUser = await User.findByIdAndUpdate(
// //       id,
// //       { firstName, lastName, email, phone, address },
// //       { new: true }
// //     );
// //     res.status(200).json(updatedUser);
// //   } catch (error) {
// //     console.log(error);
// //     res.status(500).json({ error: "Failed to update user" });
// //   }
// // });

// // // Delete a user
// // router.delete("/users/:id", async (req, res) => {
// //   try {
// //     const { id } = req.params;
// //     const deletedUser = await User.findByIdAndDelete(id).exec();
// //     if (!deletedUser) {
// //       return res.status(404).json({ error: "User not found" });
// //     }
// //     res.status(200).json(deletedUser);
// //   } catch (error) {
// //     console.log(error);
// //     res.status(500).json({ error: "Failed to delete user" });
// //   }
// // });

// export default router;
