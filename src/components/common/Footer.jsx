const Footer = () => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      const offsetTop = element.offsetTop - 80
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      })
    }
  }

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-col">
            <div className="footer-logo">
              <img src="/dumbell.png" alt="SK Body First Gym logo" className="footer-logo-img" />
              <span>SK Body-First-Gym</span>
            </div>
            <p className="footer-desc">
              Transform your body, transform your life. Join the ultimate fitness community and unleash your inner power.
            </p>
            <div className="social-links">
              <a href="#" title="Facebook"><i className="fab fa-facebook-f"></i></a>
              <a href="#" title="Instagram"><i className="fab fa-instagram"></i></a>
              <a href="#" title="Twitter"><i className="fab fa-twitter"></i></a>
              <a href="#" title="YouTube"><i className="fab fa-youtube"></i></a>
              <a href="#" title="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
            </div>
          </div>

          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><a onClick={() => scrollToSection('home')}><i className="fas fa-chevron-right"></i> Home</a></li>
              <li><a onClick={() => scrollToSection('about')}><i className="fas fa-chevron-right"></i> About Us</a></li>
              <li><a onClick={() => scrollToSection('services')}><i className="fas fa-chevron-right"></i> Services</a></li>
              <li><a onClick={() => scrollToSection('gallery')}><i className="fas fa-chevron-right"></i> Gallery</a></li>
              <li><a onClick={() => scrollToSection('plans')}><i className="fas fa-chevron-right"></i> Membership</a></li>
              <li><a onClick={() => scrollToSection('contact')}><i className="fas fa-chevron-right"></i> Contact</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Our Services</h4>
            <ul className="footer-links">
              <li><a onClick={() => scrollToSection('services')}><i className="fas fa-chevron-right"></i> Weight Training</a></li>
              <li><a onClick={() => scrollToSection('services')}><i className="fas fa-chevron-right"></i> Cardio Training</a></li>
              <li><a onClick={() => scrollToSection('services')}><i className="fas fa-chevron-right"></i> CrossFit</a></li>
              <li><a onClick={() => scrollToSection('services')}><i className="fas fa-chevron-right"></i> Yoga Classes</a></li>
              <li><a onClick={() => scrollToSection('services')}><i className="fas fa-chevron-right"></i> Zumba</a></li>
              <li><a onClick={() => scrollToSection('services')}><i className="fas fa-chevron-right"></i> Personal Training</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Opening Hours</h4>
            <ul className="footer-timings">
              <li>
                <span>Mon - Sat</span>
                <span>05:30 AM - 10:30 PM</span>
              </li>
              <li>
                <span>Sunday</span>
                <span>05:30 AM - 10:30 PM</span>
              </li>
            </ul>
            <div className="footer-contact">
              <p><i className="fas fa-phone"></i> +91 87458 61120</p>
              <p><i className="fas fa-phone"></i> +91 85888 05453</p>
              <p><i className="fas fa-phone"></i> Emergency: +91 95824 61120</p>
              <p><i className="fas fa-envelope"></i> skbodyfirstgym@gmail.com</p>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-quote">
            <i className="fas fa-quote-left"></i>
            <span>"Discipline Beats Motivation."</span>
            <i className="fas fa-quote-right"></i>
          </div>
          <p className="copyright">
            &copy; 2026 SK Body-First-Gym. All Rights Reserved. | <a href="#/admin" style={{ color: '#aaa', fontSize: '12px', opacity: 0.7 }}>Admin</a>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
