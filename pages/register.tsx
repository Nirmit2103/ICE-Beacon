'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { UserPlus, Mail, Lock, User, Phone, Heart, AlertCircle, Sparkles, Shield } from 'lucide-react'
import Button from '@/components/ui/Button'
import { Input } from '@/components/ui/input'
import FormSection from '@/components/ui/FormSection'
import { auth, db } from '@/firebase/firebaseConfig'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'

export default function Register() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    bloodGroup: '',
    knownConditions: '',
    emergencyContact: '',
    email: '',
    password: '',
    confirmPassword: '',
    chronicConditions: '',
    pastSurgeries: '',
    currentMedications: '',
    allergies: '',
    familyHistory: '',
    habits: '',
    covidHistory: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required'
    if (!formData.age || parseInt(formData.age) < 1) newErrors.age = 'Valid age is required'
    if (!formData.bloodGroup) newErrors.bloodGroup = 'Blood group is required'
    if (!formData.emergencyContact.trim()) newErrors.emergencyContact = 'Emergency contact is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    if (!formData.email.includes('@')) newErrors.email = 'Valid email is required'
    if (!formData.password) newErrors.password = 'Password is required'
    if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters'
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return
    setIsSubmitting(true)
    setErrors({})
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      )
      const user = userCredential.user
      await setDoc(doc(db, 'users', user.uid), {
        fullName: formData.fullName,
        age: formData.age,
        bloodGroup: formData.bloodGroup,
        knownConditions: formData.knownConditions,
        emergencyContact: formData.emergencyContact,
        chronicConditions: formData.chronicConditions,
        pastSurgeries: formData.pastSurgeries,
        currentMedications: formData.currentMedications,
        allergies: formData.allergies,
        familyHistory: formData.familyHistory,
        habits: formData.habits,
        covidHistory: formData.covidHistory,
        email: formData.email,
        createdAt: new Date().toISOString()
      })
      router.push('/dashboard')
    } catch (error: any) {
      let message = error.message || 'Registration failed.'
      if (error.code === 'auth/email-already-in-use') {
        setErrors({ email: 'Email is already in use.' })
      } else if (error.code === 'auth/invalid-email') {
        setErrors({ email: 'Invalid email address.' })
      } else if (error.code === 'auth/weak-password') {
        setErrors({ password: 'Password is too weak.' })
      } else {
        setErrors({ general: message })
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-black py-20">
      {/* Background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl floating-animation" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl floating-animation" style={{ animationDelay: '2s' }} />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 glass-effect rounded-2xl mb-6 pulse-glow">
            <UserPlus className="w-10 h-10 text-blue-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Create Your <span className="gradient-text">Emergency Profile</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Setup your secure medical information for emergency access. This could save your life.
          </p>
          
          {/* Trust indicators */}
          <div className="flex items-center justify-center space-x-6 mt-8 text-sm text-gray-400">
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span>256-bit Encryption</span>
            </div>
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span>HIPAA Compliant</span>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="glass-card rounded-3xl p-8 md:p-12 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-12">
            {/* Personal Information */}
            <FormSection title="Personal Information" icon={<User className="w-6 h-6" />}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <Input
                    name="fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your full name"
                  />
                  {errors.fullName && (
                    <p className="text-red-400 text-sm flex items-center mt-2">
                      <AlertCircle className="w-4 h-4 mr-2" />
                      {errors.fullName}
                    </p>
                  )}
                </div>
                <div>
                  <Input
                    name="age"
                    type="number"
                    value={formData.age}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your age"
                  />
                  {errors.age && (
                    <p className="text-red-400 text-sm flex items-center mt-2">
                      <AlertCircle className="w-4 h-4 mr-2" />
                      {errors.age}
                    </p>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">Blood Group</label>
                  <select
                    name="bloodGroup"
                    value={formData.bloodGroup}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 glass-effect rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300"
                    required
                  >
                    <option value="">Select blood group</option>
                    {bloodGroups.map(group => (
                      <option key={group} value={group} className="bg-gray-800">{group}</option>
                    ))}
                  </select>
                  {errors.bloodGroup && (
                    <p className="text-red-400 text-sm flex items-center mt-2">
                      <AlertCircle className="w-4 h-4 mr-2" />
                      {errors.bloodGroup}
                    </p>
                  )}
                </div>
                
                <div>
                  <Input
                    name="emergencyContact"
                    type="tel"
                    value={formData.emergencyContact}
                    onChange={handleInputChange}
                    required
                    placeholder="+1 (555) 123-4567"
                  />
                  {errors.emergencyContact && (
                    <p className="text-red-400 text-sm flex items-center mt-2">
                      <AlertCircle className="w-4 h-4 mr-2" />
                      {errors.emergencyContact}
                    </p>
                  )}
                </div>
              </div>
            </FormSection>

            {/* Medical Information */}
            <FormSection title="Medical Information" icon={<Heart className="w-6 h-6" />}>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Known Conditions & Allergies
                </label>
                <textarea
                  name="knownConditions"
                  value={formData.knownConditions}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-4 glass-effect rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 resize-none"
                  placeholder="Enter any medical conditions, allergies, or medications (e.g., Diabetes Type 2, Penicillin allergy, Blood pressure medication)"
                />
                <p className="text-gray-400 text-sm mt-2">
                  This information will be visible to emergency responders. Be specific and accurate.
                </p>
              </div>
              <div className="space-y-2 mt-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">Chronic Conditions</label>
                <textarea
                  name="chronicConditions"
                  value={formData.chronicConditions}
                  onChange={handleInputChange}
                  rows={2}
                  className="w-full px-4 py-3 glass-effect rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 resize-none"
                  placeholder="e.g., Diabetes, Asthma, Hypertension"
                />
              </div>
              <div className="space-y-2 mt-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">Past Surgeries or Procedures</label>
                <textarea
                  name="pastSurgeries"
                  value={formData.pastSurgeries}
                  onChange={handleInputChange}
                  rows={2}
                  className="w-full px-4 py-3 glass-effect rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 resize-none"
                  placeholder="e.g., Appendix surgery in 2019, Knee replacement in 2021"
                />
              </div>
              <div className="space-y-2 mt-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">Current Medications</label>
                <textarea
                  name="currentMedications"
                  value={formData.currentMedications}
                  onChange={handleInputChange}
                  rows={2}
                  className="w-full px-4 py-3 glass-effect rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 resize-none"
                  placeholder="List all medications you currently take regularly"
                />
              </div>
              <div className="space-y-2 mt-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">Allergies</label>
                <textarea
                  name="allergies"
                  value={formData.allergies}
                  onChange={handleInputChange}
                  rows={2}
                  className="w-full px-4 py-3 glass-effect rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 resize-none"
                  placeholder="e.g., Penicillin, Peanuts, Latex"
                />
              </div>
            </FormSection>

            {/* Lifestyle & Habits */}
            <FormSection title="Lifestyle & Habits" icon={<Heart className="w-6 h-6" />}>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300 mb-2">Smoking/Alcohol/Other Habits</label>
                <textarea
                  name="habits"
                  value={formData.habits}
                  onChange={handleInputChange}
                  rows={2}
                  className="w-full px-4 py-3 glass-effect rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 resize-none"
                  placeholder="e.g., Smoker, Non-Smoker, Drinks occasionally, Never, etc."
                />
              </div>
            </FormSection>

            {/* Family Medical Background */}
            <FormSection title="Family Medical Background" icon={<Heart className="w-6 h-6" />}>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300 mb-2">Family Medical History</label>
                <textarea
                  name="familyHistory"
                  value={formData.familyHistory}
                  onChange={handleInputChange}
                  rows={2}
                  className="w-full px-4 py-3 glass-effect rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 resize-none"
                  placeholder="e.g., Father has diabetes, Mother has thyroid issues"
                />
              </div>
            </FormSection>

            {/* COVID-19 History */}
            <FormSection title="COVID-19 History" icon={<Heart className="w-6 h-6" />}>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300 mb-2">COVID-19 History</label>
                <textarea
                  name="covidHistory"
                  value={formData.covidHistory}
                  onChange={handleInputChange}
                  rows={2}
                  className="w-full px-4 py-3 glass-effect rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 resize-none"
                  placeholder="Have you ever tested positive for COVID-19? If yes, when?"
                />
              </div>
            </FormSection>

            {/* Account Information */}
            <FormSection title="Account Security" icon={<Mail className="w-6 h-6" />}>
              <div className="space-y-8">
                <div>
                  <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="your.email@example.com"
                  />
                  {errors.email && (
                    <p className="text-red-400 text-sm flex items-center mt-2">
                      <AlertCircle className="w-4 h-4 mr-2" />
                      {errors.email}
                    </p>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <Input
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      placeholder="Create a strong password"
                    />
                    {errors.password && (
                      <p className="text-red-400 text-sm flex items-center mt-2">
                        <AlertCircle className="w-4 h-4 mr-2" />
                        {errors.password}
                      </p>
                    )}
                  </div>
                  <div>
                    <Input
                      name="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      required
                      placeholder="Confirm your password"
                    />
                    {errors.confirmPassword && (
                      <p className="text-red-400 text-sm flex items-center mt-2">
                        <AlertCircle className="w-4 h-4 mr-2" />
                        {errors.confirmPassword}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </FormSection>

            {/* Show general error if present */}
            {errors.general && (
              <p className="text-red-400 text-center text-sm flex items-center justify-center mt-2">
                <AlertCircle className="w-4 h-4 mr-2" />
                {errors.general}
              </p>
            )}

            {/* Submit */}
            <div className="flex flex-col space-y-6 pt-8">
              <Button
                type="submit"
                variant="gradient"
                size="xl"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    Creating Your Profile...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 mr-3" />
                    Create Emergency Profile
                  </>
                )}
              </Button>
              
              <p className="text-center text-gray-400">
                Already have an account?{' '}
                <Link href="/login" className="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-300">
                  Sign in here
                </Link>
              </p>
              
              <p className="text-center text-gray-500 text-sm max-w-2xl mx-auto">
                By creating an account, you agree to our Terms of Service and Privacy Policy. 
                Your medical information is encrypted and HIPAA compliant.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}