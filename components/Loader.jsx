import React from 'react'
import { motion } from "framer-motion"

function Loader() {
  return (
    <div className=' flex'>
        <motion.div
        animate={{ scale: 1.5, y:-5 }}
        transition={{
            duration: .4,
            yoyo: Infinity
        }}
        
        className=' w-[8px] h-[8px] bg-green-500 m-1 rounded-full'></motion.div>

        <motion.div
        initial={{x:0}}
        animate={{ scale: 1.5, y:-5 }}
        transition={{
            duration: .3,
            yoyo: Infinity
        }}
        
        className=' w-[8px] h-[8px] bg-green-500 m-1 rounded-full'></motion.div>

        <motion.div
        animate={{ scale: 1.5, y:-5 }}
        transition={{
            duration: .40,
            yoyo: Infinity
        }}
        
        className=' w-[8px] h-[8px] bg-green-500 m-1 rounded-full'></motion.div>
        
    </div>
  )
}

export default Loader