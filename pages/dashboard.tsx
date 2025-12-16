'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import { User, Heart, FileText, Link as LinkIcon, Edit2, Save, Upload, ExternalLink, AlertCircle, Copy, Shield, Sparkles, ShoppingBag } from 'lucide-react'
import Button from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import InfoCard from '@/components/ui/InfoCard'
import FormSection from '@/components/ui/FormSection'
import { useRouter } from 'next/router'
import { auth, db } from '@/firebase/firebaseConfig'
import { onAuthStateChanged, signOut, User as FirebaseUser } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { ChartContainer } from '@/components/ui/chart'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import Link from 'next/link'
import { Textarea } from '@/components/ui/textarea'

export default function Dashboard() {
  const router = useRouter()
  const [userData, setUserData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null)
  const [copied, setCopied] = useState(false)
  const [displayScore, setDisplayScore] = useState(0)
  const animationRef = useRef<number>()
  const [aiDiagnosis, setAiDiagnosis] = useState('')
  const [aiLoading, setAiLoading] = useState(false)
  const [aiError, setAiError] = useState('')
  const [diagnosisInput, setDiagnosisInput] = useState({
    symptoms: '',
    duration: '',
  })
  const [diagnosisLoading, setDiagnosisLoading] = useState(false)
  const [diagnosisResult, setDiagnosisResult] = useState('')

  // Auth check and fetch user data
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.replace('/login')
        return
      }
      setFirebaseUser(user)
      setLoading(true)
      setError('')
      try {
        const userDoc = await getDoc(doc(db, 'users', user.uid))
        if (userDoc.exists()) {
          setUserData(userDoc.data())
        } else {
          setError('No emergency profile found for this user.')
        }
      } catch (err: any) {
        setError('Failed to load user data.')
      } finally {
        setLoading(false)
      }
    })
    return () => unsubscribe()
  }, [router])

  useEffect(() => {
    let start = 0
    const duration = 1200
    const startTime = performance.now()
    function animate(now: number) {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      setDisplayScore(Math.floor(progress * 85))
      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate)
      } else {
        setDisplayScore(85)
      }
    }
    animationRef.current = requestAnimationFrame(animate)
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [])

  const handleLogout = async () => {
    await signOut(auth)
    router.replace('/login')
  }

  // Emergency link for the user
  const emergencyLink = firebaseUser ? `${typeof window !== 'undefined' ? window.location.origin : ''}/u/${firebaseUser.uid}` : ''

  const handleDiagnosisInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setDiagnosisInput(prev => ({ ...prev, [name]: value }))
    setAiError('')
    setAiDiagnosis('')
  }

  const handleDiagnosisSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    setDiagnosisResult('')
    setAiError('')
    setDiagnosisLoading(true)
    try {
      const res = await fetch('/api/diagnose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          symptoms: diagnosisInput.symptoms,
          duration: diagnosisInput.duration,
          knownConditions: userData?.knownConditions || '',
          medications: userData?.currentMedications || '',
          allergies: userData?.allergies || '',
        })
      })
      if (!res.ok) throw new Error('Failed to get diagnosis')
      const data = await res.json()
      setDiagnosisResult(data.diagnosis)
    } catch (err: any) {
      setAiError('Failed to get AI diagnosis. Please try again.')
    } finally {
      setDiagnosisLoading(false)
    }
  }, [diagnosisInput, userData])

  // Auto-fill known conditions, medications, allergies from user profile
  const knownConditions = userData?.knownConditions || ''
  const medications = userData?.currentMedications || ''
  const allergies = userData?.allergies || ''

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="text-white text-xl">Loading your emergency profile...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="bg-slate-800/80 p-8 rounded-2xl shadow-2xl border border-slate-700 text-center">
          <AlertCircle className="w-8 h-8 text-red-400 mx-auto mb-4" />
          <div className="text-white text-lg mb-2">{error}</div>
          <Button onClick={handleLogout} variant="outline" className="mt-4">Logout</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10 relative">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600/20 rounded-full mb-4">
            <User className="w-8 h-8 text-blue-400" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center justify-center gap-4">
            Welcome back, {userData?.fullName || 'User'}
            <Link href="/profile-edit">
              <Button variant="outline" size="sm" className="flex items-center gap-2 ml-2">
                <Edit2 className="w-4 h-4" />
                Edit Profile
              </Button>
            </Link>
          </h1>
          <p className="text-slate-300">Manage your emergency medical profile</p>
          <Button onClick={handleLogout} variant="outline" size="sm" className="absolute top-6 right-6">Logout</Button>
        </div>

        {/* Emergency Link Section */}
        <div className="bg-blue-600/10 border border-blue-500/30 rounded-2xl p-6 mb-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <div className="text-blue-400 font-semibold text-sm mb-1 flex items-center gap-2">
              <Shield className="w-5 h-5 mr-1" />
              Your Emergency Info Link
            </div>
            <div className="text-white font-mono text-lg break-all">{emergencyLink}</div>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
            onClick={() => {
              if (emergencyLink) {
                navigator.clipboard.writeText(emergencyLink)
                setCopied(true)
                setTimeout(() => setCopied(false), 1500)
              }
            }}
          >
            <Copy className="w-4 h-4" />
            {copied ? 'Copied!' : 'Copy Link'}
          </Button>
        </div>

        {/* Store Section */}
        <div className="bg-gradient-to-r from-purple-600/10 to-blue-600/10 border border-purple-500/30 rounded-2xl p-6 mb-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <div className="text-purple-400 font-semibold text-sm mb-1 flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 mr-1" />
                Get Your ICE Beacon Device
              </div>
              <div className="text-white text-lg">Purchase ICE Beacon cards, wristbands, and more to access your medical profile instantly</div>
            </div>
            <Link href="/store">
              <Button className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4" />
                Browse Store
              </Button>
            </Link>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <InfoCard
            icon={<Heart className="w-7 h-7" />}
            title="Blood Group"
            description={userData?.bloodGroup || '-'}
            variant="gradient"
          />
          <InfoCard
            icon={<User className="w-7 h-7" />}
            title="Age"
            description={userData?.age ? `${userData.age} years` : '-'}
            variant="gradient"
          />
          <InfoCard
            icon={<FileText className="w-7 h-7" />}
            title="Emergency Contact"
            description={userData?.emergencyContact || '-'}
            variant="gradient"
          />
        </div>

        {/* Chart Section (Health Score) */}
        <div className="bg-slate-800/80 rounded-2xl p-8 shadow-2xl border border-slate-700 mb-10 flex flex-col items-center">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
            <Heart className="w-5 h-5 mr-2 text-red-400 animate-pulse" />
            Health Score
          </h2>
          <div className="relative flex flex-col items-center justify-center w-48 h-48 mb-4">
            {/* Circular Progress Ring */}
            <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 120 120">
              <circle
                cx="60" cy="60" r="54"
                fill="none"
                stroke="#1e293b"
                strokeWidth="12"
              />
              <circle
                cx="60" cy="60" r="54"
                fill="none"
                stroke="#60a5fa"
                strokeWidth="12"
                strokeDasharray={339.292}
                strokeDashoffset={339.292 - (339.292 * displayScore) / 100}
                strokeLinecap="round"
                className="transition-all duration-500"
                style={{ filter: 'drop-shadow(0 0 12px #60a5fa88)' }}
              />
            </svg>
            {/* Animated Number */}
            <span className="relative z-10 text-6xl font-extrabold text-blue-400 drop-shadow-lg animate-fade-in">
              {displayScore}
              <span className="text-2xl align-super text-blue-300 font-bold">/100</span>
            </span>
            <span className="relative z-10 mt-2 text-lg text-slate-300 font-medium">Excellent</span>
          </div>
          <p className="text-slate-400 text-center max-w-xs mx-auto">
            Your health score is calculated based on your profile and medical information. Keep your details up to date for the best results.
          </p>
        </div>

        {/* Details Section */}
        <div className="bg-slate-800/80 rounded-2xl p-8 shadow-2xl border border-slate-700 mb-10">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
            <FileText className="w-5 h-5 mr-2 text-blue-400" />
            Personal & Medical Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <div className="text-gray-400 text-sm mb-1">Full Name</div>
              <div className="text-white font-medium">{userData?.fullName || '-'}</div>
            </div>
            <div>
              <div className="text-gray-400 text-sm mb-1">Email</div>
              <div className="text-white font-medium">{userData?.email || '-'}</div>
            </div>
          </div>
          <div className="mb-8">
            <div className="text-gray-400 text-sm mb-1">Known Conditions & Allergies</div>
            <div className="text-white font-medium whitespace-pre-line">{userData?.knownConditions || '-'}</div>
          </div>
          <div>
            <div className="text-gray-400 text-sm mb-1">Emergency Contact</div>
            <div className="text-white font-medium">{userData?.emergencyContact || '-'}</div>
          </div>
          {/* Medical History Section */}
          <h2 className="text-xl font-semibold text-white mb-2 mt-8">Medical History</h2>
          <div className="mb-6">
            <div className="text-gray-400 text-sm mb-1">Chronic Conditions</div>
            <div className="text-white font-medium whitespace-pre-line">{userData?.chronicConditions || '-'}</div>
          </div>
          <div className="mb-6">
            <div className="text-gray-400 text-sm mb-1">Past Surgeries or Procedures</div>
            <div className="text-white font-medium whitespace-pre-line">{userData?.pastSurgeries || '-'}</div>
          </div>
          <div className="mb-6">
            <div className="text-gray-400 text-sm mb-1">Current Medications</div>
            <div className="text-white font-medium whitespace-pre-line">{userData?.currentMedications || '-'}</div>
          </div>
          <div className="mb-6">
            <div className="text-gray-400 text-sm mb-1">Allergies</div>
            <div className="text-white font-medium whitespace-pre-line">{userData?.allergies || '-'}</div>
          </div>
          {/* Family Background Section */}
          <h2 className="text-xl font-semibold text-white mb-2 mt-8">Family Background</h2>
          <div className="mb-6">
            <div className="text-gray-400 text-sm mb-1">Family Medical History</div>
            <div className="text-white font-medium whitespace-pre-line">{userData?.familyHistory || '-'}</div>
          </div>
          {/* Habits Section */}
          <h2 className="text-xl font-semibold text-white mb-2 mt-8">Habits</h2>
          <div className="mb-6">
            <div className="text-gray-400 text-sm mb-1">Smoking/Alcohol/Other Habits</div>
            <div className="text-white font-medium whitespace-pre-line">{userData?.habits || '-'}</div>
          </div>
          {/* COVID-19 Section */}
          <h2 className="text-xl font-semibold text-white mb-2 mt-8">COVID-19 History</h2>
          <div className="mb-6">
            <div className="text-gray-400 text-sm mb-1">COVID-19 History</div>
            <div className="text-white font-medium whitespace-pre-line">{userData?.covidHistory || '-'}</div>
          </div>
        </div>

        {/* AI Health Assistant Section */}
        <div className="glass-card rounded-2xl p-8 shadow-2xl border border-slate-700 mb-10 mt-10">
          <FormSection title="AI Health Assistant" icon={<Sparkles className="w-6 h-6 text-blue-400" />}>
            <p className="text-slate-300 mb-6">Enter your symptoms and duration. The AI will suggest possible health issues based on your profile. <span className="font-semibold text-blue-300">This is not a medical diagnosis. Always consult a certified doctor.</span></p>
            <form onSubmit={handleDiagnosisSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-200 mb-2">Symptoms</label>
                <Textarea
                  name="symptoms"
                  value={diagnosisInput.symptoms}
                  onChange={handleDiagnosisInputChange}
                  required
                  placeholder="Describe your symptoms..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-200 mb-2">Duration</label>
                <Input
                  name="duration"
                  value={diagnosisInput.duration}
                  onChange={handleDiagnosisInputChange}
                  required
                  placeholder="e.g. 2 days, 1 week"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-200 mb-2">Known Conditions</label>
                <Input
                  value={knownConditions}
                  readOnly
                  className="bg-white/10 text-slate-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-200 mb-2">Current Medications</label>
                <Input
                  value={medications}
                  readOnly
                  className="bg-white/10 text-slate-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-200 mb-2">Allergies</label>
                <Input
                  value={allergies}
                  readOnly
                  className="bg-white/10 text-slate-200"
                />
              </div>
              <Button
                type="submit"
                variant="gradient"
                size="xl"
                className="w-full"
                disabled={diagnosisLoading}
              >
                {diagnosisLoading ? 'Analyzing...' : 'Get AI Suggestion'}
              </Button>
              {diagnosisResult && (
                <div className="mt-8 p-6 bg-blue-900/30 border border-blue-500/30 rounded-xl text-white">
                  <div className="mb-2 font-semibold text-blue-300">AI Suggestion:</div>
                  <div className="whitespace-pre-line text-lg">{diagnosisResult}</div>
                  <div className="mt-4 text-xs text-blue-200 italic">
                    This is not a medical diagnosis. Always consult a certified doctor.
                  </div>
                </div>
              )}
              {aiError && (
                <div className="mt-6 p-4 bg-red-500/20 border border-red-500/50 rounded-xl flex items-center">
                  <AlertCircle className="w-5 h-5 text-red-400 mr-3" />
                  <span className="text-red-400">{aiError}</span>
                </div>
              )}
            </form>
          </FormSection>
        </div>
      </div>
    </div>
  )
}
