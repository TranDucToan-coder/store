"use client"

import axios from "axios"
import { useState, useEffect } from "react"
import {user} from "../../model"
import { getCustomer } from "@/app/callAPI/API"
import Link from "next/link"

const ManageEmployee = () => {
    const [data, setData] = useState<user[]>([]);
    const getData = async () => {
        const response = await getCustomer();
        try {
            if (response && response.data) {
                setData(response);
            }
            else
                console.log("Can't get in4");
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getData();
    }, [])
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <td>Id</td>
                    </tr>
                    <tr>
                        <td>Username</td>
                    </tr>
                    <tr>
                        <td>Phone</td>
                    </tr>
                    <tr>
                        <td>#</td>
                    </tr>
                </thead>

                {data.map((value, index) => (<tbody>
                    <tr>
                        <td key={value.user_id}>{value.user_id}</td>
                    </tr>
                    <tr>
                        <td>{value.username}</td>
                    </tr>
                    <tr>
                        <td>{value.phone}</td>
                    </tr>
                    <tr>
                        <td>detail</td>
                    </tr>
                </tbody>))}
                <tfoot></tfoot>
            </table>
        </div>
    )
}
export default ManageEmployee