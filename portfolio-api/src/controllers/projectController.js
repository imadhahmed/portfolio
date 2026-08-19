import { Project } from '../models/Project.js'
import { uploadToCloudinary, deleteFromCloudinary } from '../services/cloudinaryService.js'

export async function getProjects(req, res) {
  try {
    const projects = await Project.find({ status: 'published' }).sort({ displayOrder: 1, createdAt: -1 })
    res.json({ success: true, data: projects })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

export async function getAllProjectsAdmin(req, res) {
  try {
    const projects = await Project.find().sort({ displayOrder: 1, createdAt: -1 })
    res.json({ success: true, data: projects })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

export async function createProject(req, res) {
  try {
    const { title, description, category, githubUrl, liveUrl, technologies, color, featured, status, displayOrder, imageUrl: bodyImageUrl } = req.body
    
    let imageUrl = bodyImageUrl || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop'
    let publicId = null

    if (req.file) {
      try {
        const uploadRes = await uploadToCloudinary(req.file.buffer, 'portfolio/projects')
        imageUrl = uploadRes.url
        publicId = uploadRes.publicId
      } catch (uploadErr) {
        console.warn('[Cloudinary Warning] Upload failed, falling back to default image:', uploadErr.message)
      }
    }

    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') || `project-${Date.now()}`

    const parsedTechnologies = typeof technologies === 'string' ? JSON.parse(technologies) : (technologies || [])

    const project = await Project.create({
      title,
      slug,
      category: category || 'Web Development',
      description,
      technologies: parsedTechnologies,
      image: { url: imageUrl, publicId },
      githubUrl,
      liveUrl,
      color: color || '#00df8f',
      featured: featured === 'true' || featured === true,
      status: status || 'published',
      displayOrder: displayOrder ? parseInt(displayOrder) : 0,
    })

    res.status(201).json({ success: true, data: project })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

export async function updateProject(req, res) {
  try {
    const { id } = req.params
    const project = await Project.findById(id)
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' })
    }

    const { title, description, category, githubUrl, liveUrl, technologies, color, featured, status, displayOrder, imageUrl: bodyImageUrl } = req.body

    if (title) project.title = title
    if (description) project.description = description
    if (category) project.category = category
    if (githubUrl !== undefined) project.githubUrl = githubUrl
    if (liveUrl !== undefined) project.liveUrl = liveUrl
    if (color) project.color = color
    if (featured !== undefined) project.featured = featured === 'true' || featured === true
    if (status) project.status = status
    if (displayOrder !== undefined) project.displayOrder = parseInt(displayOrder)
    if (technologies) {
      project.technologies = typeof technologies === 'string' ? JSON.parse(technologies) : technologies
    }
    if (bodyImageUrl) {
      project.image = { ...project.image, url: bodyImageUrl }
    }

    if (req.file) {
      try {
        if (project.image && project.image.publicId) {
          await deleteFromCloudinary(project.image.publicId)
        }
        const uploadRes = await uploadToCloudinary(req.file.buffer, 'portfolio/projects')
        project.image = { url: uploadRes.url, publicId: uploadRes.publicId }
      } catch (uploadErr) {
        console.warn('[Cloudinary Warning] Update image upload failed:', uploadErr.message)
      }
    }

    await project.save()
    res.json({ success: true, data: project })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

export async function deleteProject(req, res) {
  try {
    const { id } = req.params
    const project = await Project.findById(id)
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' })
    }

    if (project.image && project.image.publicId) {
      await deleteFromCloudinary(project.image.publicId)
    }

    await Project.findByIdAndDelete(id)
    res.json({ success: true, message: 'Project deleted successfully' })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}
