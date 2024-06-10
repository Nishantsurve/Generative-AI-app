import React, { useContext } from 'react'
import  './Main.css';
import { assets } from '../../assets/assets';
import { Context } from '../../context/Context';
import axios from 'axios';

const Main = () => {

    const {onSent,recentPrompt,showResult,resultData,loading,setInput,input} = useContext(Context);


     const handleSend = () =>{
        axios.post('http://your-server/insert_prompt.php', { prompt: input })
        .then(response => {
            console.log(response.data);
            // Optionally handle success (e.g., clear input, show message)
            setInput('');
        })
        .catch(error => {
            console.error('There was an error inserting the prompt!', error);
        });
    
    // Call existing onSent function if needed
    onSent();
     }

  return (
    <div className='main'>
        <div className="nav">
            <p>Gemini</p>
            <img src={assets.user_icon1} alt="" />
        </div>

         <div className="main-container">

        {!showResult?
      
        <>
           <div className="greet">
                <p><span>Hello,Dev.</span></p>
                <p>How can I help you today?</p>
            </div>

            <div className="cards">
                <div className="card">
                    <p>give me script/code in python or any language</p>
                    <img src={assets.compass_icon} alt="" />
                </div>
                <div className="card">
                    <p>write an article about stock market</p>
                    <img src={assets.bulb_icon} alt="" />
                </div>
                <div className="card">
                    <p>Tell me a fun fact</p>
                    <img src={assets.message_icon} alt="" />
                </div>
                <div className="card">
                    <p>Draf an email</p>
                    <img src={assets.code_icon} alt="" />
                </div>
            </div>
        </>
        :
        <div className='result'>
            <div className="result-title">
                <img src={assets.prompt_icon} alt="" />
                <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
                <img src={assets.gemini_icon} alt="" />
                {loading? 
                 <div className="loader">
                    <hr/>
                    <hr/>
                    <hr/>
                 </div>
                 :
                <p dangerouslySetInnerHTML={{__html:resultData}}></p>
               }
                
            </div>
        </div>
      
        }

            <div className="main-bottom">
                <div className="search-box">
                    <input
                    onChange={(e)=>
                    setInput(e.target.value)}
                    value={input}
                    type="text" placeholder='Enter a prompt here' />
                    <div>
                        <img src={assets.gallery_icon} alt="" />
                        <img src={assets.mic_icon} alt="" />
                       {input?<img 
                        onClick={handleSend}
                        src={assets.send_icon} alt="" />
                    :
                       null
                    }
                    </div>
                </div>
                <p className='bottom-info'>
                    Gemini may display inaccurate info,sometimes
                </p>
            </div>

         </div>

    </div>
  )
}

export default Main