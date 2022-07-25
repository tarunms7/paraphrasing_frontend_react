import React from "react"
import "../index.css"
import axios from 'axios'
export default function Main_Content(){
    const [output, setOutput] = React.useState("")
    const [input, setInput] = React.useState("")
    const [placeholder,setPlaceholder] = React.useState("type something and hit the below button to see the paraphrased content!")
    const [response, setResponse]= React.useState({})
    const [isLoading,setIsLoading] = React.useState(false) 
    const [outputArray, setOutputArray] = React.useState([])
    const [fixedSentences, setFixedSentences] = React.useState([])
    let i = 0;
        // const outButtons = fixedSentences?.map((item) =>{
        //     i++;
        //     return <button key = {item} onClick={()=>{
        //         setOutput(item)
        //     }
        //     }>{i}</button>
        // })






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
                const resp = await axios.post('http://127.0.0.1:4000/test', newPost);
                // console.log(resp.data);
                setResponse(resp.data)
                var temp = ""
                Object.keys(resp.data).forEach(function(key) {
                    // console.log(resp.data[key])
                    temp += resp.data[key][Math.floor(Math.random()*resp.data[key].length)]
                });
                setOutput(temp)
                setIsLoading(false)

                
                let n = Object.keys(resp.data).length
                let indices = new Array(n)
                for(let i =0 ;i <n;i++){
                    indices[i] = 0
                }
                // console.log(Object.values(resp.data))
                let output_array = []
                let output_2d_array = []
                output_2d_array = Object.values(resp.data)
                
                // output_2d_array = Object.values(resp.data);

                // // console.log("output 2d array is : ")
                // console.log(output_2d_array)
                // console.log("the type of the 2d array is : ")
                // console.log(typeof(output_2d_array))
                while (true)
                {
                    let temp_sentence = ""
                    // Print current combination
                    for(let i = 0; i < n; i++){
                        temp_sentence += output_2d_array[i][indices[i]]
                    }
                    // console.log("the sentence is : ")
                    // console.log(temp_sentence)
                    output_array.push(temp_sentence)
                    temp_sentence = ""  
                    
                    // Find the rightmost array that has more
                    // elements left after the current element
                    // in that array
                    let next = n - 1;
                    while (next >= 0 && (indices[next] + 1 >=
                                            output_2d_array[next].length))
                        next--;
                    
                    // No such array is found so no more
                    // combinations left
                    if (next < 0)
                        break;
                    
                    // If found move to next element in that
                    // array
                    indices[next]++;
                    
                    // For all arrays to the right of this
                    // array current index again points to
                    // first element
                    for(let i = next + 1; i < n; i++)
                        indices[i] = 0;
                }
                

                function shuffle(array) {
                    var tmp, current, top = array.length;
                    if(top) while(--top) {
                        current = Math.floor(Math.random() * (top + 1));
                        tmp = array[current];
                        array[current] = array[top];
                        array[top] = tmp;
                    }
                    return array;
                }

                output_array = [...new Set(output_array)];
                // console.log("the output array before shuffle is: ")
                // console.log(output_array)
                // output_array = shuffle(output_array)
                // console.log("output array after shuffle is : ")
                // console.log(output_array)
                // output_array.length > 5 ? setFixedSentences(output_array.slice(0,5)):setFixedSentences(output_array.slice(0,output_array.length))


                setFixedSentences(output_array.length > 5 ? output_array.slice(0,5):output_array.slice(0,output_array.length))


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
                <div className="input_output">
                    <textarea className="input_1" placeholder={placeholder} onChange = {(e) => setInput(e.target.value)} name = "input_1" value={input}></textarea>
                    <textarea placeholder = "Nothing to display" value={output} onChange = {(e)=>{setOutput(e.target.value)}} name = "output_1" className="output_1"></textarea>
                </div>
                <div className = "btns_div">
                    {
                        isLoading?
                        <div className="progress">
                            <div className="color"></div>
                        </div>
                        :<button className="rephrase_btn" onClick = {handleClick}><span>Paraphrase</span></button>
                    }
                    <button className="change_phrase_btn" onClick = {handleRephrase}><span>Rephrase</span></button>
                </div>
            </div>
            <div className="accessButtons">
                    {
                        fixedSentences?.map((item) =>{
                            i++;
                            return <button className="access_buttons_child" key = {item} onClick={()=>{
                                setOutput(item)
                            }
                            }>{item}</button>
                        })
                    }
                </div>
            
        </div>
    )
}