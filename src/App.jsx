import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import RecentWorks from './components/RecentWorks'
import Certificates from './components/Certificates'
import Services from './components/Services'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="bg-[#0d1116] text-white font-sans overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <RecentWorks />
      <Certificates />
      <Services />
      <Footer />
    </div>
  )
}
