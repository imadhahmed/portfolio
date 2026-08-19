import { useState, useEffect } from 'react'
import { fetchSettings, uploadCV } from '../api/settings'
import { FileText, UploadCloud, CheckCircle2, Download, RefreshCw } from 'lucide-react'

export default function CV() {
  const [settings, setSettings] = useState(null)
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [successMessage, setSuccessMessage] = useState(null)

  const loadCVData = async () => {
    setLoading(true)
    try {
      const res = await fetchSettings()
      if (res && res.data) {
        setSettings(res.data)
      }
    } catch (err) {
      console.warn('Load settings warning:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadCVData()
  }, [])

  const handleFileChange = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    if (file.type !== 'application/pdf') {
      alert('Please select a valid PDF file.')
      return
    }

    setUploading(true)
    setSuccessMessage(null)

    try {
      const res = await uploadCV(file)
      setSuccessMessage('New CV uploaded successfully! All "Download CV" links on imadh.me now point to this updated file.')
      loadCVData()
    } catch (err) {
      alert(`CV upload failed: ${err.message}`)
    } finally {
      setUploading(false)
    }
  }

  const rawUrl = settings?.cv?.url
  const cvUrl = (rawUrl && rawUrl !== '#')
    ? (rawUrl.includes('cloudinary.com') && rawUrl.includes('/upload/') && !rawUrl.includes('fl_attachment') ? rawUrl.replace('/upload/', '/upload/fl_attachment/') : rawUrl)
    : '/CV.pdf'
  const cvFileName = settings?.cv?.fileName || 'CV.pdf'

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">CV Management</h2>
        <p className="text-xs sm:text-sm text-gray-400 mt-1">Upload a new resume PDF to instantly update the download link on imadh.me</p>
      </div>

      {successMessage && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center gap-3">
          <CheckCircle2 size={18} className="shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Current Active CV Status Card */}
      <div className="p-5 sm:p-6 rounded-2xl bg-[#141a21] border border-gray-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 shrink-0">
            <FileText size={24} className="sm:hidden" />
            <FileText size={28} className="hidden sm:block" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Current Active CV</p>
            <h3 className="text-base sm:text-lg font-bold text-white mt-0.5 truncate">{loading ? 'Loading...' : cvFileName}</h3>
            {settings?.cv?.updatedAt && (
              <p className="text-xs text-gray-500 mt-0.5">Last updated: {new Date(settings.cv.updatedAt).toLocaleDateString()}</p>
            )}
          </div>
        </div>

        <a
          href={cvUrl}
          target="_blank"
          rel="noopener noreferrer"
          download={cvFileName}
          className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white/5 border border-gray-700 text-xs font-bold text-white hover:border-[#00df8f] hover:text-[#00df8f] transition-all w-full sm:w-auto shrink-0"
        >
          <Download size={15} />
          <span>Download Current PDF</span>
        </a>
      </div>

      {/* Upload Dropzone */}
      <div className="p-6 sm:p-8 rounded-2xl bg-[#141a21] border-2 border-dashed border-gray-800 hover:border-[#00df8f]/50 transition-colors flex flex-col items-center justify-center text-center group">
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#00df8f]/10 border border-[#00df8f]/20 flex items-center justify-center text-[#00df8f] mb-4 group-hover:scale-110 transition-transform">
          {uploading ? <RefreshCw size={26} className="animate-spin" /> : <UploadCloud size={26} />}
        </div>
        <h4 className="font-bold text-white text-base">Upload New CV (PDF)</h4>
        <p className="text-xs text-gray-400 max-w-sm mt-1 mb-6 leading-relaxed">
          Selecting a new PDF will upload it to Cloudinary and update all download buttons across your portfolio instantly.
        </p>

        <label className="cursor-pointer w-full sm:w-auto">
          <input
            type="file"
            accept=".pdf,application/pdf"
            disabled={uploading}
            onChange={handleFileChange}
            className="hidden"
          />
          <span className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#00df8f] text-[#0b1014] font-bold text-xs hover:bg-[#00b373] transition-colors inline-flex items-center justify-center gap-2 shadow-lg shadow-[#00df8f]/20">
            <UploadCloud size={16} />
            <span>{uploading ? 'Uploading to Cloudinary...' : 'Select PDF File'}</span>
          </span>
        </label>
      </div>
    </div>
  )
}
