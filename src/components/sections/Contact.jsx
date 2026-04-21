const Contact = () => {
  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Get In Touch</span>
          <h2 className="section-title">CONTACT <span className="neon-text">US</span></h2>
          <div className="title-underline"></div>
        </div>

        <div className="contact-quote"><i className="fas fa-quote-left"></i><p>"Start Today. Not Tomorrow."</p><i className="fas fa-quote-right"></i></div>

        <div className="contact-cards-wrapper">
          <div className="contact-info glass-card square-card">
            <h3>Visit Us</h3>
            <div className="contact-info-grid">
              <div className="contact-info-left">
                <div className="info-item"><i className="fas fa-map-marker-alt"></i><div><h4>Address</h4><p>C 513, near Ezee Go Supermarket, C Block,<br />Sector 44, Noida, Uttar Pradesh 201313</p></div></div>
                <div className="info-item"><i className="fas fa-phone"></i><div><h4>Phone</h4><p>+91 8745861120<br />+91 8588805453</p></div></div>
              </div>
              <div className="contact-info-right">
                <div className="info-item"><i className="fab fa-whatsapp"></i><div><h4>WhatsApp</h4><p>+91 8745861120 (Ashwani Chauhan)</p></div></div>
                <div className="info-item"><i className="fas fa-phone-alt"></i><div><h4>Emergency</h4><p>+91 9582461120 (Shekhar Thakur)</p></div></div>
                <div className="info-item"><i className="fas fa-envelope"></i><div><h4>Email</h4><p>skbodyfirstgym@gmail.com</p></div></div>
                <div className="info-item"><i className="fas fa-clock"></i><div><h4>Opening Hours</h4><p>7 Days Gym Open<br />Mon - Sat: 05:30 AM - 10:30 PM<br />Sunday: 06:00 AM - 10:30 AM</p></div></div>
              </div>
            </div>
          </div>

          <div className="map-container glass-card square-card">
            <h3><i className="fas fa-map"></i> Find Us on Map</h3>
            <div className="map-wrapper-square">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3504.5051104881063!2d77.3371861!3d28.5545913!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce5bd6bcd856f%3A0x1f29c2f47ab348d8!2sSk%20Body%20First%20Gym%20-%20Sector%2044%20Noida!5e0!3m2!1sen!2sin!4v1769618836328!5m2!1sen!2sin" width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Flexxwell Fitness Location"></iframe>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

export default Contact
