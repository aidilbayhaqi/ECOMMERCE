import Cart from "../models/CartModels.js";
import Products from "../models/ProductModels.js";

export const getCart = async (req, res) => {
  if (req.method === "GET") {
    try {
      const userId = req.userId; //request user id
      const cartItems = await Cart.findAll({
        where: { userId },
        include: [
          { model: Products, attributes: ["name", "price", "image", "desc", "url", "image"] },
        ], //memasukan data model yang didapat dari productId
        attributes: ["id", "quantity"], 
      });
      res.status(200).json(cartItems);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error fetching cart", error: error.message });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export const addCart = async (req, res) => {
  const { productId, quantity } = req.body; //request untuk quantity dan productId
  const userId = req.userId; //request userId dari middleware
  console.log("Parsed request body:", { userId, productId, quantity });

  try {
    if (!productId || !quantity) {
      return res
        .status(400)
        .json({ message: "Product ID and quantity are required" });
    }
    if (!userId) {
      return res
        .status(401)
        .json({ message: "Unauthorized: User ID is missing" });
    }
    
    let product;
    product = await Products.findByPk(productId); //melakukan fetching dari db product ke productId
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    if (product.stock < quantity) {
      return res.status(400).json({ message: "Not enough stock" });
    }
    
    let newQuantity = parseInt(quantity, 10); //melakukan parsing ke integer
    let cartItem = await Cart.findOne({
      where: { userId: userId, productId: productId },
    }); // fetching cart berdasarkan user id dan product id
    if (cartItem) {
      cartItem.quantity += newQuantity; // jika sebuah quantity sudah ada, maka tambahkan 1
      await cartItem.save();
    } else {
      cartItem = await Cart.create({
        userId: userId,
        productId: productId,
        quantity: newQuantity,
      }); // membuat atau menambahkan data baru seperti user id, product id, quantity
    }
    res.status(200).json({ msg: "Success", cartItem }); //response status berhasil
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding to cart", error: error.message }); //response status gagal
  }
};

export const deleteCart = async (req, res) => {
  if (req.method === "DELETE") {
    // Mengubah ke metode DELETE
    const { productId } = req.body;
    const userId = req.userId; // Mengambil userId dari middleware

    try {
      if (!productId) {
        return res.status(400).json({ message: "Product ID is required" });
      }

      const deletedCount = await Cart.destroy({
        where: { productId: productId, userId: userId },
      });
      if (deletedCount === 0) {
        return res.status(404).json({ message: "Product not found in cart" });
      }

      res.status(200).json({ message: "Product removed from cart" });
    } catch (error) {
      res.status(500).json({
        message: "Error removing product from cart",
        error: error.message,
      });
    }
  } else {
    res.setHeader("Allow", ["DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
