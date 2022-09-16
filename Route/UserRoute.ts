import { Request, Response, Router } from "express";
import { hashPassword } from "../Helper/AuthHelper";
import AuthMiddleware from "../Middleware/AuthMiddleware";
import { addUser, deleteUser, getAllUser, updateUser, User } from "../model/User";

const router = Router();

router.use(AuthMiddleware);

router.get("/", async (req: Request, res: Response) => {
  try {
    const users: User[] = await getAllUser();
    res.json(users);
  } catch (e) {
    res.status(500).send((e as Error).message);
  }
});

router.post("/add-user", async (req: Request, res: Response) => {
  type Request = {
    username: string;
    password: string;
  };
  try {
    const payload: Request = req.body;
    const user: User = await addUser(
      payload.username,
      await hashPassword(payload.password)
    );
    res.json(user);
  } catch (e) {
    res.status(500).send((e as Error).message);
  }
});

router.put("/update-user", async (req: Request, res: Response) => {
  type Request = {
    id: string,
    username: string,
    password: string
  };
  try{
    const payload: Request = req.body;
    const user: User = await updateUser(payload.id, payload.username, await hashPassword(payload.password));
    res.json(user);
  }catch(e){
    res.status(500).send((e as Error).message);
  }
});

router.delete("/delete-user", async (req: Request, res: Response) => {
  type Request = {
    id: string
  };
  try{
    const paylod: Request = req.body;
    const user: User = await deleteUser(paylod.id);
    res.json(user);
  }catch(e){
    res.status(500).send((e as Error).message);
  }
});

export default router;
