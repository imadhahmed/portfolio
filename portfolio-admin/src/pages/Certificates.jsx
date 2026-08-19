import { useState, useEffect } from 'react'
import { fetchAllCertificates, createCertificate, updateCertificate, deleteCertificate } from '../api/certificates'
import Modal from '../components/Modal'
import { Plus, Edit2, Trash2, ShieldCheck } from 'lucide-react'

export default function Certificates() {
  const [certificates, setCertificates] = useState([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingCert, setEditingCert] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  // Form states
  const [title, setTitle] = useState('')
  const [issuer, setIssuer] = useState('')
  const [category, setCategory] = useState('Certification')
  const [description, setDescription] = useState('')
  const [tags, setTags] = useState('')
  const [credentialUrl, setCredentialUrl] = useState('')
  const [status, setStatus] = useState('published')
  const [displayOrder, setDisplayOrder] = useState(0)
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState('')

  const loadCertificates = async () => {
    setLoading(true)
    try {
      const res = await fetchAllCertificates()
      if (res && res.data) {
        setCertificates(res.data)
      }
    } catch (err) {
      console.warn('Load certificates warning:', err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadCertificates()
  }, [])

  const openCreateModal = () => {
    setEditingCert(null)
    setTitle('')
    setIssuer('')
    setCategory('Certification')
    setDescription('')
    setTags('')
    setCredentialUrl('')
    setStatus('published')
    setDisplayOrder(0)
    setImageFile(null)
    setImagePreview('')
    setIsModalOpen(true)
  }

  const openEditModal = (cert) => {
    setEditingCert(cert)
    setTitle(cert.title || '')
    setIssuer(cert.issuer || '')
    setCategory(cert.category || 'Certification')
    setDescription(cert.description || '')
    setTags(Array.isArray(cert.tags) ? cert.tags.join(', ') : cert.tags || '')
    setCredentialUrl(cert.credentialUrl || '')
    setStatus(cert.status || 'published')
    setDisplayOrder(cert.displayOrder ?? 0)
    setImageFile(null)
    setImagePreview(typeof cert.image === 'string' ? cert.image : cert.image?.url || '')
    setIsModalOpen(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const formData = new FormData()
      formData.append('title', title)
      formData.append('issuer', issuer)
      formData.append('category', category)
      formData.append('description', description)
      const tagsArray = tags.split(',').map((t) => t.trim()).filter(Boolean)
      formData.append('tags', JSON.stringify(tagsArray))
      formData.append('credentialUrl', credentialUrl)
      formData.append('status', status)
      formData.append('displayOrder', displayOrder)

      if (imageFile) {
        formData.append('image', imageFile)
      }

      if (editingCert) {
        await updateCertificate(editingCert._id || editingCert.id, formData)
      } else {
        await createCertificate(formData)
      }

      setIsModalOpen(false)
      loadCertificates()
    } catch (err) {
      alert(`Error saving certificate: ${err.message}`)
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this certificate? It will be removed from imadh.me immediately.')) {
      try {
        await deleteCertificate(id)
        loadCertificates()
      } catch (err) {
        alert(`Error deleting certificate: ${err.message}`)
      }
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Certificates & Credentials</h2>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">Manage accredited certificates and awards live on imadh.me</p>
        </div>
        <button
          onClick={openCreateModal}
          className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#00df8f] text-[#0b1014] font-bold text-sm hover:bg-[#00b373] transition-colors shadow-lg shadow-[#00df8f]/20 w-full sm:w-auto shrink-0"
        >
          <Plus size={18} />
          <span>+ Add New Certificate</span>
        </button>
      </div>

      {/* Mobile Card List View (Visible on < sm) */}
      <div className="block sm:hidden space-y-4">
        {loading ? (
          <div className="p-8 text-center text-gray-500 bg-[#141a21] border border-gray-800 rounded-2xl">
            Loading certificates...
          </div>
        ) : certificates.length === 0 ? (
          <div className="p-8 text-center text-gray-500 bg-[#141a21] border border-gray-800 rounded-2xl">
            No certificates found. Click "+ Add New Certificate" above.
          </div>
        ) : (
          certificates.map((cert) => (
            <div key={cert._id || cert.id} className="p-4 bg-[#141a21] border border-gray-800 rounded-2xl space-y-3">
              <div className="flex items-start gap-3">
                <img
                  src={typeof cert.image === 'string' ? cert.image : cert.image?.url}
                  alt={cert.title}
                  className="w-14 h-14 rounded-xl object-cover border border-gray-800 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-bold text-white text-base truncate">{cert.title}</h3>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 shrink-0">
                      {cert.status}
                    </span>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-gray-800 text-gray-300 border border-gray-700 shrink-0">
                      Order: #{cert.displayOrder ?? 0}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 font-semibold mt-0.5">{cert.issuer}</p>
                  {cert.category && (
                    <span className="inline-block text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-white/5 border border-gray-700 text-gray-300 mt-1">
                      {cert.category}
                    </span>
                  )}
                </div>
              </div>

              {cert.description && (
                <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">{cert.description}</p>
              )}

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-800/60">
                <button
                  onClick={() => openEditModal(cert)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-blue-400 bg-blue-500/10 border border-blue-500/20"
                >
                  <Edit2 size={14} />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDelete(cert._id || cert.id)}
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

      {/* Desktop Certificates Table View (Visible on >= sm) */}
      <div className="hidden sm:block bg-[#141a21] border border-gray-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-300">
            <thead className="bg-[#0f151b] text-xs uppercase tracking-wider text-gray-400 border-b border-gray-800">
              <tr>
                <th className="py-4 px-6">Order</th>
                <th className="py-4 px-6">Certificate</th>
                <th className="py-4 px-6">Issuer</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/60">
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-gray-500">Loading certificates...</td>
                </tr>
              ) : certificates.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-gray-500">No certificates found. Click "+ Add New Certificate" above.</td>
                </tr>
              ) : (
                certificates.map((cert) => (
                  <tr key={cert._id || cert.id} className="hover:bg-white/5 transition-colors">
                    <td className="py-4 px-6">
                      <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-gray-800 text-gray-300 border border-gray-700">
                        #{cert.displayOrder ?? 0}
                      </span>
                    </td>
                    <td className="py-4 px-6 flex items-center gap-4">
                      <img
                        src={typeof cert.image === 'string' ? cert.image : cert.image?.url}
                        alt={cert.title}
                        className="w-12 h-12 rounded-xl object-cover border border-gray-800 shrink-0"
                      />
                      <div>
                        <p className="font-bold text-white text-base">{cert.title}</p>
                        <p className="text-xs text-gray-500 line-clamp-1">{cert.category}</p>
                      </div>
                    </td>
                    <td className="py-4 px-6 font-semibold text-gray-300">{cert.issuer}</td>
                    <td className="py-4 px-6">
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                        {cert.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditModal(cert)}
                          className="p-2 rounded-lg text-blue-400 hover:bg-blue-500/10 transition-colors"
                          title="Edit Certificate"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(cert._id || cert.id)}
                          className="p-2 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors"
                          title="Delete Certificate"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingCert ? 'Edit Current Certificate' : 'Upload New Certificate'}>
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-gray-400 mb-1">Title</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Deep Learning Specialization"
                className="w-full bg-[#0b1014] border border-gray-800 rounded-xl p-3 text-base sm:text-sm text-white focus:outline-none focus:border-[#00df8f]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase text-gray-400 mb-1">Issuer</label>
              <input
                type="text"
                required
                value={issuer}
                onChange={(e) => setIssuer(e.target.value)}
                placeholder="e.g. Coursera / Meta / Google"
                className="w-full bg-[#0b1014] border border-gray-800 rounded-xl p-3 text-base sm:text-sm text-white focus:outline-none focus:border-[#00df8f]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-gray-400 mb-1">Description</label>
            <textarea
              required
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Summary of skills acquired..."
              className="w-full bg-[#0b1014] border border-gray-800 rounded-xl p-3 text-base sm:text-sm text-white focus:outline-none focus:border-[#00df8f]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-gray-400 mb-1">Display Order</label>
              <input
                type="number"
                value={displayOrder}
                onChange={(e) => setDisplayOrder(parseInt(e.target.value) || 0)}
                placeholder="0 (Lower numbers appear first)"
                className="w-full bg-[#0b1014] border border-gray-800 rounded-xl p-3 text-base sm:text-sm text-white focus:outline-none focus:border-[#00df8f]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase text-gray-400 mb-1">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full bg-[#0b1014] border border-gray-800 rounded-xl p-3 text-base sm:text-sm text-white focus:outline-none focus:border-[#00df8f]"
              >
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-gray-400 mb-1">Category</label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="e.g. Artificial Intelligence"
                className="w-full bg-[#0b1014] border border-gray-800 rounded-xl p-3 text-base sm:text-sm text-white focus:outline-none focus:border-[#00df8f]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase text-gray-400 mb-1">Credential URL</label>
              <input
                type="url"
                value={credentialUrl}
                onChange={(e) => setCredentialUrl(e.target.value)}
                placeholder="https://..."
                className="w-full bg-[#0b1014] border border-gray-800 rounded-xl p-3 text-base sm:text-sm text-white focus:outline-none focus:border-[#00df8f]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-gray-400 mb-1">Certificate Image {editingCert ? '(Leave empty to keep current)' : ''}</label>
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
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-gray-700 text-sm font-semibold text-gray-300 hover:bg-white/5"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#00df8f] text-[#0b1014] font-bold text-sm hover:bg-[#00b373] transition-colors disabled:opacity-50"
            >
              {submitting ? 'Saving...' : editingCert ? 'Save Changes' : 'Upload Certificate'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
