import { useState, useEffect } from 'react'
import { fetchAllAchievements, createAchievement, updateAchievement, deleteAchievement } from '../api/achievements'
import Modal from '../components/Modal'
import { Plus, Edit2, Trash2, Trophy } from 'lucide-react'

export default function Achievements() {
  const [achievements, setAchievements] = useState([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingAch, setEditingAch] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  const [title, setTitle] = useState('')
  const [organization, setOrganization] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')
  const [credentialUrl, setCredentialUrl] = useState('')
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState('')

  const loadAchievements = async () => {
    setLoading(true)
    try {
      const res = await fetchAllAchievements()
      if (res && res.data) setAchievements(res.data)
    } catch (err) {
      console.warn('Load achievements warning:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadAchievements()
  }, [])

  const openCreateModal = () => {
    setEditingAch(null)
    setTitle('')
    setOrganization('')
    setDescription('')
    setDate('')
    setCredentialUrl('')
    setImageFile(null)
    setImagePreview('')
    setIsModalOpen(true)
  }

  const openEditModal = (ach) => {
    setEditingAch(ach)
    setTitle(ach.title || '')
    setOrganization(ach.organization || '')
    setDescription(ach.description || '')
    setDate(ach.date || '')
    setCredentialUrl(ach.credentialUrl || '')
    setImageFile(null)
    setImagePreview(typeof ach.image === 'string' ? ach.image : ach.image?.url || '')
    setIsModalOpen(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const formData = new FormData()
      formData.append('title', title)
      formData.append('organization', organization)
      formData.append('description', description)
      formData.append('date', date)
      formData.append('credentialUrl', credentialUrl)

      if (imageFile) formData.append('image', imageFile)

      if (editingAch) {
        await updateAchievement(editingAch._id || editingAch.id, formData)
      } else {
        await createAchievement(formData)
      }

      setIsModalOpen(false)
      loadAchievements()
    } catch (err) {
      alert(`Error saving achievement: ${err.message}`)
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (id) => {
    if (confirm('Delete this achievement entry?')) {
      try {
        await deleteAchievement(id)
        loadAchievements()
      } catch (err) {
        alert(`Error deleting: ${err.message}`)
      }
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Achievements & Awards</h2>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">Manage competitions, hackathons, and leadership honors live on imadh.me</p>
        </div>
        <button
          onClick={openCreateModal}
          className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#00df8f] text-[#0b1014] font-bold text-sm hover:bg-[#00b373] transition-colors shadow-lg shadow-[#00df8f]/20 w-full sm:w-auto shrink-0"
        >
          <Plus size={18} />
          <span>+ Add New Achievement</span>
        </button>
      </div>

      {/* Mobile Card List View (Visible on < sm) */}
      <div className="block sm:hidden space-y-4">
        {loading ? (
          <div className="p-8 text-center text-gray-500 bg-[#141a21] border border-gray-800 rounded-2xl">
            Loading achievements...
          </div>
        ) : achievements.length === 0 ? (
          <div className="p-8 text-center text-gray-500 bg-[#141a21] border border-gray-800 rounded-2xl">
            No achievements recorded yet. Click "+ Add New Achievement".
          </div>
        ) : (
          achievements.map((ach) => (
            <div key={ach._id || ach.id} className="p-4 bg-[#141a21] border border-gray-800 rounded-2xl space-y-3">
              <div className="flex items-start gap-3">
                {ach.image && (typeof ach.image === 'string' ? ach.image : ach.image?.url) ? (
                  <img
                    src={typeof ach.image === 'string' ? ach.image : ach.image?.url}
                    alt={ach.title}
                    className="w-14 h-14 rounded-xl object-cover border border-gray-800 shrink-0"
                  />
                ) : (
                  <div className="w-14 h-14 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
                    <Trophy size={22} />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-white text-base truncate">{ach.title}</h3>
                  <p className="text-xs text-gray-400 font-semibold mt-0.5">{ach.organization}</p>
                </div>
              </div>

              {ach.description && (
                <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">{ach.description}</p>
              )}

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-800/60">
                <button
                  onClick={() => openEditModal(ach)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-blue-400 bg-blue-500/10 border border-blue-500/20"
                >
                  <Edit2 size={14} />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDelete(ach._id || ach.id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-red-400 bg-red-500/10 border border-red-500/20"
                >
                  <Trash2 size={14} />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Desktop Achievements Table View (Visible on >= sm) */}
      <div className="hidden sm:block bg-[#141a21] border border-gray-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-300">
            <thead className="bg-[#0f151b] text-xs uppercase tracking-wider text-gray-400 border-b border-gray-800">
              <tr>
                <th className="py-4 px-6">Achievement</th>
                <th className="py-4 px-6">Organization</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/60">
              {loading ? (
                <tr><td colSpan={3} className="py-8 text-center text-gray-500">Loading achievements...</td></tr>
              ) : achievements.length === 0 ? (
                <tr><td colSpan={3} className="py-8 text-center text-gray-500">No achievements recorded yet. Click "+ Add New Achievement".</td></tr>
              ) : (
                achievements.map((ach) => (
                  <tr key={ach._id || ach.id} className="hover:bg-white/5 transition-colors">
                    <td className="py-4 px-6 flex items-center gap-4">
                      {ach.image && (typeof ach.image === 'string' ? ach.image : ach.image?.url) ? (
                        <img
                          src={typeof ach.image === 'string' ? ach.image : ach.image?.url}
                          alt={ach.title}
                          className="w-12 h-12 rounded-xl object-cover border border-gray-800 shrink-0"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
                          <Trophy size={20} />
                        </div>
                      )}
                      <div>
                        <p className="font-bold text-white text-base">{ach.title}</p>
                        <p className="text-xs text-gray-500 line-clamp-1">{ach.description}</p>
                      </div>
                    </td>
                    <td className="py-4 px-6 font-semibold text-gray-300">{ach.organization}</td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => openEditModal(ach)} className="p-2 text-blue-400 hover:bg-blue-500/10 rounded-lg"><Edit2 size={16} /></button>
                        <button onClick={() => handleDelete(ach._id || ach.id)} className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg"><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingAch ? 'Edit Achievement' : 'Add New Achievement'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-gray-400 mb-1">Title</label>
              <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Bitcode v5.0 Winner" className="w-full bg-[#0b1014] border border-gray-800 rounded-xl p-3 text-base sm:text-sm text-white focus:outline-none focus:border-[#00df8f]" />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase text-gray-400 mb-1">Organization / Host</label>
              <input type="text" required value={organization} onChange={(e) => setOrganization(e.target.value)} placeholder="e.g. University Coding Society" className="w-full bg-[#0b1014] border border-gray-800 rounded-xl p-3 text-base sm:text-sm text-white focus:outline-none focus:border-[#00df8f]" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-gray-400 mb-1">Description</label>
            <textarea required rows={3} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Overview of the award, competition results, or honor..." className="w-full bg-[#0b1014] border border-gray-800 rounded-xl p-3 text-base sm:text-sm text-white focus:outline-none focus:border-[#00df8f]" />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-gray-400 mb-1">Credential / Proof URL (Optional)</label>
            <input type="url" value={credentialUrl} onChange={(e) => setCredentialUrl(e.target.value)} placeholder="https://..." className="w-full bg-[#0b1014] border border-gray-800 rounded-xl p-3 text-base sm:text-sm text-white focus:outline-none focus:border-[#00df8f]" />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-gray-400 mb-1">Achievement Image / Certificate Photo {editingAch ? '(Optional: Leave empty to keep current)' : '(Optional)'}</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0]
                if (file) {
                  setImageFile(file)
                  setImagePreview(URL.createObjectURL(file))
                }
              }}
              className="w-full text-xs text-gray-400 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-[#00df8f]/10 file:text-[#00df8f] hover:file:bg-[#00df8f]/20 cursor-pointer"
            />
            {imagePreview && (
              <img src={imagePreview} alt="Preview" className="mt-3 w-full h-36 object-cover rounded-xl border border-gray-800" />
            )}
          </div>

          <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-4 border-t border-gray-800">
            <button type="button" onClick={() => setIsModalOpen(false)} className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-gray-700 text-sm font-semibold text-gray-300 hover:bg-white/5">Cancel</button>
            <button type="submit" disabled={submitting} className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#00df8f] text-[#0b1014] font-bold text-sm hover:bg-[#00b373] disabled:opacity-50 transition-colors">{submitting ? 'Saving...' : editingAch ? 'Save Changes' : 'Upload Achievement'}</button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
