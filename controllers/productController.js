const nodemailer = require('nodemailer');
const User = require('../models/userModel');
const Product = require('../models/productModel');

// Create Product
exports.createProduct = async (req, res) => {
  try {
    const { name, category, description, techStack, tags, ytvideo, weburl, github, price } = req.body;
    const { image, document, sourceCode } = req.files;
    const creator = req.user.id;

    if (!image || !document || !category || !description || !price) {
      return res.status(400).json({ message: 'All fields are required, including price' });
    }

    const user = await User.findById(creator).select('name email');
    if (!user) return res.status(404).json({ message: 'User not found' });

    const newProduct = new Product({
      name,
      category,
      description,
      price,
      techStack: JSON.parse(techStack),
      tags: JSON.parse(tags),
      image: image[0].path,
      ytvideo,
      weburl,
      github,
      document: document[0].path,
      sourceCode: sourceCode[0]?.path,
      creator,
    });

    await newProduct.save();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'dttmapatuna@gmail.com',
      subject: 'New Product Added',
      text: `
        A new product has been added by ${user.name}.
        Email: ${user.email}
        
        Product Name: ${newProduct.name}
        Price: ${newProduct.price}
        Description: ${newProduct.description}
        Category: ${newProduct.category}
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({ message: 'Product created successfully', product: newProduct });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get All Products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('creator', 'name');
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Product Details
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('creator', 'name email profilePicture');
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

