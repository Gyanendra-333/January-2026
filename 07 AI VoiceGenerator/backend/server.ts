import exprss from "express";
import cors from "cors";
import "dotenv/config";
import dotenv from "dotenv";

dotenv.config({ quiet: true });

const app = exprss();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(exprss.json());

app.get("/", (req: any, res: any) => {
    res.send("Hello World! , Backend Server is Running");
});

app.listen(port, () => {
    console.log(`Server is Running on Port ${port}`);
});