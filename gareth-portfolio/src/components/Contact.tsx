"use client"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import emailjs from "@emailjs/browser"
import { styles } from "@/styles"
import { slideIn } from "@/utils/motion"

// Simple XSS sanitization function
const sanitizeInput = (input: string): string => {
  return input.replace(/<[^>]*>/g, '') // Remove HTML tags
}

const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null)
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    // Sanitize input to prevent XSS
    const sanitizedValue = sanitizeInput(value)
    setForm({ ...form, [name]: sanitizedValue })
    
    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors({ ...errors, [name]: "" })
    }
  }

  const validateForm = (): boolean => {
    let valid = true
    const newErrors = { name: "", email: "", message: "" }

    // Name validation
    if (!form.name.trim()) {
      newErrors.name = "Name is required"
      valid = false
    } else if (form.name.length > 100) {
      newErrors.name = "Name must be less than 100 characters"
      valid = false
    }

    // Email validation
    if (!form.email.trim()) {
      newErrors.email = "Email is required"
      valid = false
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email address"
      valid = false
    }

    // Message validation
    if (!form.message.trim()) {
      newErrors.message = "Message is required"
      valid = false
    } else if (form.message.length > 1000) {
      newErrors.message = "Message must be less than 1000 characters"
      valid = false
    }

    setErrors(newErrors)
    return valid
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setLoading(true)

    // Check if EmailJS environment variables are set
    if (!process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 
        !process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 
        !process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY) {
      setLoading(false)
      alert("Email service is not properly configured. Please try contacting directly.")
      return
    }

    emailjs
      .send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        {
          from_name: sanitizeInput(form.name),
          to_name: "Gareth Hallberg",
          from_email: sanitizeInput(form.email),
          to_email: process.env.NEXT_PUBLIC_EMAILJS_TO_EMAIL || "contact@example.com",
          message: sanitizeInput(form.message),
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setLoading(false)
          alert("Thank you. I will get back to you as soon as possible.")

          setForm({
            name: "",
            email: "",
            message: "",
          })
          setErrors({ name: "", email: "", message: "" })
        },
        (error) => {
          setLoading(false)
          console.error("EmailJS error:", error)
          alert("Ahh, something went wrong. Please try again or contact me directly at gareth@example.com")
        }
      )
  }

  return (
    <section id="contact" className="relative w-full py-20">
      <div className={`max-w-7xl mx-auto ${styles.paddingX}`}>
        <div className="w-full bg-black-100 p-8 rounded-2xl">
          <p className={styles.sectionSubText}>Get in touch</p>
          <h3 className={styles.sectionHeadText}>Contact.</h3>

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="mt-12 flex flex-col gap-8"
          >
            <label className="flex flex-col">
              <span className="text-white font-medium mb-4">Your Name</span>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="What's your name?"
                className={`bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium ${errors.name ? 'border border-red-500' : ''}`}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "name-error" : undefined}
              />
              {errors.name && <span id="name-error" className="text-red-500 text-sm mt-1">{errors.name}</span>}
            </label>
            <label className="flex flex-col">
              <span className="text-white font-medium mb-4">Your email</span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="What's your web address?"
                className={`bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium ${errors.email ? 'border border-red-500' : ''}`}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
              {errors.email && <span id="email-error" className="text-red-500 text-sm mt-1">{errors.email}</span>}
            </label>
            <label className="flex flex-col">
              <span className="text-white font-medium mb-4">Your Message</span>
              <textarea
                rows={7}
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="What you want to say?"
                className={`bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium resize-none ${errors.message ? 'border border-red-500' : ''}`}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? "message-error" : undefined}
              />
              {errors.message && <span id="message-error" className="text-red-500 text-sm mt-1">{errors.message}</span>}
            </label>

            <button
              type="submit"
              className="bg-tertiary py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send"}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Contact