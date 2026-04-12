import { useState } from 'react'

const Gallery = () => {
  const [activeFilter, setActiveFilter] = useState('all')
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImage, setCurrentImage] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  const images = [
    { src: "/assets/gallery/workout/8.jpeg", category: "workout", caption: "Modern Workout Area" },  
    { src: "/assets/gallery/workout/9.jpeg", category: "workout", caption: "Modern Workout Area" },
    { src: "/assets/gallery/workout/10.jpeg", category: "workout", caption: "Modern Workout Area" },
    { src: "/assets/gallery/workout/14.jpeg", category: "workout", caption: "Modern Workout Area" },
    { src: "/assets/gallery/workout/15.jpeg", category: "workout", caption: "Modern Workout Area" },
    { src: "/assets/gallery/workout/1.j.jpeg", category: "workout", caption: "CrossFit Area" },
    { src: "/assets/gallery/workout/2.jpeg", category: "workout", caption: "Cardio Zone" },
    { src: "/assets/gallery/machines/17.jpeg", category: "machines", caption: "Premium Equipment" },
    { src: "/assets/gallery/machines/13.jpeg", category: "machines", caption: "Premium Equipment" },
    { src: "/assets/gallery/machines/7.jpeg", category: "machines", caption: "Premium Equipment" },
    { src: "/assets/gallery/machines/12.jpeg", category: "machines", caption: "Premium Equipment" },
    { src: "/assets/gallery/machines/5.jpeg", category: "machines", caption: "Premium Equipment" },
    { src: "/assets/gallery/machines/16.jpeg", category: "machines", caption: "Premium Equipment" },
    { src: "/assets/gallery/machines/6.jpeg", category: "machines", caption: "Premium Equipment" },
    
  

  ] 


  const filteredImages = activeFilter === 'all' ? images : images.filter(img => img.category === activeFilter)

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
          <button className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`} onClick={() => setActiveFilter('all')}>All</button>
          <button className={`filter-btn ${activeFilter === 'workout' ? 'active' : ''}`} onClick={() => setActiveFilter('workout')}>Workout Area</button>
          <button className={`filter-btn ${activeFilter === 'machines' ? 'active' : ''}`} onClick={() => setActiveFilter('machines')}>Machines</button>
          
        </div>

        <div className="gallery-grid">
          {filteredImages.map((image, index) => (
            <div key={index} className="gallery-item" onClick={() => openLightbox(image, index)}>
              <img src={image.src} alt={image.caption} />
            </div>
          ))}
        </div>

      </div>

      {lightboxOpen && (
        <div className="lightbox active" onClick={closeLightbox}>
          <span className="lightbox-close" onClick={closeLightbox}>&times;</span>
          <img className="lightbox-img" src={currentImage?.src} alt={currentImage?.caption} onClick={(e) => e.stopPropagation()} />
          <div className="lightbox-caption">{currentImage?.caption}</div>
          <button className="lightbox-prev" onClick={(e) => { e.stopPropagation(); prevImage(); }}>
            <i className="fas fa-chevron-left"></i>
          </button>
          <button className="lightbox-next" onClick={(e) => { e.stopPropagation(); nextImage(); }}>
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      )}
    </section>
  )
}

export default Gallery
