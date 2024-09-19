import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import bookRoute from "./routes/bookRoute.js";
import loginRoute from "./routes/loginRoute.js"
import multer from 'multer';
import path from 'path';
import bodyParser from 'body-parser';
//online store routes
import storeItemRoutes from "./routes/storeItemRoutes.js";
import orderRoutes from "./routes/Orders.js";
import SavedCard from "./routes/SavedCard.js";
import Order from "./models/Order.js";
import StoreItem from "./models/StoreItem.js";
import cors from "cors";


const app = express();

// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS POLICY
// Option 1: Allow All Origins with Default of cors(*)
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/store-items/:itemId', async (req, res) => {
  try {
      const item = await StoreItem.findById(req.params.itemId);
      if (!item) {
          return res.status(404).send({ message: 'Item not found' });
      }
      res.send(item);
  } catch (error) {
      res.status(500).send({ message: 'Error fetching item' });
  }
});

// Update item quantity route
app.put('/store-items/:id', async (req, res) => {
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

//get items details to the update form
app.get('/store-items/:id', async (req, res) => {
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

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });
// Serve static files (e.g., uploaded images)
app.use('/uploads', express.static('uploads'));
// Option 2: Allow Custom Origins
/*
app.use(
  cors({
    origin: "",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);
*/

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("welcome to mern");
});0 

app.use("/books", bookRoute);
app.use("/api/user", loginRoute);

//online store Routes
app.use('/store-items', storeItemRoutes);
app.use('/api', orderRoutes);
app.use(SavedCard);


mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connect to database");
    app.listen(PORT, () => {
      console.log(`App listen to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
