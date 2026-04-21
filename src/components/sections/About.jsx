import { useState, useEffect, useRef } from 'react'

const About = () => {
  const showTrainersSection = false
  const [counts, setCounts] = useState({
    members: 0,
    trainers: 0,
    years: 0,
    success: 0
  })
  const [hasAnimated, setHasAnimated] = useState(false)
  const statsRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          animateCounters()
          setHasAnimated(true)
        }
      },
      { threshold: 0.5 }
    )

    if (statsRef.current) {
      observer.observe(statsRef.current)
    }

    return () => observer.disconnect()
  }, [hasAnimated])

  const animateCounters = () => {
    const targets = { members: 500, trainers: 5, years: 10, success: 95 }
    const duration = 2000
    const steps = 60

    Object.keys(targets).forEach((key) => {
      const increment = targets[key] / steps
      let current = 0
      const timer = setInterval(() => {
        current += increment
        if (current >= targets[key]) {
          setCounts(prev => ({ ...prev, [key]: targets[key] }))
          clearInterval(timer)
        } else {
          setCounts(prev => ({ ...prev, [key]: Math.floor(current) }))
        }
      }, duration / steps)
    })
  }

  const coaches = [
    {
      name: "Rajesh Kumar",
      specialization: "Strength & Conditioning",
      description: "15+ years of bodybuilding expertise",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400"
    },
    {
      name: "Priya Sharma",
      specialization: "Yoga & Flexibility",
      description: "Certified yoga instructor & nutritionist",
      image: "https://images.unsplash.com/photo-1594381898411-846e7d193883?w=400"
    },
    {
      name: "Arjun Singh",
      specialization: "CrossFit & HIIT",
      description: "Champion athlete & fitness coach",
      image: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=400"
    },
    {
      name: "Neha Patel",
      specialization: "Zumba & Dance Fitness",
      description: "Energy, rhythm, and transformation",
      image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400"
    }
  ]

  const mainProfiles = [
    {
      name: 'Ashwani Chauhan',
      role: 'Founder and Head Coach',
      description: 'Leads the gym floor, member transformation plans, and the day-to-day coaching culture of SK Body-First-Gym.',
      image: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=800'
    },
    {
      name: 'Shekhar Thakur',
      role: 'Operations and Member Support',
      description: 'Handles member support, emergency coordination, and ensures a disciplined and welcoming training environment.',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800'
    }
  ]

  const values = [
    { icon: "heart", title: "Inclusivity", description: "LGBTQ+ friendly space where everyone belongs" },
    { icon: "trophy", title: "Excellence", description: "Premium equipment and expert training" },
    { icon: "users", title: "Community", description: "Building lasting connections and support" },
    { icon: "shield-alt", title: "Safety", description: "Clean facilities with modern amenities" }
  ]

  return (
    <section id="about" className="about-section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Who We Are</span>
          <h2 className="section-title">ABOUT <span className="neon-text">SK Body-First-Gym</span></h2>
          <div className="title-underline"></div>
        </div>

        <div className="stats-counter" ref={statsRef}>
          <div className="stat-item">
            <div className="stat-number">{counts.members}</div>
            <div className="stat-label">Active Members</div>
          </div>
          {showTrainersSection && (
            <div className="stat-item">
              <div className="stat-number">{counts.trainers}</div>
              <div className="stat-label">Expert Trainers</div>
            </div>
          )}
          <div className="stat-item">
            <div className="stat-number">{counts.years}</div>
            <div className="stat-label">Years Experience</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">{counts.success}</div>
            <div className="stat-label">Success Rate %</div>
          </div>
        </div>

        <div className="about-content">
          <div className="about-story glass-card">
            <h3>Our Story</h3>
            <p>Founded with a passion for transforming lives, SK body First GYM has been at the forefront of premium fitness training for over a decade. We believe in creating a community where everyone, regardless of their fitness level, can achieve their goals in a supportive and inclusive environment.</p>

            <div className="motivational-banner">
              <i className="fas fa-quote-left"></i>
              <p>"Success isn't always about greatness. It's about consistency."</p>
              <i className="fas fa-quote-right"></i>
            </div>

            <h3>Our Mission</h3>
            <p>To empower individuals to reach their peak physical potential through expert guidance, state-of-the-art facilities, and personalized training programs. We're committed to making fitness accessible and enjoyable for everyone.</p>

            <h3>Our Values</h3>
            <div className="values-grid">
              {values.map((value, index) => (
                <div key={index} className="value-item">
                  <i className={`fas fa-${value.icon}`}></i>
                  <h4>{value.title}</h4>
                  <p>{value.description}</p>
                </div>
              ))}
            </div>
            <div className="main-profile-section">
              <h3>Main Profiles</h3>
              <p className="main-profile-intro">Meet the key people behind the coaching culture and daily member experience at SK Body-First-Gym.</p>
            <div className="main-profile-grid">
              {mainProfiles.map((profile, index) => (
                <article key={index} className="main-profile-card glass-card">
                  <div className="main-profile-image-wrap">
                    <img src={profile.image} alt={profile.name} className="main-profile-image" />
                  </div>
                  <div className="main-profile-content">
                    <span className="main-profile-role">{profile.role}</span>
                    <h4>{profile.name}</h4>
                    <p>{profile.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
          </div>

          {showTrainersSection && (
            <div className="coaches-section">
              <h3>Meet Our Expert Trainers</h3>
              <div className="coaches-grid">
                {coaches.map((coach, index) => (
                  <div key={index} className="coach-card">
                    <div className="coach-img">
                      <img src={coach.image} alt={coach.name} />
                      <div className="coach-overlay">
                        <div className="social-links">
                          <a href="#"><i className="fab fa-instagram"></i></a>
                          <a href="#"><i className="fab fa-facebook"></i></a>
                        </div>
                      </div>
                    </div>
                    <div className="coach-info">
                      <h4>{coach.name}</h4>
                      <p className="specialization">{coach.specialization}</p>
                      <p className="coach-desc">{coach.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default About
