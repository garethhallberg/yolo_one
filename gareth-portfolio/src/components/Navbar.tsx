"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { FaLinkedin, FaMoon, FaSun } from "react-icons/fa"

const Navbar = () => {
  const [active, setActive] = useState("")
  const [toggle, setToggle] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      if (scrollTop > 100) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode])

  return (
    <nav
      className={`${
        scrolled ? "bg-primary" : "bg-transparent"
      } fixed top-0 z-50 w-full px-6 py-4 transition-all duration-300`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold text-white">GH</h1>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {["home", "about", "work", "contact"].map((item) => (
            <motion.a
              key={item}
              href={`#${item}`}
              className={`${
                active === item ? "text-white" : "text-secondary"
              } text-lg font-medium hover:text-white transition-colors`}
              onClick={() => setActive(item)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </motion.a>
          ))}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="text-secondary hover:text-white transition-colors"
          >
            {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
          </button>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <a
            href="https://www.linkedin.com/in/gareth-hallberg-9285844/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-secondary hover:text-white transition-colors"
          >
            <FaLinkedin size={24} />
          </a>
        </div>

        <div className="md:hidden flex items-center">
          <button
            onClick={() => setToggle(!toggle)}
            className="text-white"
            data-testid="mobile-menu-button"
          >
            <div className="space-y-1">
              <span className={`block h-0.5 w-6 bg-white transition-all ${
                toggle ? "rotate-45 translate-y-1.5" : ""
              }`}></span>
              <span className={`block h-0.5 w-6 bg-white transition-all ${
                toggle ? "opacity-0" : ""
              }`}></span>
              <span className={`block h-0.5 w-6 bg-white transition-all ${
                toggle ? "-rotate-45 -translate-y-1.5" : ""
              }`}></span>
            </div>
          </button>
        </div>

        {toggle && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-16 right-6 bg-tertiary rounded-lg p-4 shadow-lg"
            data-testid="mobile-menu"
          >
            <div className="flex flex-col gap-4">
              {["home", "about", "work", "contact"].map((item) => (
                <motion.a
                  key={item}
                  href={`#${item}`}
                  className={`${
                    active === item ? "text-white" : "text-secondary"
                  } text-lg font-medium hover:text-white transition-colors`}
                  onClick={() => {
                    setActive(item)
                    setToggle(false)
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </motion.a>
              ))}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="text-secondary hover:text-white transition-colors flex items-center gap-2"
              >
                {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
                <span>{darkMode ? "Light" : "Dark"} Mode</span>
              </button>
              <div className="flex gap-4 pt-2 border-t border-secondary">
                <a
                  href="https://www.linkedin.com/in/gareth-hallberg-9285844/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary hover:text-white transition-colors"
                >
                  <FaLinkedin size={24} />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  )
}

export default Navbar