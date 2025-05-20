"use client"

import { addUser } from "@/app/callAPI/API"
import { user } from "@/app/model";
import React, { useState } from "react";

const NewCustomer = () => {
    const [userData, setUserData] = useState<user>({
        username: "",
        password: "",
        email: "",
        phone: 0,
        address: "",
        role: "customer",
    });
    const HandleChangeUsername = (e : React.ChangeEvent<HTMLInputElement>) => {
        setUserData({...userData, username : e.target.value});
    }
    const HandleChangePassword = (e : React.ChangeEvent<HTMLInputElement>) => {
        setUserData({...userData, password : e.target.value});
    }
    const HandleChangeEmail = (e : React.ChangeEvent<HTMLInputElement>) => {
        setUserData({...userData, email : e.target.value});
    }
    const HandleChangePhone = (e : React.ChangeEvent<HTMLInputElement>) => {
        setUserData({...userData, phone : Number(e.target.value)});
    }
    const HandleChangeAddress = (e : React.ChangeEvent<HTMLInputElement>) => {
        setUserData({...userData, address : e.target.value});
    }
    const AddCustomer = async() => {
        try {
            const response = await addUser({
                username : userData.username,
                password : userData.password,
                email : userData.email, 
                phone: Number(userData.phone), 
                address : userData.address, 
                role: userData.role,
            })
            if(response){
                window.alert("Thêm thành viên thành công!");
            }else{
                window.alert("Thêm thành viên thất bại!")
            }
        } catch (error) {
            console.log(error)
        }

    }
    return(<div className="flex w-[80%] h-auto min-h-100 max-h-220 m-auto mt-20 justify-center overflow-X-auto">
        <table>
            <thead></thead>
            <tbody className="">
                <tr className="">
                    <td className="w-20">username: </td>
                    <td><input type="text" className="w-auto h-10 p-4 border outline-none rounded-lg
                    focus:border-red-400 focus:transition-all focus:duration-500
                    sm:w-100" onChange={(e) => HandleChangeUsername(e)}></input></td>
                </tr>
                <tr>
                    <td className="w-20">password: </td>
                    <td><input type="text" className="w-auto h-10 p-4 border outline-none rounded-lg
                    focus:border-red-400 focus:transition-all focus:duration-500
                    sm:w-100" onChange={(e) => HandleChangePassword(e)}></input></td>
                </tr>
                <tr>
                    <td className="w-20">email: </td>
                    <td><input type="text" className="w-auto h-10 p-4 border outline-none rounded-lg
                    focus:border-red-400 focus:transition-all focus:duration-500
                    sm:w-100" onChange={(e) => HandleChangeEmail(e)}></input></td>
                </tr>
                <tr>
                    <td className="w-20">phone: </td>
                    <td><input type="text" className="w-auto h-10 p-4 border outline-none rounded-lg
                    focus:border-red-400 focus:transition-all focus:duration-500
                    sm:w-100" onChange={(e) => HandleChangePhone(e)}></input></td>
                </tr>
                <tr>
                    <td className="w-20">address: </td>
                    <td><input type="text" className="w-auto h-10 p-4 border outline-none rounded-lg
                    focus:border-red-400 focus:transition-all focus:duration-500
                    sm:w-100" onChange={(e) => HandleChangeAddress(e)}></input></td>
                </tr>
                <tr>
                    <td colSpan={2}><button className="w-20 h-10 m-auto border rounded-lg
                    hover:border-red-400 hover:transition-all hover:duration-500 hover:text-red-400
                    sm:w-full" onClick={() => AddCustomer()}>Submit</button></td>
                </tr>
            </tbody>
            <tfoot></tfoot>
        </table>
    </div>)
}
export default NewCustomer