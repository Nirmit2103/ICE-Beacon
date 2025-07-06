import { useState } from 'react'
import { useRouter } from 'next/router'
import { signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { auth, db } from '@/firebase/firebaseConfig'
import { Lock, AlertCircle, BadgeCheck } from 'lucide-react'
import { Input } from '@/components/ui/input'
import Button from '@/components/ui/Button'

export default function DoctorLogin() {
  const router = useRouter()
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    if (!formData.email.includes('@')) newErrors.email = 'Valid email is required'
    if (!formData.password) newErrors.password = 'Password is required'
    if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return
    setIsSubmitting(true)
    setErrors({})
    try {
      const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password)
      const user = userCredential.user
      // Check doctor role in Firestore (users collection, field 'role')
      const userDoc = await getDoc(doc(db, 'users', user.uid))
      if (userDoc.exists() && userDoc.data().role === 'doctor') {
        router.push('/doctor-dashboard')
      } else {
        setErrors({ general: 'Access denied: You are not authorized as a doctor.' })
        await signOut(auth)
      }
    } catch (error: any) {
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        setErrors({ general: 'Invalid email or password.' })
      } else if (error.code === 'auth/invalid-email') {
        setErrors({ email: 'Invalid email address.' })
      } else if (error.code === 'auth/too-many-requests') {
        setErrors({ general: 'Too many failed attempts. Please try again later.' })
      } else {
        setErrors({ general: error.message || 'Login failed.' })
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <div className="max-w-md w-full mx-auto px-4 sm:px-6 lg:px-8 relative mt-16">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 glass-effect rounded-2xl mb-6 pulse-glow">
            <Lock className="w-10 h-10 text-blue-400" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4 flex items-center justify-center gap-2">
            Doctor Login
            <span className="inline-flex items-center px-3 py-1 ml-2 rounded-full bg-green-600/20 border border-green-500/50 text-green-400 text-xs font-semibold">
              <BadgeCheck className="w-4 h-4 mr-1" /> Secure Access
            </span>
          </h1>
          <p className="text-xl text-gray-300">
            Only authorized doctors can access full medical histories.
          </p>
        </div>
        <div className="glass-card rounded-3xl p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-8">
            {errors.general && (
              <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-xl flex items-center">
                <AlertCircle className="w-5 h-5 text-red-400 mr-3" />
                <span className="text-red-400">{errors.general}</span>
              </div>
            )}
            <div>
              <Input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="doctor@email.com"
              />
              {errors.email && (
                <p className="text-red-400 text-sm flex items-center mt-2">
                  <AlertCircle className="w-4 h-4 mr-2" />
                  {errors.email}
                </p>
              )}
            </div>
            <div>
              <Input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                placeholder="Enter your password"
              />
              {errors.password && (
                <p className="text-red-400 text-sm flex items-center mt-2">
                  <AlertCircle className="w-4 h-4 mr-2" />
                  {errors.password}
                </p>
              )}
            </div>
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
                  Signing In...
                </>
              ) : (
                <>Sign In</>
              )}
            </Button>
          </form>
        </div>
      </div>
    </>
  )
} 