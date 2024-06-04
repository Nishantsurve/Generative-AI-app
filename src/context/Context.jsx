import { createContext, useState } from "react";
import run from "../config/gemini";

export const Context =createContext();

const ContextProvider = (props)=>{

  
     const [input,setInput] = useState("");
     const [recentPrompt,setRecentPrompt] = useState("");
     const [prevPrompts,setPrevPrompts] = useState([]);
     const [showResult, setShowResult] = useState(false);
     const [loading, setLoading] = useState(false);
     const [resultData, setResultData] = useState("");

     const delayPara = (index,nextWord) => {
      setTimeout(() => {
        setResultData(pre => pre + nextWord);
      }, 75*index);
    }

    const newChat = ()=>{
        setLoading(false);
        setShowResult(false);
    }
/*
     const onSent = async (prompt)=>{
        setResultData("");
        setLoading(true);
        setShowResult(true);
        let response;
        
        if(prompt !== undefined){
            response =  await run(prompt);
            setRecentPrompt(prompt);
        }
        else{
            setPrevPrompts(pre => [...pre,input]);
            setRecentPrompt(input);
            response =  await run(input);
        }

       let responsearray =response.split("**");
       let newArray="";
       for(let i=0;i< responsearray.length;i++){

        if (i === 0 || i%2 !== 1) {
            newArray += responsearray[i];
        }
        else{
            newArray += "<b>" + responsearray[i] + "</b>";
        }
       }

       let newArray2 = newArray.split("*").join("<br/>");
      let newresponsearray = newArray2.split(" ");
       for (let i = 0; i < newresponsearray.length; i++) {
        const nextWord = newresponsearray[i];
        delayPara(i,nextWord+" ");
        
       }
       setLoading(false);
       setInput("");

    }
   */
    const onSent = async (prompt) => {
        setResultData("");
        setLoading(true);
        setShowResult(true);
        let response;
        
        if(prompt !== undefined){
            response = await run(prompt);
            setRecentPrompt(prompt);
        } else {
            setPrevPrompts(pre => [...pre, input]);
            setRecentPrompt(input);
            response = await run(input);
        }
    
        // Splitting and formatting the response
        let responsearray = response.split("**");
        let newArray = "";
        for (let i = 0; i < responsearray.length; i++) {
            if (i === 0 || i % 2 !== 1) {
                newArray += responsearray[i];
            } else {
                newArray += "<b>" + responsearray[i] + "</b>";
            }
        }
    
        // Adding <br/> tags for line breaks
        let newArray2 = newArray.split("*").join("<br/>");
    
        // Adding <br/> tags before numbers followed by a period (e.g., 1., 2., 3.)
        let formattedResponse1 = newArray2.replace(/(\d+\.\s)/g, "<br/>$1");
        let formattedResponse2 = formattedResponse1.split("//").join("<br/>");
        let newresponsearray = formattedResponse2.split(" ");
        for (let i = 0; i < newresponsearray.length; i++) {
            const nextWord = newresponsearray[i];
            delayPara(i, nextWord + " ");
        }
        
        setLoading(false);
        setInput("");
    }
    
    const contextvalue = {
       prevPrompts,
       setPrevPrompts,
       onSent,
       setRecentPrompt,
       recentPrompt,
       showResult,
       loading,
       resultData,
       input,
       setInput,
       newChat
    }

    return (
        <Context.Provider value={contextvalue}>
            {props.children}
        </Context.Provider>
    )

}

export default ContextProvider;