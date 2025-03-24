const Product = require("../model/productModel");
const cloudinary = require("../config/cloudinary");

// Create Product (Admin Only)
const createProduct = async (req, res) => {
  try {
    const { name, description, price, stockStatus } = req.body;
    const image = req.file;

    if (!image)
      return res
        .status(400)
        .json({ status: false, message: "Image is required" });

    const uploadedImage = await cloudinary.uploader.upload(image.path);

    const product = await Product.create({
      name,
      description,
      price,
      stockStatus,
      imageUrl: uploadedImage.secure_url,
    });

    res.status(201).json({ status: true, message: "Product created", product });
  } catch (error) {
    res.status(500).json({ status: false, message: "Server error", error });
  }
};

// Get All Products
const getProducts = async (req, res) => {
  const products = await Product.find();
  res
    .status(200)
    .json({ status: true, message: "Product fetched successfully", products });
};

// Get Single Product
const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product)
    return res
      .status(404)
      .json({ status: false, message: "Product not found" });

  res.status(200).json({ status: true, message: "Product fetched", product });
};

// Update Product (Admin Only)
const updateProduct = async (req, res) => {
  const { name, description, price, stockStatus } = req.body;

  const product = await Product.findById(req.params.id);
  if (!product)
    return res
      .status(404)
      .json({ status: false, message: "Product not found" });

  product.name = name || product.name;
  product.description = description || product.description;
  product.price = price || product.price;
  product.stockStatus = stockStatus || product.stockStatus;

  await product.save();

  res.status(200).json({ status: true, message: "Product updated", product });
};

// Delete Product (Admin Only)
const deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product)
    return res
      .status(404)
      .json({ status: false, message: "Product not found" });

  await Product.deleteOne({ _id: req.params.id });
  res.status(200).json({ status: true, message: "Product deleted" });
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
