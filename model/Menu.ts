import { client } from "../prisma/prisma";

type Menu = {
    id: string,
    name: string,
    price: number
};

const getAllMenu = async (): Promise<Menu[]> => {
    const menus: Menu[] = await client.menu.findMany();
    return menus;
};

const addMenu = async (name: string, price: number): Promise<Menu> => {
    const menu: Menu = await client.menu.create({
        data: {
            name: name,
            price: price
        }
    });
    return menu;
};

const updateMenu = async (id: string, name: string, price: number): Promise<Menu> => {
    const menu: Menu = await client.menu.update({
        where: {
            id: id
        },
        data: {
            name: name,
            price: price
        }
    });
    return menu;
};

const deleteMenu = async (id: string): Promise<Menu> => {
    const menu: Menu = await client.menu.delete({
        where: {
            id: id
        },
    });
    return menu;
};

export{
    Menu,
    getAllMenu,
    addMenu,
    updateMenu,
    deleteMenu
}