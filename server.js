import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js";
import autRoutes from "./routes/auth.Routes.js";


dotenv.config
connectDB()

const app = express();
app.use(express.json())


app.use("/api/auth", autRoutes)


const PORT = 5000;
app.listen(PORT, () => console.log(`server running on port ${PORT}`))



                                  