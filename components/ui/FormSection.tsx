import React from 'react'

interface FormSectionProps {
  title: string
  icon: React.ReactNode
  children: React.ReactNode
}

const FormSection: React.FC<FormSectionProps> = ({ title, icon, children }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 pb-4 border-b border-white/10">
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20">
          <div className="text-blue-400">
            {icon}
          </div>
        </div>
        <h3 className="text-xl font-semibold text-white">{title}</h3>
      </div>
      {children}
    </div>
  )
}

export default FormSection