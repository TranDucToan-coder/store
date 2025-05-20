"use client"

import { newProduct } from "@/app/callAPI/API";
import { product } from "@/app/model"
import React, { useState } from "react"

const NewProduct = () => {
    const [data, setNewData] = useState<product>({
        product_name : "",
        price : 0, 
        image_url : "", 
        category_id: 0, 
        description: "", 
        stock_quantity: 0
    });
    const handleChangeName = (e : React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setNewData({...data, product_name : value})        
    }
    const handleChangePrice = (e : React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setNewData({...data, price : Number(value)})        
    }
    const handleChangeImage = (e : React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files != null){
            const value = e.target.files[0];
            const fileName = value.name;
            console.log(fileName)
            setNewData({...data, image_url : fileName});   
        }     
    }
    const handleChangeCategory = (e : React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setNewData({...data, category_id : Number(value)})        
    }
    const handleChangeDes = (e : React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        setNewData({...data, description : value})        
    }
    const handleChangeStock = (e : React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setNewData({...data, stock_quantity : Number(value)})        
    }
    const NewProduct = async () => {
        if(data.product_name == null || data.stock_quantity < 0){
            window.alert("Vui lòng nhập đầy đủ thông tin");
            return;
        }
        else{
            try {
                const response = await newProduct({
                    product_name : data?.product_name,
                    price : data?.price,
                    image_url: data?.image_url,
                    category_id : data?.category_id,
                    description : data?.description,
                    stock_quantity : data?.stock_quantity
                });
                if(response)
                    alert("Thêm sản phẩm thành công");
                else{
                    alert("Thêm sản phẩm thất bại");
                    return;
                }
            } catch (error) {
                console.log(error);
            }
        }
    }
    return(
    <div className="flex w-[80%] h-auto min-h-100 max-h-220 m-auto mt-20 justify-center overflow-X-auto
    sm:w-300">
        <div className="w-auto flex flex-col gap-5 ">
            <div className="flex items-center justify-between">
                <label className="w-30">Tên sản phẩm: </label> <input type="text" value={data.product_name} onChange={(e) => handleChangeName(e)} className="w-auto h-10 p-4 border outline-none rounded-lg
                    focus:border-red-400 focus:transition-all focus:duration-500
                    sm:w-100"></input>
            </div>
            <div className="flex items-center">
                <label className="w-30">Giá: </label><input type="text" value={data.price} onChange={(e) => handleChangePrice(e)} className="w-auto h-10 p-4 border outline-none rounded-lg
                    focus:border-red-400 focus:transition-all focus:duration-500
                    sm:w-100"></input>
            </div>
            <div className="flex items-center">
                <label className="w-30">Danh mục: </label><input type="text" value={data.category_id} onChange={(e) => handleChangeCategory(e)} className="w-auto h-10 p-4 border outline-none rounded-lg
                    focus:border-red-400 focus:transition-all focus:duration-500
                    sm:w-100"></input>
            </div>
            <div className="flex items-center">
                <label className="w-30">Số lượng tồn: </label><input type="number" value={data.stock_quantity} onChange={(e) => handleChangeStock(e)} className="w-auto h-10 p-4 border outline-none rounded-lg
                    focus:border-red-400 focus:transition-all focus:duration-500
                    sm:w-100"></input>
            </div>
            <div className="flex items-center">
                <label className="w-30">Mô tả:</label><textarea value={data.description} onChange={(e) => handleChangeDes(e)} className="w-auto h-10 p-4 border outline-none rounded-lg
                    focus:border-red-400 focus:transition-all focus:duration-500
                    sm:w-100"></textarea>
            </div>
            <div className="w-auto flex flex-col">
                <label>Hình ảnh: </label><input type="file" onChange={(e) => handleChangeImage(e)} className=""></input>
                <label>Preview</label><img src={`./../../${data.image_url}`} alt="none" loading="lazy" className="w-50 h-50 border rounded-sm p-2"></img>
            </div>
            <button onClick={() => NewProduct()} className="w-10 h-7 border rounded-sm hover:border-red-400 hover:text-red-400 hover:transition-all hover:duration-500
            sm:w-40">Submit</button>
        </div>
    </div>)
}
export default NewProduct