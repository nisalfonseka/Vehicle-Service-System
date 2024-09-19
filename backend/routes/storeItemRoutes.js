const express = require('express');
const fs = require('fs');
const path = require('path');
const StoreItem = require('../models/StoreItem');
const StoreDatabase = require('../models/StoreDatabase')
const router = express.Router();


/*// Route to add a new item to the StoreDatabase collection
router.post('/addNewOne', async (req, res) => {
  try {
    const newItem = new StoreDatabase({
      name: req.body.name,
      code: req.body.code,
      description: req.body.description,
      qty: req.body.qty,
      price: req.body.price,
      photo: req.body.photo // Base64 string of the image
    });

    await newItem.save();
    res.status(201).json({ message: 'Item saved to another database successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error saving item to another database', error });
  }
});*/

// Get all items
router.get('/store-items', async (req, res) => {
  try {
    const items = await StoreItem.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching items', error });
  }
});

// Get order details by ID and populate item details
router.get('/:orderId', async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId).populate('items.itemId'); // Assuming items are referenced by itemId
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Update item quantity
router.put('/store-items/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { qty } = req.body;
    await StoreItem.findByIdAndUpdate(id, { qty });
    res.status(200).json({ message: 'Item quantity updated successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating item quantity', error });
  }
});

// Update item quantity
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { qty } = req.body;
    const item = await StoreItem.findById(id);
    if (item) {
      item.qty = qty;
      await item.save();
      res.status(200).json({ message: 'Item quantity updated successfully!' });
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating item quantity', error });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const item = await StoreItem.findById(id);

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.json(item);
  } catch (error) {
    console.error('Error fetching item:', error);
    res.status(500).json({ message: 'Error fetching item', error });
  }
});

//update items
router.put('/item/:id', async (req, res) => {
  try {
    const updatedItem = await StoreItem.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: 'Error updating item', error });
  }
});

//dellete items from the database
router.delete('/item/:id', async (req, res) => {
  try {
    const deletedItem = await StoreItem.findByIdAndDelete(req.params.id);
    if (!deletedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.status(200).json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting item', error });
  }
});

// Route to add a new store item
router.post('/add', async (req, res) => {
  try {
    let photoPath = null;

    if (req.body.photo) {
      const base64Data = req.body.photo.replace(/^data:image\/\w+;base64,/, '');
      const buffer = Buffer.from(base64Data, 'base64');
      const fileName = `${Date.now()}.png`;
      const filePath = path.join(__dirname, '../uploads', fileName);
      fs.writeFileSync(filePath, buffer);
      photoPath = fileName;
    }

    const newItem = new StoreItem({
      name: req.body.name,
      code: req.body.code,
      description: req.body.description,
      qty: req.body.qty,
      price: req.body.price,
      photo: photoPath
    });

    await newItem.save();
    res.status(201).json({ message: 'Item added successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding item', error });
  }
});

// Route to get all Inventory items
router.get('/', async (req, res) => {
  try {
    const items = await StoreItem.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching items', error });
  }
});


// Fetch a specific item by ID
router.get('/:id', async (req, res) => {
  try {
    const item = await StoreItem.findById(req.params.id);
    res.json(item);
  } catch (error) {
    res.status(404).json({ message: 'Item not found', error });
  }
});

module.exports = router;
