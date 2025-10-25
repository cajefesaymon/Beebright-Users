  // models/item.js
// Example item/product model used by frontend for CRUD operations.

const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    price: { type: Number, default: 0 },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    tags: [String],
    published: { type: Boolean, default: true },
  },     
); 
module.exports = mongoose.models.Item || mongoose.model('Item', itemSchema);
