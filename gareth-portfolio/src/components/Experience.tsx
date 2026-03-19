"use client"

import { motion } from "framer-motion"
import { styles } from "@/styles"
import { textVariant } from "@/utils/motion"

const Experience = () => {
  return (
    <section id="work" className="relative w-full py-20">
      <div className={`max-w-7xl mx-auto ${styles.paddingX}`}>
        <motion.div variants={textVariant()}>
          <p className={styles.sectionSubText}>What I have done so far</p>
          <h2 className={styles.sectionHeadText}>Work Experience.</h2>
        </motion.div>

        <div className="mt-20 flex flex-col">
          {experiences.map((experience, index) => (
            <motion.div
              key={`experience-${index}`}
              className="mb-8"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
              variants={textVariant(index * 0.1)}
            >
              <div className="flex flex-col md:flex-row gap-4">
                <div className="md:w-1/4">
                  <h3 className="text-white text-xl font-bold">{experience.title}</h3>
                  <p className="text-secondary text-base">{experience.company_name}</p>
                  <p className="text-secondary text-sm mt-1">{experience.date}</p>
                </div>
                <div className="md:w-3/4">
                  <ul className="mt-5 list-disc ml-5 space-y-2">
                    {experience.points.map((point, i) => (
                      <li
                        key={`experience-point-${i}`}
                        className="text-white-100 text-[14px] pl-1 tracking-wider"
                      >
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

const experiences = [
  {
    title: "Lead Consultant & AI Community of Practice Leader",
    company_name: "Nimble Approach",
    date: "Jul 2022 - Present",
    points: [
      "Lead the AI Community of Practice, driving AI adoption and best practices across the organization",
      "Influence and shape AI-assisted coding tools used by engineering teams",
      "Architect AI solutions using Large Language Models (LLM) and cutting-edge technologies",
      "Provide expert consultation on software architecture, AI integration, and technical strategy",
      "Collaborate with clients to deliver innovative AI-powered solutions for complex challenges",
      "Mentor teams on AI technologies and their practical applications in software development",
    ],
  },
  {
    title: "Mobile Solutions Architect",
    company_name: "UnifiedRing",
    date: "Jul 2020 - Jul 2022",
    points: [
      "Architected mobile productivity app enabling video calls with up to 100 participants",
      "Developed cross-platform solutions using Swift, Kotlin, Java, C, and Objective-C",
      "Led team of 20 offshore developers across multiple time zones",
      "Implemented WebRTC-based video conferencing with robust CI/CD pipelines",
      "Optimized app performance for large-scale video calls and real-time collaboration",
    ],
  },
  {
    title: "Lead Software Engineer",
    company_name: "Kanto Systems",
    date: "Feb 2017 - Jul 2020",
    points: [
      "Started as iOS contractor, quickly promoted to full-time Lead Software Engineer",
      "Oversaw API development and managed programming team",
      "Developed iOS and Android apps used by major political parties across Europe, Caribbean, and South America",
      "Architected and delivered a widely-used canvassing app for political campaigns",
    ],
  },
  {
    title: "Lead iOS Developer",
    company_name: "Myriad Group AG",
    date: "Jun 2014 - Jan 2017",
    points: [
      "Led iOS development for Versy social media platform (released March 2016)",
      "Architected iOS app from concept to delivery and led development team",
      "Transitioned MSNGR messaging app to Versy Social with focus on large-scale group chat",
      "Achieved major success in Mexico and Latin America markets with 50,000+ member groups",
      "Mentored junior developers and collaborated with design agencies and CTO",
    ],
  },
  {
    title: "Senior iOS Programmer",
    company_name: "Userly",
    date: "Jul 2013 - Jun 2014",
    points: [
      "One of the first hires at Userly, developing rich mobile experiences",
      "Built iOS app for music industry allowing artists to communicate directly with fans",
      "Implemented live video streaming with real-time fan messaging",
      "Developed features for ticket sales, event promotion, and fan engagement",
    ],
  },
  {
    title: "Director",
    company_name: "Horseshoeshape",
    date: "Apr 2009 - Jun 2013",
    points: [
      "Co-founded and led creative programming team specializing in interactive museum software",
      "Developed generative and algorithmic software for multi-touch applications and kiosks",
      "Key projects: Jodrell Bank Discovery Centre, Madrid Centro Centro, Sky Skills Studio",
      "Created interactive experiences for VISA London 2012 and Vodafone sales teams",
    ],
  },
]

export default Experience