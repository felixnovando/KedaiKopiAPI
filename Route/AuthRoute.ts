import { Request, Response, Router } from "express";
import {
  expireTime,
  generateAccessToken,
  generateRefreshToken,
  refreshTokenExpireTime,
  VerifiedTokenResult,
  verifyAccessToken,
  verifyPassword,
  verifyRefreshToken,
} from "../Helper/AuthHelper";
import { getUserByUsername, LoggedUser, User } from "../model/User";

const router: Router = Router();

type Token = {
  token: string,
  refresh_token: string,
  access_token_expire_time: string,
  refresh_token_expire_time: string,
}

router.post("/login", async (req: Request, res: Response) => {
  type Request = {
    username: string;
    password: string;
  };
  try {
    const payload: Request = req.body;
    const user: User | null = await getUserByUsername(payload.username);

    if (typeof user != null) {
      const isValid = await verifyPassword(
        payload.password,
        user?.password ?? ""
      );

      if (isValid) {
        //give access token
        const loggedUser: LoggedUser = {
          id: user?.id ?? "",
          username: user?.username ?? "",
        };
        const token = generateAccessToken(loggedUser);
        const refreshToken = generateRefreshToken(loggedUser);

        res.json(<Token>{
          token: token,
          refresh_token: refreshToken,
          access_token_expire_time: expireTime,
          refresh_token_expire_time: refreshTokenExpireTime,
        });
        return;
      }
    }

    throw new Error("Invalid Username Or Password");
  } catch (e) {
    res.status(500).send((e as Error).message);
  }
});

router.post("/test-token", (req: Request, res: Response) => {
  type Request = {
    token: string
  };
  const payload: Request = req.body;
  try {
    const result:VerifiedTokenResult = verifyAccessToken(payload.token);
    res.json(result);
  } catch (e) {
    res.status(500).send((e as Error).message);
  }
});

interface RefreshTokenResult extends VerifiedTokenResult{
  access_token: string
}

router.post("/renew-token", (req: Request, res: Response) => {
  type Request = {
    token: string
  };
  const payload: Request = req.body;
  try {
    const result:VerifiedTokenResult = verifyRefreshToken(payload.token);

    if(result){

      const new_token = generateAccessToken(<LoggedUser>{
        id: result.id,
        username: result.username
      });

      res.json(<RefreshTokenResult>{
        ...result,
        access_token: new_token
      });
    }
  } catch (e) {
    res.status(500).send((e as Error).message);
  }
});

export default router;
