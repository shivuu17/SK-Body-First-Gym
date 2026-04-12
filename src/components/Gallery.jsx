import { useState } from 'react'

const Gallery = () => {
  const [activeFilter, setActiveFilter] = useState('all')
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImage, setCurrentImage] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  const images = [
    { src: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800", category: "workout", caption: "Modern Workout Area" },
    { src: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=800", category: "machines", caption: "Premium Equipment" },
    { src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800", category: "trainers", caption: "Expert Trainers" },
    { src: "https://images.unsplash.com/photo-1549576490-b0b4831ef60a?w=800", category: "members", caption: "Active Members" },
    { src: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800", category: "workout", caption: "Cardio Zone" },
    { src: "https://images.unsplash.com/photo-1574680178050-55c6a6a96e0a?w=800", category: "machines", caption: "State-of-the-art Machines" },
    { src: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800", category: "events", caption: "Fitness Events" },
    { src: "https://images.unsplash.com/photo-1519505907962-0a6cb0167c73?w=800", category: "workout", caption: "CrossFit Area" },
    { src: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800", category: "members", caption: "Personal Training" }
  ]

  const filteredImages = activeFilter === 'all' 
    ? images 
    : images.filter(img => img.category === activeFilter)

  const openLightbox = (image, index) => {
    setCurrentImage(image)
    setCurrentIndex(index)
    setLightboxOpen(true)
    document.body.style.overflow = 'hidden'
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
    setCurrentImage(null)
    document.body.style.overflow = 'auto'
  }

  const nextImage = () => {
    const nextIndex = (currentIndex + 1) % filteredImages.length
    setCurrentIndex(nextIndex)
    setCurrentImage(filteredImages[nextIndex])
  }

  const prevImage = () => {
    const prevIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length
    setCurrentIndex(prevIndex)
    setCurrentImage(filteredImages[prevIndex])
  }

  return (
    <section id="gallery" className="gallery-section">
      <div className="container-fluid">
        <div className="section-header">
          <span className="section-tag">Our Space</span>
          <h2 className="section-title">GYM <span className="neon-text">GALLERY</span></h2>
          <div className="title-underline"></div>
        </div>

        <div className="gallery-quote-strip">
          <i className="fas fa-quote-left"></i>
          <p>"Your body can stand almost anything. It's your mind you have to convince."</p>
          <i className="fas fa-quote-right"></i>
        </div>

        <div className="gallery-filters">
          <button 
            className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => setActiveFilter('all')}
          >
            All
          </button>
          <button 
            className={`filter-btn ${activeFilter === 'workout' ? 'active' : ''}`}
            onClick={() => setActiveFilter('workout')}
          >
            Workout Area
          </button>
          <button 
            className={`filter-btn ${activeFilter === 'machines' ? 'active' : ''}`}
            onClick={() => setActiveFilter('machines')}
          >
            Machines
          </button>
          <button 
            className={`filter-btn ${activeFilter === 'trainers' ? 'active' : ''}`}
            onClick={() => setActiveFilter('trainers')}
          >
            Trainers
          </button>
          <button 
            className={`filter-btn ${activeFilter === 'members' ? 'active' : ''}`}
            onClick={() => setActiveFilter('members')}
          >
            Members
          </button>
          <button 
            className={`filter-btn ${activeFilter === 'events' ? 'active' : ''}`}
            onClick={() => setActiveFilter('events')}
          >
            Events
          </button>
        </div>

        <div className="gallery-grid">
          {filteredImages.map((image, index) => (
            <div 
              key={index} 
              className="gallery-item"
              onClick={() => openLightbox(image, index)}
            >
              <img src={image.src} alt={image.caption} />
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="lightbox active" onClick={closeLightbox}>
          <span className="lightbox-close" onClick={closeLightbox}>&times;</span>
          <img 
            className="lightbox-img" 
            src={currentImage?.src} 
            alt={currentImage?.caption}
            onClick={(e) => e.stopPropagation()}
          />
          <div className="lightbox-caption">{currentImage?.caption}</div>
          <button 
            className="lightbox-prev" 
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
          >
            <i className="fas fa-chevron-left"></i>
          </button>
          <button 
            className="lightbox-next" 
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
          >
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      )}
    </section>
  )
}

export default Gallery
