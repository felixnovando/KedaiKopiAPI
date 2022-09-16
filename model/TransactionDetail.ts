import { client } from "../prisma/prisma";
import { Menu } from "./Menu";
import { Transaction } from "./Transaction";

type TransactionDetail = {
    transaction_id: string,
    menu_id: string,
    qty: number,
    menu: Menu
};

type TransactionDetailInput = {
    menu_id: string,
    qty: number
};

export{
    TransactionDetail,
    TransactionDetailInput
}