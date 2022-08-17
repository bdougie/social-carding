import React from 'react';
import { motion, useScroll } from 'framer-motion';

const Motion = () => {
  const { scrollYProgress } = useScroll();

  return (
    <div
      className='h-[3000px] bg-gray-600 text-white py-16 w-full overflow-hidden'
      style={{ scaleX: scrollYProgress }}
    >
      <motion.h1
        initial='hidden'
        animate='visible'
        variants={{
          hidden: {
            scale: 0.4,
            opacity: 0,
          },

          visible: {
            scale: [1.2, 0.8, 1.4, 1],
            opacity: 1,
          },
        }}
        drag='x'
        dragConstraints={{ left: -5, right: 5 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className='text-4xl text-center'
      >
        Explore Framer Motion
      </motion.h1>
      <motion.div
        animate='rotate'
        variants={{
          rotate: {
            scale: [1, 2, 2, 1, 1],
            rotate: [0, 0, 270, 270, 0],
            borderRadius: ['20%', '20%', '50%', '50%', '20%'],
          },
        }}
        className='h-40 w-40 bg-white mx-auto my-16'
      ></motion.div>
    </div>
  );
};

export default Motion;
