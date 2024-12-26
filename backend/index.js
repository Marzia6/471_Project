import express from 'express';
import cors from 'cors';
import dotenv from "dotenv"
import { connectDB } from './config/db.js';
import router from './routes/route.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT ||  5001;


app.use(cors());
app.use(express.json());

app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ limit: "20mb", extended: true }));

app.use("",router)

connectDB();    

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
