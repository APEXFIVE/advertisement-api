import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import userRouter from "./routes/users.js";



// connect to the database
await mongoose.connect(process.env.MONGO_URI);
// create the express app
const app = express();

// use middlewares
app.use(express.json());
app.use(cors());



// Routes will be used here
app.use(userRouter);

// listen for incoming requests
app.listen(4040, () => {
    console.log("App is listening on port 4040");
});