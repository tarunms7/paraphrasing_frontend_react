import React from "react"
import "../index.css"
import axios from 'axios'
export default function Main_Content(){
    const [output, setOutput] = React.useState("")
    const [input, setInput] = React.useState("")
    const [placeholder,setPlaceholder] = React.useState("type something and hit the below button to see the paraphrased content!")
    const [response, setResponse]= React.useState({})
    const [isLoading,setIsLoading] = React.useState(false)
    async function handleClick(){
        if(input == ""){
            setPlaceholder("Please enter something before proceding..")
        }
        else{
            const newPost = {
                input : input
            }
            try {
                setIsLoading(true)
                const resp = await axios.post('http://127.0.0.1:5000/test', newPost);
                // console.log(resp.data);
                setResponse(resp.data)
                var temp = ""
                Object.keys(resp.data).forEach(function(key) {
                    console.log(resp.data[key])
                    temp += resp.data[key][Math.floor(Math.random()*resp.data[key].length)]
                });
                setOutput(temp)
                document.getElementsByClassName("input2").removeAttribute("readOnly")
                setIsLoading(false)
            } catch (err) {
                // Handle Error Here
                console.error(err);
            }
        }   
    }
    function handleRephrase(){
        var temp = ""
        Object.keys(response).forEach(function(key) {
            temp += response[key][Math.floor(Math.random()*response[key].length)]
        });
        setOutput(temp)
    }
    return(
        <div className="inputs_and_btns">
            <div className ="main_content">
                <textarea className="input_1" placeholder={placeholder} onChange = {(e) => setInput(e.target.value)} name = "input_1" value={input}></textarea>
                <textarea placeholder = "Nothing to display" value={output} onChange = {(e)=>{setOutput(e.target.value)}} name = "output_1" className="output_1" readOnly></textarea>
            </div>
            <div className = "btns_div">
                {isLoading?
                    <div class="progress">
                        <div class="color"></div>
                    </div>
                    :<button className="rephrase_btn" onClick = {handleClick}><span>Paraphrase</span></button>
                }
                <button className="change_phrase_btn" onClick = {handleRephrase}><span>Rephrase</span></button>
            </div>
        </div>
    )
}