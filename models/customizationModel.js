const mongoose = require('mongoose');

const customizationSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    customizationText: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Customization', customizationSchema);
