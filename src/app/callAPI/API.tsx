import axios from "axios";
import {product, user} from "../model";

export const instance = axios.create({
    baseURL: "http://localhost:3001",
    timeout: 3000,
    headers: {
      "Authorization": "Bearer token"
    }
})

export async function getProduct() {
    try {
        const response = await instance.get("/product");
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
export async function getDetailProduct ({product_id}: {product_id : number}) {
    try {
        const response = await axios.get(`http://localhost:3001/product/${product_id}`);
        if(response)
            return response.data[0];
    } catch (error) {
        console.log(error);
    }
}
export async function getOrderOfUser({ username }: { username: string }) {
    try {
        const response = await instance.get(`/login/detail/${username}`);
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
        const response = await instance.get(`/order/user/${username}`)
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
        const response = await instance.post(`/order/submit`, {
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
            const response = await instance.post(`/order/detailOrder`, {
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
        const response = await instance.get(`/order/${order_id}`);
        if(response)
            return response.data;
    } catch (error) {
        console.log(error);
    }
}
export async function updateProduct ({
    product_name, category_id, price, description, stock_quantity, image_url, product_id} : 
    {
        product_id : number,
        product_name : string, 
        category_id : number, 
        price : number, 
        description : string, 
        stock_quantity : number, 
        image_url : string
}) {
    try {
        const response = await instance.put(`/product/updateProduct/${product_id}`, {product_name,category_id, price ,description,stock_quantity, image_url});
        if(response)
            return response.data[0];
    } catch (error) {
        console.log(error)
    }
}

export async function getCountItem() {
    try {
        const response = await instance.get("/dashboard/totalItem");
        if(response){
            return response.data;
        }
    } catch (error) {
        console.log(error);
    }
}

export async function getCountCustomer() {
    try {
        const response = await instance.get("/dashboard/totalCustomer");
        if(response){
            return response.data;
        }
    } catch (error) {
        console.log(error);
    }
}

export async function getCountStaff() {
    try {
        const response = await instance.get("/dashboard/totalStaff");
        if(response){
            return response.data;
        }
    } catch (error) {
        console.log(error);
    }
}
export async function getCustomer() {
    try {
        const response = await instance.get("/dashboard/customer");
        if(response)
            return response.data;
    } catch (error) {
        console.log(error)
    }
}
export async function getDetailCustomer({username} : {username : string}) {
    try {
        const response = await instance.get(`/dashboard/customer/${username}`);
        if(response)
            return response.data[0];
    } catch (error) {
        console.log(error)
    }
}
export async function updateUser({username, password, email, phone, address, role}: user) {
    try {
        const response = await instance.put(`/dashboard/employee/update/${username}`, {
            password,
            email,
            phone,
            address,
            role
        })
        if(response){
            console.log("Update complete!");
        }
    } catch (error) {
        console.log(error)
    }
}
export async function deleteUser({username} : {username : string}) {
    try {
        const response = await instance.delete(`/dashboard/customer/del/${username}`);
        if(response)
            return response.data;
    } catch (error) {
        console.log(error)
    }
}
export async function addUser({username, password, email, phone, address, role}: user) {
    try {
        const response = await instance.post(`/dashboard/customer/add`, {
            username, password, email, phone, address, role
        });
        if(response){
            return response.data;
        }
    } catch (error) {
        console.log(error)
    }
}
export async function getEmployee() {
    try {
        const response = await instance.get(`/dashboard/employee`);
        if(response){
            return response.data;
        }
    } catch (error) {
        
    }
}