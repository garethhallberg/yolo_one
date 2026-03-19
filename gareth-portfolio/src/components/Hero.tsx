"use client"

import { motion } from "framer-motion"
import { styles } from "@/styles"

const Hero = () => {
  return (
    <section id="home" className="relative w-full h-screen mx-auto flex items-center">
      <div
        className={`w-full max-w-7xl mx-auto ${styles.paddingX} flex flex-col md:flex-row items-center gap-8`}
      >
        <div className="md:w-1/2">
          <div>
            <h1 className={`${styles.heroHeadText} text-white`} style={{textShadow: '1px 1px 2px rgba(0,0,0,0.2)'}}>
              AI & Enterprise
            </h1>
            <h1 className={`${styles.heroHeadText} text-white mt-2`} style={{textShadow: '1px 1px 2px rgba(0,0,0,0.2)'}}>
              Software Engineer
            </h1>
            <p className={`${styles.heroSubText} mt-2 text-white-100`}>
              Building scalable solutions for complex business challenges
            </p>
          </div>
        </div>

        <div className="md:w-1/2">
          {/* Empty div for spacing */}
        </div>
      </div>

      <div className="absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center">
        <a href="#about">
          <div className="w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2">
            <motion.div
              animate={{ y: [0, 24, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
              className="w-3 h-3 rounded-full bg-secondary mb-1"
            />
          </div>
        </a>
      </div>
    </section>
  )
}

export default Hero