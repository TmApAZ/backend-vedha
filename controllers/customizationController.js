const nodemailer = require('nodemailer');
require('dotenv').config();
const Customization = require('../models/customizationModel');
const User = require('../models/userModel'); // Assuming you have a User model
const Product = require('../models/productModel'); // Assuming you have a Product model

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

exports.createCustomization = async (req, res) => {
  try {
    const { productId, customText } = req.body;
    const userId = req.user.id;

    if (!customText) {
      return res.status(400).json({ message: 'Custom text is required' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const newCustomization = new Customization({
      product: productId,
      user: userId,
      customizationText: customText,
    });

    await newCustomization.save();

    const product = await Product.findById(productId).populate('creator');
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: product.creator.email,
      subject: 'New Product Customization',
      text: `A new customization has been submitted for your product "${product.name}".\n\nCustom Text: ${customText}\n\nSender Name: ${user.name}\nSender Email: ${user.email}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Error:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });

    res.status(201).json({ message: 'Customization saved successfully', customization: newCustomization });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
