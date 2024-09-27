import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import bookRoute from "./routes/bookRoute.js";
import loginRoute from "./routes/loginRoute.js"
import multer from 'multer';
import path from 'path';
import bodyParser from 'body-parser';
import { Book } from "./models/bookModel.js";
//online store routes
import storeItemRoutes from "./routes/storeItemRoutes.js";
import orderRoutes from "./routes/Orders.js";
import SavedCard from "./routes/SavedCard.js";
import StoreItem from "./models/StoreItem.js";

//inventory items
import inventory from "./routes/InventoryItems.js";
import categories from "./routes/Catagory.js";
import uploadRoutes from "./routes/uploadRoutes.js";


//finanve import
import invoiceRoute from "./routes/invoiceRoute.js";
import incomeRoute from "./routes/incomeRoute.js";
import expenseRoute from "./routes/expenseRoute.js";
import userRoute from "./routes/userRoute.js"; // Added user route

//emplyee routes
import empmanageRoute from "./routes/empmanageRoute.js";
import ShiftRoute from "./routes/ShiftRoute.js";
import profileRoute from "./routes/profileRoute.js";




import cors from "cors";


const app = express();

// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS POLICY
// Option 1: Allow All Origins with Default of cors(*)
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware
//app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Increase the size limit for JSON payloads
app.use(express.json({ limit: '50mb' })); // Set to 50MB or any larger limit
app.use(express.urlencoded({ limit: '50mb', extended: true }));


app.patch('/books/:id/status', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
      const validStatuses = ['Confirmed', 'Declined', 'Pending']; // Adjust according to your requirements
      if (!validStatuses.includes(status)) {
          return res.status(400).json({ message: 'Invalid status' });
      }

      const updatedBooking = await Book.findByIdAndUpdate(id, { status }, { new: true });
      if (!updatedBooking) {
          return res.status(404).json({ message: 'Booking not found' });
      }

      res.json(updatedBooking);
  } catch (error) {
      console.error('Error updating booking status:', error); // Log the error for debugging
      res.status(500).json({ message: 'Internal server error' });
  }
});
// Route to get books by status



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
// Serve static files from the 'uploads' directory
//app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
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
app.use('/api', SavedCard);
app.use('/api', uploadRoutes);

//inventory routes 
app.use(inventory);
app.use(categories);

//finance routes
app.use("/invoiceRequests", invoiceRoute);
app.use("/incomeRequests", incomeRoute);
app.use("/expenseRequests", expenseRoute);
app.use("/userRequests", userRoute); // Added user route

// Employee Record Management Routes
app.use("/empmanageRequests", empmanageRoute);

// Shift Routes
app.use("/Shift",ShiftRoute );

// Profile Routes
app.use("/Profile",profileRoute);




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
