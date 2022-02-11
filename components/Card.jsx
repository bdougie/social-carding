import axios from "axios";
import { useEffect, useRef, useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon, faSun, faEarthEurope, faDownload, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { motion } from "framer-motion"
import Loader from "./Loader";

function Card() {

    const [dark, setDark] = useState(false);

    const initTheme = () => {
        if(localStorage.getItem("dark") == null ){
            localStorage.setItem("dark", false);
        }
        if(localStorage.getItem("dark") == "true"){
            setDark(true)
        }  
    }
    
    const switchTheme = () => {
        setDark(!dark)
        if(localStorage.getItem("dark") == "false"){
                localStorage.setItem("dark", true)
            }
        else{
                localStorage.setItem("dark", false)
        }
        
    }

    const urlRef = useRef("");
    const [metaData, setMetaData] = useState({});
    const [loading, setLoading] = useState(false);
    
    const fetchMeta = async() => {
        
        
        setLoading(true);
        axios.get(`/api/fetchMeta/?url=${urlRef.current.value}`)
        .then(res => {
            setMetaData(res);
            console.log(metaData)
            setLoading(false);
        })
        .catch(err => {
            setLoading(false);
            console.error(err);
        });

    }

    

    useEffect(() => {
        initTheme();
    }, []);
    
    const submitHandler = ()=> {

        fetchMeta();

    }


  return (
    <div className={` ${ dark ? " dark " : "" } `}>
        <div className=' font-Inter dark:bg-gray-900 min-h-screen ' >
            <div className=' flex justify-end '>
                <div className=' flex items-center relative justify-evenly mr-[20px] mt-[20px] mb-[10px]  h-[30px] w-[70px] rounded-2xl '>
                    <FontAwesomeIcon icon={faMoon} onClick={switchTheme} className={` text-[20px] p-[5px] hover:text-gray-600 transition cursor-pointer duration-450 ease-in-out ${ !dark ? " " : "bg-yellow-400" }   rounded-full  ` }/>
                    <FontAwesomeIcon icon={faSun} onClick={switchTheme} className={` text-[20px]  p-[5px] hover:text-gray-600 cursor-pointer transition duration-450 ease-in-out ${ dark ? " " : "bg-yellow-400" }  rounded-full  `}/>
                </div>
            </div>

            <div className=' flex justify-center '>
                <div className='flex flex-col items-center max-w-[550px]  '>
                    <div className=' text-primary dark:text-gray-300 w-full flex flex-col items-center '>
                        <motion.h1
                        transition={{ duration: 0.5}}
                        initial={{y:-10, opacity:0}}
                        animate={{y: 0, opacity:1}}
                        className=' uppercase font-semibold md:text-[120px] text-[100px]  leading-none '
                        >
                        Social
                        </motion.h1>
                        <motion.h1
                        
                        transition={{ duration: 0.5}}
                        initial={{y:10, opacity:0}}
                        animate={{y: 0, opacity:1}}
                        className=' uppercase font-semibold md:text-[96px] text-[80px] leading-none '>Carding</motion.h1>
                    </div>
                    <motion.div 
                    transition={{ duration: 0.8}}
                    initial={{opacity:0}}
                    animate={{opacity:1}}
                    className=' flex justify-center w-full mt-[30px] drop-shadow-sm px-1 '>
                        
                        <input ref={urlRef} type="text" placeholder='ex: https://facebook.com' className=' w-full bg-gray-200 border-[1px] h-[34px] mr-[10px]  outline-secondary px-2 rounded-md border-green-500 ' />
                        <div className=' flex items-center cursor-pointer  uppercase bg-secondary px-2 rounded-md text-white transition duration-350 ease-in-out hover:bg-green-600 ' >
                            <FontAwesomeIcon icon={faMagnifyingGlass} className=" mr-[5px]  font-normal text-[14px] " />
                            <button  onClick={submitHandler} className="  "  >Preview</button>
                        </div>
                    </motion.div>
                </div>
            </div>

            {
              loading &&
                <div className=" flex justify-center mt-[60px] ">
                    <Loader/>   
                </div>
            }

            {
              !loading && metaData && metaData.data &&  Object.keys(metaData.data.response).length != 0 && (
                  <div>
                      <div className='  flex justify-center mt-[45px] px-2 ' >
                        <div className=' flex flex-col  max-w-[550px] mb-8 drop-shadow-sm bg-gray-100 border-[1px] dark:bg-gray-700 border-green-200 p-[10px] rounded-md  '>
                            <div className=' flex justify-end mb-[15px] mt-[5px] '>
                                { metaData.data.response.image ? (
                                    <div className=" flex items-center uppercase text-white bg-gray-800 py-[5px] px-[8px] rounded-md transition duration-350 ease-in-out hover:bg-slate-600 hover:text-white  ">
                                        <a  href={`/api/download?url=${metaData.data.response.image.url}`}>Download</a>
                                        <FontAwesomeIcon icon={faDownload} className=" ml-[8px] text-[14px] " />
                                    </div>
                                ):
        
                               <div></div>
                                }
                            </div>
                            <div className=' rounded-md overflow-hidden '>
                                { metaData.data.response.image ? (
                                    <div>
                                        <img src={metaData.data.response.image.url} className=" w-full " alt="" />
                                    </div>
                                ):
                                    <img src="/missing-face.png" alt="Image missing" />
                                    
                                }
                                
                            </div>
                            <div className=' mt-[10px] '>
                                <h1 className=' text-[20px] font-semibold text-gray-00 break-words dark:text-gray-400 mb-[10px] '>{metaData.data.response.title}</h1>
                                
                                <p className=' text-gray-500 text-[18px]   mb-[5px] break-words '>{metaData.data.response.description && metaData.data.response.description }</p>
                                
                                <div className=" flex items-center text-gray-600 dark:text-gray-400 ">
                                    <FontAwesomeIcon icon={faEarthEurope} onClick={switchTheme} className=" text-[18px] mr-[5px] "/>
                                    <h2 className='  text-[18px]  antialiased font-semibold ' >{metaData.data.response.site_name}</h2>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                  </div>    
              )
          }

            

        </div>
    </div>
  )
}

export default Card;
