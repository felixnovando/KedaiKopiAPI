import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { LoggedUser } from "../model/User";
import dotenv from 'dotenv';

dotenv.config();

const saltRounds = 10;
const expireTime = process.env.TOKEN_LIFE;
const refreshTokenExpireTime = process.env.REFRESH_TOKEN_LIFE;

const hashPassword = async (plain_password: string): Promise<string> => {
    const hashed_password = await bcrypt.hash(plain_password, saltRounds);
    return hashed_password;
};

const verifyPassword = async (plain_password: string, hashed_password: string): Promise<boolean> => {
    const isValid = await bcrypt.compare(plain_password, hashed_password);
    return isValid;
}

const generateAccessToken = (user: LoggedUser): string => {
    const token = jwt.sign(user, process.env.TOKEN_SECRET ?? "", {expiresIn: expireTime});
    return token;
};

const generateRefreshToken = (user: LoggedUser): string => {
    const token = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET ?? "", {expiresIn: refreshTokenExpireTime});
    return token;
};

const verifyAccessToken = (token: string) : VerifiedTokenResult=> {
    const result = jwt.verify(token, process.env.TOKEN_SECRET ?? "") as VerifiedTokenResult;
    return result;
};

const verifyRefreshToken = (token: string) : VerifiedTokenResult => {
    const result = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET ?? "") as VerifiedTokenResult;
    return result;
}; 

interface VerifiedTokenResult extends LoggedUser{
    iat: number,
    exp: number,
};

export{
    expireTime,
    refreshTokenExpireTime,
    hashPassword,
    verifyPassword,
    generateAccessToken,
    verifyAccessToken,
    verifyRefreshToken,
    generateRefreshToken,
    VerifiedTokenResult
}