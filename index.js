import express from 'express'
import { connectDb } from './db/connectDb.js';
import { configDotenv } from 'dotenv';
import userRouter from './routes/userRoute.js';
import foodRouter from "./routes/foodRoute.js";
import cors from "cors";
configDotenv();

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;
connectDb();

app.use(express.json());

app.use("/api",foodRouter)
app.use("/images",express.static("uploads"))


app.use("/api",userRouter)
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});