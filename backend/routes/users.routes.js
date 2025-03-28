const express = require("express");
const bcrypt = require("bcrypt");
const { UserModel } = require("../models/users.models");
const jwt = require("jsonwebtoken");
const { auth } = require("../middlewares/users.middleware");
const { BlackListModel } = require("../models/blacklist");

const userRouter = express.Router();


userRouter.get("/", auth, async (req, res) => {
  try {
    if (req.body.role == "admin") {
      let users = await await UserModel.find();
      res.status(200).json({ users });
    } else {
      res.status(401).json({ error: "you don't have access to users" });
    }
  } catch (err) {
    console.log(err);
    res
      .status(400)
      .json({ message: "something went wrong", error: err.message });
  }
});

userRouter.post("/register", async (req, res) => {
  const { name, email, password, age, city, job, image,role } = req.body;
  const registeredUser = await UserModel.findOne({ email });

  if (registeredUser) {
    res.status(409).json({ msg: "User already exist. Please Login!!" });
  } else {
    try {
      bcrypt.hash(password, 5, async (err, hash) => {
        // Store hash in your password DB.
        if (err) {
          res.status(404).json({ msg: err });
        } else {
          const user = new UserModel({
            name,
            email,
            password: hash,
            age,
            city,
            job,
            image,
            role,
          });
          await user.save();
          res.status(201).json({ msg: "user created succesfully", user });
        }
      });
    } catch (error) {
      res.status(400).json({ error: error });
    }
  }
});


userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        // result == true

        const token = jwt.sign(
          { userId: user._id, user: user.name, role: user.role },
          "learnlink",
          {
            expiresIn: "7d",
          }
        );
        const rToken = jwt.sign(
          { userId: user._id, user: user.name },
          "LearnLink",
          {
            expiresIn: "24d",
          }
        );
        if (result) {
          res
            .status(202)
            .json({ msg: "User LogIn Success", token, rToken, user });
        } else {
          res.status(401).json({ msg: "invalid credentials" });
        }
      });
    } else {
      res.status(404).json({ msg: "user does not exit. Signup first!!" });
    }
  } catch (error) {
    res.status(400).json({ err: error.message });
  }
});

userRouter.patch("/update/:userId", async (req, res) => {
  const { userId } = req.params;
  const payload = req.body;

  try {
    let insertpayload;
    if (!payload?.password) {
      delete payload.password;
      await UserModel.findByIdAndUpdate({ _id: userId }, payload);
      const user = await UserModel.findOne({ _id: userId });
      res.status(200).json({ msg: "user updated successfully", user });
      return;
    }
    bcrypt.hash(payload.password, 2, async (err, hash) => {
      // Store hash in your password DB.
      if (err) {
        res.status(404).json({ msg: err });
      } else {
        // console.log(hash);
        insertpayload = await { ...payload, password: hash };
      }
      await UserModel.findByIdAndUpdate({ _id: userId }, insertpayload);
      const user = await UserModel.find({ _id: userId });
      res.status(200).json({ msg: "user updated successfully", user });
    });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

userRouter.delete("/delete/:userId", auth, async (req, res) => {
  try {
    if (req.body.role == "admin") {
      const { userId } = req.params;
      const deletedUser = await UserModel.find({ _id: userId });
      await UserModel.findByIdAndDelete({ _id: userId });
      res
        .status(200)
        .json({ msg: "user has been deleted", deletedUser: deletedUser });
    } else {
      res.status(401).json({ error: "you don't have access to delete users" });
    }
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

userRouter.post("/logout", (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const newToken = BlackListModel({ token });
    newToken.save();
    res.status(200).json({ msg: "The user has logged out" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
});

userRouter.get("/userCourse/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await UserModel.findById({ _id: userId }).populate("course");
    // console.log(user.course, userId);
    res.status(200).json({ course: user.course });
  } catch (err) {
    res
      .status(400)
      .json({ message: "Something Went Wrong", error: err.message });
  }
});

userRouter.post("/addCourse/:courseId", auth, async (req, res) => {
  try {
    let id = req.body.userId;
    const courseId = req.params.courseId;
    await UserModel.findOne({ _id: id, course: { $in: [courseId] } })
      .then(async (course) => {
        if (course) {
          res
            .status(400)
            .json({ error: "You already have Suscribed the Course" });
        } else {
          let user = await UserModel.findByIdAndUpdate(id, {
            $push: { course: courseId },
          });
          res
            .status(201)
            .json({ message: "You have Suscribe the Course", user });
        }
      })
      .catch((error) => {
        console.error("Error checking course:", error);
      });
  } catch (err) {
    res
      .status(400)
      .json({ message: "Something Went Wrong", error: err.message });
  }
});

module.exports = {
  userRouter,
};
