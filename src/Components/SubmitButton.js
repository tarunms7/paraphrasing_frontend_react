import React from "react"
import "../index.css"


export default function SubmitButton(){
    return(
        <button className="rephrase_btn" onClick = {handleClick}><span>Rephrase the Content</span></button>
    )
}