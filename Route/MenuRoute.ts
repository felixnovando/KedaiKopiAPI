import { Request, Response, Router } from "express";
import AuthMiddleware from "../Middleware/AuthMiddleware";
import { addMenu, deleteMenu, getAllMenu, Menu, updateMenu } from "../model/Menu";

const router:Router = Router();

router.use(AuthMiddleware);

router.get("/", async (req: Request, res: Response) => {
    try{
        const menus:Menu[] = await getAllMenu();
        res.json(menus);
    }catch(e){
        res.status(500).send((e as Error).message);
    }
});

router.post("/add-menu", async (req: Request, res: Response) => {
    type Request = {
        name: string,
        price: number
    };
    try{
        const payload: Request = req.body;
        const menu: Menu = await addMenu(payload.name, payload.price);
        res.json(menu);
    }catch(e){
        res.status(500).send((e as Error).message);
    }
});

router.put("/update-menu", async (req:Request, res: Response) => {
    type Request = {
        id: string,
        name: string,
        price: number
    };
    try{
        const payload: Request = req.body;
        const menu: Menu = await updateMenu(payload.id, payload.name, payload.price);
        res.json(menu);
    }catch(e){
        res.status(500).send((e as Error).message);
    }
});

router.delete("/delete-menu", async (req:Request, res: Response) => {
    type Request = {
        id: string
    };
    try{
        const payload: Request = req.body;
        const menu: Menu = await deleteMenu(payload.id);
        res.json(menu);
    }catch(e){
        res.status(500).send((e as Error).message);
    }
});

export default router;

