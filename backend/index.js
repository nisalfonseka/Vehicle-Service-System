import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import bookRoute from "./routes/bookRoute.js";
import loginRoute from "./routes/loginRoute.js"

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
