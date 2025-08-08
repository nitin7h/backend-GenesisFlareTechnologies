import express from "express"
import cors from "cors"
import route from "./routes/index.js"
import 'dotenv/config';
import { dbConnection } from "./database/db.js";
const app = express()
const port = process.env.PORT || 8000
const uri = process.env.MONGO_URI || " "

//middlewares
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: false }));

//mongodb connection
dbConnection(uri);

// routes
app.use(route)

app.listen(port, () => console.log(`Server started successfully at port ${port}...👍`))