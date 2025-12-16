'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Shield, Smartphone, UserCheck, FileText, ChevronRight, Heart, Clock, Users, Zap, Star, ArrowRight, Sparkles } from 'lucide-react'
import Button from '@/components/ui/button'
import InfoCard from '@/components/ui/InfoCard'

export default function Home() {
  const [isVisible, setIsVisible] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    setIsVisible(true)
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const features = [
    {
      icon: <Smartphone className="w-7 h-7" />,
      title: "NFC Access",
      description: "Instant access to emergency info with a simple tap. No apps, no delays, just life-saving information."
    },
    {
      icon: <Shield className="w-7 h-7" />,
      title: "Privacy Protected",
      description: "Military-grade encryption keeps your full medical history secure behind biometric authentication."
    },
    {
      icon: <FileText className="w-7 h-7" />,
      title: "Smart Records",
      description: "AI-powered organization of prescriptions, allergies, and medical history for instant retrieval."
    },
    {
      icon: <UserCheck className="w-7 h-7" />,
      title: "Professional Access",
      description: "Healthcare professionals get verified access to complete records during critical moments."
    }
  ]

  const stats = [
    { icon: Clock, value: "< 2 sec", label: "Emergency access time", color: "text-blue-400" },
    { icon: Shield, value: "100%", label: "Privacy protected", color: "text-emerald-400" },
    { icon: Users, value: "24/7", label: "Emergency ready", color: "text-purple-400" },
    { icon: Zap, value: "99.9%", label: "Uptime guarantee", color: "text-yellow-400" }
  ]

  return (
    <div className="min-h-screen bg-black overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute w-96 h-96 bg-blue-500/10 rounded-full blur-3xl transition-all duration-1000 ease-out"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
          }}
        />
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl floating-animation" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl floating-animation" style={{ animationDelay: '2s' }} />
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className={`transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            {/* Badge */}
            <div className="inline-flex items-center px-6 py-3 glass-effect rounded-full mb-8 group hover:bg-white/10 transition-all duration-300">
              <Star className="w-4 h-4 mr-2 text-yellow-400" />
              <span className="text-sm font-medium text-white">Trusted by 50,000+ users worldwide</span>
              <Sparkles className="w-4 h-4 ml-2 text-blue-400" />
            </div>
            
            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8 leading-tight">
              Your Emergency Info,
              <span className="block gradient-text">Instantly Accessible</span>
            </h1>
            
            {/* Subheading */}
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              Revolutionary ICE Beacon technology meets emergency healthcare. Create a secure profile that could 
              <span className="text-blue-400 font-semibold"> save your life </span>
              when every second counts.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <Link href="/register">
                <Button variant="gradient" size="xl" className="group min-w-[200px]">
                  Get Started Free
                  <ArrowRight className="w-5 h-5 ml-3 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="outline" size="xl" className="min-w-[200px]">
                  Sign In
                </Button>
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="flex items-center justify-center space-x-8 text-gray-400 text-sm">
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-emerald-400" />
                <span>HIPAA Compliant</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="w-4 h-4 text-yellow-400" />
                <span>Instant Access</span>
              </div>
              <div className="flex items-center space-x-2">
                <Heart className="w-4 h-4 text-red-400" />
                <span>Life Saving</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Why Choose <span className="gradient-text">ICE Beacon</span>?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Our ICE Beacon platform combines cutting-edge technology with life-saving functionality, 
              ensuring your critical medical information is always accessible when you need it most.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="fade-in-delayed" style={{ animationDelay: `${index * 0.2}s` }}>
                <InfoCard 
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  variant="glow"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 glass-effect" />
        <div className="max-w-7xl mx-auto relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-center">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div key={index} className="group">
                  <div className="flex items-center justify-center mb-6">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Icon className={`w-10 h-10 ${stat.color}`} />
                    </div>
                  </div>
                  <div className="text-4xl md:text-5xl font-black text-white mb-3 group-hover:scale-105 transition-transform duration-300">
                    {stat.value}
                  </div>
                  <div className="text-gray-300 font-medium">{stat.label}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-5xl mx-auto text-center">
          <div className="glass-card p-12 md:p-16 rounded-3xl">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              Ready to Setup Your 
              <span className="gradient-text block">Emergency Profile?</span>
            </h2>
            <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Join thousands of users who trust us with their emergency medical information. 
              Setup takes less than 5 minutes and could save your life.
            </p>
            <Link href="/register">
              <Button variant="gradient" size="xl" className="group">
                Create Your Profile Now
                <ChevronRight className="w-6 h-6 ml-3 transition-transform group-hover:translate-x-2" />
              </Button>
            </Link>
            <p className="text-gray-400 text-sm mt-6">
              Free forever • No credit card required • HIPAA compliant
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
