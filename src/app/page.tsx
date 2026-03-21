'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from '@studio-freight/lenis'
import { 
  Sparkles, 
  Star, 
  Crown, 
  Castle, 
  Wand2, 
  Heart,
  ChevronDown,
  Menu,
  X,
  Phone,
  Mail,
  MapPin,
  Instagram,
  Twitter,
  Facebook
} from 'lucide-react'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// Custom Cursor Component
function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorGlowRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    const cursor = cursorRef.current
    const cursorGlow = cursorGlowRef.current
    if (!cursor || !cursorGlow) return
    
    let mouseX = 0
    let mouseY = 0
    let cursorX = 0
    let cursorY = 0
    
    const moveCursor = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }
    
    const animate = () => {
      cursorX += (mouseX - cursorX) * 0.15
      cursorY += (mouseY - cursorY) * 0.15
      
      cursor.style.left = `${cursorX}px`
      cursor.style.top = `${cursorY}px`
      cursorGlow.style.left = `${cursorX}px`
      cursorGlow.style.top = `${cursorY}px`
      
      requestAnimationFrame(animate)
    }
    
    const handleMouseEnter = () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(3)'
      cursor.style.mixBlendMode = 'difference'
      cursorGlow.style.transform = 'translate(-50%, -50%) scale(4)'
    }
    
    const handleMouseLeave = () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1)'
      cursor.style.mixBlendMode = 'normal'
      cursorGlow.style.transform = 'translate(-50%, -50%) scale(2)'
    }
    
    window.addEventListener('mousemove', moveCursor)
    animate()
    
    const interactiveElements = document.querySelectorAll('a, button, .interactive-card')
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter)
      el.addEventListener('mouseleave', handleMouseLeave)
    })
    
    return () => {
      window.removeEventListener('mousemove', moveCursor)
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter)
        el.removeEventListener('mouseleave', handleMouseLeave)
      })
    }
  }, [])
  
  return (
    <>
      <div 
        ref={cursorRef}
        className="fixed w-2 h-2 rounded-full bg-white pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 hidden md:block"
        style={{ boxShadow: '0 0 10px #FF3366, 0 0 20px #FF3366' }}
      />
      <div 
        ref={cursorGlowRef}
        className="fixed w-6 h-6 rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 transition-transform duration-500 hidden md:block"
        style={{ 
          background: 'radial-gradient(circle, rgba(255,51,102,0.3) 0%, transparent 70%)',
        }}
      />
    </>
  )
}

// Glassmorphism Header
function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'glass-dark py-3' : 'py-6'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 group">
          <Sparkles className="w-6 h-6 text-[#FF3366] group-hover:rotate-12 transition-transform" />
          <span className="font-display text-xl font-bold tracking-wider">MAGIC LUZ</span>
        </a>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {['Experiencias', 'Paquetes', 'Galería', 'Nosotros', 'Contacto'].map((item) => (
            <a 
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm font-medium text-white/70 hover:text-white transition-colors relative group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FF3366] group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </div>
        
        <div className="hidden md:flex items-center gap-4">
          <a 
            href="#paquetes" 
            className="btn-liquid px-6 py-2.5 rounded-full border border-white/20 text-sm font-medium hover:border-transparent hover:text-white transition-all duration-300"
          >
            Reservar Ahora
          </a>
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden glass-dark absolute top-full left-0 right-0 p-6 animate-fade-up">
          <div className="flex flex-col gap-4">
            {['Experiencias', 'Paquetes', 'Galería', 'Nosotros', 'Contacto'].map((item) => (
              <a 
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-lg font-medium text-white/70 hover:text-white transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </a>
            ))}
            <a 
              href="#paquetes" 
              className="mt-4 w-full text-center px-6 py-3 rounded-full bg-[#FF3366] text-white font-medium"
            >
              Reservar Ahora
            </a>
          </div>
        </div>
      )}
    </header>
  )
}

