import Hero from "@/components/Hero"
import About from "@/components/About"
import Experience from "@/components/Experience"
import Contact from "@/components/Contact"
import Navbar from "@/components/Navbar"

export default function Home() {
  return (
    <div className="relative z-0 bg-primary">
      <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
        <Navbar />
        <Hero />
      </div>
      <About />
      <Experience />
      <Contact />
    </div>
  )
}