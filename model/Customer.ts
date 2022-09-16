import { client } from "../prisma/prisma";

type Customer = {
    id: string,
    name: string
};

const getAllCustomer = async (): Promise<Customer[]> => {
    const customers: Customer[] = await client.customer.findMany();
    return customers;
};

const addCustomer = async (name: string): Promise<Customer> => {
    const customer: Customer = await client.customer.create({
        data: {
            name: name
        }
    });
    return customer;
};

const updateCustomer = async (id: string, name: string) : Promise<Customer> => {
    const customer: Customer = await client.customer.update({
        where: {
            id: id
        },
        data: {
            name: name
        }
    });
    return customer;
};

const deleteCustomer = async (id: string) : Promise<Customer> => {
    const custoemr: Customer = await client.customer.delete({
        where: {
            id: id
        }
    });
    return custoemr;
};

export{
    Customer,
    getAllCustomer,
    addCustomer,
    updateCustomer,
    deleteCustomer
}