"use client"

import { deleteUser, getDetailCustomer, updateUser } from "@/app/callAPI/API"
import {user } from "@/app/model"
import { useParams } from "next/navigation"
import React, { useState, useEffect } from "react"

const DetailCustomer = ({ user }: {
    user: user
}) => {
    const { username } = useParams<{username : string}>();
    const [data, setData] = useState<user>({
        user_id : 0,
        username : "",
        password : "",
        email: "",
        phone: 0,
        address : "",
        role: ""
    });
    const [toggle, setToggle] = useState<boolean>(true);
    const [role, setRole] = useState<string | null>(null);
    const getData = async () => {
        if (username) {
            const response = await getDetailCustomer({ username: username as string });
            console.log(data)
            setData(response)
        }
    }
    const handleChangeToggle = () => {
        setToggle(!toggle)
    }
    const handleChangeEmail = (e : React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setData({...data, email : value});
    }
    const handleChangePassword = (e : React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setData({...data, password : value})
    }
    const handleChangeAddress = (e : React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setData({...data, address: value});
    }
    const handleChangePhone  = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setData({...data, phone : Number(value)});
    }
    const UpdateInf = async() => {
        const response = await updateUser({
            password : data.password, 
            email : data.email,
            phone : data.phone,
            address : data.address,
            role : data.role,
            username : username
        });
        if(response == null){
            window.alert(`Thay đổi thông tin ${username} thành công`)
        }
        else{
            window.alert(`Thay đổi thông tin ${username} thất bại`)
            return;
        }
    }
    const DelEmp = async () => {
        try {
            const confirm = window.confirm();
            if (confirm) {
                const response = await deleteUser({ username });
                if (response) {
                    window.alert("Xóa nhân viên thành công");
                }
                else {
                    return;
                }
            }
        } catch (error) {
            console.log("Error when del Emp " + error)
        }
    }
    useEffect(() => {
        getData();
        if(typeof window != undefined) {
            setRole(sessionStorage.getItem("role"));
        }
    }, [])
    return (
        <div className="w-300 min-w-[300px] min-h-[250px] h-auto m-auto mt-10 grid gap-4 
            grid-cols-1 grid-rows-1
            md:grid-cols-2 md:grid-rows-2
            lg:grid-cols-2 lg:grid-rows-2">
            <div className="flex flex-col h-auto rounded-xl shadow-2xl p-8 row-span-2 gap-10">
                <p className="w-[70%] leading-5 p-4 border rounded-xl outline-none">{data?.username}</p>
                <div className="leading-5 flex items-center">
                    <input type={toggle ? "password" : "text"} value={data?.password.slice(0, 10)} className="w-[70%] p-4 border rounded-xl outline-none" onChange={(e) => handleChangePassword(e)}></input>
                    <button onClick={() => handleChangeToggle()} className="ml-2 cursor-pointer"><img
                    src={toggle ? ("https://www.svgrepo.com/show/532493/eye.svg") : ("https://www.svgrepo.com/show/532465/eye-slash.svg")} className="w-5">
                    </img></button>
                </div>
                <input type="text" value={data?.address} className="w-[70%]  leading-5 p-4 border rounded-xl outline-none" onChange={(e) => handleChangeAddress(e)}></input>
                <input type="text" value={data?.phone} className="w-[70%]  leading-5 p-4 border rounded-xl outline-none" onChange={(e) => handleChangePhone(e)}></input>
                <input type="text" value={data?.email} className="w-[70%]  leading-5 p-4 border rounded-xl outline-none" onChange={(e) => handleChangeEmail(e)}></input>
                {role != "manager" ? (
                    <div className="flex gap-5">
                        <button className="w-40 h-auto float-left border rounded-lg p-3 hover:text-red-400 hover:transition-all hover:duration-500" onClick={() => UpdateInf()}>Submit</button>
                        <button className="w-40 h-auto float-left border rounded-lg p-3 hover:text-red-400 hover:transition-all hover:duration-500" onClick={() => DelEmp()}>Delete</button>
                        </div>
                ) : (
                    <div></div>
                )}
            </div>
            <div className="h-full flex justify-center">
                <img src="https://th.bing.com/th/id/OIP.JHv88OaUM5cIa_1jLd5fUwHaF1?rs=1&pid=ImgDetMain" className="w-[50%]"></img>
            </div>
            <div className=""></div>
        </div>
    );
}
export default DetailCustomer