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
      serial: string,
      userId: number,
      orderAt: string,
      price: number,
      status: number,
      orderDetails: [],
      userName: string,
      address: string,
      phone: string
}

export interface OrderDetails {
    id: number,
    productId: number,
    name: string,
    price: number,
    quantity: number
}