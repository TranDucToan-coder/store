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
            const updateImgArr = [...banner];
            updateImgArr[index] = filename;
            setBanner(updateImgArr);
            localStorage.setItem("banner", JSON.stringify(updateImgArr));
        }
    }
    return (
        <div className="flex flex-wrap w-full min-w-[80%] min-h-100 m-auto mt-20
        sm:w-400">
            {banner.map((value, index) => (
                <div key={index} className="flex m-10 flex-wrap justify-center
                sm:mt-10">
                    <img
                        className="w-100 h-75"
                        src={value.length == 0 ? value : `/bg/${value}`} 
                        alt={`Banner ${index + 1}`}
                    />
                    <div>
                    <input type="file" onChange={(e) => HandleChangeFile(e , index)} className="sm:ml-2"></input>
                    </div>
                </div>

            ))}
        </div>
    )
}
export default ChangeBanner