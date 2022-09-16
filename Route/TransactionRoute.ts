import { Request, Response, Router } from "express";
import AuthMiddleware from "../Middleware/AuthMiddleware";
import { createTransaction, deleteTransaction, getAllTransaction, Transaction } from "../model/Transaction";
import { TransactionDetailInput } from "../model/TransactionDetail";

const router: Router = Router();

router.use(AuthMiddleware);

router.get("/", async (req: Request, res: Response) => {
    try{
        const transactions: Transaction[] = await getAllTransaction();
        res.json(transactions);
    }catch(e){
        res.status(500).send((e as Error).message);
    }
});

router.post("/add-transaction", async (req: Request, res: Response) => {
    type Request = {
        date: Date,
        payment_method: string,
        customer_id: string,
        details: TransactionDetailInput[]
    };
    try{
        const payload: Request = req.body;
        const transaction: Transaction = await createTransaction(payload.date, payload.payment_method, payload.customer_id, payload.details);
        res.json(transaction);
    }catch(e){
        res.status(500).send((e as Error).message);
    }
});

router.delete("/delete-transaction", async (req: Request, res: Response) => {
    type Request = {
        id: string
    };
    try{
        const payload: Request = req.body;
        const transaction: Transaction | null = await deleteTransaction(payload.id);
        res.json(transaction);
    }catch(e){
        res.status(500).send((e as Error).message);
    }
});

export default router;