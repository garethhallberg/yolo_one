"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { FaRobot, FaUser, FaPaperPlane, FaTimes, FaSpinner } from "react-icons/fa"

interface Message {
  id: string
  content: string
  sender: "user" | "ai"
  timestamp: Date
}

export default function DigitalTwinChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isChatOpen, setIsChatOpen] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim() || isLoading) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)
    setError(null)

    try {
      // Call the AI API
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: inputValue,
          history: messages.map(m => ({
            role: m.sender,
            content: m.content
          }))
        })
      })

      if (!response.ok) {
        throw new Error(`AI response error: ${response.statusText}`)
      }

      const data = await response.json()
      
      // Add AI response
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.response,
        sender: "ai",
        timestamp: new Date()
      }

      setMessages(prev => [...prev, aiMessage])
    } catch (err) {
      console.error("Error calling AI API:", err)
      setError(err instanceof Error ? err.message : "Failed to get AI response")
    } finally {
      setIsLoading(false)
    }
  }

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen)
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleChat}
        className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg flex items-center gap-2"
        aria-label="Toggle Digital Twin Chat"
      >
        <FaRobot size={24} />
        {isChatOpen ? <FaTimes /> : <span className="hidden md:inline">Digital Twin</span>}
      </motion.button>

      {/* Chat window */}
      {isChatOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="absolute bottom-20 right-0 w-80 md:w-96 bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden"
        >
          {/* Header */}
          <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <FaRobot />
              <span className="font-semibold">Digital Twin</span>
            </div>
            <button
              onClick={toggleChat}
              className="text-white hover:text-gray-200"
              aria-label="Close chat"
            >
              <FaTimes />
            </button>
          </div>

          {/* Messages */}
          <div className="h-80 md:h-96 p-4 overflow-y-auto bg-gray-50 dark:bg-gray-700">
            {messages.length === 0 ? (
              <div className="h-full flex flex-col justify-center items-center text-center p-4">
                <FaRobot size={48} className="text-blue-500 mb-4" />
                <p className="text-gray-600 dark:text-gray-300">
                  Hello! I'm your Digital Twin. Ask me about Gareth's career, skills, or experience.
                </p>
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`mb-4 flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-xs md:max-w-sm rounded-lg p-3 ${message.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white"}`}
                  >
                    <p className="whitespace-pre-wrap">{message.content}</p>
                    <div className="text-xs mt-1 opacity-70 text-right">
                      {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </div>
                  </div>
                </div>
              ))
            )}
            {isLoading && (
              <div className="flex justify-start mb-4">
                <div className="bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white rounded-lg p-3 flex items-center gap-2">
                  <FaSpinner className="animate-spin" />
                  <span>Thinking...</span>
                </div>
              </div>
            )}
            {error && (
              <div className="flex justify-center mb-4">
                <div className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-lg p-3 text-sm">
                  {error}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="border-t border-gray-200 dark:border-gray-600 p-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about Gareth's career..."
                disabled={isLoading}
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
              <button
                type="submit"
                disabled={isLoading || !inputValue.trim()}
                className={`p-2 rounded-lg ${isLoading || !inputValue.trim() ? "bg-gray-300 dark:bg-gray-600" : "bg-blue-600 hover:bg-blue-700"} text-white transition-colors`}
              >
                {isLoading ? <FaSpinner className="animate-spin" /> : <FaPaperPlane />}
              </button>
            </div>
          </form>
        </motion.div>
      )}
    </div>
  )
}