import React from "react"
import "../index.css"
import axios from 'axios'
export default function Main_Content(){
    const [output, setOutput] = React.useState("")
    const [input, setInput] = React.useState("")
    const [placeholder,setPlaceholder] = React.useState("type something and hit the below button to see the paraphrased content!")
    async function handleClick(){
        if(input == ""){
            setPlaceholder("Please enter something before proceding..")
        }
        else{
            const newPost = {
                input : input
            }
            try {
                const resp = await axios.post('http://127.0.0.1:5000/test', newPost);
                console.log(resp.data);
            } catch (err) {
                // Handle Error Here
                console.error(err);
            }
        }
    }
    return(
        <div>
            <div className ="main_content">
            <textarea className="input_1" placeholder={placeholder} onChange = {(e) => setInput(e.target.value)}></textarea>
            <textarea placeholder = "Nothing to display" value={output} onChange = {(e)=>{setOutput(e.target.value)}} className="input_2"></textarea>
            </div>
            <div>
                <button className="rephrase_btn" onClick = {handleClick}><span>Paraphrase</span></button>
            </div>
        </div>
    )
}