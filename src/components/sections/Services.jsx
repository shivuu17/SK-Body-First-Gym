const Services = ({ onOpenJoinForm }) => {
  const services = [
    { icon: "dumbbell", title: "Weight Training", description: "Build muscle, increase strength, and sculpt your dream physique with our state-of-the-art equipment and expert guidance.", features: ["On-site sessions", "Expert trainers"], quote: "Strength grows in moments when you think you can't go on." },
    { icon: "heartbeat", title: "Cardio Training", description: "Boost your endurance, burn calories, and improve cardiovascular health with our dynamic cardio programs.", features: ["Indoor & outdoor", "All fitness levels"], quote: "The body achieves what the mind believes." },
    { icon: "fire", title: "CrossFit", description: "High-intensity functional training that combines strength, cardio, and flexibility for maximum results.", features: ["Group classes", "Competition prep"], quote: "Embrace the pain and you will win the game." },
    { icon: "weight", title: "Fat Loss Program", description: "Scientifically designed programs combining exercise and nutrition to help you shed pounds effectively.", features: ["Custom meal plans", "Progress tracking"], quote: "Your only limit is you." },
    { icon: "male", title: "Muscle Gain", description: "Targeted hypertrophy training and nutrition plans to help you build lean muscle mass efficiently.", features: ["Progressive overload", "Supplement guidance"], quote: "Muscles are built with consistency, not perfection." },
    { icon: "spa", title: "Yoga", description: "Find balance, flexibility, and inner peace through traditional and modern yoga practices.", features: ["Online classes", "Meditation included"], quote: "Yoga is the journey of the self, to the self, through the self." },
    { icon: "music", title: "Zumba", description: "Dance your way to fitness with high-energy Zumba sessions that make cardio fun and exciting.", features: ["Group sessions", "All ages welcome"], quote: "Dance like nobody's watching, sweat like everybody's jealous." },
    { icon: "user-tie", title: "Personal Training", description: "One-on-one customized training programs tailored to your specific goals, body type, and schedule.", features: ["1-on-1 attention", "Custom programs", "Online available"], quote: "Investment in yourself pays the best interest.", featured: true }
  ]

  const scrollToContact = () => {
    const element = document.getElementById('contact')
    if (element) {
      const offsetTop = element.offsetTop - 80
      window.scrollTo({ top: offsetTop, behavior: 'smooth' })
    }
  }

  return (
    <section id="services" className="services-section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">What We Offer</span>
          <h2 className="section-title">OUR <span className="neon-text">SERVICES</span></h2>
          <div className="title-underline"></div>
          <p className="section-desc">Choose from our comprehensive fitness programs designed for all levels</p>
        </div>

        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className={`service-card glass-card ${service.featured ? 'featured-service' : ''}`}>
              <div className="service-icon">
                <i className={`fas fa-${service.icon}`}></i>
              </div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <div className="service-features">
                {service.features.map((feature, idx) => (
                  <span key={idx}><i className="fas fa-check"></i> {feature}</span>
                ))}
              </div>
              <button onClick={onOpenJoinForm} className="service-btn glow-btn">Book Session</button>
              <div className="mini-quote">"{service.quote}"</div>
            </div>
          ))}
        </div>

        <div className="service-options glass-card">
          <h3>Flexible Training Options</h3>
          <div className="options-grid">
            <div className="option-item">
              <i className="fas fa-laptop"></i>
              <h4>Online Classes</h4>
              <p>Train from anywhere with live virtual sessions</p>
            </div>
            <div className="option-item">
              <i className="fas fa-tree"></i>
              <h4>Outdoor Services</h4>
              <p>Fresh air workouts and boot camps</p>
            </div>
            <div className="option-item">
              <i className="fas fa-building"></i>
              <h4>On-Site Services</h4>
              <p>Full access to premium gym facilities</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Services
