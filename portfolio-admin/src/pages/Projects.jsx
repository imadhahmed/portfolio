import { useState, useEffect } from 'react'
import { fetchAllProjects, createProject, updateProject, deleteProject } from '../api/projects'
import Modal from '../components/Modal'
import { Plus, Edit2, Trash2, ExternalLink } from 'lucide-react'

export default function Projects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProject, setEditingProject] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  // Form states
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('Web Development')
  const [description, setDescription] = useState('')
  const [technologies, setTechnologies] = useState('')
  const [githubUrl, setGithubUrl] = useState('')
  const [liveUrl, setLiveUrl] = useState('')
  const [status, setStatus] = useState('published')
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState('')

  const loadProjects = async () => {
    setLoading(true)
    try {
      const res = await fetchAllProjects()
      if (res && res.data) {
        setProjects(res.data)
      }
    } catch (err) {
      console.warn('Load projects warning:', err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadProjects()
  }, [])

  const openCreateModal = () => {
    setEditingProject(null)
    setTitle('')
    setCategory('Web Development')
    setDescription('')
    setTechnologies('React.js, JavaScript, Tailwind CSS')
    setGithubUrl('')
    setLiveUrl('')
    setStatus('published')
    setImageFile(null)
    setImagePreview('')
    setIsModalOpen(true)
  }

  const openEditModal = (proj) => {
    setEditingProject(proj)
    setTitle(proj.title || '')
    setCategory(proj.category || 'Web Development')
    setDescription(proj.description || '')
    setTechnologies(Array.isArray(proj.technologies) ? proj.technologies.join(', ') : proj.technologies || '')
    setGithubUrl(proj.githubUrl || '')
    setLiveUrl(proj.liveUrl || '')
    setStatus(proj.status || 'published')
    setImageFile(null)
    setImagePreview(typeof proj.image === 'string' ? proj.image : proj.image?.url || '')
    setIsModalOpen(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const formData = new FormData()
      formData.append('title', title)
      formData.append('category', category)
      formData.append('description', description)
      const techArray = technologies.split(',').map((t) => t.trim()).filter(Boolean)
      formData.append('technologies', JSON.stringify(techArray))
      formData.append('githubUrl', githubUrl)
      formData.append('liveUrl', liveUrl)
      formData.append('status', status)

      if (imageFile) {
        formData.append('image', imageFile)
      }

      if (editingProject) {
        await updateProject(editingProject._id || editingProject.id, formData)
      } else {
        await createProject(formData)
      }

      setIsModalOpen(false)
      loadProjects()
    } catch (err) {
      alert(`Error saving project: ${err.message}`)
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this project? It will be removed from imadh.me immediately.')) {
      try {
        await deleteProject(id)
        loadProjects()
      } catch (err) {
        alert(`Error deleting project: ${err.message}`)
      }
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Project Management</h2>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">Add, edit, or remove featured projects live on imadh.me</p>
        </div>
        <button
          onClick={openCreateModal}
          className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#00df8f] text-[#0b1014] font-bold text-sm hover:bg-[#00b373] transition-colors shadow-lg shadow-[#00df8f]/20 w-full sm:w-auto shrink-0"
        >
          <Plus size={18} />
          <span>+ Add New Project</span>
        </button>
      </div>

      {/* Mobile Card List View (Visible on < sm) */}
      <div className="block sm:hidden space-y-4">
        {loading ? (
          <div className="p-8 text-center text-gray-500 bg-[#141a21] border border-gray-800 rounded-2xl">
            Loading projects...
          </div>
        ) : projects.length === 0 ? (
          <div className="p-8 text-center text-gray-500 bg-[#141a21] border border-gray-800 rounded-2xl">
            No projects found. Click "+ Add New Project" above.
          </div>
        ) : (
          projects.map((proj) => (
            <div key={proj._id || proj.id} className="p-4 bg-[#141a21] border border-gray-800 rounded-2xl space-y-3">
              <div className="flex items-start gap-3">
                <img
                  src={typeof proj.image === 'string' ? proj.image : proj.image?.url}
                  alt={proj.title}
                  className="w-14 h-14 rounded-xl object-cover border border-gray-800 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-bold text-white text-base truncate">{proj.title}</h3>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0 ${
                      proj.status === 'published' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/30'
                    }`}>
                      {proj.status}
                    </span>
                  </div>
                  <span className="inline-block text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-white/5 border border-gray-700 text-gray-300 mt-1">
                    {proj.category}
                  </span>
                </div>
              </div>

              {proj.description && (
                <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">{proj.description}</p>
              )}

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-800/60">
                <button
                  onClick={() => openEditModal(proj)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-blue-400 bg-blue-500/10 border border-blue-500/20"
                >
                  <Edit2 size={14} />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDelete(proj._id || proj.id)}
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

      {/* Desktop Projects Table View (Visible on >= sm) */}
      <div className="hidden sm:block bg-[#141a21] border border-gray-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-300">
            <thead className="bg-[#0f151b] text-xs uppercase tracking-wider text-gray-400 border-b border-gray-800">
              <tr>
                <th className="py-4 px-6">Project</th>
                <th className="py-4 px-6">Category</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/60">
              {loading ? (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-gray-500">Loading projects...</td>
                </tr>
              ) : projects.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-gray-500">No projects found. Click "+ Add New Project" above.</td>
                </tr>
              ) : (
                projects.map((proj) => (
                  <tr key={proj._id || proj.id} className="hover:bg-white/5 transition-colors">
                    <td className="py-4 px-6 flex items-center gap-4">
                      <img
                        src={typeof proj.image === 'string' ? proj.image : proj.image?.url}
                        alt={proj.title}
                        className="w-12 h-12 rounded-xl object-cover border border-gray-800 shrink-0"
                      />
                      <div>
                        <p className="font-bold text-white text-base">{proj.title}</p>
                        <p className="text-xs text-gray-500 line-clamp-1 max-w-xs">{proj.description}</p>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/5 border border-gray-700 text-gray-300">
                        {proj.category}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                        proj.status === 'published' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/30'
                      }`}>
                        {proj.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditModal(proj)}
                          className="p-2 rounded-lg text-blue-400 hover:bg-blue-500/10 transition-colors"
                          title="Edit Project"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(proj._id || proj.id)}
                          className="p-2 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors"
                          title="Delete Project"
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

      {/* Add / Edit Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingProject ? 'Edit Current Project' : 'Upload New Project'}>
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-gray-400 mb-1">Project Title</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Smart Agriculture System"
                className="w-full bg-[#0b1014] border border-gray-800 rounded-xl p-3 text-base sm:text-sm text-white focus:outline-none focus:border-[#00df8f]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase text-gray-400 mb-1">Category</label>
              <input
                type="text"
                required
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="e.g. Web Development / AI"
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
              placeholder="Detailed description of your project..."
              className="w-full bg-[#0b1014] border border-gray-800 rounded-xl p-3 text-base sm:text-sm text-white focus:outline-none focus:border-[#00df8f]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-gray-400 mb-1">Technologies (Comma separated)</label>
            <input
              type="text"
              value={technologies}
              onChange={(e) => setTechnologies(e.target.value)}
              placeholder="React, Python, OpenCV, Tailwind CSS"
              className="w-full bg-[#0b1014] border border-gray-800 rounded-xl p-3 text-base sm:text-sm text-white focus:outline-none focus:border-[#00df8f]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-gray-400 mb-1">GitHub Repo URL</label>
              <input
                type="url"
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                placeholder="https://github.com/imadhahmed/..."
                className="w-full bg-[#0b1014] border border-gray-800 rounded-xl p-3 text-base sm:text-sm text-white focus:outline-none focus:border-[#00df8f]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase text-gray-400 mb-1">Live Demo URL</label>
              <input
                type="url"
                value={liveUrl}
                onChange={(e) => setLiveUrl(e.target.value)}
                placeholder="https://..."
                className="w-full bg-[#0b1014] border border-gray-800 rounded-xl p-3 text-base sm:text-sm text-white focus:outline-none focus:border-[#00df8f]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-gray-400 mb-1">Project Image {editingProject ? '(Leave empty to keep current)' : ''}</label>
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
              {submitting ? 'Saving...' : editingProject ? 'Save Changes' : 'Upload Project'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
