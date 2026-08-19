import { useState } from 'react'
import { login } from '../api/auth'
import { Lock, Mail, ArrowRight } from 'lucide-react'

export default function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      await login(email, password)
      onLoginSuccess()
    } catch (err) {
      setError(err.message || 'Login failed. Please check credentials.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 bg-[#0b1014]">
      <div className="w-full max-w-md bg-[#141a21] border border-gray-800 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl">
        <div className="text-center mb-6 sm:mb-8">
          <div className="w-12 h-12 rounded-2xl bg-[#00df8f] mx-auto flex items-center justify-center font-bold text-[#0b1014] text-xl mb-4 shadow-lg shadow-[#00df8f]/20">
            IA
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Admin Portal</h1>
          <p className="text-xs text-gray-400 mt-1">Sign in to manage your portfolio content live</p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Email Address</label>
            <div className="relative">
              <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@imadh.me"
                className="w-full bg-[#0b1014] border border-gray-800 rounded-xl py-3 pl-11 pr-4 text-base sm:text-sm text-white focus:outline-none focus:border-[#00df8f] transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Password</label>
            <div className="relative">
              <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#0b1014] border border-gray-800 rounded-xl py-3 pl-11 pr-4 text-base sm:text-sm text-white focus:outline-none focus:border-[#00df8f] transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-[#00df8f] hover:bg-[#00b373] text-[#0b1014] font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#00df8f]/20 disabled:opacity-50"
          >
            <span>{loading ? 'Authenticating...' : 'Sign In'}</span>
            <ArrowRight size={16} />
          </button>
        </form>
      </div>
    </div>
  )
}
