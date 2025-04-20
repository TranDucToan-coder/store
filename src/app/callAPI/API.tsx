import axios from "axios";
import { useState } from "react";
import product from "../model";
import order from "../model";

export async function getProduct() {
    try {
        const response = await axios.get("http://localhost:3001/product");
        if (response) {
            return response.data;
        }
        else {
            console.log("Can't get data");
            return;
        }
    } catch (error) {
        console.log(error);
    }
}
export async function getOrderOfUser({ username }: { username: string }) {
    try {
        const response = await axios.get(`http://localhost:3001/login/detail/${username}`);
        if (response) {
            const results = response.data[0];
            return results;
        }
        else
            return;
    } catch (error) {
        console.log(error);
    }
}
export async function getUser({ username }: { username: string }) {
    try {
        const response = await axios.get(`http://localhost:3001/order/user/${username}`)
        if (response) {
            return response.data;
        }
    } catch (error) {
        console.log(error)
    }
};

export async function AddOrder({ user_id, order_date, total_amount, status }: {
    user_id: number,
    order_date: string,
    total_amount: number,
    status: string
}
) {
    try {
        const response = await axios.post(`http://localhost:3001/order/submit`, {
            user_id, order_date, total_amount, status
        })
        if (response.status === 200) {
            window.alert("Đơn hàng đã được gửi thành công!");
            console.log(response.data);
            return response.data.order_id;
        } else {
            window.alert("Có lỗi xảy ra, vui lòng thử lại sau.");
        }
    } catch (error) {
        console.log(error);
    }

}

export async function AddDetailOrder({ order_id, cartItems }: {
    cartItems: product[],
    order_id: number
}) {
    try {
        for (const item of cartItems) {
            const response = await axios.post(`http://localhost:3001/order/detailOrder`, {
                order_id,
                product_id: item.product_id,
                quantity: item.quantity,
                price: item.price
            })
            if (!response) return null;
        }
    } catch (error) {
        console.log(error);
    }
}

export async function getDetailOrder (order_id : number) {
    try {
        const response = await axios.get(`http://localhost:3001/order/${order_id}`);
        if(response)
            return response.data;
    } catch (error) {
        console.log(error);
    }
}