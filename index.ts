import express, {Express, Request, Response} from 'express';
import dotenv from 'dotenv';
import userRouter from "./Route/UserRoute";
import menuRouter from "./Route/MenuRoute";
import customerRouter from "./Route/CustomerRoute";
import transactionRouter from "./Route/TransactionRoute";
import authRouter from "./Route/AuthRoute";
import path from 'path';
import cors from "cors";

dotenv.config();

const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(",")

const options: cors.CorsOptions = {
    origin: allowedOrigins
};

const app: Express = express();
const port = process.env.PORT;

app.use(cors(options));

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use("/user",userRouter);

app.use("/menu", menuRouter);

app.use("/customer", customerRouter);

app.use("/transaction", transactionRouter);

app.use("/auth", authRouter);

app.get("/", (req: Request, res: Response) => {
    res.redirect("Home.html");
});

app.listen(port, () => {
    console.log(`Server is runing at https://localhost/${port}`);
});