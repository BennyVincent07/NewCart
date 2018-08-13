import React from "react";
export default({onClick,message="",className=""})=>(
    <button className="button" onClick={onClick} >{message}</button>
);
