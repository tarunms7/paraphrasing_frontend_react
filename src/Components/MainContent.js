import React from "react"
import "../index.css"

export default function Main_Content(){
    const [output, setOutput] = React.useState("")
    function handleClick(){
        setOutput("There is nothing to display.")
    }
    return(
        <div className ="main_content">
            <textarea className="input_1"></textarea>
            <button className="rephrase_btn" onClick = {handleClick}><span>Rephrase the Content</span></button>
            <textarea value={output} onChange = {(e)=>{setOutput(e.target.value)}} className="input_2"></textarea>
        </div>
    )
}