// Hero Section
function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    // Cinematic text reveal animation
    const ctx = gsap.context(() => {
      // Title animation
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 100,
        duration: 1.2,
        delay: 0.3,
        ease: 'power4.out',
      })
      
      // Subtitle animation
      gsap.from(subtitleRef.current, {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.8,
        ease: 'power3.out',
      })
      
      // Parallax on scroll
      gsap.to(imageRef.current, {
        yPercent: 20,
        scale: 1.1,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    })
    
    return () => ctx.revert()
  }, [])
  
  return (
    <section ref={heroRef} className="relative h-screen overflow-hidden">
      {/* Image Background */}
      <div className="absolute inset-0">
        <div 
          ref={imageRef}
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: 'url(/hero-castle.png)',
          }}
        />
        
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0E17]/50 via-[#0A0E17]/30 to-[#0A0E17]" />
        
        {/* Animated Gradient Overlay */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#FF3366] rounded-full blur-[150px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#FFD700] rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
      </div>
      
      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
        {/* Floating Sparkles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-sparkle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
              }}
            >
              <Star className="w-2 h-2 text-[#FFD700] opacity-60" />
            </div>
          ))}
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Sparkles className="w-5 h-5 text-[#FF3366] animate-float" />
            <span className="text-white/60 text-sm tracking-[0.3em] uppercase">Viajes Premium Disney</span>
            <Sparkles className="w-5 h-5 text-[#FFD700] animate-float" style={{ animationDelay: '0.5s' }} />
          </div>
          
          <h1 
            ref={titleRef}
            className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6"
          >
            <span className="text-white">MAGIC </span>
            <span className="text-gradient-magic">LUZ</span>
          </h1>
          
          <p 
            ref={subtitleRef}
            className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light leading-relaxed"
          >
            Descubre la magia de Disney con experiencias de viaje exclusivas. 
            Desde vistas al castillo hasta tours VIP, crea recuerdos que durarán para siempre.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="#experiencias"
              className="group relative px-8 py-4 rounded-full bg-white text-[#0A0E17] font-semibold overflow-hidden transition-transform hover:scale-105"
            >
              <span className="relative z-10 flex items-center gap-2">
                Explorar Experiencias
                <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
              </span>
            </a>
            
            <a 
              href="#paquetes"
              className="px-8 py-4 rounded-full border border-white/30 text-white font-medium hover:bg-white/10 transition-all duration-300"
            >
              Ver Paquetes
            </a>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-white/40" />
        </div>
      </div>
    </section>
  )
}

// Bento Box Experience Card
interface ExperienceCardProps {
  title: string
  description: string
  image: string
  icon: React.ReactNode
  delay?: number
}

function ExperienceCard({ title, description, image, icon, delay = 0 }: ExperienceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    const card = cardRef.current
    if (!card || window.innerWidth < 768) return
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      
      const rotateX = (y - centerY) / 20
      const rotateY = (centerX - x) / 20
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
    }
    
    const handleMouseLeave = () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)'
    }
    
    card.addEventListener('mousemove', handleMouseMove)
    card.addEventListener('mouseleave', handleMouseLeave)
    
    return () => {
      card.removeEventListener('mousemove', handleMouseMove)
      card.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])
  
  return (
    <div
      ref={cardRef}
      className="interactive-card group relative overflow-hidden rounded-2xl transition-all duration-500 ease-out min-h-[280px] cursor-pointer"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
        style={{ backgroundImage: `url(${image})` }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E17] via-[#0A0E17]/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
      
      {/* Glow Effect on Hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-[#FF3366] to-transparent" />
      </div>
      
      {/* Content */}
      <div className="absolute inset-0 p-6 flex flex-col justify-end">
        <div className="transform transition-transform duration-500 group-hover:-translate-y-2">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-[#FF3366]/20 flex items-center justify-center backdrop-blur-sm border border-[#FF3366]/30">
              {icon}
            </div>
            <span className="text-white/60 text-xs tracking-wider uppercase">Experiencia</span>
          </div>
          <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-2">{title}</h3>
          <p className="text-white/70 text-sm leading-relaxed line-clamp-2">{description}</p>
        </div>
      </div>
    </div>
  )
}

// Experiences Section with Bento Grid
function ExperiencesSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.experience-card', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
      })
    })
    
    return () => ctx.revert()
  }, [])
  
  return (
    <section 
      ref={sectionRef}
      id="experiencias" 
      className="relative py-24 md:py-32 bg-[#F8F9FA] dark:bg-[#0A0E17] transition-colors duration-700"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#FF3366]/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#FFD700]/5 rounded-full blur-3xl" />
      </div>
      
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-[#FF3366]" />
            <Sparkles className="w-5 h-5 text-[#FF3366]" />
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-[#FF3366]" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-[#0A0E17] dark:text-white">
            Experiencias <span className="text-gradient-magic">Mágicas</span>
          </h2>
          <p className="text-[#0A0E17]/60 dark:text-white/60 text-lg max-w-2xl mx-auto">
            Cada momento está diseñado para crear recuerdos inolvidables. 
            Descubre experiencias únicas que trascienden la imaginación.
          </p>
        </div>
        
        {/* Bento Grid - 2x2 Balanced Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {/* Castillo Encantado */}
          <div className="experience-card md:min-h-[350px]">
            <ExperienceCard 
              title="Castillo Encantado"
              description="Vive la magia desde dentro con estadías exclusivas en las suites del castillo de Cinderella."
              image="/experience-castle.png"
              icon={<Castle className="w-5 h-5 text-[#FF3366]" />}
              delay={0}
            />
          </div>
          
          {/* Tour VIP Premium */}
          <div className="experience-card md:min-h-[350px]">
            <ExperienceCard 
              title="Tour VIP Premium"
              description="Acceso prioritario a todas las atracciones sin filas, guía personal y experiencias exclusivas."
              image="/experience-vip.png"
              icon={<Crown className="w-5 h-5 text-[#FFD700]" />}
              delay={100}
            />
          </div>
          
          {/* Magia Nocturna */}
          <div className="experience-card md:min-h-[350px]">
            <ExperienceCard 
              title="Magia Nocturna"
              description="Fuegos artificiales privados y cenas bajo las estrellas en el parque mágico."
              image="/experience-night.png"
              icon={<Star className="w-5 h-5 text-[#FFD700]" />}
              delay={200}
            />
          </div>
          
          {/* Encuentros Mágicos */}
          <div className="experience-card md:min-h-[350px]">
            <ExperienceCard 
              title="Encuentros Mágicos"
              description="Encuentros exclusivos con tus personajes favoritos en experiencias personalizadas."
              image="/experience-characters.png"
              icon={<Wand2 className="w-5 h-5 text-[#FF3366]" />}
              delay={300}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

// Premium Pricing Card
interface PricingCardProps {
  name: string
  price: string
  description: string
  features: string[]
  isPopular?: boolean
  delay?: number
}

function PricingCard({ name, price, description, features, isPopular = false, delay = 0 }: PricingCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  
  return (
    <div
      ref={cardRef}
      className={`relative group rounded-3xl p-8 transition-all duration-500 ${
        isPopular 
          ? 'frost-glass animate-gold-glow' 
          : 'frost-glass hover:border-white/20'
      }`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Popular Badge */}
      {isPopular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <div className="px-4 py-1.5 rounded-full bg-[#FFD700] text-[#0A0E17] text-xs font-bold tracking-wider">
            MÁS POPULAR
          </div>
        </div>
      )}
      
      {/* Card Content */}
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
            isPopular ? 'bg-[#FFD700]/20' : 'bg-[#FF3366]/20'
          }`}>
            {isPopular ? (
              <Crown className="w-6 h-6 text-[#FFD700]" />
            ) : (
              <Star className="w-6 h-6 text-[#FF3366]" />
            )}
          </div>
          <h3 className="font-display text-2xl font-bold text-white">{name}</h3>
        </div>
        
        <p className="text-white/60 text-sm mb-6">{description}</p>
        
        <div className="flex items-baseline gap-1 mb-8">
          <span className="text-white/60 text-lg">$</span>
          <span className="font-display text-5xl font-bold text-white">{price}</span>
          <span className="text-white/60 text-sm">/persona</span>
        </div>
        
        <ul className="space-y-4 mb-8">
          {features.map((feature) => (
            <li key={feature} className="flex items-start gap-3 text-white/80">
              <div className="mt-1 w-4 h-4 rounded-full bg-gradient-to-r from-[#FF3366] to-[#FFD700] flex items-center justify-center flex-shrink-0">
                <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
        
        <a 
          href="#contacto"
          className={`block w-full text-center py-4 rounded-full font-semibold transition-all duration-300 ${
            isPopular 
              ? 'bg-gradient-to-r from-[#FF3366] to-[#FFD700] text-white hover:shadow-lg hover:shadow-[#FF3366]/30 hover:scale-105'
              : 'border border-white/30 text-white hover:bg-white/10'
          }`}
        >
          Reservar Ahora
        </a>
      </div>
      
      {/* Hover Glow Effect */}
      <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#FF3366]/10 to-[#FFD700]/10" />
      </div>
    </div>
  )
}

// Pricing Section
function PricingSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background color transition
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 50%',
        end: 'bottom 50%',
        onEnter: () => {
          document.body.classList.add('dark-section')
        },
        onLeaveBack: () => {
          document.body.classList.remove('dark-section')
        },
      })
      
      gsap.from('.pricing-card', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
      })
    })
    
    return () => ctx.revert()
  }, [])
  
  const packages = [
    {
      name: 'Esencial',
      price: '2,499',
      description: 'Perfecto para una primera experiencia mágica',
      features: [
        '3 días / 2 noches en resort selecto',
        'Acceso a 2 parques temáticos',
        'Desayuno incluido',
        'Transfer aeropuerto-hotel',
        'Guía digital interactivo',
      ],
      isPopular: false,
    },
    {
      name: 'Premium',
      price: '4,999',
      description: 'La experiencia más completa y exclusiva',
      features: [
        '5 días / 4 noches en resort deluxe',
        'Acceso ilimitado a todos los parques',
        'FastPass+ ilimitado',
        'Cena exclusiva con personajes',
        'Tour VIP privado (4 horas)',
        'Fotografías profesionales',
        'Spa & Wellness incluido',
      ],
      isPopular: true,
    },
    {
      name: 'Familiar',
      price: '3,999',
      description: 'Diseñado para crear recuerdos en familia',
      features: [
        '4 días / 3 noches en suite familiar',
        'Acceso a 3 parques temáticos',
        'Comidas incluidas para niños',
        'Encuentro exclusivo con personajes',
        'Photopass digital ilimitado',
      ],
      isPopular: false,
    },
  ]
  
  return (
    <section
      ref={sectionRef}
      id="paquetes"
      className="relative py-24 md:py-32 bg-[#0A0E17] overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-[#FF3366]/10 rounded-full blur-[200px]" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#FFD700]/10 rounded-full blur-[200px]" />
        
        {/* Floating Stars */}
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-sparkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
            }}
          >
            <Star className="w-1.5 h-1.5 text-[#FFD700]/40" />
          </div>
        ))}
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-[#FFD700]" />
            <Crown className="w-5 h-5 text-[#FFD700]" />
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-[#FFD700]" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white">
            Paquetes <span className="text-gradient-magic">Premium</span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Cada paquete está diseñado para ofrecer una experiencia única. 
            Elige el que mejor se adapte a tus sueños.
          </p>
        </div>
        
        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {packages.map((pkg, index) => (
            <div key={pkg.name} className="pricing-card">
              <PricingCard {...pkg} delay={index * 150} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Testimonial Section
function TestimonialsSection() {
  return (
    <section className="py-24 md:py-32 bg-[#F8F9FA] dark:bg-[#0A0E17] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-[#FF3366]/5 to-transparent rounded-full blur-3xl" />
      </div>
      
      <div className="max-w-5xl mx-auto px-6 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Heart className="w-5 h-5 text-[#FF3366]" />
        </div>
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-8 text-[#0A0E17] dark:text-white">
          Lo que dicen nuestros <span className="text-gradient-magic">viajeros</span>
        </h2>
        
        <div className="relative">
          <div className="frost-glass rounded-3xl p-8 md:p-12">
            <div className="flex items-center justify-center gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-[#FFD700] fill-[#FFD700]" />
              ))}
            </div>
            <blockquote className="font-display text-xl md:text-2xl text-white/90 italic mb-6 leading-relaxed">
              &ldquo;Una experiencia que superó todas nuestras expectativas. El equipo de Magic Luz 
              hizo que cada momento fuera especial. Mis hijos aún hablan de la noche que pasamos 
              en el castillo.&rdquo;
            </blockquote>
            <div className="flex items-center justify-center gap-4">
              <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[#FF3366]/50">
                <img 
                  src="/testimonial-family.png" 
                  alt="María González"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-left">
                <div className="text-white font-semibold">María González</div>
                <div className="text-white/60 text-sm">Viaje Familiar Premium</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Contact Section
function ContactSection() {
  return (
    <section id="contacto" className="py-24 md:py-32 bg-[#0A0E17] relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{ 
          backgroundImage: 'url(/contact-travel.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#FF3366]/10 rounded-full blur-[150px]" />
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#FFD700]/10 rounded-full blur-[150px]" />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 text-white">
              Comienza tu <span className="text-gradient-magic">aventura</span>
            </h2>
            <p className="text-white/60 text-lg mb-8 leading-relaxed">
              Nuestro equipo de expertos está listo para ayudarte a diseñar la experiencia 
              perfecta. Contáctanos y comienza a soñar.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#FF3366]/20 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-[#FF3366]" />
                </div>
                <div>
                  <div className="text-white/60 text-sm">Llámanos</div>
                  <div className="text-white font-semibold">+1 (888) MAGIC-LUZ</div>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#FFD700]/20 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-[#FFD700]" />
                </div>
                <div>
                  <div className="text-white/60 text-sm">Escríbenos</div>
                  <div className="text-white font-semibold">magia@magicluz.com</div>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#FF3366]/20 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-[#FF3366]" />
                </div>
                <div>
                  <div className="text-white/60 text-sm">Visítanos</div>
                  <div className="text-white font-semibold">Orlando, Florida</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="frost-glass rounded-3xl p-8">
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-white/60 text-sm mb-2 block">Nombre</label>
                  <input 
                    type="text"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:border-[#FF3366]/50 focus:outline-none transition-colors"
                    placeholder="Tu nombre"
                  />
                </div>
                <div>
                  <label className="text-white/60 text-sm mb-2 block">Email</label>
                  <input 
                    type="email"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:border-[#FF3366]/50 focus:outline-none transition-colors"
                    placeholder="tu@email.com"
                  />
                </div>
              </div>
              
              <div>
                <label className="text-white/60 text-sm mb-2 block">¿Qué experiencia te interesa?</label>
                <select className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-[#FF3366]/50 focus:outline-none transition-colors">
                  <option value="" className="bg-[#0A0E17]">Selecciona una opción</option>
                  <option value="esencial" className="bg-[#0A0E17]">Paquete Esencial</option>
                  <option value="premium" className="bg-[#0A0E17]">Paquete Premium</option>
                  <option value="familiar" className="bg-[#0A0E17]">Paquete Familiar</option>
                  <option value="custom" className="bg-[#0A0E17]">Experiencia Personalizada</option>
                </select>
              </div>
              
              <div>
                <label className="text-white/60 text-sm mb-2 block">Mensaje</label>
                <textarea 
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:border-[#FF3366]/50 focus:outline-none transition-colors resize-none"
                  placeholder="Cuéntanos sobre tu viaje soñado..."
                />
              </div>
              
              <button 
                type="submit"
                className="w-full py-4 rounded-full bg-gradient-to-r from-[#FF3366] to-[#FFD700] text-white font-semibold hover:shadow-lg hover:shadow-[#FF3366]/30 transition-all duration-300 hover:scale-[1.02]"
              >
                Enviar Consulta
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

// Footer
function Footer() {
  return (
    <footer className="relative bg-[#0A0E17] border-t border-white/10 overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 opacity-100"
        style={{ 
          backgroundImage: 'url(/footer.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center bottom',
        }}
      />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a href="#" className="flex items-center gap-2 mb-4">
              <Sparkles className="w-6 h-6 text-[#FF3366]" />
              <span className="font-display text-xl font-bold tracking-wider text-white">MAGIC LUZ</span>
            </a>
            <p className="text-white/60 mb-6 max-w-md">
              Creamos experiencias mágicas que transforman sueños en recuerdos inolvidables. 
              Tu aventura Disney comienza aquí.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:bg-[#FF3366] hover:text-white transition-all duration-300">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:bg-[#FF3366] hover:text-white transition-all duration-300">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:bg-[#FF3366] hover:text-white transition-all duration-300">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          {/* Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Enlaces</h4>
            <ul className="space-y-3">
              {['Experiencias', 'Paquetes', 'Galería', 'Nosotros', 'Blog'].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase()}`} className="text-white/60 hover:text-white transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-3">
              {['Términos de Uso', 'Política de Privacidad', 'Cookies', 'FAQ'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-white/60 hover:text-white transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            © 2026 Magic Luz. Todos los derechos reservados.
          </p>
          <a 
            href="https://rbernabe.dev" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white/40 text-sm hover:text-[#FF3366] transition-colors"
          >
            Diseñado y Desarrollado por <span className="font-semibold">RBernabe.dev</span>
          </a>
        </div>
      </div>
    </footer>
  )
}

// Main Page Component
export default function Home() {
  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    })
    
    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    
    requestAnimationFrame(raf)
    
    // Connect GSAP ScrollTrigger with Lenis
    lenis.on('scroll', ScrollTrigger.update)
    
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })
    
    gsap.ticker.lagSmoothing(0)
    
    return () => {
      lenis.destroy()
    }
  }, [])
  
  return (
    <main className="relative min-h-screen flex flex-col bg-[#0A0E17]">
      <CustomCursor />
      <Header />
      <HeroSection />
      <ExperiencesSection />
      <PricingSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
