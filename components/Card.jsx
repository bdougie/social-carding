"use client"

import axios from "axios";
import { useEffect, useRef, useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon, faSun, faEarthEurope, faDownload, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { motion } from "framer-motion"
import Loader from "./Loader";

function Card() {

    const [dark, setDark] = useState(false);

    const initTheme = () => {
        // Check if user has previously set a preference
        const storedTheme = localStorage.getItem("dark");
        
        if (storedTheme === null) {
            // No stored preference, check system preference
            const systemPrefersDark = window.matchMedia && 
                window.matchMedia('(prefers-color-scheme: dark)').matches;
            
            setDark(systemPrefersDark);
            localStorage.setItem("dark", systemPrefersDark);
        } else {
            // Use stored preference
            setDark(storedTheme === "true");
        }
    }
    
    const switchTheme = () => {
        const newDarkMode = !dark;
        setDark(newDarkMode);
        localStorage.setItem("dark", newDarkMode);
    }

    const urlRef = useRef("");
    const [metaData, setMetaData] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    
    const fetchMeta = async() => {
        if (!urlRef.current.value) {
            console.error('URL is empty');
            return;
        }
        
        // Reset states before fetching
        setLoading(true);
        setError(null);
        
        try {
            const response = await axios.get(`/api/fetchMeta/?url=${urlRef.current.value}`);
            console.log('API Response:', response);
            
            // Ensure we have a valid response object with needed data
            if (response?.data && Object.keys(response.data).length > 0) {
                setMetaData(response);
            } else {
                // Handle empty or invalid response data
                setError("No metadata found for this URL. Please check that the URL is correct and accessible.");
                console.error('Invalid or empty data returned:', response);
            }
        } catch (err) {
            // Handle fetch errors
            setError(`Failed to fetch metadata: ${err.message || "Unknown error"}`);
            console.error('API Error:', err);
        } finally {
            setLoading(false);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent the default form submission
        fetchMeta();
    };

    useEffect(() => {
        initTheme();
        
        // Listen for changes in system color scheme preference
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = (e) => {
            // Only apply if user hasn't explicitly set a preference
            if (localStorage.getItem("dark") === null) {
                setDark(e.matches);
                localStorage.setItem("dark", e.matches);
            }
        };
        
        // Add event listener
        if (mediaQuery.addEventListener) {
            mediaQuery.addEventListener('change', handleChange);
        } else {
            // Fallback for older browsers
            mediaQuery.addListener(handleChange);
        }
        
        // Cleanup
        return () => {
            if (mediaQuery.removeEventListener) {
                mediaQuery.removeEventListener('change', handleChange);
            } else {
                mediaQuery.removeListener(handleChange);
            }
        };
    }, []);
    
    useEffect(() => {
        if (metaData && metaData.data) {
            console.log('Current metaData state:', metaData);
        }
    }, [metaData]);
    
    const submitHandler = ()=> {
        fetchMeta();
    }

    const hasValidResponse = () => {
        try {
            return metaData?.data && 
                   typeof metaData.data === 'object' && 
                   Object.keys(metaData.data).length > 0;
        } catch (error) {
            console.error('Error checking response validity:', error);
            return false;
        }
    };

  return (
    <div className={`w-full ${dark ? "dark" : ""}`}>
        <div className='w-full font-Inter dark:bg-gray-900 min-h-screen'>
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
                        <form onSubmit={handleSubmit} className="w-full flex">
                            <input 
                                ref={urlRef} 
                                type="text" 
                                placeholder='ex: https://facebook.com' 
                                className='w-full bg-gray-200 border-[1px] h-[34px] mr-[10px] outline-secondary px-2 rounded-md border-green-500'
                            />
                            <button 
                                type="submit"
                                className='flex items-center cursor-pointer uppercase bg-secondary px-2 rounded-md text-white transition duration-350 ease-in-out hover:bg-green-600'
                            >
                                <FontAwesomeIcon icon={faMagnifyingGlass} className="mr-[5px] font-normal text-[14px]" />
                                <span>Preview</span>
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>

            {loading && (
                <div className="flex justify-center mt-[60px]">
                    <Loader/>   
                </div>
            )}

            {!loading && error && (
                <div className="flex justify-center mt-[60px] text-center px-4">
                    <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-md max-w-[550px]">
                        <h3 className="text-lg font-semibold mb-2">Error</h3>
                        <p>{error}</p>
                    </div>
                </div>
            )}

            {!loading && !error && hasValidResponse() && (
                <div>
                    <div className='flex justify-center mt-[45px] px-2'>
                        <div className='flex flex-col max-w-[550px] mb-8 drop-shadow-sm bg-gray-100 border-[1px] dark:bg-gray-700 border-green-200 p-[10px] rounded-md'>
                            <div className='flex justify-end mb-[15px] mt-[5px]'>
                                {metaData.data.image ? (
                                    <div className="flex items-center uppercase text-white bg-gray-800 py-[5px] px-[8px] rounded-md transition duration-350 ease-in-out hover:bg-slate-600 hover:text-white">
                                        <a href={`/api/download?url=${metaData.data.image.url}`}>Download</a>
                                        <FontAwesomeIcon icon={faDownload} className="ml-[8px] text-[14px]" />
                                    </div>
                                ): (
                                    <div></div>
                                )}
                            </div>
                            <div className='rounded-md overflow-hidden'>
                                {metaData.data.image ? (
                                    <div>
                                        <img src={metaData.data.image.url} className="w-full" alt="" />
                                    </div>
                                ): (
                                    <img src="/missing-face.png" alt="Image missing" />
                                )}
                            </div>
                            <div className='mt-[10px]'>
                                <h1 className='text-[20px] font-semibold text-gray-00 break-words dark:text-gray-400 mb-[10px]'>{metaData.data.title}</h1>
                                <p className='text-gray-500 text-[18px] mb-[5px] break-words'>{metaData.data.description && metaData.data.description}</p>
                                <div className="flex items-center text-gray-600 dark:text-gray-400">
                                    <FontAwesomeIcon icon={faEarthEurope} onClick={switchTheme} className="text-[18px] mr-[5px]"/>
                                    <h2 className='text-[18px] antialiased font-semibold'>{metaData.data.site_name}</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>    
            )}

            {!loading && !error && !hasValidResponse() && urlRef.current.value && (
                <div className="flex justify-center mt-[60px] text-center px-4">
                    <div className="p-4 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded-md max-w-[550px]">
                        <h3 className="text-lg font-semibold mb-2">No data found</h3>
                        <p>We couldn't retrieve information from this URL. Please check the URL and try again.</p>
                    </div>
                </div>
            )}

        </div>
    </div>
  )
}

export default Card;
