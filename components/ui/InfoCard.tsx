import React from 'react'
import { cn } from '@/lib/utils'

interface InfoCardProps {
  icon: React.ReactNode
  title: string
  description: string
  className?: string
  variant?: 'default' | 'gradient' | 'glow'
}

const InfoCard: React.FC<InfoCardProps> = ({ 
  icon, 
  title, 
  description, 
  className,
  variant = 'default'
}) => {
  const variants = {
    default: "glass-card hover:bg-white/10",
    gradient: "bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 hover:border-blue-400/30",
    glow: "glass-card hover:shadow-lg hover:shadow-blue-500/20"
  }

  return (
    <div className={cn(
      "group p-8 rounded-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2",
      variants[variant],
      className
    )}>
      <div className="flex items-center justify-center w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 group-hover:from-blue-500/30 group-hover:to-purple-500/30 transition-all duration-300">
        <div className="text-blue-400 group-hover:text-blue-300 transition-colors duration-300">
          {icon}
        </div>
      </div>
      <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-blue-100 transition-colors duration-300">
        {title}
      </h3>
      <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
        {description}
      </p>
    </div>
  )
}

export default InfoCard