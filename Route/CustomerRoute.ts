import { Request, Response, Router } from "express";
import AuthMiddleware from "../Middleware/AuthMiddleware";
import { addCustomer, Customer, deleteCustomer, getAllCustomer, updateCustomer } from "../model/Customer";

const router: Router = Router();

router.use(AuthMiddleware);

router.get("/", async (req: Request, res: Response) => {
    try{
        const customers: Customer[] = await getAllCustomer();
        res.json(customers);
    }catch(e){
        res.status(500).send((e as Error).message);
    }
});

router.post("/add-customer", async (req: Request, res: Response) => {
    type Request = {
        name: string
    };
    try{
        const payload: Request = req.body;
        const customer: Customer = await addCustomer(payload.name);
        res.json(customer);
    }catch(e){
        res.status(500).send((e as Error).message);
    }
});

router.put("/update-customer", async (req:Request, res: Response) => {
    type Request = {
        id: string,
        name: string
    };
    try{
        const payload: Request = req.body;
        const customer: Customer = await updateCustomer(payload.id, payload.name);
        res.json(customer);
    }catch(e){
        res.status(500).send((e as Error).message);
    }
});

router.delete("/delete-customer", async (req:Request, res: Response) => {
    type Request = {
        id: string
    };
    try{
        const payload: Request = req.body;
        const customer: Customer = await deleteCustomer(payload.id);
        res.json(customer);
    }catch(e){
        res.status(500).send((e as Error).message);
    }
});

export default router;