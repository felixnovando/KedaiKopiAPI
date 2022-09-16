import { client } from "../prisma/prisma";

type User = {
    id: string,
    username: string,
    password: string
}

type LoggedUser = {
    id: string,
    username: string,
};

const getAllUser = async (): Promise<User[]> => {
    const users: User[] = await client.user.findMany();
    return users;
};

const getUserByUsername = async (username: string): Promise<User | null> => {
    const user: User | null = await client.user.findUnique({
        where: {
            username: username
        }
    });
    return user;
};

const addUser = async (username: string, password: string): Promise<User> => {
    const user: User = await client.user.create({
        data: {
            username: username,
            password: password
        }
    });
    return user;
};

const updateUser = async (id:string, username: string, password: string): Promise<User> => {
    const user: User = await client.user.update({
        where: {
            id: id
        },
        data: {
            username: username,
            password: password
        }
    });
    return user;
};

const deleteUser = async (id: string): Promise<User> => {
    const user: User = await client.user.delete({
        where: {
            id: id
        }
    });
    return user;
};

export{
    User,
    LoggedUser,
    getAllUser,
    getUserByUsername,
    addUser,
    updateUser,
    deleteUser
}