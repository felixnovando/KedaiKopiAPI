import { client } from "../prisma/prisma"
import { Customer } from "./Customer"
import { TransactionDetail, TransactionDetailInput } from "./TransactionDetail"

type Transaction = {
    id: string,
    date: Date,
    payment_method: string,
    transaction_details: TransactionDetail[]
    customer: Customer
};

const getAllTransaction = async (): Promise<Transaction[]> => {
    const transactions: Transaction[] = await client.transaction.findMany({
        select: {
            id: true,
            date: true,
            payment_method: true,
            customer: true,
            transaction_details: {
                include:{
                    menu: true
                }
            }
        }
    });
    return transactions;
};

const createTransaction = async (date: Date, payment_method: string, customer_id: string, details: TransactionDetailInput[]): Promise<Transaction> =>  {
    const transaction: Transaction = await client.transaction.create({
        data: {
            date: date ?? undefined,
            payment_method: payment_method,
            customer_id: customer_id,
            transaction_details: {
                createMany : {
                    data: details
                }
            }
        },
        select: {
            id: true,
            date: true,
            payment_method: true,
            customer: true,
            transaction_details: {
                include: {
                    menu: true
                }
            }
        }
    });
    return transaction;
};

const deleteTransaction = async (id: string): Promise<Transaction | null> => {
    const deleted:Transaction | null = await client.transaction.findUnique({
        where: {
            id: id
        },
        select: {
            id: true,
            date: true,
            payment_method: true,
            customer: true,
            transaction_details: {
                include: {
                    menu: true
                }
            }
        }
    });

    const deletedDetails = await client.transactionDetail.deleteMany({
        where: {
            transaction_id: id
        }
    });

    const transaction: any = await client.transaction.delete({
        where: {
            id: id
        },
    });
    return deleted;
};

export {
    Transaction,
    getAllTransaction,
    createTransaction,
    deleteTransaction
}