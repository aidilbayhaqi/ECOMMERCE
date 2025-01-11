import User from "../models/UserModels.js";
import argon2 from "argon2";
import path from "path";
import fs from "fs";
import { Op } from "sequelize";

export const getUsers = async (req, res) => {
  try {
    const response = await User.findAll({
      attributes: ["uuid", "name", "email", "role", "image", "url"],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getUserbyId = async (req, res) => {
  try {
    const response = await User.findOne({
      attributes: ["uuid", "name", "email", "role", "image", "url"],
      where: {
        uuid: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// createUser
export const createUser = async (req, res) => {
  const { name, email, password, confPassword, role } = req.body;
  // password setting
  if (password != confPassword)
    return res
      .status(400)
      .json({ msg: "Password and confirm password not match" });
  const hashPassword = await argon2.hash(password);
  
  // img setting
  if (req.files === null)
    return res.status(400).json({ msg: "no file uploaded" });
  const file = req.files.file;
  const fileSize = file.data.length;
  const ext = path.extname(file.name);
  const fileName = file.md5 + ext;
  const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
  const allowType = [".png", ".jpg", ".jpeg"];

  if (!allowType.includes(ext.toLowerCase()))
    return res.status(422).json({ msg: "Invalid Image" });
  if (fileSize > 5000000)
    return res.status(422).json({ msg: "Image must be less than 5 MB" });
  file.mv(`./public/images/${fileName}`, async (err) => {
    if (err) return res.status(500).json({ msg: err.message });
  });

  try {
    await User.create({
      name: name,
      email: email,
      password: hashPassword,
      role: role,
      image: fileName,
      url: url,
    });
    res.status(201).json({ msg: "Register success" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

// update user
export const updateUser = async (req, res) => {
  const user = await User.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!user) return res.status(404).json({ msg: "User not found" });
  const { name, email, password, confPassword, role } = req.body;
  let hashpassword;
  if (password === "" || password === null) {
    hashpassword = user.password;
  } else {
    hashpassword = await argon2.hash(password);
  }
  if (password != confPassword)
    return res
      .status(400)
      .json({ msg: "Password and confirm password not match" });
  let fileName = User.image;
  let filePath;
  if (req.files && req.files.image) {
    const file = req.files.image;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    fileName = file.md5 + ext;
    const allowType = [".png", ".jpg", ".jpeg"];

    if (!allowType.includes(ext.toLowerCase()))
      return res.status(422).json({ msg: "Invalid Image" });
    if (fileSize > 5000000)
      return res.status(422).json({ msg: "Image must be less than 5 MB" });

    filePath = `./public/images/${User.image}`;
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    file.mv(`./public/images/${fileName}`, (err) => {
      if (err) return res.status(500).json({ msg: err.message });
    });
  }

  const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
  try {
    await User.update(
      {
        name: name,
        email: email,
        password: hashpassword,
        role: role,
        image: fileName,
        url: url,
      },
      {
        where: {
          id: user.id,
        },
      }
    );
    res.status(200).json({ msg: "User updated" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const deleteUser = async (req, res) => {
  const user = await User.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!user) return res.status(404).json({ msg: "User not found" });
    const filePath = `./public/images/${user.image}`;
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath); // Hapus file gambar jika ada
    }
  try {
    await User.destroy({
      where: {
        id: user.id,
      },
    });
    res.status(200).json({ msg: "User deleted" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
