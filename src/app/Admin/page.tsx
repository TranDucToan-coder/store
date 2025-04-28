"use client"

import { useState, useEffect } from "react"
import { getCountItem, getCountCustomer, getCountStaff } from "../callAPI/API"
import Link from "next/link"
import { useRouter } from "next/navigation"

const Dashboard = () => {
    const [data, setData] = useState<number>(0);
    const [dataCustomer, setDataCustomer] = useState<number>(0);
    const [dataStaff, setDataStaff] = useState<number>(0);
    const router= useRouter();

    const getData = async () => {
        try {
            const response = await getCountItem();
            const responseCus = await getCountCustomer();
            const responseStaff = await getCountStaff();
            if (response || responseCus || responseStaff) {
                setData(response[0].Total);
                setDataCustomer(responseCus[0].Total);
                setDataStaff(responseStaff[0].Total);
            }
        } catch (error) {
            console.log(error)
        }
    }
    const token = sessionStorage.getItem("token");
    const role = sessionStorage.getItem("role");
    useEffect(() => {
         getData();
    }, [])
    return (
        token ? (
            <div className="w-auto min-w-200 min-h-100 h-auto m-auto mt-10 mb-20 flex flex-wrap gap-10 justify-center">
        <div className="w-110 min-h-10 h-auto border rounded-2xl p6 shadow-2xl">
            <Link href="./Admin/ChangeBanner"><p className="p-4">Chỉnh ảnh banner</p></Link>
        </div>
        <div className="w-110 min-h-60 border rounded-2xl p-5 shadow-2xl">
            <p className="text-xl"> Tổng số sản phẩm: <label>{data}</label></p>
            <Link href="./Admin/ManageProduct"><p>Danh sách sản phẩm</p></Link>
        </div>
        <div className="w-110 min-h-60 border rounded-2xl p-5 shadow-2xl">
            <p className="text-xl"> Tổng số khách hàng: <label>{dataCustomer}</label></p>
            <p>Danh sách khách hàng</p>
        </div>
        <div className="w-110 min-h-60 border rounded-2xl p-5 shadow-2xl">
            <p className="text-xl"> Tổng số nhân viên: <label>{dataStaff}</label></p>
            <p>Danh sách nhân viên</p>
        </div>
    </div>
        ) : (
            <>This is private route</>
        )
    )
}
export default Dashboard;

