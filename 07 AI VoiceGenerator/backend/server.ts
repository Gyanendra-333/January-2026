import exprss from "express";
import cors from "cors";
import "dotenv/config";
import dotenv from "dotenv";
import { clerkMiddleware } from '@clerk/express'

dotenv.config({ quiet: true });

const app = exprss();
const port = process.env.PORT || 3000;

// Middleware 
app.use(cors());
app.use(exprss.json());
app.use(exprss.urlencoded({ extended: true }));
app.use(clerkMiddleware());


app.get("/", (req: any, res: any) => {
    res.send("Hello World! , Backend Server is Running");
});

app.listen(port, () => {
    console.log(`Server is Running on Port ${port}`);
});