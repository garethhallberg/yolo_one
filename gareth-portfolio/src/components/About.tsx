"use client"

import { motion } from "framer-motion"
import { styles } from "@/styles"
import { fadeIn, textVariant } from "@/utils/motion"
import { FaMobileAlt, FaArchway, FaCogs, FaUserTie } from "react-icons/fa"

const About = () => {
  return (
    <section id="about" className="relative w-full py-20">
      <div className={`max-w-7xl mx-auto ${styles.paddingX}`}>
        <motion.div variants={textVariant()}>
          <p className={styles.sectionSubText}>Introduction</p>
          <h2 className={styles.sectionHeadText}>Overview.</h2>
        </motion.div>

        <motion.p
          variants={fadeIn("right", "tween", 0.1, 1)}
          className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]"
        >
          Enterprise Software Engineer and AI Community of Practice Leader with over 25 years of experience specializing in iOS development, mobile architecture, and AI-powered solutions. Leading the adoption of Large Language Models (LLMs) and AI-assisted coding tools while delivering innovative software solutions across diverse industries.
        </motion.p>
        <motion.p
          variants={fadeIn("right", "tween", 0.2, 1)}
          className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]"
        >
          Proven track record delivering high-impact solutions across diverse industries including political campaigns, social media platforms, music industry applications, and interactive museum exhibits. Strong leadership in mentoring teams, optimizing performance, and translating business requirements into scalable technical solutions.
        </motion.p>

        <div className="mt-20 flex flex-wrap gap-10">
          {services.map((service, index) => (
            <motion.div
              variants={fadeIn("right", "spring", index * 0.5, 0.75)}
              className="w-full sm:w-[250px]"
              key={service.title}
            >
              <div className="w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card">
                <div
                  className="bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col"
                >
                  <div className="w-16 h-16 flex items-center justify-center">
                    <service.icon className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-white text-[20px] font-bold text-center">
                    {service.title}
                  </h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

const services = [
  {
    title: "AI-Powered iOS Development",
    icon: FaMobileAlt,
  },
  {
    title: "AI-Driven Mobile Architecture",
    icon: FaArchway,
  },
  {
    title: "AI Enterprise Solutions",
    icon: FaCogs,
  },
  {
    title: "AI Technical Leadership",
    icon: FaUserTie,
  },
]

export default About