// controllers/itemController.js
// CRUD operations for items/products used by frontend pages.

const asyncHandler = require('express-async-handler');
const Item = require('../models/item');

// @desc    Get all items
// @route   GET /api/items
// @access  Public
const getItems = asyncHandler(async (req, res) => {
  const items = await Item.find().populate('owner', 'name email');
  res.json(items);
});

// @desc    Get single item
// @route   GET /api/items/:id
// @access  Public
const getItem = asyncHandler(async (req, res) => {
  const item = await Item.findById(req.params.id).populate('owner', 'name email');
  if (!item) return res.status(404).json({ message: 'Item not found' });
  res.json(item);
});

// @desc    Create item
// @route   POST /api/items
// @access  Private
const createItem = asyncHandler(async (req, res) => {
  const { title, description, price, tags = [] } = req.body;
  const item = new Item({ title, description, price, tags, owner: req.user._id });
  const created = await item.save();
  res.status(201).json(created);
});

// @desc    Update item
// @route   PUT /api/items/:id
// @access  Private (owner or admin)
const updateItem = asyncHandler(async (req, res) => {
  const item = await Item.findById(req.params.id);
  if (!item) return res.status(404).json({ message: 'Item not found' });
  if (item.owner && item.owner.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Not authorized to edit this item' });
  }
  const { title, description, price, tags, published } = req.body;
  if (title) item.title = title;
  if (description) item.description = description;
  if (typeof price !== 'undefined') item.price = price;
  if (tags) item.tags = tags;
  if (typeof published !== 'undefined') item.published = published;

  const updated = await item.save();
  res.json(updated);
});

// @desc    Delete item
// @route   DELETE /api/items/:id
// @access  Private (owner or admin)
const deleteItem = asyncHandler(async (req, res) => {
  const item = await Item.findById(req.params.id);
  if (!item) return res.status(404).json({ message: 'Item not found' });
  if (item.owner && item.owner.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Not authorized to delete this item' });
  }
  await item.remove();
  res.json({ message: 'Item removed' });
});

module.exports = { getItems, getItem, createItem, updateItem, deleteItem };
