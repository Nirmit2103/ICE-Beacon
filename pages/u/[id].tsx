'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { AlertTriangle, Heart, Phone, User, Calendar, Droplets, LogIn, Shield, BadgeCheck } from 'lucide-react'
import Button from '@/components/ui/button'
import InfoCard from '@/components/ui/InfoCard'
import { db } from '@/firebase/firebaseConfig'
import { doc, getDoc } from 'firebase/firestore'

interface EmergencyProfile {
  fullName: string
  age: string
  bloodGroup: string
  knownConditions: string
  emergencyContact: string
}

export default function EmergencyView() {
  const router = useRouter()
  const { id } = router.query
  const [profile, setProfile] = useState<EmergencyProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (id) {
      fetchEmergencyProfile(id as string)
    }
    // eslint-disable-next-line
  }, [id])

  const fetchEmergencyProfile = async (profileId: string) => {
    setLoading(true)
    setError('')
    try {
      const docRef = doc(db, 'users', profileId)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        const data = docSnap.data()
        // Only pick public fields
        const publicProfile: EmergencyProfile = {
          fullName: data.fullName || '',
          age: data.age || '',
          bloodGroup: data.bloodGroup || '',
          knownConditions: data.knownConditions || '',
          emergencyContact: data.emergencyContact || ''
        }
        setProfile(publicProfile)
      } else {
        setError('Profile not found')
      }
    } catch (err) {
      setError('Profile not found')
    } finally {
      setLoading(false)
    }
  }

  const callEmergencyContact = () => {
    if (profile?.emergencyContact) {
      window.location.href = `tel:${profile.emergencyContact}`
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
          <p className="text-white">Loading emergency profile...</p>
        </div>
      </div>
    )
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-2">Profile Not Found</h1>
          <p className="text-slate-300 mb-6">The emergency profile you're looking for doesn't exist.</p>
          <Link href="/">
            <Button>Go Home</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Emergency Header */}
        <div className="bg-red-600/20 border border-red-500/50 rounded-2xl p-6 mb-8 flex flex-col items-center">
          <div className="flex items-center justify-center mb-4">
            <AlertTriangle className="w-12 h-12 text-red-400" />
          </div>
          <h1 className="text-2xl font-bold text-white text-center mb-2 flex items-center justify-center gap-2">
            EMERGENCY MEDICAL INFORMATION
            <span className="inline-flex items-center px-3 py-1 ml-2 rounded-full bg-green-600/20 border border-green-500/50 text-green-400 text-xs font-semibold">
              <BadgeCheck className="w-4 h-4 mr-1" /> Verified Info
            </span>
          </h1>
          <p className="text-slate-300 text-center">
            This information is provided for emergency medical purposes only
          </p>
        </div>

        {/* Profile Information */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-slate-700 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <InfoCard
              icon={<User className="w-6 h-6 text-blue-400" />}
              title="Full Name"
              description={profile.fullName}
              className="bg-slate-700/50"
            />
            <InfoCard
              icon={<Calendar className="w-6 h-6 text-green-400" />}
              title="Age"
              description={`${profile.age} years old`}
              className="bg-slate-700/50"
            />
            <InfoCard
              icon={<Droplets className="w-6 h-6 text-red-400" />}
              title="Blood Group"
              description={profile.bloodGroup}
              className="bg-slate-700/50"
            />
          </div>

          {/* Medical Conditions */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <Heart className="w-5 h-5 mr-2 text-red-400" />
              Known Medical Conditions & Allergies
            </h3>
            <div className="bg-slate-700/50 rounded-lg p-6">
              <p className="text-white text-lg leading-relaxed">
                {profile.knownConditions || 'No known conditions reported'}
              </p>
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="bg-green-600/20 border border-green-500/50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <Phone className="w-5 h-5 mr-2 text-green-400" />
              Emergency Contact
            </h3>
            <div className="flex items-center justify-between">
              <p className="text-white text-lg">{profile.emergencyContact}</p>
              <Button
                onClick={callEmergencyContact}
                className="bg-green-600 hover:bg-green-700"
              >
                <Phone className="w-4 h-4 mr-2" />
                Call Now
              </Button>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-slate-700 text-center">
          <Shield className="w-10 h-10 text-blue-400 mx-auto mb-2" />
          <p className="text-slate-300 mb-2">
            <span className="font-semibold text-white">Disclaimer:</span> For emergency use only. Full records require secure login by authorized healthcare professionals.
          </p>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-slate-400">
          <p className="text-sm">
            This emergency profile is provided by Emergency NFC Healthcare System
          </p>
        </div>
      </div>
    </div>
  )
}