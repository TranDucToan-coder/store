"use client"

import { deleteUser, getDetailCustomer, updateUser } from "@/app/callAPI/API"
import { user } from "@/app/model"
import { useParams } from "next/navigation"
import React, { useState, useEffect } from "react"

const DetailEmployee = ({ user }: {
    user: user
}) => {
    const { username } = useParams<{ username: string }>();
    const [data, setData] = useState<user>({
        user_id: 0,
        username: "",
        password: "",
        email: "",
        phone: 0,
        address: "",
        role: ""
    });
    const [toggle, setToggle] = useState<boolean>(true);
    const [edit, setEdit] = useState<boolean>(false);
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
    const handleChangeState = () => {
        setEdit(!edit)
    }
    const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setData({ ...data, email: value });
    }
    const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setData({ ...data, password: value })
    }
    const handleChangeAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setData({ ...data, address: value });
    }
    const handleChangePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setData({ ...data, phone: Number(value) });
    }
    const UpdateInf = async () => {
        const response = await updateUser({
            password: data.password,
            email: data.email,
            phone: data.phone,
            address: data.address,
            role: data.role,
            username: username
        });
        if (response == null) {
            window.alert(`Thay đổi thông tin ${username} thành công`)
        }
        else {
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
        if (typeof window != undefined) {
            setRole(sessionStorage.getItem("role"));
        }
    }, [])
    return (
        <div className="w-auto h-auto m-auto mt-10 p-2 grid gap-4 grid-cols-1 grid-rows-1
            sm:grid-cols-2 sm:grid-rows-1
            sm:w-300 min-w-[300px] sm:min-h-[250px] sm:p-0">
            <div className="flex flex-wrap flex-col w-full h-auto rounded-xl shadow-2xl p-8 gap-10 ">
                <div className="flex justify-around items-center">
                    <label className="mr-2 w-auto">username</label><p className="w-50 leading-5 p-4 border rounded-xl outline-none
                sm:w-[70%] ">{data?.username}</p>
                </div>
                <div className="flex leading-5 relative justify-around items-center">
                    <label className="mr-10 ml-3">password</label>
                    <input type={toggle ? "password" : "text"} value={data?.password.slice(0, 10)} className="w-50 p-4  border rounded-xl outline-none
                    sm:w-[70%]" onChange={(e) => handleChangePassword(e)}></input>
                    <button onClick={() => handleChangeToggle()} className="ml-2 cursor-pointer"><img
                        src={toggle ? ("https://www.svgrepo.com/show/532493/eye.svg") : ("https://www.svgrepo.com/show/532465/eye-slash.svg")} className="w-5 absolute left-[88%] top-[30%]
                        sm:left-[90%]">
                    </img></button>
                </div>
                <div className="flex justify-around items-center">
                    <label className="mr-2">address</label>
                    <input type="text" value={data?.address} className="w-50 leading-5 p-4 border rounded-xl outline-none
                    sm:w-[70%]" onChange={(e) => handleChangeAddress(e)}></input>
                </div>

                <div className="flex justify-around items-center">
                    <label className="mr-2">phone</label>
                    <input type="text" value={data?.phone} className="w-50 leading-5 p-4 border rounded-xl outline-none
                    sm:w-[70%]" onChange={(e) => handleChangePhone(e)}></input>
                </div>
                <div className="flex justify-around items-center">
                    <label className="mr-2">email</label>
                    <input type="text" value={data?.email} className="w-50  leading-5 p-4 border rounded-xl outline-none
                    sm:w-[70%]" onChange={(e) => handleChangeEmail(e)}></input>
                </div>


                {role != "manager" ? (
                    <div className="flex gap-5 justify-around">
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
export default DetailEmployee