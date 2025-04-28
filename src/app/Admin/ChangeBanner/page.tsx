"use client"

import React, { useState, useContext, useEffect } from "react"
const ChangeBanner = ({} : {

}) => {
    const [banner, setBanner] = useState<string[]>(
        JSON.parse(localStorage.getItem("banner") || '["bg1.jpg","bg2.jpg","bg3.jpg","bg4.jpg"]')
    );
    const HandleChangeFile = (event : React.ChangeEvent<HTMLInputElement>, index : number) => {
        if(event.target.files && event.target.files[0]){
            const file = event.target.files[0];
            const filename = file.name;
            const updateImg = [...banner];
            updateImg[index] = filename;
            setBanner(updateImg);
            localStorage.setItem("banner", JSON.stringify(updateImg));
        }
    }
    return (
        <div className="flex flex-wrap w-400 min-h-100 m-auto mt-20">
            {banner.map((value, index) => (
                <div key={index} className="flex m-10">
                    <img
                        className="w-100 h-75"
                        src={value.length == 0 ? value : `/bg/${value}`} 
                        alt={`Banner ${index + 1}`}
                    />
                    <div>
                    <input type="file" onChange={(e) => HandleChangeFile(e , index)}></input>
                    </div>
                </div>

            ))}
        </div>
    )
}
export default ChangeBanner