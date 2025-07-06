import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { auth, db } from '@/firebase/firebaseConfig'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { Input } from '@/components/ui/input'
import Button from '@/components/ui/Button'
import { AlertCircle, CheckCircle } from 'lucide-react'

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']

export default function ProfileEdit() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    knownConditions: '',
    emergencyContact: '',
    bloodGroup: '',
    chronicConditions: '',
    pastSurgeries: '',
    currentMedications: '',
    allergies: '',
    familyHistory: '',
    habits: '',
    covidHistory: '',
  })

  useEffect(() => {
    const fetchProfile = async () => {
      if (!auth.currentUser) {
        router.replace('/login')
        return
      }
      setLoading(true)
      setError('')
      try {
        const userDoc = await getDoc(doc(db, 'users', auth.currentUser.uid))
        if (userDoc.exists()) {
          const data = userDoc.data()
          setFormData({
            knownConditions: data.knownConditions || '',
            emergencyContact: data.emergencyContact || '',
            bloodGroup: data.bloodGroup || '',
            chronicConditions: data.chronicConditions || '',
            pastSurgeries: data.pastSurgeries || '',
            currentMedications: data.currentMedications || '',
            allergies: data.allergies || '',
            familyHistory: data.familyHistory || '',
            habits: data.habits || '',
            covidHistory: data.covidHistory || '',
          })
        } else {
          setError('Profile not found.')
        }
      } catch (err: any) {
        setError('Failed to load profile.')
      } finally {
        setLoading(false)
      }
    }
    fetchProfile()
  }, [router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setError('')
    setSuccess('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!auth.currentUser) {
      setError('Not authenticated.')
      return
    }
    if (!formData.emergencyContact.trim()) {
      setError('Emergency contact is required.')
      return
    }
    if (!formData.bloodGroup) {
      setError('Blood group is required.')
      return
    }
    setSaving(true)
    setError('')
    setSuccess('')
    try {
      await updateDoc(doc(db, 'users', auth.currentUser.uid), {
        knownConditions: formData.knownConditions,
        emergencyContact: formData.emergencyContact,
        bloodGroup: formData.bloodGroup,
        chronicConditions: formData.chronicConditions,
        pastSurgeries: formData.pastSurgeries,
        currentMedications: formData.currentMedications,
        allergies: formData.allergies,
        familyHistory: formData.familyHistory,
        habits: formData.habits,
        covidHistory: formData.covidHistory,
      })
      setSuccess('Profile updated successfully!')
    } catch (err: any) {
      setError('Failed to update profile.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="text-white text-xl">Loading profile...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-12">
      <div className="max-w-lg mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-white mb-8 text-center">Edit Profile</h1>
        <form onSubmit={handleSubmit} className="bg-slate-800/80 rounded-2xl p-8 shadow-2xl border border-slate-700 space-y-8">
          {error && (
            <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-xl flex items-center">
              <AlertCircle className="w-5 h-5 text-red-400 mr-3" />
              <span className="text-red-400">{error}</span>
            </div>
          )}
          {success && (
            <div className="p-4 bg-green-500/20 border border-green-500/50 rounded-xl flex items-center">
              <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
              <span className="text-green-400">{success}</span>
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Known Conditions & Allergies</label>
            <textarea
              name="knownConditions"
              value={formData.knownConditions}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-4 glass-effect rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 resize-none"
              placeholder="Enter any medical conditions, allergies, or medications"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Emergency Contact</label>
            <Input
              name="emergencyContact"
              type="tel"
              value={formData.emergencyContact}
              onChange={handleChange}
              required
              placeholder="+1 (555) 123-4567"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Blood Group</label>
            <select
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleChange}
              className="w-full px-4 py-4 glass-effect rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300"
              required
            >
              <option value="">Select blood group</option>
              {bloodGroups.map(group => (
                <option key={group} value={group} className="bg-gray-800">{group}</option>
              ))}
            </select>
          </div>
          <h2 className="text-xl font-semibold text-white mb-2 mt-6">Medical History</h2>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Chronic Conditions</label>
            <textarea
              name="chronicConditions"
              value={formData.chronicConditions}
              onChange={handleChange}
              rows={2}
              className="w-full px-4 py-3 glass-effect rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 resize-none"
              placeholder="E.g., Diabetes, Hypertension, Asthma"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Past Surgeries or Procedures</label>
            <textarea
              name="pastSurgeries"
              value={formData.pastSurgeries}
              onChange={handleChange}
              rows={2}
              className="w-full px-4 py-3 glass-effect rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 resize-none"
              placeholder="E.g., Appendix removal (2020), Knee surgery (2019)"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Current Medications</label>
            <textarea
              name="currentMedications"
              value={formData.currentMedications}
              onChange={handleChange}
              rows={2}
              className="w-full px-4 py-3 glass-effect rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 resize-none"
              placeholder="List all medications you currently take regularly"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Allergies</label>
            <textarea
              name="allergies"
              value={formData.allergies}
              onChange={handleChange}
              rows={2}
              className="w-full px-4 py-3 glass-effect rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 resize-none"
              placeholder="E.g., Penicillin, Peanuts, Latex"
            />
          </div>
          <h2 className="text-xl font-semibold text-white mb-2 mt-6">Family Background</h2>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Family Medical History</label>
            <textarea
              name="familyHistory"
              value={formData.familyHistory}
              onChange={handleChange}
              rows={2}
              className="w-full px-4 py-3 glass-effect rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 resize-none"
              placeholder="E.g., Father has diabetes, Mother has thyroid issues"
            />
          </div>
          <h2 className="text-xl font-semibold text-white mb-2 mt-6">Habits</h2>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Smoking/Alcohol Habits</label>
            <select
              name="habits"
              value={formData.habits}
              onChange={handleChange}
              className="w-full px-4 py-3 glass-effect rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300"
            >
              <option value="">Select</option>
              <option value="Smoker">Smoker</option>
              <option value="Non-Smoker">Non-Smoker</option>
              <option value="Occasionally">Occasionally</option>
              <option value="Never">Never</option>
            </select>
          </div>
          <h2 className="text-xl font-semibold text-white mb-2 mt-6">COVID-19 History</h2>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">COVID-19 History</label>
            <Input
              name="covidHistory"
              type="text"
              value={formData.covidHistory}
              onChange={handleChange}
              placeholder="Have you ever tested positive for COVID-19? If yes, when?"
            />
          </div>
          <Button
            type="submit"
            variant="gradient"
            size="xl"
            className="w-full"
            disabled={saving}
          >
            {saving ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                Saving...
              </>
            ) : (
              <>Save Changes</>
            )}
          </Button>
        </form>
      </div>
    </div>
  )
} 