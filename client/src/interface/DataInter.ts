export interface Users {
    id: number;
    username: string;
    password: string;
    email: string;
    role: number;
    avatar: string;
    status: boolean;
    phone: string
    address: string
}

export interface Categorys {
    id: number,
    nameCategory: string,
    description: string,
    status: boolean
}

export interface Products {
    id: number,
    categoryId: number,
    name: string,
    description: string,
    price: number,
    stock: number,
    image: string
}

export interface Orders {
    id: 1,
    userId: number,
    priceAll: number,
    status: boolean,
    userName: string,
    userAddress: string,
    userPhone: string
}

export interface Carts{
    id: number,
    userId: number,
    productId: number,
    image: string,
    nameProduct: string,
    price: number,
    quantity: number
}