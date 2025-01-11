import { error } from "console";
import Product from "../models/ProductModels.js";
import User from "../models/UserModels.js";
import path from "path";
import fs from "fs";
import { Op } from "sequelize";

//get product
export const getProducts = async (req, res) => {
  try {
    const response = await Product.findAll({
      attributes: [
        "id",
        "uuid",
        "name",
        "price",
        "stock",
        "image",
        "url",
        "categories",
        "desc",
      ], // menemukan data attributes
      include: [
        {
          model: User,
          attributes: ["name", "email"],
        }, // menemukan data attribute user seperti nama, email
      ],
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

//get product by id
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findOne({
      where: {
        uuid: req.params.id,
      },
    });//mencari product berdasarkan uuid

    if (!product) return res.status(404).json({ msg: "Data tidak ditemukan" });

    const response = await Product.findOne({
      attributes: [
        "id", 
        "uuid",
        "name",
        "price",
        "stock",
        "image",
        "url",
        "categories",
        "desc",
      ], //menemukan attribute suatu product
      where: {
        id: product.id,
      },
      include: [
        {
          model: User,
          attributes: ["name", "email"],
        },
      ],
    });

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

//create product
export const createProduct = async (req, res) => {
  const { name, price, stock, categories, desc } = req.body; //request nama, harga, stok, kategori, dan deskripsi dengan request.body
  if (req.files === null)
    return res.status(400).json({ msg: "no file uploaded" });
  const file = req.files.file; //melakukan request untuk pengiriman data berupa fie
  const fileSize = file.data.length; //besar data file
  const ext = path.extname(file.name); //menentukan path file
  const fileName = file.md5 + ext;
  const url = `${req.protocol}://${req.get("host")}/images/${fileName}`; //path file disimpan
  const allowType = [".png", ".jpg", ".jpeg"]; //tipe data file

  if (!allowType.includes(ext.toLowerCase()))
    return res.status(422).json({ msg: "Invalid Image" });
  if (fileSize > 5000000)
    return res.status(422).json({ msg: "Image must be less than 5 MB" });
  file.mv(`./public/images/${fileName}`, async (err) => {
    if (err) return res.status(500).json({ msg: err.message });
  });

  const formattedPrice = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(price);
  try {
    await Product.create({
      name: name,
      price: formattedPrice,
      stock: stock,
      image: fileName,
      url: url,
      categories: categories,
      desc: desc,
      userId: req.userId,
    });
    res.status(201).json({ msg: "Product Created Successfuly" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

//update product
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!product) return res.status(404).json({ msg: "Data tidak ditemukan" });

    const { name, price, stock, categories, desc } = req.body;

    let fileName = Product.image;
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

      filePath = `./public/images/${Product.image}`;
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }

      file.mv(`./public/images/${fileName}`, (err) => {
        if (err) return res.status(500).json({ msg: err.message });
      });
    }

    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;

    const formattedPrice = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(price);

    if (req.role === "admin") {
      await Product.update(
        {
          name,
          price: formattedPrice,
          stock,
          image: fileName,
          url: url,
          categories: categories,
          desc: desc,
        },
        {
          where: {
            id: product.id,
          },
        }
      );
    } else {
      if (req.userId !== product.userId)
        return res.status(403).json({ msg: "Akses terlarang" });
      await Product.update(
        { name, price, stock, image: fileName, url: url, desc: desc },
        {
          where: {
            [Op.and]: [{ id: product.id }, { userId: req.userId }],
          },
        }
      );
    }
    res.status(200).json({ msg: "Product updated successfuly" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

//delete product
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!product) return res.status(404).json({ msg: "Data tidak ditemukan" });

    const filePath = `./public/images/${product.image}`;
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath); // Hapus file gambar jika ada
    }
    if (req.role === "admin") {
      await Product.destroy({
        where: {
          id: product.id,
        },
      });
    } else {
      if (req.userId !== product.userId)
        return res.status(403).json({ msg: "Akses terlarang" });
      await Product.destroy({
        where: {
          [Op.and]: [{ id: product.id }, { userId: req.userId }],
        },
      });
    }
    res.status(200).json({ msg: "Product deleted successfuly" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
