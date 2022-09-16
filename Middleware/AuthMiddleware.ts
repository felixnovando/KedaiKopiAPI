import { NextFunction, Request, Response } from "express";
import { verifyAccessToken, verifyRefreshToken } from "../Helper/AuthHelper";

const AuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try{
        const bearer_token = req.headers.authorization as string;
        const token_split = bearer_token.split(" ");
        const jwt_token = token_split[token_split.length - 1];

        const data = verifyAccessToken(jwt_token); 

        if(data){
            next();
            return
        }
        
        throw new Error("Invalid Token");
    }catch(e){
        // res.status(500).send((e as Error).message);
        res.status(401).send("Unauthorized");
    }
};

export default AuthMiddleware;